import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectDetailPage from "./Pages/ProjectDetailPage";
import Header from "./Components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProjectForm from "./Components/ProjectForm";


const App = () => {
  return (
    <AuthProvider>
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/project-page" element={<ProjectsPage />} />
            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
