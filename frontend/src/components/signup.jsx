import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed from /auth/signup to /signup to match your backend
      await API.post("/signup", formData);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      // Your backend returns { error: "..." }
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Join PriceWatch</h2>
        <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded-xl dark:bg-gray-700 dark:text-white" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-xl dark:bg-gray-700 dark:text-white" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl dark:bg-gray-700 dark:text-white" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg">
          Sign Up
        </button>
        <p className="mt-4 text-center dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;