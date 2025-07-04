import React, { useState } from "react";

const CreateTaskModal = ({ users, createTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
    reminderAt: "",
    assignedTo: [],
  });

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createTask(formData);
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
      reminderAt: "",
      assignedTo: "",
    });
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6  bg-[#0ECAD4] text-[#F2F2F2] px-4 py-2 rounded-full shadow-lg font-semibold text-lg"
        onClick={() => setIsOpen(true)}
      >
        + Create Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0  bg-[#000000b4] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2E333A] p-6 rounded-lg w-full max-w-lg text-[#F2F2F2]">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={onChange}
                className="w-full p-2 rounded bg-[#1E232A] outline-none"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={onChange}
                className="w-full p-2 rounded bg-[#1E232A] outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="p-2 rounded bg-[#1E232A] w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={onChange}
                  className="p-2 rounded bg-[#1E232A] w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={onChange}
                  className="p-2 rounded bg-[#1E232A] w-full"
                />
                <input
                  type="datetime-local"
                  name="reminderAt"
                  value={formData.reminderAt}
                  onChange={onChange}
                  className="p-2 rounded bg-[#1E232A] w-full"
                />
              </div>

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: [e.target.value] })
                }
                className="p-2 rounded bg-[#1E232A] w-full"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#0ECAD4] text-[#F2F2F2]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
