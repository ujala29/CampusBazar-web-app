import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    originalPrice: "",
    sellingPrice: "",
  });
    const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Use FormData to send both text and file
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("originalPrice", productData.originalPrice);
    formData.append("sellingPrice", productData.sellingPrice);

    // Append image only if user selected a file
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await axios.post(
      "http://localhost:3000/api/v1/product/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // important
        },
        withCredentials: true, // send JWT cookie
      }
    );

    const data = response.data;
    console.log("Server Response:", data);

    if (data.success) {
      alert("Product added successfully!");
      setProductData({
        title: "",
        description: "",
        category: "",
        originalPrice: "",
        sellingPrice: "",
        image: null,
      });
      navigate("/allproducts");
    } else {
      alert(data.message || "Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Title */}
        <div>
          <label className="block font-medium">Product Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded-md"
            placeholder="eg: Calculator, Books, Shoes"
            value={productData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-md"
            placeholder="Describe your product..."
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            className="w-full p-2 border rounded-md"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="study-material">Study Material</option>
            <option value="clothes">Clothes</option>
            <option value="cosmetic">Cosmetics</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-medium">Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              className="w-full p-2 border rounded-md"
              value={productData.originalPrice}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2">
            <label className="block font-medium">Selling Price (₹)</label>
            <input
              type="number"
              name="sellingPrice"
              className="w-full p-2 border rounded-md"
              value={productData.sellingPrice}
              onChange={handleChange}
            />
          </div>
          {/* Product Image */}
<div>
  <label className="block font-medium">Product Image</label>
  <input
    type="file"
    name="image"
    className="w-full p-2 border rounded-md"
    onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
  />
</div>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
