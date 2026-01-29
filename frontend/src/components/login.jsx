import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Clear old errors
  

    const res = await API.post("/login", { email, password });

    if (res.data && res.data.token) {
      // 1. Save to storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);

      // 2. Update App.jsx state
      setToken(res.data); 

      // 3. Go to dashboard
      navigate("/");
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data);
    alert(err.response?.data?.message || "Invalid Email or Password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Welcome Back</h2>
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-xl dark:bg-gray-700 dark:text-white" 
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl dark:bg-gray-700 dark:text-white" 
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
          Login
        </button>
        <p className="mt-4 text-center dark:text-gray-300">
          New here? <Link to="/signup" className="text-blue-500 font-semibold">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;