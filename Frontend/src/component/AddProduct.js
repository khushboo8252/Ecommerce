import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not logged in");
      return;
    }

    const userId = user._id;
const productData = { name, price, category, company, userId };

try {
  // Send POST request
  const response = await axios.post("https://dashboard-backend-argl.onrender.com/add-product", productData);

  // Check if response is successful and use it (e.g., logging or handling response data)
  if (response.status === 200) {
    alert("Product added successfully!");
    navigate("/");
  } else {
    alert("Failed to add product.");
  }
} catch (err) {
  console.error(err);
  alert("Something went wrong while adding the product.");
}

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <p className="text-red-500 text-sm mb-2">Enter a valid name</p>}

        <input
          type="text"
          placeholder="Price"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <p className="text-red-500 text-sm mb-2">Enter a valid price</p>}

        <input
          type="text"
          placeholder="Category"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <p className="text-red-500 text-sm mb-2">Enter a valid category</p>}

        <input
          type="text"
          placeholder="Company"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <p className="text-red-500 text-sm mb-2">Enter a valid company</p>}

        <button
          onClick={addProduct}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
