// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavigationBar from "../components/Navbar";

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Added error state
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/orders/my-orders", { withCredentials: true });
//         console.log("Orders Response:", res.data); // Debug log
//         if (res.data.success && Array.isArray(res.data.orders)) {
//           setOrders(res.data.orders);
//         } else {
//           setError("Invalid response from server.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to load orders. Please try again.");
//         navigate("/login"); // Redirect to login if unauthorized
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [navigate]);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 800, mx: "auto", p: 3, pt: 10 }}>
//           <Typography variant="h4" sx={{ mb: 3, color: "primary.main", fontWeight: "bold", textAlign: "center" }}>
//             Order Tracking
//           </Typography>

//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
//           ) : error ? (
//             <Typography sx={{ textAlign: "center", color: "error.main" }}>{error}</Typography>
//           ) : orders.length === 0 ? (
//             <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
//               No orders found.
//             </Typography>
//           ) : (
//             orders.map((order) => (
//               <Card key={order._id} sx={{ mb: 3, bgcolor: "background.paper" }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     Order #{order._id}
//                   </Typography>
//                   <Typography sx={{ color: "text.secondary" }}>
//                     Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
//                   </Typography>
//                   <Typography sx={{ color: "text.secondary" }}>
//                     Status: <strong>{order.status || "Unknown"}</strong>
//                   </Typography>
//                   <Typography sx={{ color: "text.secondary" }}>
//                     Payment Method: {order.paymentMethod || "N/A"} {order.isDue ? "(Due)" : ""}
//                   </Typography>
//                   <Typography sx={{ color: "text.secondary" }}>
//                     Total Amount: ₹{order.totalAmount ? order.totalAmount.toLocaleString() : "N/A"}
//                   </Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                     Items:
//                   </Typography>
//                   <List dense>
//                     {(order.cart || []).map((item, index) => (
//                       <ListItem key={index}>
//                         <ListItemText
//                           primary={`${item.name || "Unknown Item"} (${item.size || "N/A"})`}
//                           secondary={`Qty: ${item.quantity || 0} | Price: ₹${item.price || 0} | Total (with GST): ₹${item.totalWithGST ? item.totalWithGST.toLocaleString() : "N/A"}`}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                   <Typography sx={{ mt: 2 }}>
//                     Delivery: {order.address || "N/A"}, {order.pincode || "N/A"}
//                   </Typography>
//                   <Typography>Crop: {order.crop || "N/A"}</Typography>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/")}
//             sx={{ display: "block", mx: "auto", mt: 3 }}
//           >
//             Back to Home
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OrderTracking;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   Chip,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {
//   ShoppingCart as OrderPlacedIcon,
//   LocalShipping as ShippedIcon,
//   Home as DeliveredIcon,
//   Cancel as CancelledIcon,
// } from "@mui/icons-material";
// import NavigationBar from "../components/Navbar";

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/orders/my-orders", { withCredentials: true });
//         console.log("Orders Response:", res.data);
//         if (res.data.success && Array.isArray(res.data.orders)) {
//           setOrders(res.data.orders);
//         } else {
//           setError("Invalid response from server.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to load orders. Please try again.");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [navigate]);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,
//             boxShadow: darkMode
//               ? "0 4px 20px rgba(0, 0, 0, 0.5)"
//               : "0 4px 20px rgba(0, 0, 0, 0.1)",
//             transition: "transform 0.3s ease-in-out",
//             "&:hover": { transform: "scale(1.02)" },
//           },
//         },
//       },
//     },
//   });

//   // Map order status to tracking steps
//   const getTrackingStep = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return 0;   // Order Placed
//       case "paid": return 1;      // Paid (could be a step before Shipped if needed)
//       case "shipped": return 2;   // Shipped
//       case "completed": return 3; // Delivered
//       case "cancelled": return -1; // Cancelled
//       default: return 0;
//     }
//   };

//   // Status-specific chip styling
//   const getStatusChip = (status) => {
//     let color;
//     let label;
//     switch (status?.toLowerCase()) {
//       case "pending": 
//         color = "warning"; 
//         label = "Order Placed"; 
//         break;
//       case "paid": 
//         color = "info"; 
//         label = "Shipped"; 
//         break;
//       case "completed": 
//         color = "success"; 
//         label = "Delivered"; 
//         break;
//       case "cancelled": 
//         color = "error"; 
//         label = "Cancelled"; 
//         break;
//       default: 
//         color = "default"; 
//         label = status || "Unknown";
//     }
//     return <Chip label={label} color={color} size="small" sx={{ fontWeight: "bold" }} />;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 1000, mx: "auto", p: 3, pt: 10 }}>
//           <Typography
//             variant="h4"
//             sx={{
//               mb: 4,
//               color: "primary.main",
//               fontWeight: "bold",
//               textAlign: "center",
//               background: "linear-gradient(45deg, #388E3C, #66BB6A)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Track Your Orders
//           </Typography>

//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
//           ) : error ? (
//             <Typography sx={{ textAlign: "center", color: "error.main" }}>{error}</Typography>
//           ) : orders.length === 0 ? (
//             <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
//               No orders found.
//             </Typography>
//           ) : (
//             orders.map((order) => {
//               const step = getTrackingStep(order.status);
//               return (
//                 <Card key={order._id} sx={{ mb: 4, bgcolor: "background.paper", p: 2 }}>
//                   <CardContent>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Typography variant="h6" sx={{ color: "primary.main" }}>
//                         Order #{order._id}
//                       </Typography>
//                       {getStatusChip(order.status)}
//                     </Box>
//                     <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                       Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                       Purchase Type: {order.purchaseType || "N/A"}
//                     </Typography>

//                     {/* Tracking Progress */}
//                     {order.status !== "Cancelled" ? (
//                       <Box sx={{ mt: 2, mb: 3 }}>
//                       <Stepper activeStep={step} alternativeLabel>
//   <Step>
//     <StepLabel StepIconComponent={OrderPlacedIcon}>Order Placed</StepLabel>
//   </Step>
//   <Step>
//     <StepLabel StepIconComponent={PaymentIcon}>Paid</StepLabel>
//   </Step>
//   <Step>
//     <StepLabel StepIconComponent={ShippedIcon}>Shipped</StepLabel>
//   </Step>
//   <Step>
//     <StepLabel StepIconComponent={DeliveredIcon}>Delivered</StepLabel>
//   </Step>
// </Stepper>
//                       </Box>
//                     ) : (
//                       <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
//                         <CancelledIcon sx={{ fontSize: 40, color: "error.main" }} />
//                         <Typography sx={{ color: "error.main", mt: 1 }}>Order Cancelled</Typography>
//                       </Box>
//                     )}

//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                       Items:
//                     </Typography>
//                     <List dense>
//                       {(order.cart || []).map((item, index) => (
//                         <ListItem key={index} sx={{ py: 1 }}>
//                           <ListItemText
//                             primary={`${item.name || "Unknown Item"} (${item.size || "N/A"})`}
//                             secondary={
//                               <span>
//                                 Qty: {item.quantity || 0} | Price: ₹{item.price || 0} | Total (with GST): ₹
//                                 {item.totalWithGST ? item.totalWithGST.toLocaleString() : "N/A"}
//                               </span>
//                             }
//                             primaryTypographyProps={{ fontWeight: "medium" }}
//                             secondaryTypographyProps={{ color: "text.secondary" }}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                     <Typography sx={{ mt: 2, color: "text.secondary" }}>
//                       Delivery: {order.address || "N/A"}, {order.pincode || "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary" }}>
//                       Crop: {order.crop || "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary" }}>
//                       Payment Method: {order.paymentMethod || "N/A"} {order.isDue ? "(Due)" : ""}
//                     </Typography>
//                     {order.razorpayOrderId && (
//                       <Typography sx={{ color: "text.secondary" }}>
//                         Razorpay Order ID: {order.razorpayOrderId}
//                       </Typography>
//                     )}
//                     <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
//                       Total Amount: ₹{order.totalAmount ? order.totalAmount.toLocaleString() : "N/A"}
//                     </Typography>

//                     {/* Status History */}
//                     {order.statusHistory && order.statusHistory.length > 0 && (
//                       <>
//                         <Divider sx={{ my: 2 }} />
//                         <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                           Status History:
//                         </Typography>
//                         <List dense>
//                           {order.statusHistory.map((history, index) => (
//                             <ListItem key={index}>
//                               <ListItemText
//                                 primary={`${history.status} - ${new Date(history.timestamp).toLocaleString()}`}
//                                 secondary={history.updatedBy ? `Updated by User ID: ${history.updatedBy}` : "System"}
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       </>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/")}
//             sx={{
//               display: "block",
//               mx: "auto",
//               mt: 4,
//               px: 4,
//               py: 1.5,
//               borderRadius: 20,
//               textTransform: "none",
//             }}
//           >
//             Back to Home
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OrderTracking;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   Chip,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {
//   ShoppingCart as OrderPlacedIcon,
//   LocalShipping as ShippedIcon,
//   Home as DeliveredIcon,
//   Cancel as CancelledIcon,
// } from "@mui/icons-material";
// import NavigationBar from "../components/Navbar";

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/orders/my-orders", { withCredentials: true });
//         console.log("Orders Response:", res.data);
//         if (res.data.success && Array.isArray(res.data.orders)) {
//           setOrders(res.data.orders);
//         } else {
//           setError("Invalid response from server.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to load orders. Please try again.");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [navigate]);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,
//             boxShadow: darkMode
//               ? "0 4px 20px rgba(0, 0, 0, 0.5)"
//               : "0 4px 20px rgba(0, 0, 0, 0.1)",
//             transition: "transform 0.3s ease-in-out",
//             "&:hover": { transform: "scale(1.02)" },
//           },
//         },
//       },
//     },
//   });

//   // Map order status to tracking steps
//   const getTrackingStep = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return 0; // Order Placed
//       case "paid": return 1;    // Shipped
//       case "completed": return 2; // Delivered
//       case "cancelled": return -1; // Special case for cancelled
//       default: return 0;
//     }
//   };

//   // Status-specific chip styling
//   const getStatusChip = (status) => {
//     let color;
//     let label;
//     switch (status?.toLowerCase()) {
//       case "pending": 
//         color = "warning"; 
//         label = "Order Placed"; 
//         break;
//       case "paid": 
//         color = "info"; 
//         label = "Shipped"; 
//         break;
//       case "completed": 
//         color = "success"; 
//         label = "Delivered"; 
//         break;
//       case "cancelled": 
//         color = "error"; 
//         label = "Cancelled"; 
//         break;
//       default: 
//         color = "default"; 
//         label = status || "Unknown";
//     }
//     return <Chip label={label} color={color} size="small" sx={{ fontWeight: "bold" }} />;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 1000, mx: "auto", p: 3, pt: 10 }}>
//           <Typography
//             variant="h4"
//             sx={{
//               mb: 4,
//               color: "primary.main",
//               fontWeight: "bold",
//               textAlign: "center",
//               background: "linear-gradient(45deg, #388E3C, #66BB6A)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Track Your Orders
//           </Typography>

//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
//           ) : error ? (
//             <Typography sx={{ textAlign: "center", color: "error.main" }}>{error}</Typography>
//           ) : orders.length === 0 ? (
//             <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
//               No orders found.
//             </Typography>
//           ) : (
//             orders.map((order) => {
//               const step = getTrackingStep(order.status);
//               return (
//                 <Card key={order._id} sx={{ mb: 4, bgcolor: "background.paper", p: 2 }}>
//                   <CardContent>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Typography variant="h6" sx={{ color: "primary.main" }}>
//                         Order #{order._id}
//                       </Typography>
//                       {getStatusChip(order.status)}
//                     </Box>
//                     <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                       Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                       Purchase Type: {order.purchaseType || "N/A"}
//                     </Typography>

//                     {/* Tracking Progress */}
//                     {order.status !== "Cancelled" ? (
//                       <Box sx={{ mt: 2, mb: 3 }}>
//                         <Stepper activeStep={step} alternativeLabel>
//                           <Step>
//                             <StepLabel StepIconComponent={OrderPlacedIcon}>Order Placed</StepLabel>
//                           </Step>
//                           <Step>
//                             <StepLabel StepIconComponent={ShippedIcon}>Shipped</StepLabel>
//                           </Step>
//                           <Step>
//                             <StepLabel StepIconComponent={DeliveredIcon}>Delivered</StepLabel>
//                           </Step>
//                         </Stepper>
//                       </Box>
//                     ) : (
//                       <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
//                         <CancelledIcon sx={{ fontSize: 40, color: "error.main" }} />
//                         <Typography sx={{ color: "error.main", mt: 1 }}>Order Cancelled</Typography>
//                       </Box>
//                     )}

//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                       Items:
//                     </Typography>
//                     <List dense>
//                       {(order.cart || []).map((item, index) => (
//                         <ListItem key={index} sx={{ py: 1 }}>
//                           <ListItemText
//                             primary={`${item.name || "Unknown Item"} (${item.size || "N/A"})`}
//                             secondary={
//                               <span>
//                                 Qty: {item.quantity || 0} | Price: ₹{item.price || 0} | Total (with GST): ₹
//                                 {item.totalWithGST ? item.totalWithGST.toLocaleString() : "N/A"}
//                               </span>
//                             }
//                             primaryTypographyProps={{ fontWeight: "medium" }}
//                             secondaryTypographyProps={{ color: "text.secondary" }}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                     <Typography sx={{ mt: 2, color: "text.secondary" }}>
//                       Delivery: {order.address || "N/A"}, {order.pincode || "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary" }}>
//                       Crop: {order.crop || "N/A"}
//                     </Typography>
//                     <Typography sx={{ color: "text.secondary" }}>
//                       Payment Method: {order.paymentMethod || "N/A"} {order.isDue ? "(Due)" : ""}
//                     </Typography>
//                     {order.razorpayOrderId && (
//                       <Typography sx={{ color: "text.secondary" }}>
//                         Razorpay Order ID: {order.razorpayOrderId}
//                       </Typography>
//                     )}
//                     <Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
//                       Total Amount: ₹{order.totalAmount ? order.totalAmount.toLocaleString() : "N/A"}
//                     </Typography>

//                     {/* Status History */}
//                     {order.statusHistory && order.statusHistory.length > 0 && (
//                       <>
//                         <Divider sx={{ my: 2 }} />
//                         <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                           Status History:
//                         </Typography>
//                         <List dense>
//                           {order.statusHistory.map((history, index) => (
//                             <ListItem key={index}>
//                               <ListItemText
//                                 primary={`${history.status} - ${new Date(history.timestamp).toLocaleString()}`}
//                                 secondary={history.updatedBy ? `Updated by User ID: ${history.updatedBy}` : "System"}
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       </>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/")}
//             sx={{
//               display: "block",
//               mx: "auto",
//               mt: 4,
//               px: 4,
//               py: 1.5,
//               borderRadius: 20,
//               textTransform: "none",
//             }}
//           >
//             Back to Home
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OrderTracking;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   Chip,
//   Fade,
//   Grow,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {
//   ShoppingCart as OrderPlacedIcon,
//   LocalShipping as ShippedIcon,
//   Home as DeliveredIcon,
//   Cancel as CancelledIcon,
// } from "@mui/icons-material";
// import NavigationBar from "../components/Navbar";

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/orders/my-orders", { withCredentials: true });
//         if (res.data.success && Array.isArray(res.data.orders)) {
//           setOrders(res.data.orders);
//         } else {
//           setError("Invalid response from server.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to load orders. Please try again.");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [navigate]);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: 16,
//             boxShadow: darkMode
//               ? "0 8px 32px rgba(0, 0, 0, 0.6)"
//               : "0 8px 32px rgba(0, 0, 0, 0.12)",
//             transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: darkMode
//                 ? "0 12px 40px rgba(0, 0, 0, 0.8)"
//                 : "0 12px 40px rgba(0, 0, 0, 0.2)",
//             },
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 25,
//             textTransform: "none",
//             padding: "10px 24px",
//             fontWeight: 600,
//             transition: "all 0.3s ease",
//             "&:hover": {
//               transform: "scale(1.05)",
//               boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//             },
//           },
//         },
//       },
//       MuiChip: {
//         styleOverrides: {
//           root: {
//             borderRadius: 20,
//             fontWeight: "bold",
//             padding: "0 8px",
//           },
//         },
//       },
//       MuiStepper: {
//         styleOverrides: {
//           root: {
//             "& .MuiStepIcon-root": {
//               fontSize: "2rem",
//               color: darkMode ? "#A5D6A7" : "#4CAF50",
//             },
//             "& .MuiStepIcon-active": { color: darkMode ? "#66BB6A" : "#388E3C" },
//             "& .MuiStepIcon-completed": { color: darkMode ? "#66BB6A" : "#388E3C" },
//           },
//         },
//       },
//     },
//     typography: {
//       fontFamily: "'Roboto', sans-serif",
//       h4: { fontWeight: 700 },
//       subtitle1: { fontWeight: 600 },
//     },
//   });

//   const getTrackingStep = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return 0;
//       case "paid": return 1;
//       case "shipped": return 1; // Added "Shipped" status
//       case "completed": return 2;
//       case "cancelled": return -1;
//       default: return 0;
//     }
//   };

//   const getStatusChip = (status) => {
//     let color, label;
//     switch (status?.toLowerCase()) {
//       case "pending":
//         color = "warning";
//         label = "Order Placed";
//         break;
//       case "paid":
//         color = "info";
//         label = "Paid";
//         break;
//       case "shipped":
//         color = "info";
//         label = "Shipped";
//         break;
//       case "completed":
//         color = "success";
//         label = "Delivered";
//         break;
//       case "cancelled":
//         color = "error";
//         label = "Cancelled";
//         break;
//       default:
//         color = "default";
//         label = status || "Unknown";
//     }
//     return <Chip label={label} color={color} size="small" />;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 }, pt: { xs: 12, md: 14 } }}>
//           <Fade in timeout={1000}>
//             <Typography
//               variant="h4"
//               sx={{
//                 mb: 5,
//                 color: "primary.main",
//                 textAlign: "center",
//                 background: "linear-gradient(45deg, #388E3C, #66BB6A)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 letterSpacing: "1px",
//               }}
//             >
//               Track Your Orders
//             </Typography>
//           </Fade>

//           {loading ? (
//             <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
//           ) : error ? (
//             <Typography sx={{ textAlign: "center", color: "error.main", mt: 5 }}>{error}</Typography>
//           ) : orders.length === 0 ? (
//             <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 5 }}>
//               No orders found.
//             </Typography>
//           ) : (
//             orders.map((order, index) => {
//               const step = getTrackingStep(order.status);
//               return (
//                 <Grow in timeout={500 * (index + 1)} key={order._id}>
//                   <Card sx={{ mb: 4, bgcolor: "background.paper", overflow: "hidden" }}>
//                     <CardContent sx={{ p: { xs: 2, md: 3 } }}>
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                         <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "bold" }}>
//                           Order #{order._id.slice(-6)}
//                         </Typography>
//                         {getStatusChip(order.status)}
//                       </Box>
//                       <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 1 }}>
//                         Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
//                       </Typography>
//                       <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 2 }}>
//                         Purchase Type: {order.purchaseType || "N/A"}
//                       </Typography>

//                       {/* Tracking Progress */}
//                       {order.status !== "Cancelled" ? (
//                         <Box sx={{ mt: 2, mb: 3 }}>
//                           <Stepper activeStep={step} alternativeLabel sx={{ maxWidth: 600, mx: "auto" }}>
//                             <Step>
//                               <StepLabel StepIconComponent={OrderPlacedIcon}>Order Placed</StepLabel>
//                             </Step>
//                             <Step>
//                               <StepLabel StepIconComponent={ShippedIcon}>Shipped</StepLabel>
//                             </Step>
//                             <Step>
//                               <StepLabel StepIconComponent={DeliveredIcon}>Delivered</StepLabel>
//                             </Step>
//                           </Stepper>
//                         </Box>
//                       ) : (
//                         <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
//                           <CancelledIcon sx={{ fontSize: 48, color: "error.main", mb: 1 }} />
//                           <Typography sx={{ color: "error.main", fontWeight: "medium" }}>Order Cancelled</Typography>
//                         </Box>
//                       )}

//                       <Divider sx={{ my: 2, borderColor: darkMode ? "#333" : "#ddd" }} />
//                       <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                         Order Details
//                       </Typography>
//                       <List dense sx={{ bgcolor: darkMode ? "#252525" : "#fafafa", borderRadius: 2, p: 1 }}>
//                         {(order.cart || []).map((item, idx) => (
//                           <ListItem key={idx} sx={{ py: 1.5, borderBottom: idx < order.cart.length - 1 ? "1px solid #ddd" : "none" }}>
//                             <ListItemText
//                               primary={`${item.name || "Unknown Item"} (${item.size || "N/A"})`}
//                               secondary={
//                                 <>
//                                   <Typography component="span" variant="body2" color="text.secondary">
//                                     Qty: {item.quantity || 0} | Price: ₹{item.price?.toLocaleString() || 0}
//                                   </Typography>
//                                   <br />
//                                   <Typography component="span" variant="body2" color="text.secondary">
//                                     Total (with GST): ₹{item.totalWithGST?.toLocaleString() || "N/A"}
//                                   </Typography>
//                                 </>
//                               }
//                               primaryTypographyProps={{ fontWeight: "medium", color: "text.primary" }}
//                             />
//                           </ListItem>
//                         ))}
//                       </List>

//                       <Box sx={{ mt: 2 }}>
//                         <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
//                           <strong>Delivery:</strong> {order.address || "N/A"}, {order.pincode || "N/A"}
//                         </Typography>
//                         <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
//                           <strong>Crop:</strong> {order.crop || "N/A"}
//                         </Typography>
//                         <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
//                           <strong>Payment:</strong> {order.paymentMethod || "N/A"} {order.isDue ? "(Due)" : ""}
//                         </Typography>
//                         {order.razorpayOrderId && (
//                           <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
//                             <strong>Razorpay Order ID:</strong> {order.razorpayOrderId}
//                           </Typography>
//                         )}
//                         <Typography sx={{ color: "primary.main", fontWeight: "bold", fontSize: "1.1rem", mt: 1 }}>
//                           Total Amount: ₹{order.totalAmount?.toLocaleString() || "N/A"}
//                         </Typography>
//                       </Box>

//                       {/* Status History */}
//                       {order.statusHistory?.length > 0 && (
//                         <>
//                           <Divider sx={{ my: 2, borderColor: darkMode ? "#333" : "#ddd" }} />
//                           <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
//                             Status History
//                           </Typography>
//                           <List dense sx={{ bgcolor: darkMode ? "#252525" : "#fafafa", borderRadius: 2, p: 1 }}>
//                             {order.statusHistory.map((history, idx) => (
//                               <ListItem key={idx} sx={{ py: 1 }}>
//                                 <ListItemText
//                                   primary={`${history.status}`}
//                                   secondary={`${new Date(history.timestamp).toLocaleString()} - Updated by ${history.updatedBy?.firstName || "System"}`}
//                                   primaryTypographyProps={{ fontWeight: "medium", color: "text.primary" }}
//                                   secondaryTypographyProps={{ color: "text.secondary", fontSize: "0.85rem" }}
//                                 />
//                               </ListItem>
//                             ))}
//                           </List>
//                         </>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Grow>
//               );
//             })
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/")}
//             sx={{ display: "block", mx: "auto", mt: 5 }}
//           >
//             Back to Home
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default OrderTracking;
import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Stepper,
  Container,
  Step,
  StepLabel,
  Chip,
  Fade,
  Grow,
  Breadcrumbs,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ShoppingCart as OrderPlacedIcon,
  LocalShipping as ShippedIcon,
  Home as DeliveredIcon,
  Cancel as CancelledIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/orders/my-orders", { withCredentials: true });
        if (res.data.success && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else {
          setError("Invalid response from server.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const theme = createTheme({
    palette: {
      primary: { main: "#2E7D32" },
      secondary: { main: "#81C784" },
      background: { default: "#F7F9F7", paper: "#FFFFFF" },
      text: { primary: "#1A1A1A", secondary: "#616161" },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
            },
            background: "linear-gradient(180deg, #FFFFFF 70%, #F7F9F7 100%)",
            overflow: "hidden",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            padding: { xs: "8px 16px", sm: "10px 18px", md: "12px 24px" },
            "&:hover": {
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
            padding: { xs: "2px 6px", sm: "4px 8px" },
          },
        },
      },
      MuiStepper: {
        styleOverrides: {
          root: {
            "& .MuiStepIcon-root": {
              fontSize: { xs: "1.5rem", sm: "2rem" },
              color: "#81C784",
            },
            "& .MuiStepIcon-active": { color: "#2E7D32" },
            "& .MuiStepIcon-completed": { color: "#2E7D32" },
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              fontWeight: 500,
            },
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
            "& a": {
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            },
          },
          separator: { color: "text.secondary" },
        },
      },
    },
  });

  const getTrackingStep = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return 0;
      case "paid": return 1;
      case "shipped": return 1;
      case "completed": return 2;
      case "cancelled": return -1;
      default: return 0;
    }
  };

  const getStatusChip = (status) => {
    let color, label;
    switch (status?.toLowerCase()) {
      case "pending":
        color = "warning";
        label = "Order Placed";
        break;
      case "paid":
        color = "info";
        label = "Paid";
        break;
      case "shipped":
        color = "info";
        label = "Shipped";
        break;
      case "completed":
        color = "success";
        label = "Delivered";
        break;
      case "cancelled":
        color = "error";
        label = "Cancelled";
        break;
      default:
        color = "default";
        label = status || "Unknown";
    }
    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
        <NavigationBar />
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: "#FFFFFF" }}>
          <Container maxWidth="lg">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <RouterLink to="/">
                <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", md: "1.25rem" } }} /> Home
              </RouterLink>
              <Typography color="text.primary">Order Tracking</Typography>
            </Breadcrumbs>
          </Container>
        </Box>
        <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 1.5, sm: 3, md: 4 }, py: { xs: 3, sm: 5 }, flexGrow: 1 }}>
          <Fade in timeout={1000}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                mb: 4,
                color: "primary.main",
                textAlign: "center",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                background: "linear-gradient(45deg, #2E7D32, #81C784)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Track Your Orders
            </Typography>
          </Fade>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress size={40} sx={{ color: "primary.main" }} />
            </Box>
          ) : error ? (
            <Typography sx={{ textAlign: "center", color: "error.main", mt: 5, fontSize: { xs: "1rem", md: "1.25rem" } }}>
              {error}
            </Typography>
          ) : orders.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 5, fontSize: { xs: "1rem", md: "1.25rem" } }}>
              No orders found.
            </Typography>
          ) : (
            orders.map((order, index) => {
              const step = getTrackingStep(order.status);
              return (
                <Grow in timeout={500 * (index + 1)} key={order._id}>
                  <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            mb: { xs: 1, sm: 0 },
                          }}
                        >
                          Order #{order._id.slice(-6)}
                        </Typography>
                        {getStatusChip(order.status)}
                      </Box>
                      <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" }, mb: 1 }}>
                        Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" }, mb: 2 }}>
                        Purchase Type: {order.purchaseType || "N/A"}
                      </Typography>

                      {/* Tracking Progress */}
                      {order.status !== "Cancelled" ? (
                        <Box sx={{ mt: 2, mb: 3 }}>
                          <Stepper activeStep={step} alternativeLabel sx={{ maxWidth: { xs: 300, sm: 600 }, mx: "auto" }}>
                            <Step>
                              <StepLabel StepIconComponent={OrderPlacedIcon}>Order Placed</StepLabel>
                            </Step>
                            <Step>
                              <StepLabel StepIconComponent={ShippedIcon}>Shipped</StepLabel>
                            </Step>
                            <Step>
                              <StepLabel StepIconComponent={DeliveredIcon}>Delivered</StepLabel>
                            </Step>
                          </Stepper>
                        </Box>
                      ) : (
                        <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
                          <CancelledIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: "error.main", mb: 1 }} />
                          <Typography sx={{ color: "error.main", fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                            Order Cancelled
                          </Typography>
                        </Box>
                      )}

                      <Divider sx={{ my: 2, bgcolor: "rgba(0, 0, 0, 0.1)" }} />
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1, color: "text.primary", fontWeight: 600, fontSize: { xs: "1rem", sm: "1.1rem" } }}
                      >
                        Order Details
                      </Typography>
                      <List dense sx={{ bgcolor: "#F7F9F7", borderRadius: "10px", p: 1 }}>
                        {(order.cart || []).map((item, idx) => (
                          <ListItem
                            key={idx}
                            sx={{
                              py: { xs: 1, sm: 1.5 },
                              borderBottom: idx < order.cart.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                            }}
                          >
                            <ListItemText
                              primary={`${item.name || "Unknown Item"} (${item.size || "N/A"})`}
                              secondary={
                                <>
                                  <Typography component="span" variant="body2" color="text.secondary">
                                    Qty: {item.quantity || 0} | Price: ₹{item.price?.toLocaleString() || 0}
                                  </Typography>
                                  <br />
                                  <Typography component="span" variant="body2" color="text.secondary">
                                    Total (with GST): ₹{item.totalWithGST?.toLocaleString() || "N/A"}
                                  </Typography>
                                </>
                              }
                              primaryTypographyProps={{ fontWeight: 500, color: "text.primary", fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                              secondaryTypographyProps={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Box sx={{ mt: 2 }}>
                        <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                          <strong>Delivery:</strong> {order.address || "N/A"}, {order.pincode || "N/A"}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                          <strong>Crop:</strong> {order.crop || "N/A"}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                          <strong>Payment:</strong> {order.paymentMethod || "N/A"} {order.isDue ? "(Due)" : ""}
                        </Typography>
                        {order.razorpayOrderId && (
                          <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                            <strong>Razorpay Order ID:</strong> {order.razorpayOrderId}
                          </Typography>
                        )}
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                            mt: 1,
                          }}
                        >
                          Total Amount: ₹{order.totalAmount?.toLocaleString() || "N/A"}
                        </Typography>
                      </Box>

                      {/* Status History */}
                      {order.statusHistory?.length > 0 && (
                        <>
                          <Divider sx={{ my: 2, bgcolor: "rgba(0, 0, 0, 0.1)" }} />
                          <Typography
                            variant="subtitle1"
                            sx={{ mb: 1, color: "text.primary", fontWeight: 600, fontSize: { xs: "1rem", sm: "1.1rem" } }}
                          >
                            Status History
                          </Typography>
                          <List dense sx={{ bgcolor: "#F7F9F7", borderRadius: "10px", p: 1 }}>
                            {order.statusHistory.map((history, idx) => (
                              <ListItem key={idx} sx={{ py: 1 }}>
                                <ListItemText
                                  primary={`${history.status}`}
                                  secondary={`${new Date(history.timestamp).toLocaleString()} - Updated by ${history.updatedBy?.firstName || "System"}`}
                                  primaryTypographyProps={{ fontWeight: 500, color: "text.primary", fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                                  secondaryTypographyProps={{ color: "text.secondary", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grow>
              );
            })
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ display: "block", mx: "auto", mt: 4, bgcolor: "#2E7D32", "&:hover": { bgcolor: "#81C784" } }}
          >
            Back to Home
          </Button>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default OrderTracking;