import axios from "axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("http://localhost:5000/api/auth/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post("http://localhost:5000/api/auth/register", userData);
  return data;
};