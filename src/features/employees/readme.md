# Employee Management Feature

## What does the feature do?
The Employee Feature enables users to view, add, edit, and delete employee records. It includes collapsible rows for additional details (email, phone), real-time Firestore synchronization, and form validation for data integrity. Upon adding a new employee, a success notification is displayed using `react-toastify`.

## What do the components do?
- **`Employees.tsx`**:
  - Displays the employee list or an empty state message.
  - Renders `AddEmployeeDrawer` for adding new employees.
  - Switches between table view (desktop) and card view (mobile).
  - Manages delete and update operations using React Query mutations.
- **`EmployeeRow.tsx`**:
  - Renders a single employee row with view and edit modes.
  - Toggles collapsible row visibility and delegates editing to `EmployeeEditForm`.
- **`EmployeeRowView.tsx`**:
  - Displays employee data in view mode.
  - Provides an action menu for edit/delete and a toggle for row expansion.
- **`CollapsibleRow.tsx`**:
  - Shows additional employee details (email, phone) in a collapsible row.
  - Supports editing mode for extra fields.
- **`ActionMenu.tsx`**:
  - Renders a dropdown menu with edit and delete options.
- **`EmployeeEditForm.tsx`**:
  - Handles inline editing of employee details (name, position, start date, status, email, phone) with form validation.
- **`AddEmployeeDrawer.tsx`**:
  - Renders a drawer with a form for adding new employees.
  - Opens/closes the drawer and passes alert functionality to `AddEmployeeForm`.
- **`AddEmployeeForm.tsx`**:
  - Provides a form for creating new employees with fields for name, position, start date, status, email, and phone.
  - Validates input and triggers Firestore mutation, displaying a `react-toastify` success notification on completion.


## Dependencies
- **Material-UI (MUI)**: Provides table, form, button, and drawer components.
- **react-hook-form**: Manages form state and validation.
- **Zod**: Validates form data with schemas.
- **Zustand**: Manages global employee state.
- **React Query**: Handles data fetching and Firestore mutations.
- **Dayjs**: Formats and manages dates.
- **React Icons**: Supplies icons for actions (edit, delete, expand/collapse, add).
- **react-toastify**: Displays success/error notifications for employee actions.

## Important Notes
- **Firestore**: Required for data persistence and mutation operations.
