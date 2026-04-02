# Task Management System

A Full-Stack Task Management System built using Domain-Driven Design (Clean Architecture) principles and modern React conventions.

## Architecture

- **Backend**: Node.js, Express, TypeScript. Adheres to Clean Architecture and SOLID principles. The system uses an in-memory repository to store tasks.
  - Domain Layer: Contains purely business rules and the `Task` entity.
  - Infrastructure Layer: Contains the `InMemoryTaskRepository`.
  - Application Layer: Contains the `TaskService` orchestration.
  - Presentation Layer: Express controllers, Zod validation, and Global Error handlers.
- **Frontend**: React, TypeScript, Vite. Features a premium glassmorphic dark theme using SCSS Modules.
  - Connected endpoints using Axios.
  - Modern React Hooks for state management.
  - Beautiful responsive UI with Lucide-React icons.

## Prerequisites

- Node.js >= 18
- npm

## Installation

1. Navigate to the `backend` and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Navigate to the `frontend` and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Project

Open two terminal windows to run both servers concurrently.

**Backend Server (Runs on port 3000):**
```bash
cd backend
npm run dev
```

*Note: The backend automatically seeds initial test cases, ensuring 3 tasks are created, 1 is updated, 1 is completed, and 1 is deleted on startup.*

**Frontend Application (Runs on Vite port, usually 5173):**
```bash
cd frontend
npm run dev
```

Open your browser to the local URL provided by the Vite server to interact with the Task Management Dashboard.

## Available Scripts

### Backend (`/backend`)
- `npm run start` - Run the compiled output
- `npm run dev` - Run using nodemon + ts-node for development
- `npm run build` - Compile TypeScript to JavaScript

### Frontend (`/frontend`)
- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
