# Project Dashboard with Todos Management

## Overview

This project is a full-stack application for managing projects and associated tasks (todos). It includes user authentication, project creation, task management, and real-time updates. The application is designed to provide a smooth and responsive user experience.

## Features

- **Authentication:**
  - User login and registration with JWT-based authentication.
  - Persistent user session using `localStorage`.

- **Project Management:**
  - Create, view, and manage projects.
  - Update project titles and descriptions.

- **Todos Management:**
  - Add, edit, and delete todos for each project.
  - Track project progress based on completed todos.

- **API Integrations:**
  - Export project todos to a Gist on an external service.

- **Responsive Design:**
  - Optimized for both desktop and mobile devices using Tailwind CSS.

---

## Tech Stack

### Frontend:
- React.js
- React Router for navigation
- Tailwind CSS for styling

### Backend:
- Node.js with Express.js
- Axios for HTTP requests

### Database:
- MongoDB (assumed for storing project and user data)

---

## Installation and Setup

### Prerequisites:
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or on a cloud platform.

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/project-dashboard.git
   cd project-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   REACT_APP_API_BASE_URL=https://project-deshboard.onrender.com/api
   ```

4. **Run the application:**
   - **Frontend:** Start the React development server.
     ```bash
     npm start
     ```
   - **Backend:** Ensure the backend API is running.

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### Authentication:
- **POST** `/api/auth/login`: User login.
- **POST** `/api/auth/register`: User registration.

### Projects:
- **GET** `/api/projects`: Fetch all projects.
- **POST** `/api/projects`: Create a new project.
- **PUT** `/api/projects/:projectId/title`: Update a project title.

### Todos:
- **POST** `/api/projects/:projectId/todos`: Add a todo.
- **PUT** `/api/projects/:projectId/todos/:todoId`: Update a todo.
- **DELETE** `/api/projects/:projectId/todos/:todoId`: Delete a todo.

### Gist Export:
- **POST** `/api/gists/export`: Export todos as a Gist.

---

## Folder Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectForm.jsx
│   └── TodoForm.jsx
├── context/
│   └── AuthContext.js
├── api/
│   ├── authApi.js
│   └── projectApi.js
└── App.js
```

---

## Future Enhancements

- Add due dates and priority levels to todos.
- Enable filtering and searching of projects.
- Add email notifications for project updates.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributions

Contributions are welcome! Feel free to submit a pull request or raise an issue.


