# Auth Feature

The **auth** feature handles user authentication, including login, signup, and managing the user's state throughout the application.

## Table of Contents
- [Purpose](#purpose)
- [Key Components](#key-components)
- [How to Use](#how-to-use)
- [Dependencies](#dependencies)
- [Shared Resources](#shared-resources)

## Purpose
The auth feature is responsible for managing user authentication and authorization. It allows users to:
- Sign up for a new account.
- Sign in to an existing account.
- Log out of the application.
- Maintain and track the user's authentication state across the app.

## Key Components
The auth feature is composed of several key files, organized into components, pages, and services:

- **Components**:
  - `authForm.tsx`: A reusable form component for handling user input during login and signup.
  - `errorAlert.tsx`: A component that displays authentication-related error messages.

- **Pages**:
  - `signIn.tsx`: The login page where users can enter their credentials to access the application.
  - `signup.tsx`: The signup page where new users can create an account.

- **Services**:
  - `executeAuthAction.ts`: Contains the business logic for performing authentication operations, such as login and signup, using Firebase Authentication.

## How to Use
1. **Login**:
   - Navigate to the `/sign-in` route.
   - Enter your credentials in the provided form.
   - For testing purposes, you can use the following test account:
     - **Email**: `test@test.com`
     - **Password**: `Test1234`

2. **Signup**:
   - Navigate to the `/sign-up` route.
   - Fill in the required fields (e.g., username, email, password) to create a new account.

3. **Logout**:
   - The logout functionality can be triggered from within the application (e.g., via a logout button), which calls the `logout` function from `authStore`.

## Dependencies
The auth feature relies on the following external services and libraries:
- **Firebase Authentication**: Used for managing user authentication, including login, signup, and session management.

## Shared Resources
- **`authStore.ts`**: Located in the `shared` directory, this Zustand store manages the authentication state, including the current user, loading status, and error messages. It was moved to `shared` because it is used across multiple features to access and manage user authentication data.