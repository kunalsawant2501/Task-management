import React from "react";

const tasks = [
  {
    id: 1,
    priority: "High",
    category: "Design",
    title: "Update website",
    description: "Revamp the homepage design",
    createdAt: "2024-10-10",
    dueDate: "2024-10-12",
    createdBy: "Alice",
    assignedTo: "Bob",
    color: "bg-red-400",
  },
  {
    id: 2,
    priority: "Medium",
    category: "Meeting",
    title: "Client meeting",
    description: "Discuss project requirements",
    createdAt: "2024-10-08",
    dueDate: "2024-10-10",
    createdBy: "Krishna",
    assignedTo: "Team",
    color: "bg-blue-400",
  },
  {
    id: 3,
    priority: "High",
    category: "Development",
    title: "Fix bugs",
    description: "Resolve bugs reported in issue tracker",
    createdAt: "2024-10-12",
    dueDate: "2024-10-14",
    createdBy: "Sasha",
    assignedTo: "Dev Team",
    color: "bg-red-400",
  },
  {
    id: 4,
    priority: "Low",
    category: "Dev",
    title: "Nacho",
    description: "hello guys",
    createdAt: "2024-10-01",
    dueDate: "2024-10-15",
    createdBy: "Krishna",
    assignedTo: "Support",
    color: "bg-green-400",
  },
  {
    id: 5,
    priority: "Low",
    category: "Dev",
    title: "Nacho",
    description: "hello guys",
    createdAt: "2024-10-01",
    dueDate: "2024-10-15",
    createdBy: "Krishna",
    assignedTo: "Support",
    color: "bg-green-400",
  },
  {
    id: 6,
    priority: "Low",
    category: "Dev",
    title: "Nacho",
    description: "hello guys",
    createdAt: "2024-10-01",
    dueDate: "2024-10-15",
    createdBy: "Krishna",
    assignedTo: "Support",
    color: "bg-green-400",
  },
];

const RecentlyAddedTasks = () => {
  return (
    <div className="bg-[#1E232A] px-6 py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Recently Added</h2>
        <button className="bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200">
          All Tasks
        </button>
      </div>
      <div className="flex space-x-4 no-scrollbar overflow-x-auto pb-4 ">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`min-w-[300px] rounded-lg shadow-md p-4 text-white ${task.color}`}
          >
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="bg-black/30 px-2 py-1 rounded">
                {task.category}
              </span>
              <span>{task.dueDate}</span>
            </div>
            <h3 className="text-lg font-bold mb-1">{task.title}</h3>
            <p className="text-sm mb-2">{task.description}</p>
            <div className="text-xs mt-2 space-y-1">
              <p>
                <span className="font-semibold">Priority:</span> {task.priority}
              </p>
              <p>
                <span className="font-semibold">Created By:</span>{" "}
                {task.createdBy}
              </p>
              <p>
                <span className="font-semibold">Assigned To:</span>{" "}
                {task.assignedTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedTasks;
