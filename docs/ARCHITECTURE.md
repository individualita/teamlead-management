# Project Architecture

## Overview
This React application follows a feature-based architecture with clear separation of concerns. The project is organized into three main directories: `app`, `shared`, and `features`.

## Project Structure

```bash
.
├── src/
│   ├── app/
│   │   ├── app.tsx              # main React app entry point, wraps everything in providers and routes
│   │   ├── main.tsx             # renders <App /> into DOM
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx # combines all root-level providers
│   │   │   └── AuthProvider.tsx # provides user data and authentication methods
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.tsx # protected route, redirects unauthorized users to home
│   │   │   └── PublicRoute.tsx    # route for unauthorized users (SignIn/SignUp)
│   │   └── styles/
│   │       ├── _base.css         # base styles
│   │       ├── _utilities.css    # utility classes
│   │       ├── _vars.css         # CSS variables
│   │       └── main.css          # combines and imports global styles
│   ├── shared/
│   │   ├── clients/
│   │   │   └── queryClient.ts     # React Query client configuration
│   │   ├── components/            # shared UI components
│   │   │   ├── avatar/
│   │   │   │   └── Avatar.tsx
│   │   │   ├── errorMessage/
│   │   │   │   └── ErrorMessage.tsx
│   │   │   ├── layouts/
│   │   │   │   ├── container.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   ├── loadingCircle.tsx
│   │   │   │   └── mainLayout.tsx
│   │   │   │       ├── contentSection.tsx
│   │   │   │       └── headerSection.tsx
│   │   │   ├── sidebar/
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── tabs/
│   │   │   │   └── Tabs.tsx
│   │   │   └── xbutton/           # universal close/delete button
│   │   │       └── XButton.tsx
│   │   ├── config/
│   │   │   └── firebaseConfig.ts  # Firebase configuration
│   │   ├── constants/             # application-wide constants
│   │   ├── hooks/                 # shared hooks for Firebase operations (add, delete, query)
│   │   │   ├── useAddMutation.ts
│   │   │   ├── useDeleteMutation.ts
│   │   │   └── useEmployeesQuery.ts
│   │   ├── mocks/                 # mock data for local development
│   │   ├── services/              # API wrappers
│   │   │   └── employeesService.ts
│   │   ├── stores/                # global state management
│   │   │   ├── authStore.ts
│   │   │   ├── employeesStore.ts
│   │   │   └── tabsStore.ts
│   │   ├── styles/
│   │   │   └── shared.css         # shared styles
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types and interfaces
│   │   └── utils/                 # utility functions
│   │       ├── formatDate.ts
│   │       ├── getEmployeeStatusColor.ts
│   │       └── getRouteTitle.ts
│   └── features/                  # feature-based modules
│       ├── auth/                  # authentication feature
│       │   ├── components/        # UI components: forms and notifications
│       │   │   ├── AuthForm.tsx
│       │   │   ├── AuthAlert.tsx
│       │   │   └── ErrorResetter.tsx
│       │   ├── constants/
│       │   │   ├── firebaseAuthErrors.ts # Firebase error mapping
│       │   │   └── validationRules.ts    # form validation rules
│       │   ├── pages/             # sign-in/sign-up pages
│       │   │   ├── SignIn.tsx
│       │   │   └── SignUp.tsx
│       │   ├── services/
│       │   │   └── executeAuthAction.ts
│       │   ├── styles/            # auth feature styles
│       │   │   └── auth.css
│       │   └── types/             # auth-specific types
│       │       └── index.ts
│       ├── chat/                  # chat feature
│       │   ├── Chat.tsx           # chat root component
│       │   ├── assets/            # images, icons
│       │   ├── components/        # feature components
│       │   │   ├── ChatForm.tsx
│       │   │   ├── EmptyChatState.tsx
│       │   │   ├── MessageItem.tsx
│       │   │   └── MessageList.tsx
│       │   ├── hooks/             # chat hooks
│       │   │   ├── useMessages.ts
│       │   │   └── useSendMessage.ts
│       │   ├── store/             # chat feature store
│       │   │   └── messagesStore.ts
│       │   └── utils/
│       │       └── groupMessagesByDate.ts
│       ├── employees/             # employee management feature
│       │   ├── Employees.tsx      # main page
│       │   ├── components/        # buttons, menus, forms, cards, table
│       │   │   ├── ActionButton.tsx
│       │   │   ├── ActionMenu.tsx
│       │   │   ├── AddEmployeeDrawer.tsx
│       │   │   ├── AddEmployeeForm.tsx
│       │   │   ├── CollapsibleRow.tsx
│       │   │   ├── EmployeeCard.tsx
│       │   │   ├── EmployeeEditForm.tsx
│       │   │   ├── EmployeeProfile.tsx
│       │   │   ├── EmployeeRow.tsx
│       │   │   ├── EmployeeRowView.tsx
│       │   │   ├── TableHeader.tsx
│       │   │   └── UIEmployeesTable.tsx
│       │   ├── constants/
│       │   │   ├── alertTimeout.ts
│       │   │   ├── styles.ts
│       │   │   └── tableColumns.ts
│       │   ├── hooks/
│       │   │   ├── useAutoDismissAlert.ts
│       │   │   ├── usePagination.ts
│       │   │   └── useUpdateEmployee.ts
│       │   ├── schema/
│       │   │   └── employee.schema.ts
│       │   ├── styles/            # employees feature styles
│       │   │   └── employees.css
│       │   └── utils/
│       │       └── getEmployeesBadgeInfo.ts
│       ├── employeeSearch/        # employee search feature
│       │   ├── searchBar.tsx      # employee search component
│       │   ├── components/        # feature components
│       │   │   ├── MobileSearch.tsx
│       │   │   ├── SearchSuggestionItem.tsx
│       │   │   └── SuggestionList.tsx
│       │   └── hooks/             # feature hooks
│       │       ├── useDebounce.ts
│       │       └── useEmployeeSearch.ts
│       ├── home/                  # home page (Kanban board)
│       │   ├── Home.tsx
│       │   ├── components/        # feature components
│       │   │   ├── AddTaskButton.tsx
│       │   │   ├── AddTaskForm.tsx
│       │   │   ├── Board.tsx     # main task board
│       │   │   ├── BoardColumn.tsx
│       │   │   ├── BoardHeader.tsx
│       │   │   ├── EmptyState.tsx
│       │   │   └── TaskCard.tsx
│       │   ├── constants/         # feature constants
│       │   │   ├── board.ts
│       │   │   ├── styles.ts
│       │   │   └── tasks.ts
│       │   ├── dnd/               # drag and drop logic
│       │   │   ├── Draggable.tsx
│       │   │   ├── Droppable.tsx
│       │   │   └── useCustomDndSensors.ts
│       │   ├── hooks/             # feature hooks
│       │   │   ├── useTasksQuery.ts
│       │   │   └── useUpdateTask.ts
│       │   ├── mocks/
│       │   │   └── mockTasks.ts
│       │   ├── schema/
│       │   │   └── tasks.schema.ts
│       │   ├── services/
│       │   │   └── taskService.ts
│       │   ├── stores/            # feature store
│       │   │   └── tasksStore.ts
│       │   └── utils/
│       │       ├── getTaskPriorityColor.ts
│       │       ├── getTaskStatusColor.ts
│       │       └── groupTasksByStatus.ts
│       └── profile/               # user profile feature
│           ├── menu/              # profile menu
│           │   ├── ProfileMenu.tsx
│           │   ├── components/    # menu components
│           │   │   ├── ProfileActions.tsx
│           │   │   └── ProfileDropdown.tsx
│           │   └── styles/        # shared styles
│           │       └── profileMenu.css
│           └── settings/          # profile settings feature
│               ├── ProfileSettings.tsx
│               ├── components/    # feature components
│               │   ├── UserNameForm.tsx
│               │   └── UserPhotoForm.tsx
│               ├── hooks/         # feature hooks
│               │   └── useFirebaseProfileUpdate.ts
│               ├── services/
│               │   └── updateUserMessagesPhotoURL.ts
│               └── styles/        # shared styles
│                   └── profileSettings.css
```

## Architecture Principles

This project is built on **Feature-Based Architecture** with clear separation of concerns and strict module boundaries.

### 📁 Directory Structure Rules

#### `src/app/` - Application Layer
Contains global application setup, routing, and root-level providers.

**What belongs here:**
- Global routes and route protection
- Root providers and app configuration  
- Application-wide styles and constants

**Examples:**
```typescript
// ✅ Correct - global route paths
export enum ROUTE_PATHS {
  SIGN_IN = '/sign-in',
  HOME = '/home',
  EMPLOYEES = '/employees'
}

// ✅ Correct - app-wide provider
const AppProviders = ({ children }) => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        {children}
      </Router>
    </QueryClientProvider>
  </AuthProvider>
);
```

#### `src/features/` - Feature Layer
Self-contained feature modules with their own business logic.

**What belongs here:**
- Feature-specific components and UI
- Feature-only constants and configurations
- Feature-scoped stores and state management
- Business logic specific to the feature
- Feature-specific hooks and utilities

**🚨 Critical Rule: Features MUST NOT import from each other!**

```typescript
// ❌ Wrong - feature importing another feature
import { EmployeeCard } from '../employees/components/EmployeeCard';

// ✅ Correct - feature using shared components
import { Card } from '../../shared/components/Card';
```

#### `src/shared/` - Shared Layer
Reusable code and infrastructure used across multiple features.

**What belongs here:**
- Reusable UI components
- Global stores used by multiple features
- Common utilities and helpers
- External service configurations
- Shared types and interfaces
- API clients and services

**Placement Criteria:**
- Used in 2+ places across the app
- OR serves as common infrastructure

### 🏪 Store Placement Strategy

**When to place in `shared/`:**
Store is used by multiple features or the app layer.

```typescript
// shared/stores/authStore.ts - used by:
// - app/routes/ProtectedRoute.tsx
// - features/auth/components/AuthForm.tsx  
// - shared/layouts/MainLayout.tsx
```

**When to place in `features/`:**
Store is only used within a single feature.

```typescript
// features/chat/store/messagesStore.ts - only used by:
// - features/chat/components/MessageList.tsx
// - features/chat/hooks/useMessages.ts
```

### 📝 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `AuthForm.tsx`, `MessageList.tsx` |
| **Hooks** | camelCase with `use` prefix | `useAuthStore`, `useEmployeeSearch` |
| **Constants** | UPPER_SNAKE_CASE | `AUTH_TITLES`, `API_ENDPOINTS` |
| **Types/Interfaces** | PascalCase | `AuthActionType`, `Employee` |
| **Files/Folders** | camelCase | `authStore.ts`, `employeeSearch/` |
| **CSS Classes** | kebab-case | `.auth-form`, `.message-item` |

### 🔄 Import Guidelines

**Import Order:**
1. External libraries
2. Internal shared modules
3. Feature-internal modules
4. Relative imports

```typescript
// ✅ Correct import order
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '../../shared/components/Button';
import { useAuthStore } from '../../shared/stores/authStore';

import { useEmployeeSearch } from '../hooks/useEmployeeSearch';
import { EmployeeCard } from './EmployeeCard';
```

### 🎯 Key Benefits

- **Modularity**: Features can be developed and tested independently
- **Maintainability**: Clear boundaries make code easier to understand and modify
- **Scalability**: New features can be added without affecting existing ones
- **Reusability**: Shared components and utilities reduce code duplication
- **Team Collaboration**: Multiple developers can work on different features simultaneously

### Technology Stack
- **React**: UI library with hooks and functional components
- **TypeScript**: Type safety and better developer experience
- **Firebase**: Backend services (authentication, firestore database, realtime database)
- **React Query**: Server state management and caching
- **Zustand**: Client state management
