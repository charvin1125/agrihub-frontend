// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const navigate = useNavigate();

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleCheckout = async (e) => {
//     e.preventDefault();
    
//     if (!customerName || !phone || !address || !crop) {
//       alert("Please fill in all the fields!");
//       return;
//     }

//   const orderData = {
//     customerName,
//     phone,
//     address,
//     crop,
//     products: cart.map(item => ({
//       productId: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//     })),
//     totalAmount,
//     paymentMethod,
//   };

//   try {
//     const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//       withCredentials: true, // 🔥 Ensure cookies (session) are sent
//     });
//     alert("Order placed successfully! Order ID: " + response.data.order.orderId);
//     clearCart();
//     navigate("/order-success");
//   } catch (error) {
//     console.error("Error placing order:", error.response ? error.response.data : error.message);
//     alert("Failed to place order. Check console for details.");
//   }
// };
//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Checkout</h2>
      
//       <div className="row">
//         <div className="col-md-6">
//           <form onSubmit={handleCheckout}>
            // <div className="mb-3">
            //   <label className="form-label">Full Name</label>
            //   <input
            //     type="text"
            //     className="form-control"
            //     value={customerName}
            //     onChange={(e) => setCustomerName(e.target.value)}
            //     required
            //   />
            // </div>
            
            // <div className="mb-3">
            //   <label className="form-label">Phone Number</label>
            //   <input
            //     type="tel"
            //     className="form-control"
            //     value={phone}
            //     onChange={(e) => setPhone(e.target.value)}
            //     required
            //   />
            // </div>

            // <div className="mb-3">
            //   <label className="form-label">Address</label>
            //   <textarea
            //     className="form-control"
            //     value={address}
            //     onChange={(e) => setAddress(e.target.value)}
            //     required
            //   ></textarea>
            // </div>

            // <div className="mb-3">
            //   <label className="form-label">For Which Crop Are You Buying This Product?</label>
            //   <input
            //     type="text"
            //     className="form-control"
            //     value={crop}
            //     onChange={(e) => setCrop(e.target.value)}
            //     required
            //   />
            // </div>

            // <div className="mb-3">
            //   <label className="form-label">Payment Method</label>
            //   <select
            //     className="form-control"
            //     value={paymentMethod}
            //     onChange={(e) => setPaymentMethod(e.target.value)}
            //   >
            //     <option value="Pay Later">Pay Later</option>
            //     <option value="Card">Card</option>
            //     <option value="Cash">Cash</option>
            //   </select>
            // </div>

//             <button type="submit" className="btn btn-success w-100">
//               Place Order
//             </button>
//           </form>
//         </div>

//         <div className="col-md-6">
//           <h4>Order Summary</h4>
//           <ul className="list-group">
//             {cart.map((item) => (
//               <li key={item._id} className="list-group-item d-flex justify-content-between">
//                 <div>
//                   <strong>{item.name}</strong> x {item.quantity}
//                 </div>
//                 <span>₹{item.price * item.quantity}</span>
//               </li>
//             ))}
//           </ul>
//           <h5 className="mt-3">Total: ₹{totalAmount}</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const [currentCart, setCurrentCart] = useState(cart);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCurrentCart(storedCart); // ✅ Always get the latest cart from localStorage
//   }, []);

//   // const totalAmount = currentCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const totalAmount = currentCart.reduce((sum, item) => {
//     const price = parseFloat(item.price) || 0;
//     const quantity = parseInt(item.quantity) || 1;
//     const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0; 
//     const itemTotal = price * quantity * (1 + gstRate);
//     return sum + itemTotal;
//   }, 0).toFixed(2);
  

// const handleCheckout = async (e) => {
//   e.preventDefault();

//   if (!customerName || !phone || !address || !crop) {
//     alert("Please fill in all the fields!");
//     return;
//   }

//   try {
//     // ✅ Fetch latest stock before placing order
//     console.log("Fetching stock data...");
//     const { data: productsData } = await axios.get("https://agrihub-backend.onrender.com/api/product/list");

//     console.log("Fetched products data:", productsData);
//     console.log("Current Cart:", currentCart);

//     for (const item of currentCart) {
//       const product = productsData.find((p) => p._id === item._id);

//       if (!product) {
//         alert(`Product ${item.name} not found in stock!`);
//         return;
//       }

//       if (product.stock < item.quantity) {
//         alert(`Not enough stock for ${item.name}. Available: ${product.stock}`);
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching stock data:", error);
//     alert("Error verifying stock. Please try again.");
//     return;
//   }

//   const orderData = {
//     customerName,
//     phone,
//     address,
//     crop,
//     products: currentCart.map((item) => ({
//       productId: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//     })),
//     totalAmount,
//     paymentMethod,
//   };

//   try {
//     console.log("Sending order data:", orderData);
    
//     const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//       withCredentials: true,
//     });

//     console.log("Order Response:", response.data);

//     if (response.data.success) {
//       alert("Order placed successfully! Order ID: " + response.data.order.orderId);
//       clearCart();
//       navigate("/order-success");
//     } else {
//       alert("Order placement failed. Try again.");
//     }
//   } catch (error) {
//     console.error("Error placing order:", error.response ? error.response.data : error.message);
//     alert("Failed to place order. Check console for details.");
//   }
// };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Checkout</h2>

//       <div className="row">
//         <div className="col-md-6">
//           <form onSubmit={handleCheckout}>
//             {/* Form Fields */}
//             <div className="mb-3">
//               <label className="form-label">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerName}
//                 onChange={(e) => setCustomerName(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="mb-3">
//               <label className="form-label">Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Address</label>
//               <textarea
//                 className="form-control"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               ></textarea>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">For Which Crop Are You Buying This Product?</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Payment Method</label>
//               <select
//                 className="form-control"
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               >
//                 <option value="Pay Later">Pay Later</option>
//                 <option value="Card">Card</option>
//                 <option value="Cash">Cash</option>
//               </select>
//             </div>

//             <button type="submit" className="btn btn-success w-100">
//               Place Order
//             </button>
//           </form>
//         </div>

//         <div className="col-md-6">
//           <h4>Order Summary</h4>
//           <ul className="list-group">
//             {currentCart.map((item) => (
//               <li key={item._id} className="list-group-item d-flex justify-content-between">
//                 <div>
//                   <strong>{item.name}</strong>({item.price}) x {item.quantity}
//                 </div>
//                 {/* <span>₹{item.price * item.quantity}</span> */}
//                 <span>₹{(item.price * item.quantity * (1 + (parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0))).toFixed(2)}</span>

//               </li>
//             ))}
//           </ul>
//           <h5 className="mt-3">Total: ₹{totalAmount}</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar, Form, Button, Row, Col } from "react-bootstrap";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Now");

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity) || 1;
//       const gstRate = isNaN(parseFloat(item.gst)) ? 0 : parseFloat(item.gst) / 100;
//       const itemTotal = price * quantity * (1 + gstRate);
//       return total + itemTotal;
//     }, 0).toFixed(2);
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (!customerName || !phone || !address) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const orderData = {
//       customerName,
//       phone,
//       address,
//       crop: cart.map(item => item.name).join(", "), // Assuming cart contains crop details
//       products: cart.map(item => ({
//         productId: item.id, // Assuming item has an 'id' field
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         gst: item.gst,
//       })),
//       totalAmount: calculateTotal(),
//       paymentMethod,
//     };

//     try {
//       // Make API request to place the order
//       const response = await fetch("https://agrihub-backend.onrender.com/api/orders/place", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();
//       if (response.status === 201) {
//         alert("Order placed successfully!");
//         // Redirect to order confirmation page or order history
//         navigate(`/order/${result.orderId}`);
//       } else {
//         alert(result.error || "Error placing order");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("There was an error placing your order.");
//     }
//   };

//   return (
//     <>
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand href="/">AgriHub</Navbar.Brand>
//       </Navbar>

//       <div className="container mt-4">
//         <h2>Checkout</h2>
//         <Form onSubmit={handlePlaceOrder}>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="customerName">
//                 <Form.Label>Customer Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="phone">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="tel"
//                   placeholder="Enter your phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group controlId="address" className="mt-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="paymentMethod" className="mt-3">
//             <Form.Label>Payment Method</Form.Label>
//             <Form.Control
//               as="select"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="Pay Now">Pay Now</option>
//               <option value="Pay Later">Pay Later</option>
//             </Form.Control>
//           </Form.Group>

//           <div className="text-end mt-3">
//             <h4>Total Amount: ₹{calculateTotal()}</h4>
//             <Button type="submit" variant="primary" className="mt-2">
//               Place Order
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Checkout;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar, Form, Button, Row, Col, Table } from "react-bootstrap";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Now");
//   const [productCrops, setProductCrops] = useState({});

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     console.log(storedCart); // Check the cart structure in the console
//     setCart(storedCart);
//   }, []);

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity) || 1;
//       const gstRate = isNaN(parseFloat(item.gst)) ? 0 : parseFloat(item.gst) / 100;
//       const itemTotal = price * quantity * (1 + gstRate);
//       return total + itemTotal;
//     }, 0).toFixed(2);
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (!customerName || !phone || !address) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const productsWithCrops = cart.map((item) => ({
//       productId: item.id, // Assuming item has 'id' field
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price,
//       gst: item.gst,
//       crop: productCrops[item.id] || "", // Get the selected crop for each product
//     }));

//     const orderData = {
//       customerName,
//       phone,
//       address,
//       crop: productsWithCrops.map(item => item.crop).join(", "), 
//       products: productsWithCrops,
//       totalAmount: calculateTotal(),
//       paymentMethod,
//     };

//     try {
//       const response = await fetch("https://agrihub-backend.onrender.com/api/order/place", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();
//       if (response.status === 201) {
//         alert("Order placed successfully!");
//         navigate(`/order/${result.orderId}`);
//       } else {
//         alert(result.error || "Error placing order");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("There was an error placing your order.");
//     }
//   };

//   const handleCropChange = (e, productId) => {
//     setProductCrops({
//       ...productCrops,
//       [productId]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand href="/">AgriHub</Navbar.Brand>
//       </Navbar>

//       <div className="container mt-4">
//         <h2>Checkout</h2>
//         <Form onSubmit={handlePlaceOrder}>
//           <Row>
//             <Col md={6}>
//               <Form.Group controlId="customerName">
//                 <Form.Label>Customer Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group controlId="phone">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="tel"
//                   placeholder="Enter your phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group controlId="address" className="mt-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <h4 className="mt-4">Products in Cart</h4>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 <th>GST</th>
//                 <th>Crop</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
                
//                 <tr key={item.id || index}>
//   <td>{item.name}</td>
//   <td>{item.quantity}</td>
//   <td>₹{parseFloat(item.price).toFixed(2)}</td>
//   <td>{parseFloat(item.gst).toFixed(2)}%</td>
//   <td>
//     <Form.Control
//       type="text"
//       placeholder="Enter crop"
//       value={productCrops[item.id] || ""}
//       onChange={(e) => handleCropChange(e, item.id)}
//     />
//   </td>
// </tr>

//               ))}
//             </tbody>
//           </Table>

//           <Form.Group controlId="paymentMethod" className="mt-3">
//             <Form.Label>Payment Method</Form.Label>
//             <Form.Control
//               as="select"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="Pay Now">Pay Now</option>
//               <option value="Pay Later">Pay Later</option>
//             </Form.Control>
//           </Form.Group>

//           <div className="text-end mt-3">
//             <h4>Total Amount: ₹{calculateTotal()}</h4>
//             <Button type="submit" variant="primary" className="mt-2">
//               Place Order
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Checkout;
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Navbar, Nav } from "react-bootstrap";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const [currentCart, setCurrentCart] = useState(cart);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCurrentCart(storedCart);

//     const savedData = JSON.parse(localStorage.getItem("savedCustomerData")) || {};
//     setCustomerName(savedData.customerName || "");
//     setPhone(savedData.phone || "");
//     setPincode(savedData.pincode || "");
//     setAddress(savedData.address || "");
//   }, []);

//   const totalAmount = currentCart
//     .reduce((sum, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//       return sum + price * quantity * (1 + gstRate);
//     }, 0)
//     .toFixed(2);

//   // const handleOrder = async () => {
//   //   if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//   //     alert("Please fill all required fields.");
//   //     return;
//   //   }

//   //   const orderData = {
//   //     name: customerName.trim(),
//   //     phone: phone.trim(),
//   //     address: address.trim(),
//   //     pincode: pincode.trim(),
//   //     crop: crop.trim(),
//   //     paymentMethod: paymentMethod,
//   //     totalAmount: parseFloat(totalAmount),
//   //     cart: currentCart.map((item) => ({
//   //       productId: item._id,
//   //       name: item.name,
//   //       price: parseFloat(item.price),
//   //       quantity: parseInt(item.quantity, 10),
//   //       gst: parseFloat(item.gst) || 0,
//   //     })),
//   //   };

//   //   console.log("Sending order data:", JSON.stringify(orderData, null, 2));

//   //   try {
//   //     const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//   //       withCredentials: true,
//   //     });

//   //     if (response.data.success) {
//   //       alert("Order placed successfully!");
//   //       localStorage.setItem("savedCustomerData", JSON.stringify({ customerName, phone, pincode, address }));
//   //       localStorage.removeItem("cart");
//   //       clearCart();
//   //       navigate("/order-success");
//   //     } else {
//   //       alert("Order failed. Try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error placing order:", error.response ? error.response.data : error.message);
//   //     alert("Failed to place order. Check console for details.");
//   //   }
//   // };
//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }
  
//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod: paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: currentCart.map((item) => ({
//         productId: item._id,
//         variantId: item.variantId, // Ensure this is present and valid
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };
    
//     console.log("Sending order data:", JSON.stringify(orderData, null, 2));
  
//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//         withCredentials: true,
//       });
  
//       if (response.data.success) {
//         alert("Order placed successfully!");
//         localStorage.setItem("savedCustomerData", JSON.stringify({ customerName, phone, pincode, address }));
//         localStorage.removeItem("cart");
//         clearCart();
//         navigate("/order-success");
//       } else {
//         alert(response.data.message || "Order failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };
  
//   return (
//     <>
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand href="/">AgriHub</Navbar.Brand>
//         <Nav className="ms-auto">
//           <Nav.Link href="/cart" className="text-white">
//             Cart ({currentCart.length})
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       <div className="container mt-4">
//         <h2>Checkout</h2>

//         <Form className="mt-3">
//           <Form.Group>
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mt-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mt-3">
//             <Form.Label>Pincode</Form.Label>
//             <Form.Control type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mt-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mt-3">
//             <Form.Label>For Which Crop Are You Buying?</Form.Label>
//             <Form.Control type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mt-3">
//             <Form.Label>Payment Method</Form.Label>
//             <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//               <option value="Pay Later">Pay Later</option>
//               <option value="Card">Card</option>
//               <option value="Cash">Cash</option>
//             </Form.Select>
//           </Form.Group>

//           <div className="text-end mt-4">
//             <h4>Total Amount: ₹{totalAmount}</h4>
//             <Button variant="success" className="mt-3" onClick={handleOrder}>
//               Place Order
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Checkout;
//after add styling
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import NavigationBar from "../components/Navbar"; // Use Latest Navbar

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const [currentCart, setCurrentCart] = useState(cart);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCurrentCart(storedCart);

//     const savedData = JSON.parse(localStorage.getItem("savedCustomerData")) || {};
//     setCustomerName(savedData.customerName || "");
//     setPhone(savedData.phone || "");
//     setPincode(savedData.pincode || "");
//     setAddress(savedData.address || "");
//   }, []);

//   const totalAmount = currentCart
//     .reduce((sum, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//       return sum + price * quantity * (1 + gstRate);
//     }, 0)
//     .toFixed(2);

//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod: paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: currentCart.map((item) => ({
//         productId: item._id,
//         variantId: item.variantId,
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };

//     console.log("Sending order data:", JSON.stringify(orderData, null, 2));

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         alert("Order placed successfully!");
//         localStorage.setItem("savedCustomerData", JSON.stringify({ customerName, phone, pincode, address }));
//         localStorage.removeItem("cart");
//         clearCart();
//         navigate("/order-success");
//       } else {
//         alert(response.data.message || "Order failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };

//   return (
    
    
//     <div className="container mt-5 pt-4" style={{ maxWidth: "600px" }}>
//         <NavigationBar />
//         <h2 className="text-center mb-4 mt-12">Checkout</h2>
//         <Form className="p-4 border rounded shadow bg-white">
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Pincode</Form.Label>
//             <Form.Control type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>For Which Crop Are You Buying?</Form.Label>
//             <Form.Control type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Payment Method</Form.Label>
//             <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//               <option value="Pay Later">Pay Later</option>
//               <option value="Card">Card</option>
//               <option value="Cash">Cash</option>
//             </Form.Select>
//           </Form.Group>

//           <div className="text-center mt-4">
//             <h4>Total Amount: <span className="text-success fw-bold">₹{totalAmount}</span></h4>
//             <Button variant="success" className="mt-3 w-100 py-2 fs-5" onClick={handleOrder}>
//               Place Order
//             </Button>
//           </div>
//         </Form>
//       </div>
    
//   );
// };

// export default Checkout;
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Breadcrumb } from "react-bootstrap";
// import axios from "axios";
// import { CartContext } from "../context/CartContext";
// import NavigationBar from "../components/Navbar"; // Use Latest Navbar

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const [currentCart, setCurrentCart] = useState(cart);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCurrentCart(storedCart);

//     const savedData = JSON.parse(localStorage.getItem("savedCustomerData")) || {};
//     setCustomerName(savedData.customerName || "");
//     setPhone(savedData.phone || "");
//     setPincode(savedData.pincode || "");
//     setAddress(savedData.address || "");
//   }, []);

//   const totalAmount = currentCart
//     .reduce((sum, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//       return sum + price * quantity * (1 + gstRate);
//     }, 0)
//     .toFixed(2);

//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod: paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: currentCart.map((item) => ({
//         productId: item._id,
//         variantId: item.variantId,
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };

//     console.log("Sending order data:", JSON.stringify(orderData, null, 2));

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         alert("Order placed successfully!");
//         localStorage.setItem("savedCustomerData", JSON.stringify({ customerName, phone, pincode, address }));
//         localStorage.removeItem("cart");
//         clearCart();
//         navigate("/order-success");
//       } else {
//         alert(response.data.message || "Order failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     }
//   };

//   return (
//     <>
//       <NavigationBar />

//       {/* Breadcrumbs */}
      
//       <div className="container mt-5 pt-3">
//         <Breadcrumb>
//           <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//           <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
//           <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
//         </Breadcrumb>
//       </div>
//       {/* Checkout Form */}
//       <div className="container mt-4 pt-2" style={{ maxWidth: "600px" }}>
//         <h2 className="text-center mb-4">Checkout</h2>

//         <Form className="p-4 border rounded shadow bg-white">
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Full Name</Form.Label>
//             <Form.Control type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Phone Number</Form.Label>
//             <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Pincode</Form.Label>
//             <Form.Control type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Address</Form.Label>
//             <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">For Which Crop Are You Buying?</Form.Label>
//             <Form.Control type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Payment Method</Form.Label>
//             <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//               <option value="Pay Later">Pay Later</option>
//               <option value="Card">Card</option>
//               <option value="Cash">Cash</option>
//             </Form.Select>
//           </Form.Group>

//           <div className="text-center mt-4">
//             <h4>Total Amount: <span className="text-success fw-bold">₹{totalAmount}</span></h4>
//             <Button variant="success" className="mt-3 w-100 py-2 fs-5" onClick={handleOrder}>
//               Place Order
//             </Button>
//           </div>
//         </Form>
//       </div>
      
//     </>
//   );
// };

// export default Checkout;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Breadcrumbs,
//   Link,
//   InputAdornment,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavigationBar from "../components/Navbar";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn"; // Corrected import
// import AgricultureIcon from "@mui/icons-material/Agriculture";
// import PaymentIcon from "@mui/icons-material/Payment";
// import HomeIcon from "@mui/icons-material/Home";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import "./styles/Checkout.css";

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Load cart and saved data from localStorage on mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);

//     const savedData = JSON.parse(localStorage.getItem("savedCustomerData")) || {};
//     setCustomerName(savedData.customerName || "");
//     setPhone(savedData.phone || "");
//     setPincode(savedData.pincode || "");
//     setAddress(savedData.address || "");
//   }, []);

//   // Calculate total amount
//   const totalAmount = cart
//     .reduce((sum, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//       return sum + price * quantity * (1 + gstRate);
//     }, 0)
//     .toFixed(2);

//   // Handle order submission
//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     setLoading(true);
//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: cart.map((item) => ({
//         productId: item.productId || item._id, // Fallback to _id if productId is missing
//         variantId: item.variantId,
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };

//     console.log("Sending order data:", JSON.stringify(orderData, null, 2));

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         alert("Order placed successfully!");
//         localStorage.setItem("savedCustomerData", JSON.stringify({ customerName, phone, pincode, address }));
//         localStorage.removeItem("cart");
//         setCart([]);
//         navigate("/order-success");
//       } else {
//         alert(response.data.message || "Order failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
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
//             borderRadius: "16px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//             background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             padding: "12px 24px",
//             "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               "&:hover fieldset": { borderColor: "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 800, mx: "auto", p: 4, pt: 10 }}>
//           {/* Breadcrumbs */}
//           <Breadcrumbs sx={{ mb: 3 }}>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <HomeIcon sx={{ mr: 0.5 }} />
//                 Home
//               </Box>
//             </Link>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/cart")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <ShoppingCartIcon sx={{ mr: 0.5 }} />
//                 Cart
//               </Box>
//             </Link>
//             <Typography color="primary.main">Checkout</Typography>
//           </Breadcrumbs>

//           <Typography variant="h4" sx={{ color: "primary.main", mb: 3, textAlign: "center" }}>
//             Checkout
//           </Typography>

//           <Card>
//             <CardContent sx={{ p: 4 }}>
//               <form>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PhoneIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Pincode"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     variant="outlined"
//                     required
//                     multiline
//                     rows={3}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="For Which Crop Are You Buying?"
//                     value={crop}
//                     onChange={(e) => setCrop(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <AgricultureIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <FormControl fullWidth>
//                     <InputLabel>Payment Method</InputLabel>
//                     <Select
//                       value={paymentMethod}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       label="Payment Method"
//                       required
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <PaymentIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       }
//                     >
//                       <MenuItem value="Pay Later">Pay Later</MenuItem>
//                       <MenuItem value="Card">Card</MenuItem>
//                       <MenuItem value="Cash">Cash</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />

//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
//                     Total Amount: <span style={{ color: "#4CAF50" }}>₹{totalAmount}</span>
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleOrder}
//                     disabled={loading || cart.length === 0}
//                     sx={{ py: 1.5, fontSize: "1.1rem", width: "50%" }}
//                   >
//                     {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
//                   </Button>
//                 </Box>
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Checkout;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Breadcrumbs,
//   Link,
//   InputAdornment,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavigationBar from "../components/Navbar";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AgricultureIcon from "@mui/icons-material/Agriculture";
// import PaymentIcon from "@mui/icons-material/Payment";
// import HomeIcon from "@mui/icons-material/Home";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import "./styles/Checkout.css";

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [user, setUser] = useState(null);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch user profile and cart on mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);

//         // Load user-specific saved data from localStorage
//         const savedDataKey = `savedCustomerData_${response.data.username}`;
//         const savedData = JSON.parse(localStorage.getItem(savedDataKey)) || {};
//         setCustomerName(savedData.customerName || response.data.firstName || "");
//         setPhone(savedData.phone || response.data.mobile || "");
//         setPincode(savedData.pincode || "");
//         setAddress(savedData.address || "");
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         navigate("/login"); // Redirect to login if not authenticated
//       }
//     };

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);

//     fetchUserProfile();
//   }, [navigate]);

//   // Calculate total amount
//   const totalAmount = cart
//     .reduce((sum, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity, 10) || 1;
//       const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//       return sum + price * quantity * (1 + gstRate);
//     }, 0)
//     .toFixed(2);

//   // Handle order submission
//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     setLoading(true);
//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: cart.map((item) => ({
//         productId: item.productId || item._id,
//         variantId: item.variantId,
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };

//     console.log("Sending order data:", JSON.stringify(orderData, null, 2));

//     try {
//       const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         alert("Order placed successfully!");
//         const savedDataKey = `savedCustomerData_${user.username}`;
//         localStorage.setItem(savedDataKey, JSON.stringify({ customerName, phone, pincode, address }));
//         localStorage.removeItem("cart");
//         setCart([]);
//         navigate("/order-success");
//       } else {
//         alert(response.data.message || "Order failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
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
//             borderRadius: "16px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//             background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             padding: "12px 24px",
//             "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               "&:hover fieldset": { borderColor: "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 800, mx: "auto", p: 4, pt: 10 }}>
//           {/* Breadcrumbs */}
//           <Breadcrumbs sx={{ mb: 3 }}>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <HomeIcon sx={{ mr: 0.5 }} />
//                 Home
//               </Box>
//             </Link>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/cart")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <ShoppingCartIcon sx={{ mr: 0.5 }} />
//                 Cart
//               </Box>
//             </Link>
//             <Typography color="primary.main">Checkout</Typography>
//           </Breadcrumbs>

//           <Typography variant="h4" sx={{ color: "primary.main", mb: 3, textAlign: "center" }}>
//             Checkout
//           </Typography>

//           <Card>
//             <CardContent sx={{ p: 4 }}>
//               <form>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PhoneIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Pincode"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     variant="outlined"
//                     required
//                     multiline
//                     rows={3}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="For Which Crop Are You Buying?"
//                     value={crop}
//                     onChange={(e) => setCrop(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <AgricultureIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <FormControl fullWidth>
//                     <InputLabel>Payment Method</InputLabel>
//                     <Select
//                       value={paymentMethod}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       label="Payment Method"
//                       required
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <PaymentIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       }
//                     >
//                       <MenuItem value="Pay Later">Pay Later</MenuItem>
//                       <MenuItem value="Card">Card</MenuItem>
//                       <MenuItem value="Cash">Cash</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />

//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
//                     Total Amount: <span style={{ color: "#4CAF50" }}>₹{totalAmount}</span>
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleOrder}
//                     disabled={loading || cart.length === 0}
//                     sx={{ py: 1.5, fontSize: "1.1rem", width: "50%" }}
//                   >
//                     {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
//                   </Button>
//                 </Box>
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Checkout;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Breadcrumbs,
//   Link,
//   InputAdornment,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavigationBar from "../components/Navbar";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AgricultureIcon from "@mui/icons-material/Agriculture";
// import PaymentIcon from "@mui/icons-material/Payment";
// import HomeIcon from "@mui/icons-material/Home";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import "./styles/Checkout.css";

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [user, setUser] = useState(null);
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [address, setAddress] = useState("");
//   const [crop, setCrop] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Pay Later");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Load user profile and cart on mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);

//         const savedDataKey = `savedCustomerData_${response.data.username}`;
//         const savedData = JSON.parse(localStorage.getItem(savedDataKey)) || {};
//         setCustomerName(savedData.customerName || response.data.firstName || "");
//         setPhone(savedData.phone || response.data.mobile || "");
//         setPincode(savedData.pincode || "");
//         setAddress(savedData.address || "");
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         navigate("/login");
//       }
//     };

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);

//     fetchUserProfile();
//   }, [navigate]);

//   // Calculate total amount in paise (Razorpay uses paise)
//   const totalAmount = cart.reduce((sum, item) => {
//     const price = parseFloat(item.price) || 0;
//     const quantity = parseInt(item.quantity, 10) || 1;
//     const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
//     return sum + price * quantity * (1 + gstRate);
//   }, 0);

//   // Load Razorpay SDK
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle order submission
//   const handleOrder = async () => {
//     if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     setLoading(true);
//     const orderData = {
//       name: customerName.trim(),
//       phone: phone.trim(),
//       address: address.trim(),
//       pincode: pincode.trim(),
//       crop: crop.trim(),
//       paymentMethod,
//       totalAmount: parseFloat(totalAmount),
//       cart: cart.map((item) => ({
//         productId: item.productId || item._id,
//         variantId: item.variantId,
//         name: item.name,
//         price: parseFloat(item.price),
//         quantity: parseInt(item.quantity, 10),
//         gst: parseFloat(item.gst) || 0,
//       })),
//     };

//     try {
//       if (paymentMethod === "Pay Later" || paymentMethod === "Cash") {
//         // Handle offline payments directly
//         const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           alert("Order placed successfully!");
//           const savedDataKey = `savedCustomerData_${user.username}`;
//           localStorage.setItem(savedDataKey, JSON.stringify({ customerName, phone, pincode, address }));
//           localStorage.removeItem("cart");
//           setCart([]);
//           navigate("/order-success");
//         } else {
//           alert(response.data.message || "Order failed. Try again.");
//         }
//       } else {
//         // Handle Razorpay payment
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           alert("Failed to load Razorpay SDK. Please check your internet connection.");
//           setLoading(false);
//           return;
//         }

//         // Create Razorpay order on backend
//         const orderResponse = await axios.post(
//           "https://agrihub-backend.onrender.com/api/orders/create-razorpay-order",
//           { amount: totalAmount * 100 }, // Convert to paise
//           { withCredentials: true }
//         );
//         const { id: orderId, currency } = orderResponse.data;

//         const options = {
//           key: "rzp_test_fwA1F6rg7iQI8x", // Replace with your Razorpay Key ID from Dashboard
//           amount: totalAmount * 100, // Amount in paise
//           currency,
//           name: "AgriHub",
//           description: "Purchase of agricultural products",
//           order_id: orderId,
//           handler: async (response) => {
//             try {
//               const verifyResponse = await axios.post(
//                 "https://agrihub-backend.onrender.com/api/orders/verify-razorpay-payment",
//                 {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   orderData, // Send order details for saving
//                 },
//                 { withCredentials: true }
//               );

//               if (verifyResponse.data.success) {
//                 alert("Payment successful! Order placed.");
//                 const savedDataKey = `savedCustomerData_${user.username}`;
//                 localStorage.setItem(savedDataKey, JSON.stringify({ customerName, phone, pincode, address }));
//                 localStorage.removeItem("cart");
//                 setCart([]);
//                 navigate("/order-success");
//               } else {
//                 alert("Payment verification failed.");
//               }
//             } catch (error) {
//               console.error("Payment verification error:", error);
//               alert("Failed to verify payment.");
//             }
//           },
//           prefill: {
//             name: customerName,
//             contact: phone,
//           },
//           theme: {
//             color: "#4CAF50",
//           },
//         };

//         const razorpayCheckout = new window.Razorpay(options);
//         razorpayCheckout.open();
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response ? error.response.data : error.message);
//       alert("Failed to place order. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
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
//             borderRadius: "16px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//             background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             padding: "12px 24px",
//             "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               "&:hover fieldset": { borderColor: "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 800, mx: "auto", p: 4, pt: 10 }}>
//           {/* Breadcrumbs */}
//           <Breadcrumbs sx={{ mb: 3 }}>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <HomeIcon sx={{ mr: 0.5 }} />
//                 Home
//               </Box>
//             </Link>
//             <Link underline="hover" color="inherit" onClick={() => navigate("/cart")}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <ShoppingCartIcon sx={{ mr: 0.5 }} />
//                 Cart
//               </Box>
//             </Link>
//             <Typography color="primary.main">Checkout</Typography>
//           </Breadcrumbs>

//           <Typography variant="h4" sx={{ color: "primary.main", mb: 3, textAlign: "center" }}>
//             Checkout
//           </Typography>

//           <Card>
//             <CardContent sx={{ p: 4 }}>
//               <form>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PhoneIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Pincode"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     variant="outlined"
//                     required
//                     multiline
//                     rows={3}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="For Which Crop Are You Buying?"
//                     value={crop}
//                     onChange={(e) => setCrop(e.target.value)}
//                     variant="outlined"
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <AgricultureIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <FormControl fullWidth>
//                     <InputLabel>Payment Method</InputLabel>
//                     <Select
//                       value={paymentMethod}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       label="Payment Method"
//                       required
//                       startAdornment={
//                         <InputAdornment position="start">
//                           <PaymentIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       }
//                     >
//                       <MenuItem value="Pay Later">Pay Later</MenuItem>
//                       <MenuItem value="Card">Card (Razorpay)</MenuItem>
//                       <MenuItem value="Cash">Cash</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />

//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
//                     Total Amount: <span style={{ color: "#4CAF50" }}>₹{totalAmount}</span>
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleOrder}
//                     disabled={loading || cart.length === 0}
//                     sx={{ py: 1.5, fontSize: "1.1rem", width: "50%" }}
//                   >
//                     {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
//                   </Button>
//                 </Box>
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Checkout;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Breadcrumbs,
  Link,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavigationBar from "../components/Navbar";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PaymentIcon from "@mui/icons-material/Payment";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [crop, setCrop] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay Later");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load user profile and cart on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://agrihub-backend.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data);

        const savedDataKey = `savedCustomerData_${response.data.username}`;
        const savedData = JSON.parse(localStorage.getItem(savedDataKey)) || {};
        setCustomerName(savedData.customerName || response.data.firstName || "");
        setPhone(savedData.phone || response.data.mobile || "");
        setPincode(savedData.pincode || "");
        setAddress(savedData.address || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      }
    };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    fetchUserProfile();
  }, [navigate]);

  // Calculate total amount in paise (Razorpay uses paise)
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    const gstRate = parseFloat(item.gst) ? parseFloat(item.gst) / 100 : 0;
    return sum + price * quantity * (1 + gstRate);
  }, 0);

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle order submission
  const handleOrder = async () => {
    if (!customerName.trim() || !phone.trim() || !pincode.trim() || !address.trim() || !crop.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    const orderData = {
      name: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      crop: crop.trim(),
      paymentMethod,
      totalAmount: parseFloat(totalAmount),
      cart: cart.map((item) => ({
        productId: item.productId || item._id,
        variantId: item.variantId,
        name: item.name,
        size: item.variantSize || item.size || "N/A", // Include size, fallback to "N/A"
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        gst: parseFloat(item.gst) || 0,
      })),
    };

    try {
      if (paymentMethod === "Pay Later" || paymentMethod === "Cash") {
        const response = await axios.post("https://agrihub-backend.onrender.com/api/orders/place", orderData, {
          withCredentials: true,
        });
        if (response.data.success) {
          alert("Order placed successfully!");
          const savedDataKey = `savedCustomerData_${user.username}`;
          localStorage.setItem(savedDataKey, JSON.stringify({ customerName, phone, pincode, address }));
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/order-success");
        } else {
          alert(response.data.message || "Order failed. Try again.");
        }
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Failed to load Razorpay SDK. Please check your internet connection.");
          setLoading(false);
          return;
        }

        const orderResponse = await axios.post(
          "https://agrihub-backend.onrender.com/api/orders/create-razorpay-order",
          { amount: totalAmount * 100 },
          { withCredentials: true }
        );
        const { id: orderId, currency } = orderResponse.data;

        const options = {
          key: "rzp_test_fwA1F6rg7iQI8x", // Replace with your Razorpay Key ID
          amount: totalAmount * 100,
          currency,
          name: "AgriHub",
          description: "Purchase of agricultural products",
          order_id: orderId,
          handler: async (response) => {
            try {
              const verifyResponse = await axios.post(
                "https://agrihub-backend.onrender.com/api/orders/verify-razorpay-payment",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderData,
                },
                { withCredentials: true }
              );

              if (verifyResponse.data.success) {
                alert("Payment successful! Order placed.");
                const savedDataKey = `savedCustomerData_${user.username}`;
                localStorage.setItem(savedDataKey, JSON.stringify({ customerName, phone, pincode, address }));
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/order-success");
              } else {
                alert("Payment verification failed.");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert("Failed to verify payment.");
            }
          },
          prefill: {
            name: customerName,
            contact: phone,
          },
          theme: { color: "#4CAF50" },
        };

        const razorpayCheckout = new window.Razorpay(options);
        razorpayCheckout.open();
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error.message);
      alert("Failed to place order. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#4CAF50" },
      secondary: { main: "#FF5722" },
      background: { default: "#F5F7FA" },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h4: { fontWeight: 700 },
      body1: { fontSize: "1rem" },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            padding: "12px 24px",
            "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover fieldset": { borderColor: "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <NavigationBar />
        <Box sx={{ maxWidth: 800, mx: "auto", p: 4, pt: 10 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon sx={{ mr: 0.5 }} />
                Home
              </Box>
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/cart")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon sx={{ mr: 0.5 }} />
                Cart
              </Box>
            </Link>
            <Typography color="primary.main">Checkout</Typography>
          </Breadcrumbs>

          <Typography variant="h4" sx={{ color: "primary.main", mb: 3, textAlign: "center" }}>
            Checkout
          </Typography>

          <Card>
            <CardContent sx={{ p: 4 }}>
              <form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    variant="outlined"
                    required
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="For Which Crop Are You Buying?"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AgricultureIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label="Payment Method"
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <PaymentIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Pay Later">Pay Later</MenuItem>
                      <MenuItem value="Card">Card (Razorpay)</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Total Amount: <span style={{ color: "#4CAF50" }}>₹{totalAmount}</span>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                    disabled={loading || cart.length === 0}
                    sx={{ py: 1.5, fontSize: "1.1rem", width: "50%" }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Checkout;