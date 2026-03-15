# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Todo Server API

A Node.js Express server built with TypeScript for managing todo tasks.

## Installation

```bash
npm install
```

## Getting Started

### Start the Development Server

```bash
npm start
```

The server will start with nodemon for automatic reloading during development.

## Project Structure

```
src/
├── index.ts              # Main server entry point
├── controllers/
│   └── todo.controllers.ts    # Todo business logic
├── models/
│   └── todo.model.ts          # Todo data models
└── routes/
    └── todo.routes.ts         # Todo API routes
```

## API Endpoints

### Todo Routes

All endpoints are prefixed with `/api/todos`

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Development**: Nodemon for auto-reload
- **CORS**: Enabled for cross-origin requests

## Scripts

- `npm start` - Start the development server with nodemon
- `npm test` - Run tests (currently not configured)

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Development

The server is configured with TypeScript and Nodemon for a smooth development experience. Changes to any TypeScript files will automatically reload the server.
