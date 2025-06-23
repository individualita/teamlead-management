# CSS Architecture Guide

## 📁 Style Structure

The project uses a **Feature-based architecture** with clear separation of responsibilities between style layers and **custom CSS layers**.

```
src/
├── app/styles/              # Global system styles
│   ├── _base.css           # HTML tags, reset, global styles
│   ├── _vars.css           # CSS variables for the entire app
│   ├── _utilities.css      # Utility classes (@layer utilities)
│   └── main.css            # Main file importing all styles
├── shared/styles/           # Reusable components
│   └── shared.css          # Components used in 2+ features
└── features/[name]/styles/  # Styles for a specific feature
    └── [name].css          # Styles only for this feature
```


## 📋 File Descriptions

### `src/app/styles/`

| File | Purpose | CSS Layer | Examples |
|------|---------|-----------|----------|
| **`_base.css`** | Global HTML tag styles, reset | `@layer base` | `html`, `body`, `*` selectors |
| **`_vars.css`** | CSS variables for the whole app | No layer | `--color-base`, `--font-family-main` |
| **`_utilities.css`** | Utility classes | `@layer utilities` | `.hover-fade`, `.text-balance` |
| **`main.css`** | Main file importing all others | Declares layers | Only `@import` and `@layer` |

### `src/shared/styles/`

| File | Purpose | CSS Layer | Examples |
|------|---------|-----------|----------|
| **`shared.css`** | Reusable components | `@layer shared` | `.btn-primary`, `.card`, `.modal` |

### `src/features/[name]/styles/`

| File | Purpose | CSS Layer | Examples |
|------|---------|-----------|----------|  
| **`[name].css`** | Styles for a specific feature | `@layer features` | `.auth-form`, `.profile-card` |

## 🎨 CSS Layers Architecture

```css
@import "./_vars.css";
@import "./_base.css"; 
@import "./_utilities.css";
@import "../../shared/styles/shared.css";
@import "../../features/auth/styles/auth.css";
/* other features */
```



## 🛠️ Style Writing Rules

### 1. Priority of Use

```jsx
// ✅ Priority 1: Tailwind classes (95% of cases)
<button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">

// ✅ Priority 2: Custom classes for repeating patterns  
<button className="btn-primary">

// ❌ Avoid: inline styles
<button style={{backgroundColor: 'blue'}}>
```

### 2. Repetition Rule in a Feature

```jsx
// In a feature component:

// ❌ If a style repeats 2+ times – DO NOT duplicate
<input className="w-full px-3 py-2 border border-gray-300 rounded-md" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md" />

// ✅ Move to features/auth/styles/auth.css
<input className="auth-input" />
<input className="auth-input" />

// ✅ If the style is unique – keep Tailwind
<input className="w-full px-3 py-2 border border-red-500 rounded-md" /> // only this one is red
```

### 3. Using @layer with Custom Names

```css
/* In _base.css */
@layer base {
    html {
        scroll-behavior: smooth;
    }

    body {
        color: var(--color-base);
        font-family: var(--font-family-main);
    }
}

/* In shared.css */
@layer shared {
    .btn-primary {
        @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg;
    }
}

/* In features/auth/styles/auth.css */
@layer features {
    .auth-form {
        @apply max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg;
    }

    .auth-input {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500;
    }
}

/* In _utilities.css */
@layer utilities {
    .hover-fade {
        @apply hover:opacity-90 duration-300 ease-in-out transition-opacity;
    }
}
```

### 4. Class Naming

```css
/* ✅ For shared components */
.btn-primary { }
.card-default { }
.modal-overlay { }

/* ✅ For features – use a prefix */
.auth-form { }
.profile-avatar { }
.dashboard-widget { }

/* ❌ Avoid generic names without prefix in features */
.form { } /* bad */
.button { } /* bad */
```
