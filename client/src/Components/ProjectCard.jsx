import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const completedTodos = project.todos.filter((todo) => todo.status === "completed").length;
  const totalTodos = project.todos.length;
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg space-y-4 hover:shadow-xl transition duration-300 ease-in-out">
      {/* Project Title */}
      <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>

      {/* Project Description */}
      <p className="text-gray-600">{project.description}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Progress: {completedTodos}/{totalTodos} completed
      </p>

      {/* Project Creation Date */}
      <p className="text-sm text-gray-400">Created: {formattedDate}</p>

      {/* View Project Button */}
      <Link
        to={`/projects/${project._id}`}
        className="text-blue-600 font-medium hover:underline transition duration-200 ease-in-out"
      >
        View Project
      </Link>
    </div>
  );
};

export default ProjectCard;
