import express from 'express';
import {
  createProject,
  getProjects,
  getProjectDetails,
  updateProjectTitle,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/projectController.js'; // Import project controller functions
import { protect } from '../middleware/authMiddleware.js'; // Assuming protect is an authentication middleware

const router = express.Router();

// Route to create a new project
router.route('/')
  .post(protect, createProject); // Ensure only authenticated users can create a project

// Route to get all projects of the authenticated user
router.route('/')
  .get(protect, getProjects); // Ensure only authenticated users can view their projects

// Route to get details of a specific project by ID
router.route('/:projectId')
  .get(protect, getProjectDetails); // Ensure only authenticated users can view a specific project

// Route to update the title of a project
router.route('/:projectId')
  .put(protect, updateProjectTitle); // Ensure only authenticated users can update project details

// Routes to handle todos within a project
router.route('/:projectId/todos')
  .post(protect, createTodo); // Add a todo to a project

router.route('/:projectId/todos/:todoId')
  .put(protect, updateTodo)   // Update a specific todo in a project
  .delete(protect, deleteTodo); // Delete a specific todo from a project

export default router;
