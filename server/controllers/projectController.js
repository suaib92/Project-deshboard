import Project from "../models/projectModel.js";

// Helper function to handle errors
const handleError = (res, error, statusCode = 400) => {
  console.error("Error:", error.message);
  res.status(statusCode).json({ message: error.message });
};

// Create a new project
export const createProject = async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const project = new Project({ title, user: req.user._id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all projects for the logged-in user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    handleError(res, error);
  }
};

// Get details of a specific project
export const getProjectDetails = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    handleError(res, error);
  }
};

// Update a project's title
export const updateProjectTitle = async (req, res) => {
  const { projectId } = req.params;
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { title },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project title updated successfully", project });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Create a new todo in a project
export const createTodo = async (req, res) => {
  const { projectId } = req.params;
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newTodo = {
      description,
      status: "pending",
      createdAt: new Date(),
    };

    project.todos.push(newTodo);
    await project.save();

    res.status(201).json(newTodo);
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing todo
export const updateTodo = async (req, res) => {
  const { projectId, todoId } = req.params;
  const { description, status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const todo = project.todos.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (description) todo.description = description;
    if (status) todo.status = status;

    await project.save();

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a todo from a project
export const deleteTodo = async (req, res) => {
  const { projectId, todoId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const todoIndex = project.todos.findIndex((todo) => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    project.todos.splice(todoIndex, 1);
    await project.save();

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
