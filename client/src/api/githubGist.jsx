import axios from "axios";

export const exportGist = async (title, todos) => {
  try {
    // Retrieve the JWT token from localStorage or wherever you're storing it
    const token = localStorage.getItem('token'); // Adjust based on your storage method

    if (!token) {
      throw new Error("No token found, please log in.");
    }

    // Send the token as part of the Authorization header
    const response = await axios.post("https://project-deshboard.onrender.com/api/gists/export", {
      title,
      todos,
    }, {
      headers: {
        Authorization: `Bearer ${token}`  // Include the token in the header
      }
    });

    console.log("Gist exported successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error exporting Gist:", error.response?.data || error.message);
    throw error;
  }
};
