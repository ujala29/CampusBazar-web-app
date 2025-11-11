import React from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  const handleOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/create",
        { productId: product._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("✅ Order placed successfully!");
      } else {
        alert("⚠ " + response.data.message);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="max-w-xs bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border">

      {/* Image Box */}
      <div className="w-full h-60 bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col h-[200px] justify-between">

        <div>
          <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-xl font-extrabold text-green-600">
            ₹{product.sellingPrice}
          </span>
          <span className="line-through ml-2 text-gray-400 text-sm">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleOrder}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
        >
          Order Now
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
