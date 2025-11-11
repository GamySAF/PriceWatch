import React, { useState } from "react";

function AddProduct({ handleAddProduct }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleAddProduct) {
      console.log({ name, url, targetPrice });
    } else {
      handleAddProduct({ name, url, targetPrice });
    }
    setName("");
    setUrl("");
    setTargetPrice("");
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
        Track a Product
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 transition-colors"
        />

        <input
          type="text"
          placeholder="Product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 transition-colors"
        />

        <input
          type="text"
          placeholder="Target Price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 transition-colors"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-md dark:shadow-none"
        >
          Track Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
