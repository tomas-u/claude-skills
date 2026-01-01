# GitHub Actions CI/CD Patterns

## Secure Workflow Best Practices

### Minimal Permissions

```yaml
name: Secure CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

permissions:
  contents: read
  packages: write
  security-events: write
  pull-requests: write

jobs:
  build:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
```

### Secret Management

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1
      
      # NEVER do this:
      # - run: echo "API_KEY=${{ secrets.API_KEY }}" >> .env
      
      # DO this instead:
      - name: Deploy with secrets
        env:
          API_KEY: ${{ secrets.API_KEY }}
        run: |
          # Secrets available as env vars, never logged
          ./deploy.sh
```

### Dependency Pinning

```yaml
steps:
  # BAD: Uses latest version (security risk)
  - uses: actions/checkout@v4
  
  # GOOD: Pin to specific commit SHA
  - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
  
  # GOOD: Use trusted actions only
  - uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

## Complete Secure Pipeline

### Node.js Application

```yaml
name: Node.js CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Weekly dependency scan
    - cron: '0 0 * * 0'

permissions:
  contents: read

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ============================================
  # Security Scanning
  # ============================================
  
  secret-scan:
    name: Secret Scanning
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
        with:
          fetch-depth: 0
      
      - name: TruffleHog Secret Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
  
  dependency-scan:
    name: Dependency Scanning
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      security-events: write
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
      
      - name: Upload results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: snyk.sarif
  
  # ============================================
  # Build and Test
  # ============================================
  
  build-and-test:
    name: Build and Test
    runs-on: ubuntu-latest
    needs: [secret-scan, dependency-scan]
    
    permissions:
      contents: read
      checks: write
    
    strategy:
      matrix:
        node-version: [18, 20]
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-${{ matrix.node-version }}
          path: dist/
          retention-days: 1
  
  # ============================================
  # Static Security Testing (SAST)
  # ============================================
  
  sast:
    name: Static Security Testing
    runs-on: ubuntu-latest
    needs: [build-and-test]
    
    permissions:
      contents: read
      security-events: write
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript
      
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
      
      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
            p/owasp-top-ten
  
  # ============================================
  # Container Build and Scan
  # ============================================
  
  container-build:
    name: Build and Scan Container
    runs-on: ubuntu-latest
    needs: [sast]
    
    permissions:
      contents: read
      packages: write
      security-events: write
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-
      
      - name: Build container image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          load: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
      
      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Scan with Snyk Container
        uses: snyk/actions/docker@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          args: --severity-threshold=high
      
      - name: Push container image
        if: github.event_name != 'pull_request'
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
  
  # ============================================
  # Deploy to Staging
  # ============================================
  
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [container-build]
    if: github.ref == 'refs/heads/develop'
    
    environment:
      name: staging
      url: https://staging.example.com
    
    permissions:
      contents: read
      id-token: write
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN_STAGING }}
          aws-region: us-east-1
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster staging-cluster \
            --service app-service \
            --force-new-deployment \
            --desired-count 2
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster staging-cluster \
            --services app-service
      
      - name: Run smoke tests
        run: |
          curl -f https://staging.example.com/health || exit 1
  
  # ============================================
  # Integration Tests (Staging)
  # ============================================
  
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    
    permissions:
      contents: read
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run integration tests
        env:
          API_URL: https://staging.example.com
        run: npm run test:integration
  
  # ============================================
  # Dynamic Security Testing (DAST)
  # ============================================
  
  dast:
    name: Dynamic Security Testing
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    
    permissions:
      contents: read
      security-events: write
    
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.10.0
        with:
          target: 'https://staging.example.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
  
  # ============================================
  # Deploy to Production
  # ============================================
  
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [integration-tests, dast]
    if: github.ref == 'refs/heads/main'
    
    environment:
      name: production
      url: https://example.com
    
    permissions:
      contents: read
      id-token: write
    
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN_PRODUCTION }}
          aws-region: us-east-1
      
      - name: Blue-Green Deployment
        run: |
          # Get current target group
          CURRENT_TG=$(aws elbv2 describe-listeners \
            --load-balancer-arn ${{ secrets.ALB_ARN }} \
            --query 'Listeners[0].DefaultActions[0].TargetGroupArn' \
            --output text)
          
          # Determine new target group
          if [ "$CURRENT_TG" == "${{ secrets.TG_BLUE_ARN }}" ]; then
            NEW_TG="${{ secrets.TG_GREEN_ARN }}"
            NEW_SERVICE="app-service-green"
          else
            NEW_TG="${{ secrets.TG_BLUE_ARN }}"
            NEW_SERVICE="app-service-blue"
          fi
          
          # Deploy to new target group
          aws ecs update-service \
            --cluster production-cluster \
            --service $NEW_SERVICE \
            --force-new-deployment \
            --desired-count 3
          
          # Wait for healthy
          aws ecs wait services-stable \
            --cluster production-cluster \
            --services $NEW_SERVICE
          
          # Switch traffic
          aws elbv2 modify-listener \
            --listener-arn ${{ secrets.LISTENER_ARN }} \
            --default-actions Type=forward,TargetGroupArn=$NEW_TG
          
          echo "Deployed to target group: $NEW_TG"
      
      - name: Verify deployment
        run: |
          sleep 30
          curl -f https://example.com/health || exit 1
      
      - name: Create GitHub Release
        if: startsWith(github.ref, 'refs/tags/')
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

## Reusable Workflows

### Shared Security Scan

```yaml
# .github/workflows/security-scan.yml
name: Reusable Security Scan

on:
  workflow_call:
    inputs:
      language:
        required: true
        type: string
    secrets:
      SNYK_TOKEN:
        required: true

jobs:
  scan:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      security-events: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Snyk
        uses: snyk/actions/${{ inputs.language }}@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
      
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: snyk.sarif
```

### Using Reusable Workflow

```yaml
# .github/workflows/main.yml
name: Main Pipeline

on: [push, pull_request]

jobs:
  security:
    uses: ./.github/workflows/security-scan.yml
    with:
      language: node
    secrets:
      SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

## Optimization Techniques

### Caching Dependencies

```yaml
steps:
  - uses: actions/checkout@v4
  
  - name: Setup Node.js with caching
    uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'npm'
  
  # Alternative: Manual caching
  - name: Cache node modules
    uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-
  
  - name: Install dependencies
    run: npm ci
```

### Matrix Builds

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20]
        exclude:
          # Exclude expensive combinations
          - os: macos-latest
            node-version: 18
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      
      - run: npm ci
      - run: npm test
```

### Conditional Execution

```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy only on main
        run: ./deploy.sh
  
  preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy preview
        run: ./deploy-preview.sh
```

## Security Best Practices

### OpenID Connect (OIDC)

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      id-token: write
      contents: read
    
    steps:
      - uses: actions/checkout@v4
      
      # AWS
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActions
          aws-region: us-east-1
      
      # Azure
      - name: Azure Login
        uses: azure/login@v1
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
      
      # GCP
      - name: Authenticate to GCP
        uses: google-github-actions/auth@v1
        with:
          workload_identity_provider: 'projects/123/locations/global/workloadIdentityPools/github/providers/github'
          service_account: 'github-actions@project.iam.gserviceaccount.com'
```

### Environment Protection Rules

```yaml
# Repository Settings → Environments → Production
# Configure:
# - Required reviewers
# - Wait timer
# - Deployment branches (only main)

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    
    steps:
      - name: Deploy
        run: echo "Deploying after approval"
```

### Dependency Review

```yaml
name: Dependency Review

on: [pull_request]

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: moderate
          deny-licenses: GPL-2.0, GPL-3.0
```

## Performance Optimization

### Parallel Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint
  
  test-unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run test:unit
  
  test-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run test:integration
  
  # All run in parallel
  deploy:
    needs: [lint, test-unit, test-integration]
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

### Artifact Sharing

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - run: ./deploy.sh
```

## Monitoring and Notifications

### Slack Notifications

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy
        run: ./deploy.sh
      
      - name: Notify Slack on success
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "Deployment succeeded for ${{ github.repository }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "✅ Deployment *succeeded*\n*Repository:* ${{ github.repository }}\n*Branch:* ${{ github.ref }}\n*Commit:* ${{ github.sha }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
      
      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "⚠️ Deployment failed for ${{ github.repository }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### GitHub Status Checks

```yaml
jobs:
  status:
    runs-on: ubuntu-latest
    
    steps:
      - name: Create deployment status
        uses: actions/github-script@v6
        with:
          script: |
            await github.rest.repos.createDeploymentStatus({
              owner: context.repo.owner,
              repo: context.repo.repo,
              deployment_id: context.payload.deployment.id,
              state: 'success',
              environment_url: 'https://example.com',
              description: 'Deployment completed successfully'
            });
```

## Common Patterns

### Monorepo Support

```yaml
on:
  push:
    paths:
      - 'services/api/**'
      - '.github/workflows/api.yml'

jobs:
  build-api:
    runs-on: ubuntu-latest
    
    defaults:
      run:
        working-directory: services/api
    
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### Auto-merge Dependabot PRs

```yaml
name: Auto-merge Dependabot

on: pull_request

permissions:
  pull-requests: write
  contents: write

jobs:
  dependabot:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    
    steps:
      - name: Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v1
      
      - name: Auto-merge minor/patch updates
        if: steps.metadata.outputs.update-type == 'version-update:semver-minor' || steps.metadata.outputs.update-type == 'version-update:semver-patch'
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
