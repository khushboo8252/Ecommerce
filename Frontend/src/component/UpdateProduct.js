import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getProductDetails = useCallback(async () => {
    try {
      let result = await fetch(`https://backend-ecommerce-1-9a0z.onrender.com/products/${params.id}`);
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  }, [params.id]); // ✅ Now safely included in the dependency array

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]); // ✅ Now follows React hooks best practices

  const updateProduct = async () => {
    try {
      let result = await fetch(`https://backend-ecommerce-1-9a0z.onrender.com/products/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, company, category }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      navigate("/");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product category"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateProduct} className="appbutton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
