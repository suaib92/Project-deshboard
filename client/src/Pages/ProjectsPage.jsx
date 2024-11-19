import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";
import { AuthContext } from "../context/AuthContext"; 

const ProjectsPage = () => {
  const { user, logout } = useContext(AuthContext); 
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        return;
      }
      try {
        const data = await getProjects(user.token); 
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  const handleCreateProjectClick = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    navigate("/create-project");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 min-h-screen text-white">
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Projects</h1>
          {user && (
            <button
              onClick={handleCreateProjectClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
            >
              Create New Project
            </button>
          )}
        </header>

        <section>
          {user ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full text-center text-gray-300">
                  No projects available. Create one now!
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              )}
            </div>
          ) : (
            <div className="text-center text-xl text-gray-300">
              Please log in to view your projects.
            </div>
          )}
        </section>
      </div>

      
    </div>
  );
};

export default ProjectsPage;
