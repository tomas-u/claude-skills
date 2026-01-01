# Docker and Kubernetes Best Practices

## Docker Security Best Practices

### Minimal Base Images

```dockerfile
# BAD: Large, many vulnerabilities
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nodejs npm

# BETTER: Official Node image
FROM node:20

# BEST: Minimal distroless or Alpine
FROM node:20-alpine

# BEST FOR PRODUCTION: Distroless (no shell, minimal attack surface)
FROM gcr.io/distroless/nodejs20-debian12
```

### Multi-Stage Builds

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port (documentation only, doesn't actually open port)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["node", "dist/index.js"]
```

### Security Hardening

```dockerfile
FROM node:20-alpine

# Install security updates
RUN apk update && \
    apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Create non-root user with specific UID/GID
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

# Copy files with correct ownership
COPY --chown=nodejs:nodejs package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

COPY --chown=nodejs:nodejs . .

# Remove write permissions from all files
RUN chmod -R a-w /app

# Switch to non-root user
USER nodejs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "index.js"]
```

### .dockerignore

```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
*.md
.vscode
.idea
coverage
.nyc_output
dist
build
*.log
.DS_Store
Dockerfile
docker-compose*.yml
.github
.gitlab-ci.yml
```

### Build Arguments and Secrets

```dockerfile
# Build arguments (not secrets!)
ARG NODE_VERSION=20
ARG BUILD_DATE
ARG VCS_REF

FROM node:${NODE_VERSION}-alpine

LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.title="My App" \
      org.opencontainers.image.description="Description"

WORKDIR /app

# NEVER put secrets in build args or env vars
# ARG DATABASE_PASSWORD=secret123  # WRONG!

# Use BuildKit secrets instead
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci

# Or mount secrets at runtime
# docker run --secret=id=npmrc,src=.npmrc myapp
```

### Docker Build Command

```bash
# Build with BuildKit
DOCKER_BUILDKIT=1 docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --secret id=npmrc,src=$HOME/.npmrc \
  --tag myapp:latest \
  --tag myapp:$(git rev-parse --short HEAD) \
  --file Dockerfile \
  .

# Scan for vulnerabilities
docker scan myapp:latest

# Or use Trivy
trivy image myapp:latest
```

## Docker Compose for Development

### Secure Development Environment

```yaml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        NODE_VERSION: 20
    
    container_name: myapp
    
    # Run as non-root
    user: "1001:1001"
    
    # Read-only root filesystem
    read_only: true
    
    # Minimal capabilities
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # Security options
    security_opt:
      - no-new-privileges:true
    
    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
    
    # Environment from file (not committed to git)
    env_file:
      - .env.local
    
    # Volumes for development
    volumes:
      - ./src:/app/src:ro
      - /app/node_modules
      - ./logs:/app/logs
    
    # Temporary directories (writable)
    tmpfs:
      - /tmp
      - /app/tmp
    
    ports:
      - "3000:3000"
    
    networks:
      - app-network
    
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s
  
  db:
    image: postgres:15-alpine
    
    container_name: myapp-db
    
    # Security
    read_only: true
    security_opt:
      - no-new-privileges:true
    
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    
    secrets:
      - db_password
    
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d:ro
    
    tmpfs:
      - /tmp
      - /var/run/postgresql
    
    networks:
      - app-network
    
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  redis:
    image: redis:7-alpine
    
    container_name: myapp-redis
    
    command: redis-server --requirepass ${REDIS_PASSWORD}
    
    read_only: true
    security_opt:
      - no-new-privileges:true
    
    volumes:
      - redis-data:/data
    
    tmpfs:
      - /tmp
    
    networks:
      - app-network
    
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
    driver: local
  redis-data:
    driver: local

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## Kubernetes Security Best Practices

### Secure Pod Definition

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
  labels:
    app: myapp
    version: v1.0.0
spec:
  # Security context for entire pod
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    runAsGroup: 1001
    fsGroup: 1001
    seccompProfile:
      type: RuntimeDefault
  
  # Service account (not default)
  serviceAccountName: myapp-sa
  automountServiceAccountToken: false
  
  containers:
  - name: app
    image: myregistry/myapp:v1.0.0
    imagePullPolicy: Always
    
    # Container security context
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1001
      capabilities:
        drop:
          - ALL
        add:
          - NET_BIND_SERVICE
    
    # Resource limits
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
    
    # Ports
    ports:
    - containerPort: 3000
      name: http
      protocol: TCP
    
    # Environment from ConfigMap and Secrets
    envFrom:
    - configMapRef:
        name: myapp-config
    - secretRef:
        name: myapp-secrets
    
    # Liveness probe
    livenessProbe:
      httpGet:
        path: /health
        port: http
        httpHeaders:
        - name: X-Health-Check
          value: liveness
      initialDelaySeconds: 30
      periodSeconds: 10
      timeoutSeconds: 3
      failureThreshold: 3
    
    # Readiness probe
    readinessProbe:
      httpGet:
        path: /ready
        port: http
      initialDelaySeconds: 5
      periodSeconds: 5
      timeoutSeconds: 3
      failureThreshold: 3
    
    # Startup probe (for slow-starting apps)
    startupProbe:
      httpGet:
        path: /health
        port: http
      initialDelaySeconds: 0
      periodSeconds: 10
      timeoutSeconds: 3
      failureThreshold: 30
    
    # Volumes
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: cache
      mountPath: /app/cache
    - name: config
      mountPath: /app/config
      readOnly: true
  
  # Volumes
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}
  - name: config
    configMap:
      name: myapp-config
  
  # Image pull secrets
  imagePullSecrets:
  - name: registry-credentials
  
  # Pod anti-affinity (spread across nodes)
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: app
              operator: In
              values:
              - myapp
          topologyKey: kubernetes.io/hostname
```

### Deployment with Rolling Update

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
  labels:
    app: myapp
    version: v1.0.0
spec:
  replicas: 3
  
  # Rolling update strategy
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  
  # Minimum time before considered ready
  minReadySeconds: 10
  
  # Revision history
  revisionHistoryLimit: 10
  
  selector:
    matchLabels:
      app: myapp
  
  template:
    metadata:
      labels:
        app: myapp
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
        prometheus.io/path: "/metrics"
    
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
        seccompProfile:
          type: RuntimeDefault
      
      serviceAccountName: myapp-sa
      
      containers:
      - name: app
        image: myregistry/myapp:v1.0.0
        imagePullPolicy: Always
        
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          capabilities:
            drop:
              - ALL
        
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        ports:
        - containerPort: 3000
          name: http
        
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        
        envFrom:
        - configMapRef:
            name: myapp-config
        - secretRef:
            name: myapp-secrets
        
        livenessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /ready
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
        
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: cache
          mountPath: /app/cache
      
      volumes:
      - name: tmp
        emptyDir: {}
      - name: cache
        emptyDir:
          sizeLimit: 1Gi
      
      imagePullSecrets:
      - name: registry-credentials
```

### Service and Ingress

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: production
  labels:
    app: myapp
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: http
    protocol: TCP
    name: http
  sessionAffinity: None

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: production
  annotations:
    # TLS
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    
    # Security headers
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
      more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains";
    
    # Rate limiting
    nginx.ingress.kubernetes.io/limit-rps: "100"
    nginx.ingress.kubernetes.io/limit-connections: "10"
    
    # CORS
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://example.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    
    # Timeouts
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "30"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "30"

spec:
  ingressClassName: nginx
  
  tls:
  - hosts:
    - example.com
    secretName: example-tls
  
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port:
              name: http
```

### NetworkPolicy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: myapp-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: myapp
  
  policyTypes:
  - Ingress
  - Egress
  
  ingress:
  # Allow from ingress controller
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  
  # Allow from same namespace
  - from:
    - podSelector:
        matchLabels:
          app: myapp
    ports:
    - protocol: TCP
      port: 3000
  
  egress:
  # Allow DNS
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53
  
  # Allow to database
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  
  # Allow to external APIs
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 443
```

### ResourceQuota and LimitRange

```yaml
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: namespace-quota
  namespace: production
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 100Gi
    limits.cpu: "200"
    limits.memory: 200Gi
    pods: "100"
    services: "50"
    persistentvolumeclaims: "50"

---
apiVersion: v1
kind: LimitRange
metadata:
  name: namespace-limits
  namespace: production
spec:
  limits:
  # Container limits
  - type: Container
    default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    max:
      cpu: 2
      memory: 2Gi
    min:
      cpu: 50m
      memory: 64Mi
  
  # Pod limits
  - type: Pod
    max:
      cpu: 4
      memory: 4Gi
  
  # PVC limits
  - type: PersistentVolumeClaim
    max:
      storage: 100Gi
    min:
      storage: 1Gi
```

### HorizontalPodAutoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  
  minReplicas: 3
  maxReplicas: 10
  
  metrics:
  # CPU-based scaling
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  
  # Memory-based scaling
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  
  # Custom metric scaling
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
      - type: Pods
        value: 2
        periodSeconds: 60
      selectPolicy: Min
    
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
      - type: Pods
        value: 4
        periodSeconds: 30
      selectPolicy: Max
```

### PodDisruptionBudget

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
  namespace: production
spec:
  minAvailable: 2
  # Or: maxUnavailable: 1
  selector:
    matchLabels:
      app: myapp
```

### ServiceAccount with RBAC

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: myapp-sa
  namespace: production

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: myapp-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: myapp-rolebinding
  namespace: production
subjects:
- kind: ServiceAccount
  name: myapp-sa
  namespace: production
roleRef:
  kind: Role
  name: myapp-role
  apiGroup: rbac.authorization.k8s.io
```

## Helm Chart Best Practices

### Chart Structure

```
myapp/
├── Chart.yaml
├── values.yaml
├── values-dev.yaml
├── values-staging.yaml
├── values-production.yaml
├── templates/
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── serviceaccount.yaml
│   ├── hpa.yaml
│   ├── pdb.yaml
│   └── tests/
│       └── test-connection.yaml
└── .helmignore
```

### values.yaml

```yaml
# values.yaml
replicaCount: 3

image:
  repository: myregistry/myapp
  pullPolicy: IfNotPresent
  tag: ""  # Overridden by CI/CD

imagePullSecrets:
  - name: registry-credentials

serviceAccount:
  create: true
  annotations: {}
  name: ""

podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"

podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1001
  fsGroup: 1001
  seccompProfile:
    type: RuntimeDefault

securityContext:
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  capabilities:
    drop:
      - ALL

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: example-tls
      hosts:
        - example.com

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 200m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}

tolerations: []

affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
              - key: app.kubernetes.io/name
                operator: In
                values:
                  - myapp
          topologyKey: kubernetes.io/hostname

env:
  NODE_ENV: production
  PORT: "3000"

configMap:
  data:
    config.json: |
      {
        "feature": "enabled"
      }
```

### Install/Upgrade Commands

```bash
# Install
helm install myapp ./myapp \
  --namespace production \
  --create-namespace \
  --values values-production.yaml \
  --set image.tag=$(git rev-parse --short HEAD) \
  --atomic \
  --timeout 5m

# Upgrade
helm upgrade myapp ./myapp \
  --namespace production \
  --values values-production.yaml \
  --set image.tag=$(git rev-parse --short HEAD) \
  --atomic \
  --timeout 5m \
  --wait

# Rollback
helm rollback myapp 1 --namespace production

# Dry run
helm install myapp ./myapp \
  --namespace production \
  --values values-production.yaml \
  --dry-run \
  --debug
```

## Monitoring

### Prometheus Metrics

```yaml
# ServiceMonitor for Prometheus Operator
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp
  namespace: production
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
```

## Security Scanning

```bash
# Scan Docker image
trivy image myregistry/myapp:v1.0.0

# Scan Kubernetes manifests
trivy config k8s/

# Scan Helm chart
trivy config myapp/

# Check for CIS benchmarks
kube-bench run --targets=node,policies,master

# Policy enforcement with OPA
conftest test k8s/ --policy policies/
```
