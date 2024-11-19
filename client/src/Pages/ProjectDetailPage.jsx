import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProjectDetails,
  createTodo,
  updateTodo,
  deleteTodo,
  updateProjectTitle,
} from "../api/projectApi";
import { exportGist } from "../api/githubGist";
import TodoForm from "../components/TodoForm";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [gistData, setGistData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectDetails(projectId);
        setProject(data);
        setNewTitle(data.title);
        setLoading(false);
      } catch (err) {
        setError("Failed to load project details.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(projectId, newTodo);
      setProject((prevProject) => ({
        ...prevProject,
        todos: [...prevProject.todos, createdTodo],
      }));
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const updatedTodo = await updateTodo(projectId, todoId, updatedData);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.map((todo) =>
          todo._id === todoId ? updatedTodo : todo
        ),
      }));
      setTodoToEdit(null);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(projectId, todoId);
      setProject((prevProject) => ({
        ...prevProject,
        todos: prevProject.todos.filter((todo) => todo._id !== todoId),
      }));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = async () => {
    try {
      if (!newTitle || newTitle.trim() === "") {
        throw new Error("Title cannot be empty");
      }

      const updatedProject = await updateProjectTitle(projectId, newTitle);
      setProject((prev) => ({
        ...prev,
        title: updatedProject.project.title,
      }));
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to update project title:", error);
      alert("Failed to update project title. Please try again.");
    }
  };

  const handleExportGist = async () => {
    setIsExporting(true);
    try {
      if (!project || !project.title || !Array.isArray(project.todos)) {
        alert("Project data is incomplete. Cannot export Gist.");
        setIsExporting(false);
        return;
      }
      if (project.todos.length === 0) {
        alert("No todos available to export.");
        setIsExporting(false);
        return;
      }
      const { url } = await exportGist(project.title, project.todos);
      setGistData({ url });
      setExportModal(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to export Gist. Please try again.";
      alert(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  const closeModal = () => {
    setExportModal(false);
    setGistData(null);
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <>
      <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-200 to-indigo-400 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <Link to="/project-page">
            <IoArrowBackOutline className="text-4xl text-gray-700 hover:text-gray-900 transition" />
          </Link>

          <div className="flex items-center space-x-4">
            {isEditingTitle ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  className="p-3 w-72 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSaveTitle}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 className="text-4xl font-bold text-white">{project.title}</h1>
            )}
            <button
              onClick={handleEditTitle}
              className="ml-4 text-indigo-600 hover:text-indigo-800 transition"
            >
              <MdOutlineModeEdit size={28} />
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <button
            onClick={handleExportGist}
            disabled={isExporting}
            className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition ${
              isExporting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isExporting ? "Exporting..." : "Export to Gist"}
          </button>
        </div>

        <TodoForm
          onSubmit={handleAddTodo}
          todoToEdit={todoToEdit}
          onUpdate={handleUpdateTodo}
        />

        <h2 className="text-3xl font-semibold text-white mt-8">Todos</h2>
        <div className="space-y-4 mt-4">
          {project.todos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 bg-white rounded-lg shadow-xl flex justify-between items-center hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={todo.status === "completed"}
                  onChange={() =>
                    handleUpdateTodo(todo._id, {
                      status: todo.status === "completed" ? "pending" : "completed",
                    })
                  }
                  className="cursor-pointer"
                />
                <span
                  className={`text-lg font-medium ${
                    todo.status === "completed" ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {todo.description}
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setTodoToEdit(todo)}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  <MdOutlineModeEdit size={22} />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <MdOutlineDeleteOutline size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center w-96">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition"
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Export Successful!</h3>
            <p className="text-gray-500 mb-6">Your project is now available on GitHub Gist.</p>
            <a
              href={gistData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              View Gist
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetailPage;
