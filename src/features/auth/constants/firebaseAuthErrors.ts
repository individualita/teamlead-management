export const FIREBASE_AUTH_ERRORS = new Map<string, string>([
    ["auth/claims-too-large", "The custom claims payload exceeds the maximum allowed size of 1000 bytes."],
    ["auth/email-already-in-use", "The provided email is already in use by another user."],
    ["auth/id-token-expired", "The provided ID token has expired. Please sign in again."],
    ["auth/id-token-revoked", "The Firebase ID token has been revoked. Please sign in again."],
    ["auth/insufficient-permission", "The credential used lacks the required permissions to perform this operation."],
    ["auth/internal-error", "An internal server error occurred. Please try again later."],
    ["auth/invalid-argument", "An invalid argument was provided."],
    ["auth/invalid-claims", "Invalid custom claims attributes provided."],
    ["auth/invalid-continue-uri", "The provided continue URL is invalid."],
    ["auth/invalid-creation-time", "The provided creation time is not a valid UTC date string."],
    ["auth/invalid-credential", "The provided credential is invalid."],
    ["auth/invalid-disabled-field", "The disabled field must be a boolean value."],
    ["auth/invalid-display-name", "The provided display name is invalid."],
    ["auth/invalid-dynamic-link-domain", "The provided dynamic link domain is not configured or authorized."],
    ["auth/invalid-email", "The provided email is invalid."],
    ["auth/invalid-email-verified", "The email verification field must be a boolean."],
    ["auth/invalid-id-token", "The provided ID token is invalid."],
    ["auth/invalid-last-sign-in-time", "The last sign-in time must be a valid UTC date string."],
    ["auth/invalid-page-token", "The provided page token is invalid."],
    ["auth/invalid-password", "The password must be at least 6 characters long."],
    ["auth/invalid-phone-number", "The provided phone number is invalid."],
    ["auth/invalid-photo-url", "The provided photo URL is invalid."],
    ["auth/invalid-provider-data", "The provider data must be a valid array of UserInfo objects."],
    ["auth/invalid-provider-id", "The provider ID must be a valid supported provider identifier."],
    ["auth/invalid-session-cookie-duration", "The session cookie duration must be between 5 minutes and 2 weeks."],
    ["auth/invalid-uid", "The provided UID must be a non-empty string of at most 128 characters."],
    ["auth/maximum-user-count-exceeded", "The maximum allowed number of users has been exceeded."],
    ["auth/missing-android-pkg-name", "An Android package name must be provided."],
    ["auth/missing-continue-uri", "A valid continue URL must be provided."],
    ["auth/missing-ios-bundle-id", "A bundle ID must be provided for iOS requests."],
    ["auth/missing-uid", "A UID is required for the current operation."],
    ["auth/operation-not-allowed", "This authentication method is disabled."],
    ["auth/phone-number-already-exists", "The provided phone number is already in use."],
    ["auth/project-not-found", "No Firebase project found for the provided credentials."],
    ["auth/reserved-claims", "One or more custom user claims are reserved."],
    ["auth/session-cookie-expired", "The session cookie has expired. Please sign in again."],
    ["auth/session-cookie-revoked", "The session cookie has been revoked."],
    ["auth/too-many-requests", "Too many requests. Please try again later."],
    ["auth/uid-already-exists", "The provided UID is already in use by another user."],
    ["auth/unauthorized-continue-uri", "The domain of the continue URL is not whitelisted."],
    ["auth/user-not-found", "No user record found for the provided identifier."],
    [ "auth/weak-password", "Password should be at least 6 characters"]
    
]);




