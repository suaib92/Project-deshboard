import React, { useState } from "react";
import { createProject } from "../api/projectApi";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { title, description };
      await createProject(projectData);
      navigate("/project-page"); // Redirect to the projects page after creating a project
    } catch (err) {
      setError(err.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Project</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-6 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-lg mb-2">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
            placeholder="Enter project title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-lg mb-2">
            Project Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
            placeholder="Describe your project"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
