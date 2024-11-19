
import React, { useState, useEffect } from "react";

const TodoForm = ({ onSubmit, todoToEdit, onUpdate }) => {
  const [description, setDescription] = useState("");


  useEffect(() => {
    if (todoToEdit) {
      setDescription(todoToEdit.description);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim()) {
      if (todoToEdit) {
        onUpdate(todoToEdit._id, { description });
      } else {
        onSubmit({ description });
      }
      setDescription(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-3 gap-2">
      <input
        type="text"
        placeholder="Add or edit a todo..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {todoToEdit ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;