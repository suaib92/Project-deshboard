import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold">
        <Link to="/project-page">
          <span className="text-white bg-transparent border-2 border-white px-4 py-2 rounded-full hover:bg-white hover:text-custom-blue transition">
            Todo
          </span>
        </Link>
      </h1>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {user ? (
          <>
            {/* Displaying User Avatar or Initials */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-center text-sm flex items-center justify-center">
                {user.name ? user.name[0] : "U"}
              </div>
              <span className="text-lg font-semibold">{user.name}</span>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login and Signup Links */}
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg font-semibold hover:text-gray-200 transition"
            >
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
