import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
const Cosmetics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/product/getbyCategory",
          { category: "cosmetic" },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const data = response.data;
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching electronics:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  if (loading) return <div>Loading cosmetics...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Electronics Cosmetics</h2>

      {products.length === 0 ? (
        <p>No electronics products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cosmetics
