import React from "react";
import Header from "../components/Header";
import TaskStatusCards from "../components/TaskStatusCard";
import RecentlyAddedTasks from "../components/RecentlyAddedTask";
import CreateTaskModal from "../components/CreateTaskModal";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const users = [
    { id: "1", name: "Krishna", email: "krishna@mail.com" },
    { id: "2", name: "Anita", email: "anita@mail.com" },
    // ...from API
  ];
  const userName = localStorage.getItem("loginUser");

  const taskStats = {
    total: 4,
    completed: 1,
    inProgress: 2,
    pending: 0,
  };
  return (
    <div className="min-h-screen w-full bg-[#1E232A]">
      <Header username={userName} />
      <TaskStatusCards tasks={taskStats} />
      <RecentlyAddedTasks />
      <CreateTaskModal users={users} />
    </div>
  );
};

export default Dashboard;
