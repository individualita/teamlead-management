# Teamlead Management

A modern React application built with TypeScript, featuring employee management, task tracking (Kanban board), real-time chat, and user authentication.

## 🌐 Live Demo

**[View Live Application](https://teamlead-management.vercel.app)**

## ✨ Features

- 🔐 **Authentication** - Sign in/up with Firebase Auth
- 👥 **Employee Management** - CRUD operations with search
- 🔍 **Global Employee Search** - Search employees across the entire application with instant access
- 📋 **Kanban Board** - Drag & drop task management with status tracking
- 📑 **Tab System** - Multi-tab interface for efficient navigation and employee profile management
- 💬 **Real-time Chat** - Instant messaging between users
- 👤 **User Profiles** - Customizable user profiles with photo upload
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Core
- **Frontend**: React, TypeScript, Vite
- **Routing**: React Router
- **State Management**: Zustand, React Query
- **Backend**: Firebase (Auth, Firestore, Storage)

### UI & Styling
- **Styling**: Tailwind CSS, Material-UI 
- **Animations**: React Transition Group
- **Notifications**: React Toastify
- **Drag & Drop**: @dnd-kit

### Utilities
- **Form Validation**: React Hook Form + Zod
- **Date Handling**: Day.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/individualita/teamlead-management
   cd teamlead-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase configuration in `.env.local`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

> 💡 **Tip**: Check out the [live demo](https://teamlead-management.vercel.app) to see the app in action before setting up locally!

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - Project structure and architectural principles
- **[Styles](docs/STYLES.md)** - CSS architecture and styling guidelines

## 📁 Project Structure

```
src/
├── app/          # Global app setup, routing, providers
├── shared/       # Reusable components, hooks, utilities
└── features/     # Feature-based modules
    ├── auth/     # Authentication
    ├── chat/     # Real-time messaging
    ├── employees/# Employee management
    ├── home/     # Kanban board
    └── profile/  # User profiles
```

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🎨 Styling

This project uses a hybrid approach combining multiple styling solutions:
- **Tailwind CSS** for 95% of styling needs  
- **Material-UI** for complex components (date pickers, advanced inputs)
- **Custom CSS** with CSS Layers for reusable patterns
- **React Transition Group** for smooth animations

See [docs/STYLES.md](docs/STYLES.md) for complete styling guidelines.

## 🔥 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the [architecture guidelines](docs/ARCHITECTURE.md)
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation in the `docs/` folder
- Review the architecture and styling guides