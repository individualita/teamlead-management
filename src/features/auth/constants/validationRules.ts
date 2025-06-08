export const VALIDATION_RULES = {
    USERNAME: {
        required: true,
        minLength: { value: 3, message: "Min 3 characters" }
    },
    EMAIL: {
        required: { value: true, message: 'Email is required' }
    },
    PASSWORD: {
        required: true,
        minLength: { value: 5, message: "Min 5 characters" }
    }
} as const;