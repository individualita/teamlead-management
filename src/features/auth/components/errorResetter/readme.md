## ErrorResetter

### What It Does
`ErrorResetter` resets authentication errors (`errorMessage` in `authStore`) when navigating between routes.

### Why It’s Needed
To ensure authentication errors (e.g., "Invalid password") from `SignIn` or `SignUp` don’t persist when navigating to another page, such as `/sign-up` or `/home`.

### Usage
Place `ErrorResetter` in the root `App` component to reset errors on any route change:

```javascript
import ErrorResetter from './features/auth/components/ErrorResetter';

const App = () => (
  <div className="app">
    <ErrorResetter />
    <Container>
      <Suspense fallback={<LoadingCircle />}>
        <Routes>
          {/* Routes */}
        </Routes>
      </Suspense>
    </Container>
  </div>
);
```

### Notes
- Uses `useEffect` with `useLocation` to reset `errorMessage` on `pathname` changes.
- Must be in `App` (not `SignIn` or route-specific wrappers) to work reliably across all routes.
- Lightweight and doesn’t impact performance, as it renders `null`.

### Why Not in `SignIn` or Route Wrappers?
I tried resetting errors in `SignIn` (via `useEffect` or cleanup) and in a route wrapper (`AuthPagesWrapper`), but these approaches reset errors instantly due to component lifecycle issues (e.g., unmounting/remounting from `Suspense` or `PublicRoute` re-renders). Placing it in `App` ensures global and predictable behavior.


### Что делает
`ErrorResetter` сбрасывает ошибки аутентификации (`errorMessage` в `authStore`) при переходе между маршрутами.

### Зачем нужен
Чтобы ошибки аутентификации (например, "Неверный пароль") из `SignIn` или `SignUp` не оставались при переходе на другую страницу, например, `/sign-up` или `/home`.

### Использование
Разместите `ErrorResetter` в корневом компоненте `App`, чтобы сбрасывать ошибки при любом изменении маршрута:

```javascript
import ErrorResetter from './features/auth/components/ErrorResetter';

const App = () => (
  <div className="app">
    <ErrorResetter />
    <Container>
      <Suspense fallback={<LoadingCircle />}>
        <Routes>
          {/* Маршруты */}
        </Routes>
      </Suspense>
    </Container>
  </div>
);
```

### Примечания
- Использует `useEffect` с `useLocation` для сброса `errorMessage` при изменении `pathname`.
- Должен находиться в `App` (не в `SignIn` или обёртках маршрутов) для надёжной работы на всех маршрутах.
- Лёгкий и не влияет на производительность, так как возвращает `null`.

### Почему не в `SignIn` или обёртках маршрутов?
Я пробовал сбрасывать ошибки в `SignIn` (через `useEffect` или функцию очистки) и в обёртке маршрутов (`AuthPagesWrapper`), но эти подходы сбрасывали ошибки мгновенно из-за проблем с жизненным циклом компонентов (например, размонтирование/монтирование из-за `Suspense` или перерендера `PublicRoute`). Размещение в `App` обеспечивает глобальное и предсказуемое поведение.