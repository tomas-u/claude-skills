# Frontend Architecture Patterns

## Component Architecture

### Component Hierarchy Principles
- **Single Responsibility**: Each component should do one thing well
- **Composition over Inheritance**: Build complex UIs from simple components
- **Container/Presentation Pattern**: Separate data logic from presentation
- **Prop Drilling Limit**: If passing props >2 levels deep, consider Context or state management

### Component Structure Patterns

**Feature-based Structure** (Recommended for medium-large apps):
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── index.ts
│   ├── tasks/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── index.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── layouts/
└── pages/
```

**Domain-driven Structure** (For complex business logic):
```
src/
├── domains/
│   ├── student/
│   ├── teacher/
│   └── assignment/
├── infrastructure/
├── application/
└── presentation/
```

### Component Composition

**Good: Composable Components**
```jsx
// Flexible, reusable
<Card>
  <CardHeader>
    <CardTitle>Assignment</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Details here</p>
  </CardContent>
</Card>
```

**Avoid: Monolithic Components**
```jsx
// Inflexible, hard to maintain
<AssignmentCard 
  title="..." 
  content="..." 
  showHeader={true}
  headerStyle={...}
  // 20 more props
/>
```

## State Management

### When to Use What

**Local State (useState)**: 
- Form inputs
- UI state (modals, dropdowns)
- Component-specific data
- Simple parent-child sharing

**Context API**:
- Theme (dark/light mode)
- User authentication
- Language/i18n
- Settings/preferences
- 2-5 components need access

**State Management Library (Redux/Zustand/Jotai)**:
- Complex app-wide state
- Needs time-travel debugging
- Multiple features share state
- Need middleware (logging, persistence)
- 5+ components need access

**Server State (React Query/SWR)**:
- API data fetching
- Caching remote data
- Optimistic updates
- Background refetching

### React Query Pattern (Recommended)

```typescript
// hooks/useAssignments.ts
export const useAssignments = (studentId: string) => {
  return useQuery({
    queryKey: ['assignments', studentId],
    queryFn: () => fetchAssignments(studentId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Component usage
const { data, isLoading, error } = useAssignments(studentId);
```

**Benefits:**
- Automatic caching
- Background updates
- Deduplication
- Optimistic updates
- Less boilerplate than Redux

### State Colocation

Keep state as close to where it's used as possible:
```jsx
// ❌ Bad: State too high
function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  return <TaskList onSelect={setSelectedTask} />;
}

// ✅ Good: State colocated
function TaskList() {
  const [selectedTask, setSelectedTask] = useState(null);
  // Use it here
}
```

## Performance Optimization

### Code Splitting

**Route-based splitting:**
```typescript
// Next.js
const TasksPage = dynamic(() => import('@/features/tasks/TasksPage'));

// React Router
const TasksPage = lazy(() => import('@/features/tasks/TasksPage'));
```

**Component-based splitting:**
```typescript
// Only load heavy chart library when needed
const ChartComponent = dynamic(
  () => import('@/components/Chart'),
  { loading: () => <Spinner /> }
);
```

### Memoization Strategies

**useMemo**: Expensive calculations
```typescript
const sortedTasks = useMemo(
  () => tasks.sort((a, b) => a.dueDate - b.dueDate),
  [tasks]
);
```

**useCallback**: Prevent function recreation
```typescript
const handleTaskComplete = useCallback(
  (taskId: string) => {
    updateTask(taskId, { completed: true });
  },
  [updateTask]
);
```

**React.memo**: Prevent re-renders
```typescript
const TaskCard = memo(({ task }) => {
  // Only re-renders if task prop changes
});
```

### Virtual Scrolling

For long lists (>100 items), use virtual scrolling:
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: tasks.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80,
});
```

### Image Optimization

```typescript
// Next.js Image component
import Image from 'next/image';

<Image
  src="/profile.jpg"
  width={500}
  height={500}
  placeholder="blur"
  priority // For above-fold images
/>
```

## Data Fetching Patterns

### Server Components (Next.js 13+)

```typescript
// app/tasks/page.tsx - Server Component
async function TasksPage() {
  const tasks = await fetchTasks(); // Runs on server
  return <TaskList tasks={tasks} />;
}
```

**When to use:**
- Initial page load data
- SEO-critical content
- Reduce client bundle size

### Client Components

```typescript
'use client'; // Client Component marker

function TaskBreakdown() {
  const [subtasks, setSubtasks] = useState([]);
  // Interactive, stateful logic
}
```

**When to use:**
- Interactive features
- Browser APIs (localStorage, etc.)
- Event handlers
- State and effects

### Parallel Data Fetching

```typescript
// ❌ Sequential (slow)
const user = await fetchUser();
const tasks = await fetchTasks(user.id);

// ✅ Parallel (fast)
const [user, tasks] = await Promise.all([
  fetchUser(),
  fetchTasks(),
]);
```

### Optimistic Updates

```typescript
const { mutate } = useMutation({
  mutationFn: completeTask,
  onMutate: async (taskId) => {
    // Cancel refetch
    await queryClient.cancelQueries(['tasks']);
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(['tasks']);
    
    // Optimistically update
    queryClient.setQueryData(['tasks'], old => 
      old.map(task => 
        task.id === taskId 
          ? { ...task, completed: true }
          : task
      )
    );
    
    return { previous };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['tasks'], context.previous);
  },
});
```

## Type Safety (TypeScript)

### Component Props

```typescript
interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  variant?: 'default' | 'compact';
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onComplete,
  variant = 'default' 
}) => {
  // Implementation
};
```

### API Response Types

```typescript
// types/api.ts
export interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
  subject: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  metadata?: {
    page: number;
    total: number;
  };
}
```

### Discriminated Unions

```typescript
type FormState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Assignment }
  | { status: 'error'; error: string };

function handleFormState(state: FormState) {
  switch (state.status) {
    case 'success':
      return state.data; // TypeScript knows data exists
    case 'error':
      return state.error; // TypeScript knows error exists
  }
}
```

## Error Handling

### Error Boundaries

```typescript
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Async Error Handling

```typescript
const { data, error, isError } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});

if (isError) {
  return <ErrorState error={error} />;
}
```

## Testing Strategy

### Unit Tests (Component Logic)
```typescript
// TaskCard.test.tsx
describe('TaskCard', () => {
  it('calls onComplete when checkbox clicked', () => {
    const onComplete = jest.fn();
    render(<TaskCard task={mockTask} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onComplete).toHaveBeenCalledWith(mockTask.id);
  });
});
```

### Integration Tests (Feature Flows)
```typescript
describe('Task Breakdown Flow', () => {
  it('creates and schedules subtasks', async () => {
    render(<TaskBreakdown task={mockTask} />);
    
    // Add subtask
    await userEvent.type(
      screen.getByPlaceholderText('Add subtask'),
      'Read chapter 1'
    );
    await userEvent.click(screen.getByText('Add'));
    
    // Schedule it
    await userEvent.click(screen.getByText('Schedule'));
    await userEvent.click(screen.getByText('Tomorrow'));
    
    expect(screen.getByText('Read chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
  });
});
```

## Mobile-Specific Considerations

### Responsive Design Patterns

```typescript
// hooks/useMediaQuery.ts
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
```

### Touch Interactions

```typescript
const [touchStart, setTouchStart] = useState(0);

const handleTouchStart = (e: TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

const handleTouchEnd = (e: TouchEvent) => {
  const touchEnd = e.changedTouches[0].clientX;
  const diff = touchStart - touchEnd;
  
  if (diff > 50) onSwipeLeft();
  if (diff < -50) onSwipeRight();
};
```

### PWA Patterns

```typescript
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Offline detection
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```

## Build Optimization

### Bundle Analysis

```bash
# Next.js
ANALYZE=true npm run build

# Create React App
npm install --save-dev webpack-bundle-analyzer
```

### Tree Shaking

```typescript
// ✅ Good: Named imports (tree-shakeable)
import { Button, Card } from '@/components';

// ❌ Bad: Default imports entire module
import * as Components from '@/components';
```

### Environment Variables

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```
