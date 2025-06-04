import React, { useState } from "react";
import TaskDetailsPopup from "./taskDetailPopUp";

const RecentlyAddedTasks = ({ tasks }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleUpdate = (updatedTask) => {
    // Call your update API here
    console.log("Updating:", updatedTask);
    setShowPopup(false);
  };

  const handleDelete = (taskId) => {
    // Call your delete API here
    console.log("Deleting task ID:", taskId);
    setShowPopup(false);
  };
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="bg-[#1E232A] px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Recently Added</h2>
          <button className="bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200">
            All Tasks
          </button>
        </div>
        <div className="flex space-x-4 no-scrollbar overflow-x-auto pb-4 ">
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => setShowPopup(true)}
              className={`min-w-[300px] rounded-lg shadow-md p-4 text-white ${
                task.priority === "low"
                  ? "bg-green-400"
                  : task.priority === "high"
                  ? "bg-red-400"
                  : "bg-blue-400"
              }`}
            >
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="bg-black/30 px-2 py-1 rounded">
                  {task.priority}
                </span>
                <span>
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{task.title}</h3>
              <p className="text-sm mb-2">{task.description}</p>
              <div className="text-xs mt-2 space-y-1">
                <p>
                  <span className="font-semibold"> {task.status}</span>
                </p>
                <p>
                  <span className="font-semibold">Created By:</span>{" "}
                  {task.createdBy.name} {task.createdBy.email}
                </p>
                {role !== "user" && (
                  <p>
                    <span className="font-semibold">Assigned To:</span>{" "}
                    {task.assignedTo.name} {task.assignedTo.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <TaskDetailsPopup
          task={tasks}
          onClose={() => setShowPopup(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default RecentlyAddedTasks;
