import axios from "axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("https://project-deshboard.onrender.com/api/auth/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post("https://project-deshboard.onrender.com/api/auth/register", userData);
  return data;
};