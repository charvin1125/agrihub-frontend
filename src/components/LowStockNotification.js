import { useState, useEffect } from "react";
import axios from "axios";

const LowStockNotification = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true })
      .then((res) => setLowStockProducts(res.data))
      .catch((err) => console.error("Error fetching low stock products:", err));
  }, []);

  return (
    <div className="low-stock-notification">
      {lowStockProducts.length > 0 && (
        <div className="alert alert-warning">
          <h4>⚠️ Low Stock Alert</h4>
          <ul>
            {lowStockProducts.map((product) =>
              product.variants
                .filter((variant) => variant.stock < 10) // ✅ Filter variants with low stock
                .map((variant) => (
                  <li key={`${product._id}-${variant.size}`}>
                    {product.name} ({variant.size}) - Stock: {variant.stock}
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LowStockNotification;
