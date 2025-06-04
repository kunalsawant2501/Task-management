import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskStatusCards from "../components/TaskStatusCard";
import RecentlyAddedTasks from "../components/RecentlyAddedTask";
import CreateTaskModal from "../components/CreateTaskModal";

const Dashboard = () => {
  const userName = localStorage.getItem("loginUser");
  const token = localStorage.getItem("token")
  const [tasks, setTasks] = useState([])
  const [pendingTask, setPendingTask] = useState(0)
  const [completedTask, setCompletedTask] = useState(0)
  const [inProgressTask, setInProgressTask] = useState(0)
  const [totalTask, setTotalTask] = useState(0)
  const [users, setUsers] = useState([]);
  

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toastError(data.message || "Create task failed");
        return;
      }
      const data = await res.json();
      setUsers(data.users)
    } catch (error) {
      toastError("Something went wrong. Please try again later.");
      console.error("Signup Error:", error);
    }
  }

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/task/getTasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toastError(data.message || "Server Error");
        return;
      }
      setTasks(data.tasks)
      setPendingTask(data.pending_tasks)
      setCompletedTask(data.completed_tasks)
      setInProgressTask(data.inprogress_tasks)
      setTotalTask(data.tasks.length)
    } catch (error) {
      toastError("Something went wrong. Please try again later.");
      console.error("Signup Error:", error);
    }
  }

  const createTask = async (data) => {
    const { title, description, status, priority, dueDate, reminderAt, assignedTo } = data
    if (!title || !description || !dueDate || !reminderAt || !assignedTo) {
      toastError("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status, priority, dueDate, reminderAt, assignedTo }),
      });

      const data = await res.json();
      if (!res.ok) {
        toastError(data.message || "Create task failed");
        return;
      }
      toastSuccess("Task created successfully!");
    } catch (error) {
      toastError("Something went wrong. Please try again later.");
      console.error("Signup Error:", error);
    }
  }
   
  useEffect(() => {
    getTasks();
  }, [])

  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className="min-h-screen w-full bg-[#1E232A]">
      <Header username={userName} />
      <TaskStatusCards totalTask={totalTask} completedTask={completedTask} pendingTask={pendingTask} inProgressTask={inProgressTask} />
      <RecentlyAddedTasks tasks={tasks}/>
      <CreateTaskModal users={users} createTask={createTask}/>
    </div>
  );
};

export default Dashboard;
