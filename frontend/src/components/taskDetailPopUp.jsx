import React, { useState } from "react";

const TaskDetailsPopup = ({ task, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(formData);
  };

  const handleDelete = () => {
    onDelete(task._id); // Assuming _id is the identifier
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button onClick={onClose} className="text-gray-600 text-lg">
            ✖
          </button>
        </div>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="datetime-local"
          name="reminderAt"
          value={formData.reminderAt}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To (User ID)"
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPopup;
