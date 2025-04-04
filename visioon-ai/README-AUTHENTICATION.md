# Authentication with Clerk in Visioon AI

This project uses [Clerk](https://clerk.com/) for authentication and user management.

## Setup Instructions

1. **Create a Clerk Account**: Sign up at [https://clerk.com](https://clerk.com)

2. **Create a New Application**: From your Clerk dashboard, create a new application

3. **Get API Keys**: After creating your application, go to the API Keys section in your Clerk dashboard

4. **Update Environment Variables**: Open the `.env.local` file in the root of the project and update the following variables with your Clerk API keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Replace `your_clerk_publishable_key` and `your_clerk_secret_key` with the actual keys from your Clerk dashboard.

5. **Start the Development Server**: Run the following command:

```bash
npm run dev
```

## Authentication Flow

- The application uses Clerk's components for sign-in and sign-up
- Routes are protected by Clerk's `authMiddleware`
- Public routes are configured in the `middleware.ts` file
- The `UserButton` component is used for user profile and sign-out functionality

## Authentication Components

The following Clerk components are used in the application:

- `<SignIn />`: For the login page
- `<SignUp />`: For the sign-up page
- `<UserButton />`: For user profile and sign-out
- `<SignedIn>` and `<SignedOut>`: For conditional rendering based on authentication status

## Protected Routes

All routes are protected by default except the following:

- `/`: The home page
- `/login`: The login page
- `/signup`: The sign-up page

## Customization

You can customize the appearance of Clerk components using the `appearance` prop. See the `UserButton.tsx` file for an example. 