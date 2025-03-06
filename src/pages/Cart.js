// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity;
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   console.log("Cart Items in Cart Page:", cart);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <div className="alert alert-warning text-center">Your cart is empty</div>
//       ) : (
//         <div className="row">
//           <div className="col-md-8">
//             {cart.map((item, index) => (
//               <div className="card mb-3 shadow-sm" key={index}>
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} className="img-fluid rounded-start" />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">{item.name}</h5>
//                       <p className="card-text text-muted">₹{item.price}</p>
//                       <div className="d-flex align-items-center">
//                         <label className="me-2">Qty:</label>
//                         <input
//                           type="number"
//                           className="form-control w-25"
//                           value={item.quantity}
//                           min="1"
//                           onChange={(e) => updateQuantity(index, e.target.value)}
//                         />
//                       </div>
//                       <button className="btn btn-danger mt-2" onClick={() => removeItem(index)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="col-md-4">
//             <div className="card p-3 shadow-sm">
//               <h4 className="mb-3">Cart Summary</h4>
//               <p>Total: <strong>₹{totalAmount.toFixed(2)}</strong></p>
//               <Link to="/checkout" className="btn btn-success w-100">Proceed to Checkout</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// Cart.js
// Cart.js
// Cart.js
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity;
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 fw-bold text-primary">Shopping Cart</h2>
      
//       {cart.length === 0 ? (
//         <div className="alert alert-warning text-center">Your cart is empty</div>
//       ) : (
//         <div className="row">
//           <div className="col-md-8">
//             {cart.map((item, index) => (
//               <div className="card mb-3 shadow-lg border-0 rounded" key={index}>
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} className="img-fluid rounded-start" />
//                   </div>
//                   <div className="col-md-8 d-flex flex-column justify-content-between p-3">
//                     <div>
//                       <h5 className="fw-bold text-dark">{item.name}</h5>
//                       <p className="text-muted">Size: {item.size || "N/A"}</p>
//                       <p className="text-muted">₹{item.price} per unit</p>
//                       <div className="d-flex align-items-center">
//                         <label className="me-2">Qty:</label>
//                         <input
//                           type="number"
//                           className="form-control w-25 border-primary"
//                           value={item.quantity}
//                           min="1"
//                           onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
//                         />
//                       </div>
//                     </div>
//                     <div className="d-flex justify-content-between mt-3">
//                       <p className="fw-bold">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
//                       <button className="btn btn-outline-danger rounded-pill" onClick={() => removeItem(index)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ✅ Cart Summary Section */}
//           <div className="col-md-4">
//             <div className="card p-3 shadow border-0 rounded-lg">
//               <h4 className="mb-3 fw-bold text-success">Cart Summary</h4>
//               <ul className="list-group mb-3">
//                 {cart.map((item, index) => (
//                   <li key={index} className="list-group-item d-flex justify-content-between">
//                     <span>{item.name} ({item.size}) x {item.quantity}</span>
//                     <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                   </li>
//                 ))}
//               </ul>
//               <h5 className="fw-bold">Total: <span className="text-danger">₹{totalAmount.toFixed(2)}</span></h5>
//               <Link to="/checkout" className="btn btn-success w-100 rounded-pill mt-3">Proceed to Checkout</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity > 0 ? quantity : 1;
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const calculateTotalWithGST = () => {
//     return cart.reduce((acc, item) => {
//       const gstPercentage = item.gstPercentage || 0;
//       const gstAmount = (item.price * gstPercentage) / 100;
//       const priceWithGST = item.price + gstAmount;
//       return acc + priceWithGST * (item.quantity || 1);
//     }, 0);
//   };

//   const totalAmount = calculateTotalWithGST();

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 fw-bold text-primary">Shopping Cart</h2>
      
//       {cart.length === 0 ? (
//         <div className="alert alert-warning text-center">Your cart is empty</div>
//       ) : (
//         <div className="row">
//           <div className="col-md-8">
//             {cart.map((item, index) => (
//               <div className="card mb-3 shadow-lg border-0 rounded" key={index}>
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} className="img-fluid rounded-start" />
//                   </div>
//                   <div className="col-md-8 d-flex flex-column justify-content-between p-3">
//                     <div>
//                       <h5 className="fw-bold text-dark">{item.name}</h5>
//                       <p className="text-muted">Size: {item.size ? item.size : "Not Available"}</p>
//                       <p className="text-muted">₹{item.price.toFixed(2)} per unit</p>
//                       <p className="text-muted">GST: {item.gstPercentage ? `${item.gstPercentage}%` : "0%"}</p>
//                       <div className="d-flex align-items-center">
//                         <label className="me-2">Qty:</label>
//                         <input
//                           type="number"
//                           className="form-control w-25 border-primary"
//                           value={item.quantity || 1}
//                           min="1"
//                           onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
//                         />
//                       </div>
//                     </div>
//                     <div className="d-flex justify-content-between mt-3">
//                       <p className="fw-bold">Total: ₹{((item.price + (item.price * (item.gstPercentage || 0) / 100)) * (item.quantity || 1)).toFixed(2)}</p>
//                       <button className="btn btn-outline-danger rounded-pill" onClick={() => removeItem(index)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ✅ Cart Summary Section */}
//           <div className="col-md-4">
//             <div className="card p-3 shadow border-0 rounded-lg">
//               <h4 className="mb-3 fw-bold text-success">Cart Summary</h4>
//               <ul className="list-group mb-3">
//                 {cart.map((item, index) => (
//                   <li key={index} className="list-group-item d-flex justify-content-between">
//                     <span>{item.name} ({item.size ? item.size : "Not Available"}) x {item.quantity || 1}</span>
//                     <span>₹{((item.price + (item.price * (item.gstPercentage || 0) / 100)) * (item.quantity || 1)).toFixed(2)}</span>
//                   </li>
//                 ))}
//               </ul>
//               <h5 className="fw-bold">Total: <span className="text-danger">₹{totalAmount.toFixed(2)}</span></h5>
//               <Link to="/checkout" className="btn btn-success w-100 rounded-pill mt-3">Proceed to Checkout</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//     console.log("Loaded Cart:", storedCart); // Debugging GST issue
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity > 0 ? quantity : 1;
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const calculateTotalWithGST = () => {
//     return cart.reduce((acc, item) => {
//       const gstPercentage = item.gst !== undefined ? item.gst : 0; // Ensure GST exists
//       const gstAmount = (item.price * gstPercentage) / 100;
//       const totalPrice = (item.price + gstAmount) * (item.quantity || 1);
//       return acc + totalPrice;
//     }, 0);
//   };

//   const totalAmount = calculateTotalWithGST();

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 fw-bold text-primary">Shopping Cart</h2>
      
//       {cart.length === 0 ? (
//         <div className="alert alert-warning text-center">Your cart is empty</div>
//       ) : (
//         <div className="row">
//           <div className="col-md-8">
//             {cart.map((item, index) => (
//               <div className="card mb-3 shadow-lg border-0 rounded" key={index}>
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} className="img-fluid rounded-start" />
//                   </div>
//                   <div className="col-md-8 d-flex flex-column justify-content-between p-3">
//                     <div>
//                       <h5 className="fw-bold text-dark">{item.name}</h5>
//                       <p className="text-muted">Size: {item.size ? item.size : "Not Available"}</p>
//                       <p className="text-muted">₹{item.price.toFixed(2)} per unit</p>
//                       <p className="text-muted">GST: {item.gst ? `${item.gst}%` : "0%"}</p>
//                       <div className="d-flex align-items-center">
//                         <label className="me-2">Qty:</label>
//                         <input
//                           type="number"
//                           className="form-control w-25 border-primary"
//                           value={item.quantity || 1}
//                           min="1"
//                           onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
//                         />
//                       </div>
//                     </div>
//                     <div className="d-flex justify-content-between mt-3">
//                       <p className="fw-bold">
//                         Total: ₹{((item.price + (item.price * (item.gst || 0) / 100)) * (item.quantity || 1)).toFixed(2)}
//                       </p>
//                       <button className="btn btn-outline-danger rounded-pill" onClick={() => removeItem(index)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ✅ Cart Summary Section */}
//           <div className="col-md-4">
//             <div className="card p-3 shadow border-0 rounded-lg">
//               <h4 className="mb-3 fw-bold text-success">Cart Summary</h4>
//               <ul className="list-group mb-3">
//                 {cart.map((item, index) => (
//                   <li key={index} className="list-group-item d-flex justify-content-between">
//                     <span>{item.name} ({item.size ? item.size : "Not Available"}) x {item.quantity || 1}</span>
//                     <span>₹{((item.price + (item.price * (item.gst || 0) / 100)) * (item.quantity || 1)).toFixed(2)}</span>
//                   </li>
//                 ))}
//               </ul>
//               <h5 className="fw-bold">Total: <span className="text-danger">₹{totalAmount.toFixed(2)}</span></h5>
//               <Link to="/checkout" className="btn btn-success w-100 rounded-pill mt-3">Proceed to Checkout</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Table, Button } from "react-bootstrap";
// import { FaShoppingCart, FaTrash } from "react-icons/fa";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     if (quantity > 0) {
//       updatedCart[index].quantity = quantity;
//     } else {
//       updatedCart.splice(index, 1); // Remove item if quantity is 0
//     }
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const gstRate = item.gst ? item.gst / 100 : 0; // Ensure GST is defined
//       const itemTotal = item.price * item.quantity;
//       return total + itemTotal + itemTotal * gstRate;
//     }, 0).toFixed(2);
//   };

//   return (
//     <>
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand as={Link} to="/">AgriHub</Navbar.Brand>
//         <Nav className="ms-auto">
//           <Nav.Link as={Link} to="/cart" className="text-white">
//             <FaShoppingCart size={22} /> Cart ({cart.length})
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       <div className="container mt-4">
//         <h2>Your Cart</h2>
//         {cart.length > 0 ? (
//           <Table striped bordered hover className="mt-3">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total (with GST)</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
//                 <tr key={index}>
//                   <td>
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} width="60" className="rounded" />
//                   </td>
//                   <td>{item.name}</td>
//                   <td>₹{item.price}</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
//                       className="form-control"
//                       style={{ width: "80px" }}
//                     />
//                   </td>
//                   <td>₹{(item.price * item.quantity * (1 + (item.gst ? item.gst / 100 : 0))).toFixed(2)}</td>
//                   <td>
//                     <Button variant="danger" onClick={() => removeItem(index)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}

//         {cart.length > 0 && (
//           <div className="text-end mt-3">
//             <h4>Total Amount: ₹{calculateTotal()}</h4>
//             <Button variant="primary" as={Link} to="/checkout" className="mt-2">
//               Proceed to Checkout
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Table, Button , Breadcrumb} from "react-bootstrap";
// import { FaShoppingCart, FaTrash } from "react-icons/fa";
// import NavigationBar from "../components/Navbar";
// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (index, quantity) => {
//     const updatedCart = [...cart];
//     if (quantity > 0) {
//       updatedCart[index].quantity = quantity;
//     } else {
//       updatedCart.splice(index, 1); // Remove item if quantity is 0
//     }
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity) || 1;
//       const gstRate = isNaN(parseFloat(item.gst)) ? 0 : parseFloat(item.gst) / 100; 
//       const itemTotal = price * quantity * (1 + gstRate);
//       return total + itemTotal;
//     }, 0).toFixed(2);
//   };
  
  
//   return (
//     <>
     

//       <div className="container mt-4">
//       <div className="container mt-5 pt-3">
//         <Breadcrumb>
//           <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//           <Breadcrumb.Item active>Cart</Breadcrumb.Item>
//         </Breadcrumb>
//       </div>
//       <NavigationBar/>
//         <h2>Your Cart</h2>
//         {cart.length > 0 ? (
//           <Table striped bordered hover className="mt-3">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total (with GST)</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
//                 <tr key={index}>
//                   <td>
//                     <img src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`} alt={item.name} width="60" className="rounded" />
//                   </td>
//                   <td>{item.name}</td>
//                   <td>₹{parseFloat(item.price).toFixed(2)}</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
//                       className="form-control"
//                       style={{ width: "80px" }}
//                     />
//                   </td>
//                   {/* <td>₹{(parseFloat(item.price) * parseInt(item.quantity) * (1 + (parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0))).toFixed(2)}</td> */}
//                   <td>₹{(parseFloat(item.price) * parseInt(item.quantity) * (1 + (isNaN(parseFloat(item.gst)) ? 0 : parseFloat(item.gst) / 100))).toFixed(2)}</td>

//                   <td>
//                     <Button variant="danger" onClick={() => removeItem(index)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}

//         {cart.length > 0 && (
//           <div className="text-end mt-3">
//             <h4>Total Amount: ₹{calculateTotal()}</h4>
//             <Button variant="primary" as={Link} to="/checkout" className="mt-2">
//               Proceed to Checkout
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Divider,
//   TextField,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavigationBar from "../components/Navbar";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import "./styles/Cart.css";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   // Load cart from localStorage on mount and ensure totalWithGST is calculated
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const initializedCart = storedCart.map((item) => ({
//       ...item,
//       totalWithGST: item.totalWithGST || calculateTotalWithGST(item), // Ensure totalWithGST is set
//     }));
//     setCartItems(initializedCart);
//   }, []);

//   // Calculate total amount whenever cart changes
//   useEffect(() => {
//     const total = cartItems.reduce((sum, item) => sum + (item.totalWithGST || 0), 0);
//     setTotalAmount(total.toFixed(2));
//   }, [cartItems]);

//   // Helper function to calculate totalWithGST
//   const calculateTotalWithGST = (item) => {
//     const gstRate = item.gst ? item.gst / 100 : 0;
//     return item.price * (1 + gstRate) * (item.quantity || 1);
//   };

//   // Update quantity of an item
//   const handleUpdateQuantity = (variantId, newQuantity) => {
//     const updatedCart = cartItems.map((item) => {
//       if (item.variantId === variantId) {
//         const quantity = Math.max(1, Math.min(newQuantity || 1, item.stock || Infinity)); // Default to 1 if NaN
//         const totalWithGST = calculateTotalWithGST({ ...item, quantity });
//         return { ...item, quantity, totalWithGST };
//       }
//       return item;
//     });
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Remove item from cart
//   const handleRemoveItem = (variantId) => {
//     const updatedCart = cartItems.filter((item) => item.variantId !== variantId);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Proceed to checkout (placeholder logic)
//   const handleCheckout = () => {
//     alert("Proceeding to checkout!");
//     navigate("/checkout"); // Example route
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" },
//       secondary: { main: "#FF5722" },
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
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             padding: "10px 20px",
//             "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//           },
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

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 1200, mx: "auto", p: 4, pt: 10 }}>
//           <Typography variant="h4" sx={{ color: "primary.main", mb: 3 }}>
//             Your Cart
//           </Typography>

//           <Card>
//             <CardContent>
//               {cartItems.length === 0 ? (
//                 <Box sx={{ textAlign: "center", py: 4 }}>
//                   <ShoppingCartIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
//                   <Typography variant="h6" color="text.secondary">
//                     Your cart is empty.
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => navigate("/products")}
//                     sx={{ mt: 2 }}
//                   >
//                     Start Shopping
//                   </Button>
//                 </Box>
//               ) : (
//                 <>
//                   <TableContainer>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Product</TableCell>
//                           <TableCell align="right">Size</TableCell>
//                           <TableCell align="right">Price</TableCell>
//                           <TableCell align="right">GST (%)</TableCell>
//                           <TableCell align="right">Quantity</TableCell>
//                           <TableCell align="right">Total</TableCell>
//                           <TableCell align="right">Action</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {cartItems.map((item) => (
//                           <TableRow
//                             key={item.variantId}
//                             sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}
//                           >
//                             <TableCell>
//                               <Box sx={{ display: "flex", alignItems: "center" }}>
//                                 {item.image && (
//                                   <img
//                                     src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`}
//                                     alt={item.name}
//                                     style={{ width: 50, height: 50, borderRadius: "4px", marginRight: 8 }}
//                                     onError={(e) => (e.target.style.display = "none")} // Hide broken images
//                                   />
//                                 )}
//                                 <Typography>{item.name || "Unknown Product"}</Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">{item.variantSize || "N/A"}</TableCell>
//                             <TableCell align="right">₹{(item.price || 0).toFixed(2)}</TableCell>
//                             <TableCell align="right">{item.gst || 0}</TableCell>
//                             <TableCell align="right">
//                               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => handleUpdateQuantity(item.variantId, (item.quantity || 1) - 1)}
//                                   disabled={(item.quantity || 1) <= 1}
//                                 >
//                                   <RemoveIcon />
//                                 </IconButton>
//                                 <TextField
//                                   type="number"
//                                   value={item.quantity || 1}
//                                   onChange={(e) =>
//                                     handleUpdateQuantity(item.variantId, parseInt(e.target.value, 10))
//                                   }
//                                   variant="outlined"
//                                   size="small"
//                                   sx={{ width: "60px", mx: 1 }}
//                                   inputProps={{ min: 1, max: item.stock || Infinity }}
//                                 />
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => handleUpdateQuantity(item.variantId, (item.quantity || 1) + 1)}
//                                   disabled={(item.quantity || 1) >= (item.stock || Infinity)}
//                                 >
//                                   <AddIcon />
//                                 </IconButton>
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">
//                               ₹{(item.totalWithGST || 0).toFixed(2)}
//                             </TableCell>
//                             <TableCell align="right">
//                               <IconButton
//                                 color="secondary"
//                                 onClick={() => handleRemoveItem(item.variantId)}
//                               >
//                                 <DeleteIcon />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>

//                   <Divider sx={{ my: 3 }} />

//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                       Total Amount: ₹{totalAmount}
//                     </Typography>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       startIcon={<ShoppingCartIcon />}
//                       onClick={handleCheckout}
//                       sx={{ px: 4, py: 1.5 }}
//                     >
//                       Proceed to Checkout
//                     </Button>
//                   </Box>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  TextField,
  Breadcrumbs,
  Container,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavigationBar from "../components/Navbar"; // Updated NavigationBar
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home"; // For breadcrumbs
import { motion } from "framer-motion"; // Install: npm install framer-motion

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [darkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  // Load cart from localStorage on mount and ensure totalWithGST is calculated
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map((item) => ({
      ...item,
      totalWithGST: item.totalWithGST || calculateTotalWithGST(item), // Ensure totalWithGST is set
    }));
    setCartItems(initializedCart);

    // Handle window resize for mobile detection
    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total amount whenever cart changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.totalWithGST || 0), 0);
    setTotalAmount(total.toFixed(2));
  }, [cartItems]);

  // Helper function to calculate totalWithGST
  const calculateTotalWithGST = (item) => {
    const gstRate = item.gst ? item.gst / 100 : 0;
    return item.price * (1 + gstRate) * (item.quantity || 1);
  };

  // Update quantity of an item
  const handleUpdateQuantity = (variantId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.variantId === variantId) {
        const quantity = Math.max(1, Math.min(newQuantity || 1, item.stock || Infinity)); // Default to 1 if NaN
        const totalWithGST = calculateTotalWithGST({ ...item, quantity });
        return { ...item, quantity, totalWithGST };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const handleRemoveItem = (variantId) => {
    const updatedCart = cartItems.filter((item) => item.variantId !== variantId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Proceed to checkout (placeholder logic)
  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    navigate("/checkout"); // Example route
  };

  // Theme configuration with green agriculture palette
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
      background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
      text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
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
            bgcolor: darkMode ? "#263238" : "#fff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontSize: { xs: "0.9rem", md: "1rem" },
            py: 1,
            px: 2,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: { backgroundColor: darkMode ? "#2E7D32" : "#388E3C", color: "#FFF", fontWeight: "bold" },
          body: { padding: { xs: "8px", md: "12px" } },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
              borderRadius: "8px",
              "& fieldset": { borderColor: darkMode ? "#A5D6A7" : "#81C784" },
              "&:hover fieldset": { borderColor: darkMode ? "#81C784" : "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: darkMode ? "#66BB6A" : "#388E3C" },
            },
          },
        },
      },
    },
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <NavigationBar />

        {/* Breadcrumbs */}
        {/* <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9" }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
            <Link to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", md: "1.2rem" } }} /> Home
            </Link>
            <Typography sx={{ color: "text.primary" }}>Cart</Typography>
          </Breadcrumbs> */}
        {/* </Box> */}

        {/* Cart Content */}
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 4 } }}
        >
         <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
            <Link to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", md: "1.2rem" } }} /> Home
            </Link>
            <Typography sx={{ color: "text.primary" }}>Cart</Typography>
          </Breadcrumbs>
         
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ color: "primary.main", mb: 3, fontWeight: "bold" }}
          >
            Your Cart
          </Typography>

          <Card>
            <CardContent>
              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
                  <ShoppingCartIcon sx={{ fontSize: { xs: 40, md: 60 }, color: "text.secondary", mb: 2 }} />
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{ color: "text.secondary", mb: 2 }}
                  >
                    Your cart is empty.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/products")}
                    sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 } }}
                  >
                    Start Shopping
                  </Button>
                </Box>
              ) : (
                <>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Size</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">GST (%)</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow
                            key={item.variantId}
                            sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9" } }}
                          >
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {item.image && (
                                  <img
                                    src={`https://agrihub-backend-tz4v.onrender.com/${item.image}`}
                                    alt={item.name}
                                    style={{
                                      width: isMobile ? 40 : 50,
                                      height: isMobile ? 40 : 50,
                                      borderRadius: "4px",
                                      marginRight: 2,
                                    }}
                                    onError={(e) => (e.target.style.display = "none")}
                                  />
                                )}
                                <Typography
                                  variant={isMobile ? "body2" : "body1"}
                                  sx={{ color: "text.primary" }}
                                >
                                  {item.name || "Unknown Product"}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant={isMobile ? "caption" : "body2"}
                                sx={{ color: "text.secondary" }}
                              >
                                {item.variantSize || "N/A"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant={isMobile ? "caption" : "body2"}
                                sx={{ color: "text.primary" }}
                              >
                                ₹{(item.price || 0).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant={isMobile ? "caption" : "body2"}
                                sx={{ color: "text.secondary" }}
                              >
                                {item.gst || 0}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleUpdateQuantity(item.variantId, (item.quantity || 1) - 1)}
                                  disabled={(item.quantity || 1) <= 1}
                                  sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <TextField
                                  type="number"
                                  value={item.quantity || 1}
                                  onChange={(e) =>
                                    handleUpdateQuantity(item.variantId, parseInt(e.target.value, 10))
                                  }
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    width: isMobile ? "40px" : "60px",
                                    mx: 1,
                                    "& .MuiOutlinedInput-root": {
                                      bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
                                    },
                                  }}
                                  inputProps={{ min: 1, max: item.stock || Infinity }}
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => handleUpdateQuantity(item.variantId, (item.quantity || 1) + 1)}
                                  disabled={(item.quantity || 1) >= (item.stock || Infinity)}
                                  sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant={isMobile ? "caption" : "body2"}
                                sx={{ color: "text.primary", fontWeight: "bold" }}
                              >
                                ₹{(item.totalWithGST || 0).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                color="secondary"
                                onClick={() => handleRemoveItem(item.variantId)}
                                sx={{ color: darkMode ? "#E57373" : "#D32F2F" }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

                  <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 2 : 0 }}>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h5"}
                      sx={{ fontWeight: "bold", color: "primary.main", mb: isMobile ? 1 : 0 }}
                    >
                      Total Amount: ₹{totalAmount}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={handleCheckout}
                      sx={{
                        px: { xs: 2, md: 4 },
                        py: { xs: 0.5, md: 1.5 },
                        bgcolor: darkMode ? "#66BB6A" : "#388E3C",
                        "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Footer Section */}
        <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} AgriHub. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Cart;