import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://dashboard-backend-argl.onrender.com/products"); // Correct the URL to match the backend port (5001)
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`https://dashboard-backend-argl.onrender.com/products/${id}`, { // Correct the URL to match the backend port (5001)
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`https://dashboard-backend-argl.onrender.com/search/${key}`); // Correct the URL to match the backend port (5001)
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Product List
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Product"
          onChange={searchHandle}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Displaying products as divs instead of table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">₹{item.price}</p>
              <p className="text-sm text-gray-600">Category: {item.category}</p>

              {/* Actions (Delete and Update) */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <Link
                  to={`/update/${item._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Update
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-red-500">
            No Results Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
