import React from "react";
import Header from "../components/Header";
import TaskStatusCards from "../components/TaskStatusCard";
import RecentlyAddedTasks from "../components/RecentlyAddedTask";

const Dashboard = () => {
  const token = localStorage.getItem("token");
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
    </div>
  );
};

export default Dashboard;
