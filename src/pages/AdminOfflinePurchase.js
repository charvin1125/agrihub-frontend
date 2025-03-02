// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Table } from "react-bootstrap";

// const AdminOfflinePurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   useEffect(() => {
//     // Fetch available products
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend.onrender.com/api/product/list");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product, variant) => {
//     const existingItem = cart.find(item => item.variantId === variant._id);
//     if (existingItem) {
//       alert("Item already added to cart!");
//       return;
//     }

//     setCart([...cart, { 
//       productId: product._id, 
//       variantId: variant._id, 
//       name: product.name, 
//       size: variant.size, 
//       price: variant.price, 
//       quantity: 1 
//     }]);
//   };

//   const handleQuantityChange = (index, quantity) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity;
//     setCart(updatedCart);
//   };

//   const handleRemoveItem = (index) => {
//     setCart(cart.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!name || !phone || !crop || cart.length === 0) {
//       alert("Please fill all fields and add products!");
//       return;
//     }

//     const orderData = { name, phone, cart, crop, paymentMethod };

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/offline-purchase", orderData, { withCredentials: true });

//       if (response.data.success) {
//         alert("Offline Order Placed Successfully!");
//         setCart([]); // Clear Cart
//         setName("");
//         setPhone("");
//         setCrop("");
//         setPaymentMethod("Cash");
//       } else {
//         alert(response.data.message || "Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <div className="container mt-4">
//       <h2>Admin Offline Purchase</h2>

//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Customer Name</Form.Label>
//           <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Crop Name</Form.Label>
//           <Form.Control type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Payment Method</Form.Label>
//           <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//             <option value="Cash">Cash</option>
//             <option value="Card">Card</option>
//             <option value="Pay Later">Pay Later</option>
//           </Form.Select>
//         </Form.Group>
//       </Form>

//       <h4>Products</h4>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Price</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product =>
//             product.variants.map(variant => (
//               <tr key={variant._id}>
//                 <td>{product.name}</td>
//                 <td>{variant.size}</td>
//                 <td>₹{variant.price}</td>
//                 <td>
//                   <Button onClick={() => handleAddToCart(product, variant)}>Add to Cart</Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       <h4>Selected Products</h4>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>{item.size}</td>
//               <td>₹{item.price}</td>
//               <td>
//                 <Form.Control 
//                   type="number" 
//                   min="1" 
//                   value={item.quantity} 
//                   onChange={(e) => handleQuantityChange(index, e.target.value)} 
//                 />
//               </td>
//               <td>
//                 <Button variant="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <h4>Total Amount: ₹{totalAmount}</h4>

//       <Button variant="success" onClick={handleSubmit}>Place Order</Button>
//     </div>
//   );
// };

// export default AdminOfflinePurchase;
// import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminOfflinePurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // ✅ Function to handle product selection
//   const handleProductSelect = (product, variant, quantity) => {
//     const gstRate = variant.gst ? variant.gst / 100 : 0;
//     const priceWithGST = variant.price * (1 + gstRate); // ✅ Calculate total with GST

//     const existingIndex = selectedProducts.findIndex((p) => p.variantId === variant._id);

//     if (existingIndex !== -1) {
//       const updatedProducts = [...selectedProducts];
//       updatedProducts[existingIndex].quantity = quantity;
//       updatedProducts[existingIndex].totalWithGST = priceWithGST * quantity;
//       setSelectedProducts(updatedProducts);
//     } else {
//       setSelectedProducts([
//         ...selectedProducts,
//         {
//           productId: product._id,
//           variantId: variant._id,
//           name: product.name,
//           size: variant.size,
//           price: variant.price,
//           gst: variant.gst || 0,
//           quantity,
//           totalWithGST: priceWithGST * quantity,
//         },
//       ]);
//     }

//     updateTotalAmount();
//   };

//   // ✅ Calculate total amount including GST
//   const updateTotalAmount = () => {
//     const total = selectedProducts.reduce((sum, item) => sum + item.totalWithGST, 0);
//     setTotalAmount(total.toFixed(2));
//   };

//   // ✅ Handle order submission
//   const handlePurchase = async () => {
//     const orderData = {
//       name: customerName,
//       phone,
//       crop,
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: selectedProducts,
//     };
  
//     console.log("Sending offline order data:", orderData);
  
//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/offline-purchase", orderData, { 
//         withCredentials: true  // ✅ Ensures cookies are sent
//       });
  
//       if (response.data.success) {
//         alert("Purchase successful!");
//         setSelectedProducts([]);
//         setTotalAmount(0);
//       } else {
//         alert("Purchase failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing offline order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };
  
//   return (
//     <div>
//       <h2>Admin Offline Purchase</h2>

//       <div>
//         <label>Customer Name:</label>
//         <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//       </div>

//       <div>
//         <label>Phone:</label>
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       </div>

//       <div>
//         <label>Crop:</label>
//         <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//       </div>

//       <div>
//         <label>Payment Method:</label>
//         <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//           <option value="Cash">Cash</option>
//           <option value="Card">Card</option>
//           <option value="Pay Later">Pay Later</option>
//         </select>
//       </div>

//       <h3>Product Selection</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Price</th>
//             <th>GST (%)</th>
//             <th>Quantity</th>
//             <th>Total (with GST)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) =>
//             product.variants.map((variant) => (
//               <tr key={variant._id}>
//                 <td>{product.name}</td>
//                 <td>{variant.size}</td>
//                 <td>₹{variant.price}</td>
//                 <td>{variant.gst}%</td>
//                 <td>
//                   <input
//                     type="number"
//                     min="1"
//                     onChange={(e) => handleProductSelect(product, variant, parseInt(e.target.value, 10))}
//                   />
//                 </td>
//                 <td>
//                   ₹
//                   {selectedProducts.find((p) => p.variantId === variant._id)?.totalWithGST?.toFixed(2) || "0.00"}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <h3>Total Amount (with GST): ₹{totalAmount}</h3>

//       <button onClick={handlePurchase}>Complete Purchase</button>
//     </div>
//   );
// };

// export default AdminOfflinePurchase;
// import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminOfflinePurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // ✅ Calculate total amount whenever selectedProducts changes
//   useEffect(() => {
//     const total = selectedProducts.reduce((sum, item) => sum + item.totalWithGST, 0);
//     setTotalAmount(total.toFixed(2));
//   }, [selectedProducts]);

//   // ✅ Function to handle product selection
//   const handleProductSelect = (product, variant, quantity) => {
//     if (quantity <= 0 || isNaN(quantity)) return;

//     const gstRate = variant.gst ? variant.gst / 100 : 0;
//     const priceWithGST = variant.price * (1 + gstRate) * quantity;

//     setSelectedProducts((prevProducts) => {
//       const existingIndex = prevProducts.findIndex((p) => p.variantId === variant._id);
//       if (existingIndex !== -1) {
//         const updatedProducts = [...prevProducts];
//         updatedProducts[existingIndex].quantity = quantity;
//         updatedProducts[existingIndex].totalWithGST = priceWithGST;
//         return updatedProducts;
//       } else {
//         return [
//           ...prevProducts,
//           {
//             productId: product._id,
//             variantId: variant._id,
//             name: product.name,
//             size: variant.size,
//             price: variant.price,
//             gst: variant.gst || 0,
//             quantity,
//             totalWithGST: priceWithGST,
//           },
//         ];
//       }
//     });
//   };

//   // ✅ Handle order submission
// //   const handlePurchase = async () => {
// //     const orderData = {
// //       name: customerName,
// //       phone,
// //       crop,
// //       paymentMethod,
// //       totalAmount: parseFloat(totalAmount),
// //       cart: selectedProducts,
// //     };

// //     console.log("Sending offline order data:", orderData);

// //     try {
// //       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/offline-purchase", orderData, {
// //         withCredentials: true, // ✅ Ensures cookies are sent
// //       });

// //       if (response.data.success) {
// //         alert("Purchase successful!");
// //         setSelectedProducts([]);
// //         setTotalAmount(0);
// //       } else {
// //         alert("Purchase failed. Try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error placing offline order:", error.response ? error.response.data : error.message);
// //       alert("Failed to place order. Check console for details.");
// //     }
// //   };
// const handlePurchase = async () => {
//     const orderData = {
//       name: customerName,
//       phone,
//       crop,
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: selectedProducts,
//     };
  
//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/offline-purchase", orderData, {
//         withCredentials: true,
//       });
  
//       if (response.data.success) {
//         alert("Purchase successful!");
  
//         // ✅ Clear selected products
//         setSelectedProducts([]);
//         setTotalAmount(0);
  
//         // ✅ Fetch updated stock
//         fetchProducts();
//       } else {
//         alert("Purchase failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing offline order:", error.response?.data || error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };
  
//   // ✅ Ensure fetchProducts is defined
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list");
//       setProducts(res.data); // ✅ Update products after stock change
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
  
//   // ✅ Fetch updated stock when the component loads
//   useEffect(() => {
//     fetchProducts();
//   }, []);
  
//   return (
//     <div>
//       <h2>Admin Offline Purchase</h2>

//       <div>
//         <label>Customer Name:</label>
//         <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//       </div>

//       <div>
//         <label>Phone:</label>
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       </div>

//       <div>
//         <label>Crop:</label>
//         <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//       </div>

//       <div>
//         <label>Payment Method:</label>
//         <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//           <option value="Cash">Cash</option>
//           <option value="Card">Card</option>
//           <option value="Pay Later">Pay Later</option>
//         </select>
//       </div>

//       <h3>Product Selection</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Price</th>
//             <th>GST (%)</th>
//             <th>Quantity</th>
//             <th>Total (with GST)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) =>
//             product.variants.map((variant) => {
//               const existingItem = selectedProducts.find((p) => p.variantId === variant._id);
//               return (
//                 <tr key={variant._id}>
//                   <td>{product.name}</td>
//                   <td>{variant.size}</td>
//                   <td>₹{variant.price}</td>
//                   <td>{variant.gst}%</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={existingItem ? existingItem.quantity : ""}
//                       onChange={(e) => handleProductSelect(product, variant, parseInt(e.target.value, 10))}
//                     />
//                   </td>
//                   <td>₹{existingItem ? existingItem.totalWithGST.toFixed(2) : "0.00"}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>

//       <h3>Total Amount (with GST): ₹{totalAmount}</h3>

//       <button onClick={handlePurchase}>Complete Purchase</button>
//     </div>
//   );
// };

// export default AdminOfflinePurchase;
//start with the 343 Line 
// import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminOfflinePurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     const total = selectedProducts.reduce((sum, item) => sum + item.totalWithGST, 0);
//     setTotalAmount(total.toFixed(2));
//   }, [selectedProducts]);

//   const handleProductSelect = (product, variant, quantity) => {
//     if (quantity <= 0 || isNaN(quantity) || quantity > variant.stock) return;

//     const gstRate = variant.gst ? variant.gst / 100 : 0;
//     const priceWithGST = variant.price * (1 + gstRate) * quantity;

//     setSelectedProducts((prevProducts) => {
//       const existingIndex = prevProducts.findIndex((p) => p.variantId === variant._id);
//       if (existingIndex !== -1) {
//         const updatedProducts = [...prevProducts];
//         updatedProducts[existingIndex].quantity = quantity;
//         updatedProducts[existingIndex].totalWithGST = priceWithGST;
//         return updatedProducts;
//       } else {
//         return [
//           ...prevProducts,
//           {
//             productId: product._id,
//             variantId: variant._id,
//             name: product.name,
//             size: variant.size,
//             price: variant.price,
//             gst: variant.gst || 0,
//             stock: variant.stock,
//             quantity,
//             totalWithGST: priceWithGST,
//           },
//         ];
//       }
//     });
//   };

//   const handlePurchase = async () => {
//     const orderData = {
//       name: customerName,
//       phone,
//       crop,
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: selectedProducts,
//     };

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/offline-purchase", orderData, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         alert("Purchase successful!");
//         setSelectedProducts([]);
//         setTotalAmount(0);
//         fetchProducts();
//       } else {
//         alert(response.data.message || "Purchase failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing offline order:", error.response?.data || error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Offline Purchase</h2>

//       <div>
//         <label>Customer Name:</label>
//         <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//       </div>

//       <div>
//         <label>Phone:</label>
//         <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       </div>

//       <div>
//         <label>Crop:</label>
//         <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//       </div>

//       <div>
//         <label>Payment Method:</label>
//         <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//           <option value="Cash">Cash</option>
//           <option value="Card">Card</option>
//           <option value="Pay Later">Pay Later</option>
//         </select>
//       </div>

//       <h3>Product Selection</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Price</th>
//             <th>GST (%)</th>
//             <th>Stock</th>
//             <th>Quantity</th>
//             <th>Total (with GST)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) =>
//             product.variants.map((variant) => {
//               const existingItem = selectedProducts.find((p) => p.variantId === variant._id);
//               return (
//                 <tr key={variant._id}>
//                   <td>{product.name}</td>
//                   <td>{variant.size}</td>
//                   <td>₹{variant.price}</td>
//                   <td>{variant.gst}%</td>
//                   <td>{variant.stock}</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       max={variant.stock}
//                       value={existingItem ? existingItem.quantity : ""}
//                       onChange={(e) => handleProductSelect(product, variant, parseInt(e.target.value, 10))}
//                       disabled={variant.stock === 0}
//                     />
//                   </td>
//                   <td>₹{existingItem ? existingItem.totalWithGST.toFixed(2) : "0.00"}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>

//       <h3>Total Amount: ₹{totalAmount}</h3>
//       <button onClick={handlePurchase} disabled={selectedProducts.length === 0}>Complete Purchase</button>
//     </div>
//   );
// };

// export default AdminOfflinePurchase;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Card,
//   Chip,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Divider,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import RemoveIcon from "@mui/icons-material/Remove";
// import Sidebar from "../components/Sidebar"; // Assuming you have a Sidebar
// // import "./styles/AdminOfflinePurchase.css";

// const AdminOfflinePurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   // Fetch products
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list", { withCredentials: true });
//       setProducts(res.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate total amount
//   useEffect(() => {
//     const total = selectedProducts.reduce((sum, item) => sum + item.totalWithGST, 0);
//     setTotalAmount(total.toFixed(2));
//   }, [selectedProducts]);

//   // Handle product selection
//   const handleProductSelect = (product, variant, quantity) => {
//     if (quantity <= 0 || isNaN(quantity) || quantity > variant.stock) return;

//     const gstRate = variant.gst ? variant.gst / 100 : 0;
//     const priceWithGST = variant.price * (1 + gstRate) * quantity;

//     setSelectedProducts((prevProducts) => {
//       const existingIndex = prevProducts.findIndex((p) => p.variantId === variant._id);
//       if (existingIndex !== -1) {
//         const updatedProducts = [...prevProducts];
//         updatedProducts[existingIndex].quantity = quantity;
//         updatedProducts[existingIndex].totalWithGST = priceWithGST;
//         return updatedProducts;
//       } else {
//         return [
//           ...prevProducts,
//           {
//             productId: product._id,
//             variantId: variant._id,
//             name: product.name,
//             size: variant.size,
//             price: variant.price,
//             gst: variant.gst || 0,
//             stock: variant.stock,
//             quantity,
//             totalWithGST: priceWithGST,
//           },
//         ];
//       }
//     });
//   };
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const handlePreview = () => setPreviewOpen(true);
//   // Remove product from selection
//   const handleRemoveProduct = (variantId) => {
//     setSelectedProducts((prev) => prev.filter((p) => p.variantId !== variantId));
//   };

//   // Handle offline purchase
//   const handlePurchase = async () => {
//     const orderData = {
//       name: customerName,
//       phone,
//       crop,
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: selectedProducts,
//     };

//     try {
//       const response = await axios.post(
//         "https://agrihub-backend.onrender.com/api/orders/offline-purchase",
//         orderData,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         alert("Purchase successful!");
//         setSelectedProducts([]);
//         setTotalAmount(0);
//         setCustomerName("");
//         setPhone("");
//         setCrop("");
//         setPaymentMethod("Cash");
//         fetchProducts();
//       } else {
//         alert(response.data.message || "Purchase failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing offline order:", error.response?.data || error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" }, // Green for AgriHub
//       secondary: { main: "#FF5722" }, // Orange accent
//       background: { default: "#F5F7FA" },
//     },
//     typography: {
//       fontFamily: "'Roboto', sans-serif",
//       h4: { fontWeight: 700 },
//       body1: { fontSize: "1rem" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: { backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold" },
//           body: { padding: "12px" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress size={60} sx={{ color: "primary.main" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar />
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Typography variant="h4" sx={{ color: "primary.main", mb: 3 }}>
//             Offline Purchase
//           </Typography>

//           {/* Customer Details */}
//           <Card sx={{ mb: 4 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
//                 Customer Details
//               </Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <TextField
//                   label="Customer Name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   variant="outlined"
//                   sx={{ flex: 1, minWidth: "200px" }}
//                 />
//                 <TextField
//                   label="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   variant="outlined"
//                   sx={{ flex: 1, minWidth: "200px" }}
//                 />
//                 <TextField
//                   label="Crop"
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   variant="outlined"
//                   sx={{ flex: 1, minWidth: "200px" }}
//                 />
//                 <FormControl sx={{ flex: 1, minWidth: "200px" }}>
//                   <InputLabel>Payment Method</InputLabel>
//                   <Select
//                     value={paymentMethod}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     label="Payment Method"
//                   >
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Card">Card</MenuItem>
//                     <MenuItem value="Pay Later">Pay Later</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             </CardContent>
//           </Card>
//           <TextField
//   label="Search Products"
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)}
//   variant="outlined"
//   sx={{ mb: 2, width: "300px" }}
// />
//           {/* Product Selection */}
//           <Card sx={{ mb: 4 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
//                 Product Selection
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Size</TableCell>
//                       <TableCell align="right">Price</TableCell>
//                       <TableCell align="right">GST (%)</TableCell>
//                       <TableCell align="right">Stock</TableCell>
//                       <TableCell align="right">Quantity</TableCell>
//                       <TableCell align="right">Total (with GST)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredProducts.map((product)=>
//                       product.variants.map((variant) => {
//                         const existingItem = selectedProducts.find((p) => p.variantId === variant._id);
//                         return (
//                           <TableRow key={variant._id}>
//                             <TableCell>{product.name}</TableCell>
//                             <TableCell>{variant.size}</TableCell>
//                             <TableCell align="right">₹{variant.price.toFixed(2)}</TableCell>
//                             <TableCell align="right">{variant.gst || 0}</TableCell>
//                             <TableCell align="right">
//                               <Chip
//                                 label={`${variant.stock}`}
//                                 color={variant.stock <= 5 ? "error" : "success"}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell align="right">
//                               <TextField
//                                 type="number"
//                                 inputProps={{ min: 1, max: variant.stock }}
//                                 value={existingItem ? existingItem.quantity : ""}
//                                 onChange={(e) =>
//                                   handleProductSelect(product, variant, parseInt(e.target.value, 10))
//                                 }
//                                 disabled={variant.stock === 0}
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{ width: "80px" }}
//                               />
//                             </TableCell>
//                             <TableCell align="right">
//                               ₹{existingItem ? existingItem.totalWithGST.toFixed(2) : "0.00"}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>

//           {/* Selected Products and Total */}
//           <Card>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
//                 Selected Products
//               </Typography>
//               {selectedProducts.length > 0 ? (
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Size</TableCell>
//                         <TableCell align="right">Price</TableCell>
//                         <TableCell align="right">Quantity</TableCell>
//                         <TableCell align="right">Total (with GST)</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {selectedProducts.map((item) => (
//                         <TableRow key={item.variantId}>
//                           <TableCell>{item.name}</TableCell>
//                           <TableCell>{item.size}</TableCell>
//                           <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
//                           <TableCell align="right">{item.quantity}</TableCell>
//                           <TableCell align="right">₹{item.totalWithGST.toFixed(2)}</TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               color="secondary"
//                               onClick={() => handleRemoveProduct(item.variantId)}
//                             >
//                               <RemoveIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
//                   No products selected yet.
//                 </Typography>
//               )}
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                   Total Amount: ₹{totalAmount}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<AddShoppingCartIcon />}
//                   onClick={handlePurchase}
//                   disabled={selectedProducts.length === 0}
//                   sx={{ px: 4, py: 1.5 }}
//                 >
//                   Complete Purchase
//                 </Button>
//                 <Button
//   variant="outlined"
//   color="primary"
//   onClick={handlePreview}
//   disabled={selectedProducts.length === 0}
//   sx={{ ml: 2 }}
// >
//   Preview Receipt
// </Button>
// <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
//   <DialogTitle>Receipt Preview</DialogTitle>
//   <DialogContent>
//     <Typography><strong>Name:</strong> {customerName}</Typography>
//     <Typography><strong>Phone:</strong> {phone}</Typography>
//     <Typography><strong>Total:</strong> ₹{totalAmount}</Typography>
//     {selectedProducts.map((item) => (
//       <Typography key={item.variantId}>
//         {item.name} ({item.size}) - {item.quantity} pcs: ₹{item.totalWithGST.toFixed(2)}
//       </Typography>
//     ))}
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setPreviewOpen(false)}>Close</Button>
//   </DialogActions>
// </Dialog>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminOfflinePurchase;
//after the Added Mobile Responsive
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Chip,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";

const AdminOfflinePurchase = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [crop, setCrop] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch products
  useEffect(() => {
    fetchProducts();

    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://agrihub-backend.onrender.com/api/product/list", { withCredentials: true });
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount
  useEffect(() => {
    const total = selectedProducts.reduce((sum, item) => sum + item.totalWithGST, 0);
    setTotalAmount(total.toFixed(2));
  }, [selectedProducts]);

  // Handle product selection
  const handleProductSelect = (product, variant, quantity) => {
    if (quantity <= 0 || isNaN(quantity) || quantity > variant.stock) return;

    const gstRate = variant.gst ? variant.gst / 100 : 0;
    const priceWithGST = variant.price * (1 + gstRate) * quantity;

    setSelectedProducts((prevProducts) => {
      const existingIndex = prevProducts.findIndex((p) => p.variantId === variant._id);
      if (existingIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingIndex].quantity = quantity;
        updatedProducts[existingIndex].totalWithGST = priceWithGST;
        return updatedProducts;
      } else {
        return [
          ...prevProducts,
          {
            productId: product._id,
            variantId: variant._id,
            name: product.name,
            size: variant.size,
            price: variant.price,
            gst: variant.gst || 0,
            stock: variant.stock,
            quantity,
            totalWithGST: priceWithGST,
          },
        ];
      }
    });
  };

  // Remove product from selection
  const handleRemoveProduct = (variantId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.variantId !== variantId));
  };

  // Handle offline purchase
  const handlePurchase = async () => {
    const orderData = {
      name: customerName,
      phone,
      crop,
      paymentMethod,
      totalAmount: parseFloat(totalAmount),
      cart: selectedProducts,
    };

    try {
      const response = await axios.post(
        "https://agrihub-backend.onrender.com/api/orders/offline-purchase",
        orderData,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Purchase successful!");
        setSelectedProducts([]);
        setTotalAmount(0);
        setCustomerName("");
        setPhone("");
        setCrop("");
        setPaymentMethod("Cash");
        fetchProducts();
      } else {
        alert(response.data.message || "Purchase failed. Try again.");
      }
    } catch (error) {
      console.error("Error placing offline order:", error.response?.data || error.message);
      alert("Failed to place order. Check console for details.");
    }
  };

  const handlePreview = () => setPreviewOpen(true);

  // Theme toggler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // MUI Theme Configuration with Green Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" }, // Green shades for agriculture theme
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" }, // Lighter green for secondary
      background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
      text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: darkMode ? "#388E3C" : "#A5D6A7", // Light green in light theme
            color: darkMode ? "#fff" : "#212121", // Black in light theme
            fontWeight: "bold",
          },
          body: { padding: { xs: "8px", sm: "12px" } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#b0b0b0" : "#757575" },
              "&:hover fieldset": { borderColor: darkMode ? "#e0e0e0" : "#212121" },
            },
          },
        },
      },
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobile={isMobile}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            bgcolor: "background.default",
            width: { xs: "100%", sm: `calc(100% - ${sidebarOpen && !isMobile ? 260 : 70}px)` },
            transition: "width 0.3s ease",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 2, sm: 4 } }}>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Offline Purchase
            </Typography>
          </Box>

          {/* Customer Details */}
          <Card sx={{ mb: { xs: 2, sm: 4 }, bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 2, color: "text.primary" }}>
                Customer Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    variant="outlined"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label="Payment Method"
                      size={isMobile ? "small" : "medium"}
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Pay Later">Pay Later</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card sx={{ mb: { xs: 2, sm: 4 }, bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 2, color: "text.primary" }}>
                Product Selection
              </Typography>
              <TextField
                label="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                sx={{ mb: 2, width: { xs: "100%", sm: "300px" }, bgcolor: "background.paper" }}
                size={isMobile ? "small" : "medium"}
              />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="product selection table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Price</TableCell>
                      <TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>GST (%)</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total (with GST)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((product) =>
                      product.variants.map((variant) => {
                        const existingItem = selectedProducts.find((p) => p.variantId === variant._id);
                        return (
                          <TableRow key={variant._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
                            <TableCell sx={{ color: "text.primary" }}>{product.name}</TableCell>
                            <TableCell sx={{ color: "text.primary" }}>{variant.size}</TableCell>
                            <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", sm: "table-cell" } }}>
                              ₹{variant.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", md: "table-cell" } }}>
                              {variant.gst || 0}
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={`${variant.stock}`}
                                color={variant.stock <= 5 ? "error" : "success"}
                                size={isMobile ? "small" : "medium"}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                type="number"
                                inputProps={{ min: 1, max: variant.stock }}
                                value={existingItem ? existingItem.quantity : ""}
                                onChange={(e) => handleProductSelect(product, variant, parseInt(e.target.value, 10))}
                                disabled={variant.stock === 0}
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                sx={{ width: isMobile ? "60px" : "80px" }}
                              />
                            </TableCell>
                            <TableCell align="right" sx={{ color: "text.primary" }}>
                              ₹{existingItem ? existingItem.totalWithGST.toFixed(2) : "0.00"}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Selected Products and Total */}
          <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 2, color: "text.primary" }}>
                Selected Products
              </Typography>
              {selectedProducts.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="selected products table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total (with GST)</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProducts.map((item) => (
                        <TableRow key={item.variantId} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
                          <TableCell sx={{ color: "text.primary" }}>{item.name}</TableCell>
                          <TableCell sx={{ color: "text.primary" }}>{item.size}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", sm: "table-cell" } }}>
                            ₹{item.price.toFixed(2)}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>{item.quantity}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>₹{item.totalWithGST.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="secondary"
                              onClick={() => handleRemoveProduct(item.variantId)}
                              sx={{ bgcolor: darkMode ? "#A5D6A7" : "#4CAF50", "&:hover": { bgcolor: darkMode ? "#81C784" : "#388E3C" } }}
                            >
                              <RemoveIcon sx={{ color: darkMode ? "#121212" : "#fff" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                  No products selected yet.
                </Typography>
              )}
              <Divider sx={{ my: 2, bgcolor: darkMode ? "#b0b0b0" : "#757575" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Total Amount: ₹{totalAmount}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", sm: "auto" } }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handlePurchase}
                    disabled={selectedProducts.length === 0}
                    sx={{ py: 1, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" }, width: { xs: "100%", sm: "auto" } }}
                  >
                    Complete Purchase
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handlePreview}
                    disabled={selectedProducts.length === 0}
                    sx={{ py: 1, borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" }, width: { xs: "100%", sm: "auto" } }}
                  >
                    Preview Receipt
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Receipt Preview Dialog */}
          <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { bgcolor: darkMode ? "#263238" : "#E8F5E9" } }}>
            <DialogTitle sx={{ bgcolor: darkMode ? "#388E3C" : "#66BB6A", color: "#fff" }}>Receipt Preview</DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ color: "text.primary" }}><strong>Name:</strong> {customerName}</Typography>
              <Typography variant="body1" sx={{ color: "text.primary" }}><strong>Phone:</strong> {phone}</Typography>
              <Typography variant="body1" sx={{ color: "text.primary" }}><strong>Total:</strong> ₹{totalAmount}</Typography>
              {selectedProducts.map((item) => (
                <Typography key={item.variantId} variant="body2" sx={{ color: "text.primary" }}>
                  {item.name} ({item.size}) - {item.quantity} pcs: ₹{item.totalWithGST.toFixed(2)}
                </Typography>
              ))}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setPreviewOpen(false)}
                color="primary"
                variant="outlined"
                sx={{ borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminOfflinePurchase;