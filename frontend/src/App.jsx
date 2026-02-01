import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast'; 
import toast from 'react-hot-toast'

import StatsSummary from "./components/statsSummary";
import Login from "./components/login"; 
import Signup from "./components/signup";
import AddProduct from "./components/addProductForm"; 
import PriceHistoryModal from "./components/dashboard/PriceHistoryModal";
import DeleteModal from "./components/dashboard/DeleteModal";
import ProductCard from "./components/dashboard/ProductCard";
import EmptyState from "./components/dashboard/EmptyState";
import LoadingSkeleton from "./components/dashboard/LoadingSkeleton";
import FirstItemCTA from "./components/dashboard/FirstItemCTA";
import API from "./api";
import axios from 'axios';

import { Line } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [loading, setLoading] = useState(true); 
  const [itemToDelete, setItemToDelete] = useState(null); 

  const checkAuth = () => {
    if (!token) {
      toast.error("Please login or signup to perform this action", {
        icon: '🚫',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: theme === 'dark' ? '#1f2937' : '#fff',
          color: theme === 'dark' ? '#fff' : '#1f2937',
          border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
        },
      });
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    setToken(null);
    setUserName("");
    setProducts([]);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    if (!token) return toast.error("Please login!");
    const previousProducts = [...products];
    setProducts((prev) => 
      prev.map((p) => (p._id === editingProduct._id ? { ...p, ...updatedProduct } : p))
    );
    setShowForm(false);
    setEditingProduct(null);
    try {
      await API.put(`/products/${editingProduct._id}`, updatedProduct);
      toast.success("Updated!");
    } catch (err) {
      setProducts(previousProducts);
      toast.error("Update failed. Reverting changes...");
    }
  };

  const handleDeleteProduct = (id) => {
    if (checkAuth()) {
      setItemToDelete(id);
    }
  };

  const executeDelete = async () => {
    const idToRemove = itemToDelete;
    setProducts((prev) => prev.filter((p) => p._id !== idToRemove));
    setItemToDelete(null);
    try {
      await API.delete(`/products/${idToRemove}`);
      toast.success("Product removed", { icon: '🗑️' });
    } catch (err) { 
      console.error("Delete failed:", err);
      toast.error("Could not delete from server. Refreshing...");
      fetchProducts(); 
    }
  };

  const handleAddProduct = async (product) => {
    if (!token) return toast.error("Please login!");
    const tempId = Date.now().toString();
    const optimisticProduct = { 
      ...product, 
      _id: tempId, 
      change: 0, 
      history: [],
      currentPrice: Number(product.currentPrice)
    };
    setProducts([...products, optimisticProduct]);
    setShowForm(false);
    try {
      const res = await API.post("/products", product);
      setProducts(prev => prev.map(p => p._id === tempId ? res.data : p));
      toast.success("Tracking started!");
    } catch (err) {
      setProducts(prev => prev.filter(p => p._id !== tempId));
      toast.error("Failed to add product.");
    }
  };

  const handleEditProduct = (product) => {
    if (checkAuth()) {
      setEditingProduct(product);
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const fetchProducts = async () => {
    setLoading(true);
    if (!token) {
      setTimeout(() => {
        setProducts([]);
        setLoading(false);
      }, 400);
      return;
    }
    try {
      const res = await axios.get("https://pricewatch-4n3q.onrender.com/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const totalChange = products.reduce((acc, p) => acc + (Number(p.change) || 0), 0);
  const avgChange = products.length ? Math.round((totalChange / products.length) * 10) / 10 : 0;

  const Dashboard = () => {
    const navigate = useNavigate();
    return (
      <div className="min-h-screen bg-[#F0F4F8] dark:bg-gray-900 transition-colors duration-300">
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onAddProductClick={() => { if (checkAuth()) setShowForm(true); }}
          onLogout={handleLogout} 
          userName={userName} 
          token={token} 
        />

        {itemToDelete && (
          <DeleteModal 
            isOpen={!!itemToDelete} 
            onCancel={() => setItemToDelete(null)} 
            onConfirm={executeDelete} 
          />
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-auto">
            <div className="bg-white/80 backdrop-blur-2xl dark:bg-gray-900 dark:backdrop-blur-none rounded-[2.5rem] p-6 w-full max-sm:max-w-sm sm:max-w-md relative shadow-2xl border border-white dark:border-white">
              <AddProduct 
                handleAddProduct={editingProduct ? handleUpdateProduct : handleAddProduct} 
                initialData={editingProduct} 
                isEditing={!!editingProduct} 
                onClose={() => { setShowForm(false); setEditingProduct(null); }} 
              />
            </div>
          </div>
        )}

        <div className="w-full max-w-3xl mx-auto mt-8 space-y-6 px-4 pb-20">
  <StatsSummary totalItems={products.length} avgChange={avgChange} />
  
  {loading ? (
    <LoadingSkeleton />
  ) : products.length > 0 ? (
    products.map((product) => (
      <ProductCard 
        key={product._id} 
        product={product} 
        onViewHistory={(p) => { if (checkAuth()) setSelectedProduct(p); }}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    ))
  ) : !token ? (
    <EmptyState onSignup={() => navigate("/signup")} onLogin={() => navigate("/login")} />
  ) : (
    <FirstItemCTA onAddClick={() => { if (checkAuth()) setShowForm(true); }} />
  )}
</div>
        {selectedProduct && ( 
          <PriceHistoryModal 
            product={selectedProduct} 
            theme={theme} 
            onClose={() => setSelectedProduct(null)} 
          /> 
        )}
      </div>
    );
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={(data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.name);
            setToken(data.token);
            setUserName(data.user.name);
        }} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;