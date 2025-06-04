import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../../helper"; // Assuming you created the utility
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toastError("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.message === "Invalid Email or Password") {
        toastError(data.message || "login failed");
        return;
      }

      const { name, role, token, _id } = data.user;

      if (!res.ok) {
        toastError(data.message || "login failed");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("loginUser", name);
      localStorage.setItem("role", role);
      localStorage.setItem("id", _id);

      toastSuccess("login successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      setFormData({ email: "", password: "" });
    } catch (error) {
      toastError("Something went wrong. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-[#1E232A]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 rounded-lg shadow-lg bg-[#2E333A]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F2F2F2]">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          className="w-full p-2 mb-4 rounded outline-none bg-[#1E232A] text-[#f2f2f2]"
          // required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          className="w-full p-2 mb-4 rounded outline-none bg-[#1E232A] text-[#f2f2f2]"
          // required
        />
        <button
          type="submit"
          className="w-full p-2 rounded font-bold bg-[#0ECAD4] text-[#f2f2f2]"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        className="text-center mt-4 text-[#F2F2F2] underline"
        onClick={() => navigate("/register")}
      >
        Don't have an account? Sign up
      </button>

      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
};

export default SignUp;
