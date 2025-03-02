// import React, { useState } from "react";
// import axios from "axios";
// import { Input, Button, Table, message } from "antd";

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async () => {
//     if (!mobile) {
//       message.warning("Please enter a mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
//       setOrders(response.data);
//     } catch (error) {
//       message.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const columns = [
//     { title: "Order ID", dataIndex: "_id", key: "_id" },
//     { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", render: (amount) => `₹${amount}` },
//     { title: "Payment Type", dataIndex: "paymentMethod", key: "paymentMethod" },
//     { title: "Order Status", dataIndex: "status", key: "status" },
//     { 
//       title: "Products", 
//       key: "products",
//       render: (_, record) => (
//         <ul>
//           {record.cart.map((item) => (
//             <li key={item._id}>{item.productId?.name} - {item.quantity} pcs</li>
//           ))}
//         </ul>
//       )
//     }
//   ];
  

//   return (
//     <div>
//       <h2>Customer Order Management</h2>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <Input
//           placeholder="Enter Customer Mobile Number"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           style={{ width: "300px" }}
//         />
//         <Button type="primary" onClick={fetchOrders} loading={loading}>
//           Search Orders
//         </Button>
//       </div>

//       <Table 
//         dataSource={orders} 
//         columns={columns} 
//         rowKey="_id" 
//         loading={loading} 
//       />
//     </div>
//   );
// };

// export default CustomerOrderManage;
// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button, CircularProgress, Typography, Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { toast } from "react-toastify"; // Optional for better alerts

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async () => {
//     if (!mobile) {
//       toast.warning("Please enter a mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
//       setOrders(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const columns = [
//     { field: "_id", headerName: "Order ID", flex: 1 },
//     { field: "totalAmount", headerName: "Total Amount", flex: 1, renderCell: (params) => `₹${params.value}` },
//     { field: "paymentMethod", headerName: "Payment Type", flex: 1 },
//     { field: "status", headerName: "Order Status", flex: 1 },
//     { field: "crop", headerName: "Crop", flex: 1 }, // ✅ New Column for Crop
//     { 
//       field: "products", 
//       headerName: "Products", 
//       flex: 2,
//       renderCell: (params) => (
//         <ul style={{ padding: 0, margin: 0 }}>
//           {params.row.cart.map((item) => (
//             <li key={item._id} style={{ listStyle: "none" }}>
//               {item.productId?.name} - {item.quantity} pcs
//             </li>
//           ))}
//         </ul>
//       )
//     }
//   ];

//   return (
//     <Paper elevation={3} style={{ padding: 20, margin: "20px auto", maxWidth: 900 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Customer Order Management
//       </Typography>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <TextField
//           label="Enter Customer Mobile Number"
//           variant="outlined"
//           fullWidth
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={fetchOrders} disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Search Orders"}
//         </Button>
//       </div>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid 
//           rows={orders} 
//           columns={columns} 
//           getRowId={(row) => row._id} 
//           loading={loading} 
//           pageSize={5}
//           autoHeight
//         />
//       </div>
//     </Paper>
//   );
// };

// export default CustomerOrderManage;
// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button, CircularProgress, Typography, Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { toast } from "react-toastify"; // Optional for better alerts

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async () => {
//     if (!mobile) {
//       toast.warning("Please enter a mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
//       setOrders(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   const columns = [
//     { field: "_id", headerName: "Order ID", flex: 1 },
//     { field: "totalAmount", headerName: "Total Amount", flex: 1, renderCell: (params) => `₹${params.value}` },
//     { field: "paymentMethod", headerName: "Payment Type", flex: 1 },
//     { field: "status", headerName: "Order Status", flex: 1 },
//     { field: "crop", headerName: "Crop", flex: 1 }, 
//     { field: "purchaseType", headerName: "Purchase Type", flex: 1 }, // ✅ Added Purchase Type Column
//     { 
//       field: "products", 
//       headerName: "Products", 
//       flex: 2,
//       renderCell: (params) => (
//         <ul style={{ padding: 0, margin: 0 }}>
//           {params.row.cart.map((item) => (
//             <li key={item._id} style={{ listStyle: "none" }}>
//               {item.productId?.name} - {item.quantity} pcs
//             </li>
//           ))}
//         </ul>
//       )
//     }
//   ];

//   return (
//     <Paper elevation={3} style={{ padding: 20, margin: "20px auto", maxWidth: 900 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Customer Order Management
//       </Typography>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <TextField
//           label="Enter Customer Mobile Number"
//           variant="outlined"
//           fullWidth
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={fetchOrders} disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Search Orders"}
//         </Button>
//       </div>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid 
//           rows={orders} 
//           columns={columns} 
//           getRowId={(row) => row._id} 
//           loading={loading} 
//           pageSize={5}
//           autoHeight
//         />
//       </div>
//     </Paper>
//   );
// };

// export default CustomerOrderManage;
// import React, { useState } from "react";
// import axios from "axios";
// import { 
//   TextField, Button, CircularProgress, Typography, Paper, 
//   Dialog, DialogTitle, DialogContent, DialogActions 
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { toast } from "react-toastify";

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null); // 🔹 To store the selected order
//   const [open, setOpen] = useState(false); // 🔹 Dialog state

//   const fetchOrders = async () => {
//     if (!mobile) {
//       toast.warning("Please enter a mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
//       setOrders(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//     }
//     setLoading(false);
//   };

//   // 🔹 Function to open the order details dialog
//   const handleOpenDetails = (order) => {
//     setSelectedOrder(order);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const columns = [
//     { field: "_id", headerName: "Order ID", flex: 1 },
//     { field: "totalAmount", headerName: "Total Amount", flex: 1, renderCell: (params) => `₹${params.value}` },
//     { field: "paymentMethod", headerName: "Payment Type", flex: 1 },
//     { field: "status", headerName: "Order Status", flex: 1 },
//     { field: "crop", headerName: "Crop", flex: 1 }, 
//     { field: "purchaseType", headerName: "Purchase Type", flex: 1 },

//     { 
//       field: "cart", 
//       headerName: "Products", 
//       flex: 2,
//       renderCell: (params) => {
//         const cartItems = params.row.cart || [];
//         return (
//           <div>
//             <ul style={{ paddingLeft: "10px", margin: "0" }}>
//               {cartItems.map((item) => (
//                 <li key={item._id} style={{ listStyle: "none" }}>
//                   {item.productId?.name} - {item.quantity} pcs
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       }
//     },

//     // 🔹 View Details Button
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <Button 
//           variant="contained" 
//           color="primary" 
//           size="small" 
//           onClick={() => handleOpenDetails(params.row)}
//         >
//           View
//         </Button>
//       ),
//     }
//   ];

//   return (
//     <Paper elevation={3} style={{ padding: 20, margin: "20px auto", maxWidth: 900 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Customer Order Management
//       </Typography>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <TextField
//           label="Enter Customer Mobile Number"
//           variant="outlined"
//           fullWidth
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={fetchOrders} disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Search Orders"}
//         </Button>
//       </div>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid 
//           rows={orders} 
//           columns={columns} 
//           getRowId={(row) => row._id} 
//           loading={loading} 
//           pageSize={5}
//           autoHeight
//         />
//       </div>

//       {/* 🔹 Order Details Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Order Details</DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <div>
//               <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//               <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
//               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
//               <p><strong>Order Status:</strong> {selectedOrder.status}</p>
//               <p><strong>Crop:</strong> {selectedOrder.crop}</p>
//               <p><strong>Purchase Type:</strong> {selectedOrder.purchaseType}</p>
//               <p><strong>Products:</strong></p>
//               <ul>
//                 {selectedOrder.cart.map((item) => (
//                   <li key={item._id}>
//                     {item.productId?.name} - {item.quantity} pcs
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default CustomerOrderManage;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { 
//   TextField, Button, CircularProgress, Typography, Paper, 
//   Dialog, DialogTitle, DialogContent, DialogActions 
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { toast } from "react-toastify";

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [totalDues, setTotalDues] = useState(0);

//   // const fetchOrders = async () => {
//   //   if (!mobile) {
//   //     toast.warning("Please enter a mobile number");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
      
//   //     // 🔹 Sort orders by latest first
//   //     const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   //     setOrders(sortedOrders);
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Failed to fetch orders");
//   //     setOrders([]);
//   //   }
//   //   setLoading(false);
//   // };
//   const fetchOrders = async () => {
//     if (!mobile) {
//       toast.warning("Please enter a mobile number");
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
  
//       // 🔹 Extract orders and dues
//       const sortedOrders = response.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setOrders(sortedOrders);
//       setTotalDues(response.data.totalDues); // ✅ Store total dues
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//       setTotalDues(0);
//     }
//     setLoading(false);
//   };
  
//   const handleOpenDetails = (order) => {
//     setSelectedOrder(order);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const columns = [
//     {
//       field: "createdAt",
//       headerName: "Order Date",
//       flex: 1
//     },
//     { field: "totalAmount", headerName: "Total Amount", flex: 1, renderCell: (params) => `₹${params.value}` },
//     { field: "paymentMethod", headerName: "Payment Type", flex: 1 },
//     { field: "status", headerName: "Order Status", flex: 1 },
//     { field: "crop", headerName: "Crop", flex: 1 },
//     { field: "purchaseType", headerName: "Purchase Type", flex: 1 },

//     { 
//       field: "cart", 
//       headerName: "Products", 
//       flex: 2,
//       renderCell: (params) => {
//         const cartItems = params.row.cart || [];
//         return (
//           <div>
//             <ul style={{ paddingLeft: "10px", margin: "0" }}>
//               {cartItems.map((item) => (
//                 <li key={item._id} style={{ listStyle: "none" }}>
//                   {item.productId?.name} - {item.quantity} pcs
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       }
//     },

//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <Button 
//           variant="contained" 
//           color="primary" 
//           size="small" 
//           onClick={() => handleOpenDetails(params.row)}
//         >
//           View
//         </Button>
//       ),
//     }
//   ];

//   return (
    
//     <Paper elevation={3} style={{ padding: 20, margin: "20px auto", maxWidth: "1200px", width: "90vw" }}>
//       {totalDues > 0 && (
//   <Typography variant="h6" align="center" color="error">
//     Total Outstanding Dues: ₹{totalDues}
//   </Typography>
// )}
//       <Typography variant="h5" align="center" gutterBottom>
//         Customer Order Management
//       </Typography>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <TextField
//           label="Enter Customer Mobile Number"
//           variant="outlined"
//           fullWidth
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={fetchOrders} disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Search Orders"}
//         </Button>
//       </div>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid 
//           rows={orders} 
//           columns={columns} 
//           getRowId={(row) => row._id} 
//           loading={loading} 
//           pageSize={5}
//           autoHeight
//         />
//       </div>

//       {/* 🔹 Order Details Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Order Details</DialogTitle>
//         <DialogContent dividers>
//           {selectedOrder && (
//             <div>
//               <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
//               <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
//               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
//               <p><strong>Order Status:</strong> {selectedOrder.status}</p>
//               <p><strong>Crop:</strong> {selectedOrder.crop}</p>
//               <p><strong>Purchase Type:</strong> {selectedOrder.purchaseType}</p>
//               <p><strong>Products:</strong></p>
//               <ul>
//                 {selectedOrder.cart.map((item) => (
//                   <li key={item._id}>
//                     {item.productId?.name} - {item.quantity} pcs
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default CustomerOrderManage;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Card,
//   CardContent,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   IconButton,
//   Chip,
//   MenuItem,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Sidebar from "../components/Sidebar"; // Assuming you have a Sidebar
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import "./styles/CustomerOrderManage.css";

// const CustomerOrderManage = () => {
//   const [mobile, setMobile] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [totalDues, setTotalDues] = useState(0);
//   const [statusFilter, setStatusFilter] = useState("All");
//   // Fetch orders by mobile
//   const fetchOrders = async () => {
//     if (!mobile) {
//       toast.warning("Please enter a mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`);
//       const sortedOrders = response.data.orders.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setOrders(sortedOrders);
//       setTotalDues(response.data.totalDues);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//       setOrders([]);
//       setTotalDues(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle view details
//   const handleOpenDetails = (order) => {
//     setSelectedOrder(order);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   // Format date
//   const formatDate = (date) => {
//     return new Date(date).toLocaleString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };
  
//   const handleExport = () => {
//     const csv =
//       "Order Date,Total Amount,Payment Method,Status,Crop,Purchase Type,Products\n" +
//       orders
//         .map((o) =>
//           `${formatDate(o.createdAt)},₹${o.totalAmount},${o.paymentMethod},${o.status},${o.crop},${
//             o.purchaseType
//           },${o.cart.map((i) => `${i.productId?.name}:${i.quantity}`).join(";")}`
//         )
//         .join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `orders_${mobile}.csv`;
//     a.click();
//   };
//   // DataGrid columns
//   const columns = [
//     {
//       field: "createdAt",
//       headerName: "Order Date",
//       flex: 1,
//       renderCell: (params) => formatDate(params.value),
//       sortable: true,
//     },
//     {
//       field: "totalAmount",
//       headerName: "Total Amount",
//       flex: 1,
//       renderCell: (params) => `₹${params.value.toFixed(2)}`,
//       sortable: true,
//     },
//     { field: "paymentMethod", headerName: "Payment Type", flex: 1, sortable: true },
//     {
//       field: "status",
//       headerName: "Order Status",
//       flex: 1,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={params.value === "Completed" ? "success" : "warning"}
//           size="small"
//         />
//       ),
//       sortable: true,
//     },
//     { field: "crop", headerName: "Crop", flex: 1, sortable: true },
//     { field: "purchaseType", headerName: "Purchase Type", flex: 1, sortable: true },
//     // {
//     //   field: "cart",
//     //   headerName: "Products",
//     //   flex: 2,
//     //   sortable: false,
//     //   renderCell: (params) => (
//     //     <Box sx={{ maxHeight: "100px", overflowY: "auto" }}>
//     //       {params.row.cart.map((item) => (
//     //         <Typography key={item._id} variant="body2">
//     //           {item.productId?.name || "Unknown"} - {item.quantity} pcs
//     //         </Typography>
//     //       ))}
//     //     </Box>
//     //   ),
//     // },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="primary"
//           size="small"
//           startIcon={<VisibilityIcon />}
//           onClick={() => handleOpenDetails(params.row)}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

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
//       MuiDataGrid: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//             backgroundColor: "#fff",
//           },
//           columnHeaders: { backgroundColor: "#4CAF50", color: "#fff" },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: { backgroundColor: "#fff", borderRadius: "8px" },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar />
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h4" sx={{ color: "primary.main", mb: 2 }}>
//               Customer Order Management
//             </Typography>
//             {totalDues > 0 && (
//               <Chip
//                 label={`Total Outstanding Dues: ₹${totalDues.toFixed(2)}`}
//                 color="error"
//                 sx={{ mb: 2, fontSize: "1rem", py: 2 }}
//               />
//             )}
//             <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//               <TextField
//                 label="Customer Mobile Number"
//                 variant="outlined"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 fullWidth
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton>
//                       <SearchIcon sx={{ color: "primary.main" }} />
//                     </IconButton>
//                   ),
//                 }}
//                 sx={{ maxWidth: "400px" }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={fetchOrders}
//                 disabled={loading}
//                 sx={{ px: 4, py: 1.5 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Search Orders"}
//               </Button>
//               <Button
//   variant="outlined"
//   color="primary"
//   onClick={handleExport}
//   disabled={orders.length === 0}
//   sx={{ ml: 2 }}
// >
//   Export Orders
// </Button>
//             </Box>
//           </Box>

//           {/* Orders Table */}
//           <Card sx={{ borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
//             <CardContent>
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//                   <CircularProgress size={60} sx={{ color: "primary.main" }} />
//                 </Box>
//               ) : orders.length === 0 ? (
//                 <Box sx={{ textAlign: "center", py: 4 }}>
//                   <Typography variant="h6" color="text.secondary">
//                     No orders found for this mobile number.
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Box sx={{ height: "auto", width: "100%" }}>
//                   <DataGrid
//                     rows={orders}
//                     columns={columns}
//                     getRowId={(row) => row._id}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     autoHeight
//                     disableSelectionOnClick
//                     sortingOrder={["asc", "desc"]}
//                   />
//                   <TextField
//   select
//   label="Filter by Status"
//   value={statusFilter}
//   onChange={(e) => {
//     setStatusFilter(e.target.value);
//     setOrders(
//       e.target.value === "All"
//         ? [...orders]
//         : orders.filter((o) => o.status === e.target.value)
//     );
//   }}
//   sx={{ width: "200px", mr: 2, mb: 2 }}
// >
//   <MenuItem value="All">All</MenuItem>
//   <MenuItem value="Pending">Pending</MenuItem>
//   <MenuItem value="Completed">Completed</MenuItem>
// </TextField>
//                 </Box>
//               )}
//             </CardContent>
//           </Card>

//           {/* Order Details Dialog */}
//           <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//             <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
//               Order Details
//             </DialogTitle>
//             <DialogContent dividers>
//               {selectedOrder && (
//                 <Box sx={{ py: 2 }}>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount.toFixed(2)}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Order Status:</strong>{" "}
//                     <Chip
//                       label={selectedOrder.status}
//                       color={selectedOrder.status === "Completed" ? "success" : "warning"}
//                       size="small"
//                     />
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Crop:</strong> {selectedOrder.crop}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 1 }}>
//                     <strong>Purchase Type:</strong> {selectedOrder.purchaseType}
//                   </Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1 }}>
//                     Products:
//                   </Typography>
//                   {selectedOrder.cart.map((item) => (
//                     <Typography key={item._id} variant="body2" sx={{ ml: 2 }}>
//                       - {item.productId?.name || "Unknown"} ({item.quantity} pcs)
//                     </Typography>
//                   ))}
//                 </Box>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="primary" variant="outlined">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default CustomerOrderManage;

//after added in the Mobile Responsive
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Chip,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerOrderManage = () => {
  const [mobile, setMobile] = useState("");
  const [orders, setOrders] = useState([]);
  const [unfilteredOrders, setUnfilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [totalDues, setTotalDues] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Fetch orders by mobile
  const fetchOrders = async () => {
    if (!mobile) {
      toast.warning("Please enter a mobile number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://agrihub-backend.onrender.com/api/orders/customer-orders/${mobile}`, { withCredentials: true });
      const sortedOrders = response.data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setUnfilteredOrders(sortedOrders); // Store unfiltered orders for status filtering
      setTotalDues(response.data.totalDues);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
      setUnfilteredOrders([]);
      setTotalDues(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle view details
  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle export to CSV
  const handleExport = () => {
    const csv =
      "Order Date,Total Amount,Payment Method,Status,Crop,Purchase Type,Products\n" +
      orders
        .map((o) =>
          `${formatDate(o.createdAt)},₹${o.totalAmount},${o.paymentMethod},${o.status},${o.crop || "N/A"},${
            o.purchaseType || "N/A"
          },${o.cart.map((i) => `${i.productId?.name || "Unknown"}:${i.quantity}`).join(";")}`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${mobile}.csv`;
    a.click();
  };

  // Handle status filter
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    if (value === "All") {
      setOrders(unfilteredOrders);
    } else {
      setOrders(unfilteredOrders.filter((o) => o.status === value));
    }
  };

  // Responsive setup
  useEffect(() => {
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

  // Theme toggler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // DataGrid columns
  const columns = [
    {
      field: "createdAt",
      headerName: "Order Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
      sortable: true,
      minWidth: isMobile ? 120 : 150,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => `₹${params.value.toFixed(2)}`,
      sortable: true,
      minWidth: isMobile ? 100 : 120,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Type",
      flex: 1,
      sortable: true,
      minWidth: isMobile ? 100 : 120,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "status",
      headerName: "Order Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Completed" ? "success" : "warning"}
          size={isMobile ? "small" : "medium"}
        />
      ),
      sortable: true,
      minWidth: isMobile ? 100 : 120,
    },
    {
      field: "crop",
      headerName: "Crop",
      flex: 1,
      sortable: true,
      minWidth: isMobile ? 80 : 100,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      flex: 1,
      sortable: true,
      minWidth: isMobile ? 100 : 120,
      hide: isMobile, // Hide on mobile
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<VisibilityIcon />}
          onClick={() => handleOpenDetails(params.row)}
        >
          View
        </Button>
      ),
      minWidth: isMobile ? 100 : 120,
    },
  ];

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
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          },
          columnHeaders: {
            backgroundColor: darkMode ? "#388E3C" : "#A5D6A7", // Light green in light theme, dark green in dark theme
            color: darkMode ? "#fff" : "#212121", // White in dark theme, black in light theme
          },
          cell: {
            color: darkMode ? "#e0e0e0" : "#212121",
          },
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
          <Box
            sx={{
              mb: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Customer Order Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", sm: "auto" } }}>
              <TextField
                label="Customer Mobile Number"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={fetchOrders}>
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                  ),
                }}
                sx={{ width: { xs: "100%", sm: "400px" }, bgcolor: "background.paper" }}
                size={isMobile ? "small" : "medium"}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={fetchOrders}
                disabled={loading}
                sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" }, px: { xs: 2, sm: 4 }, py: 1 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Search Orders"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExport}
                disabled={orders.length === 0}
                sx={{ borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
              >
                Export Orders
              </Button>
            </Box>
          </Box>

          {/* Orders Table */}
          <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              {totalDues > 0 && (
                <Chip
                  label={`Total Outstanding Dues: ₹${totalDues.toFixed(2)}`}
                  color="error"
                  sx={{ mb: 2, fontSize: "1rem", py: 2 }}
                />
              )}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress size={60} sx={{ color: "primary.main" }} />
                </Box>
              ) : orders.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary">
                    No orders found for this mobile number.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ height: "auto", width: "100%" }}>
                  <TextField
                    select
                    label="Filter by Status"
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "200px" }, mb: 2, bgcolor: "background.paper" }}
                    size={isMobile ? "small" : "medium"}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </TextField>
                  <DataGrid
                    rows={orders}
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    disableSelectionOnClick
                    sortingOrder={["asc", "desc"]}
                    sx={{ "& .MuiDataGrid-cell": { fontSize: isMobile ? "0.75rem" : "0.875rem" } }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Order Details Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ "& .MuiDialog-paper": { bgcolor: darkMode ? "#263238" : "#E8F5E9" } }}>
            <DialogTitle sx={{ bgcolor: darkMode ? "#388E3C" : "#66BB6A", color: "#fff" }}>
              Order Details
            </DialogTitle>
            <DialogContent dividers>
              {selectedOrder && (
                <Box sx={{ py: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Order Status:</strong>{" "}
                    <Chip
                      label={selectedOrder.status}
                      color={selectedOrder.status === "Completed" ? "success" : "warning"}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Crop:</strong> {selectedOrder.crop || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                    <strong>Purchase Type:</strong> {selectedOrder.purchaseType || "N/A"}
                  </Typography>
                  <Divider sx={{ my: 2, bgcolor: darkMode ? "#b0b0b0" : "#757575" }} />
                  <Typography variant={isMobile ? "subtitle2" : "h6"} sx={{ mb: 1, color: "text.primary" }}>
                    Products:
                  </Typography>
                  {selectedOrder.cart.map((item) => (
                    <Typography key={item._id} variant="body2" sx={{ ml: 2, color: "text.primary" }}>
                      - {item.productId?.name || "Unknown"} ({item.quantity} pcs)
                    </Typography>
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
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

export default CustomerOrderManage;