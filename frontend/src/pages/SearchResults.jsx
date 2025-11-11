import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword"); // Example: /search?keyword=electronics

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/product/search?keyword=${keyword}`
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchProducts();
  }, [keyword]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products found for "{keyword}"</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => {
        let imageSrc = "";
        if (product.image && product.image.data) {
          // Convert numeric array to binary string for browser
          const binary = new Uint8Array(product.image.data.data)
            .reduce((acc, byte) => acc + String.fromCharCode(byte), "");
          const base64String = btoa(binary);
          imageSrc = `data:${product.image.contentType};base64,${base64String}`;
        }

        return (
          <div key={product._id} className="border p-4 rounded shadow hover:shadow-lg">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2">
              Price: ₹{product.sellingPrice}{" "}
              <span className="line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
