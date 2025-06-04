import React from "react";

const TaskStatusCards = ({ tasks }) => {
  const { total, completed, inProgress, pending } = tasks;

  const statusData = [
    { count: total, label: "Task", bg: "bg-blue-500", text: "text-white" },
    {
      count: completed,
      label: "Completed Task",
      bg: "bg-green-500",
      text: "text-white",
    },
    {
      count: inProgress,
      label: "In Progress Task",
      bg: "bg-yellow-400",
      text: "text-black",
    },
    {
      count: pending,
      label: "Pending Task",
      bg: "bg-red-400",
      text: "text-white",
    },
  ];

  return (
    <div className="bg-[#1E232A] py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statusData.map((status, index) => (
          <div
            key={index}
            className={`rounded-lg h-40 flex flex-col justify-center items-center ${status.bg} ${status.text} shadow-lg`}
          >
            <div className="text-3xl font-bold">{status.count}</div>
            <div className="text-sm font-semibold text-center">
              {status.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusCards;
