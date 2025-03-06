// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useReactToPrint } from "react-to-print"; // For PDF generation
// import "./styles/Invoice.css"; // Custom styling

// const Invoice = () => {
//   const { orderId } = useParams(); // Get order ID from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const componentRef = useRef(); // Ref for printing

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders`, {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           const selectedOrder = response.data.orders.find(
//             (o) => o._id === orderId
//           );
//           setOrder(selectedOrder || null);
//         }
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   // Format date as DD/MM/YYYY
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Handle PDF download
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `Invoice_${orderId}`,
//   });

//   if (loading) {
//     return <div className="loading">Loading invoice...</div>;
//   }

//   if (!order) {
//     return <div className="no-order">Order not found.</div>;
//   }

//   return (
//     <div className="invoice-container">
//       <div ref={componentRef} className="invoice-content">
//         <h1>Invoice</h1>
//         <p>
//           <strong>Order ID:</strong> {order._id}
//         </p>
//         <p>
//           <strong>Date:</strong> {formatDate(order.createdAt)}
//         </p>
//         <p>
//           <strong>Name:</strong> {order.name}
//         </p>
//         <p>
//           <strong>Phone:</strong> {order.phone}
//         </p>
//         <p>
//           <strong>Address:</strong> {order.address}
//         </p>
//         <p>
//           <strong>Pincode:</strong> {order.pincode}
//         </p>
//         <p>
//           <strong>Crop:</strong> {order.crop}
//         </p>
//         <p>
//           <strong>Total Amount:</strong> ₹{order.totalAmount}
//         </p>
//         <p>
//           <strong>Payment Method:</strong> {order.paymentMethod}
//         </p>
//         <p>
//           <strong>Purchase Type:</strong> {order.purchaseType}
//         </p>
//         <p>
//           <strong>Status:</strong> {order.status}
//         </p>
//         <p>
//           <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
//         </p>
//         <h3>Items:</h3>
//         <table className="items-table">
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Size</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>GST</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {order.cart.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.name}</td>
//                 <td>{item.size}</td>
//                 <td>{item.quantity}</td>
//                 <td>₹{item.price}</td>
//                 <td>{item.gst || 0}</td>
//                 <td>₹{item.totalAmount || item.price * item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button className="download-btn" onClick={handlePrint}>
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default Invoice;
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import DownloadIcon from "@mui/icons-material/Download";
// import "./styles/Invoice.css";

// const Invoice = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const componentRef = useRef();

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders`, {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           const selectedOrder = response.data.orders.find((o) => o._id === orderId);
//           setOrder(selectedOrder || null);
//         }
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   // Format date as DD/MM/YYYY
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Handle PDF download with troubleshooting
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `Invoice_${orderId}`,
//     onAfterPrint: () => {
//       console.log("PDF generation completed");
//     },
//     onPrintError: (error) => {
//       console.error("Print error:", error);
//       alert("Failed to generate PDF. Please try again or check browser permissions.");
//     },
//     // Ensure content is ready before printing
//     onBeforeGetContent: () => {
//       return new Promise((resolve) => {
//         if (componentRef.current) {
//           console.log("Content prepared for printing");
//           resolve();
//         } else {
//           console.error("Ref not found");
//           alert("Error: Invoice content not found.");
//         }
//       });
//     },
//     // Custom print styles
//     onBeforePrint: () => {
//       const style = document.createElement("style");
//       style.innerHTML = `
//         @media print {
//           .invoice-content { padding: 20px; }
//           .download-btn { display: none; }
//           body { margin: 0; }
//         }
//       `;
//       document.head.appendChild(style);
//     },
//   });

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" },
//       secondary: { main: "#f50057" },
//       background: { default: "#f4f4f4" },
//     },
//     components: {
//       MuiTableCell: {
//         styleOverrides: {
//           head: { fontWeight: "bold", backgroundColor: "#4CAF50", color: "#fff", padding: "12px" },
//           body: { padding: "10px" },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!order) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5 }}>
//         <Typography variant="h6" color="text.secondary">
//           Order not found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 900, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
//         <Box
//           ref={componentRef}
//           sx={{
//             bgcolor: "white",
//             p: 4,
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           }}
//           className="invoice-content"
//         >
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
//               Invoice
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               Order ID: {order._id}
//             </Typography>
//           </Box>

//           {/* Customer Details */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Customer Details
//             </Typography>
//             <Grid container spacing={1}>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   <strong>Name:</strong> {order.name}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Phone:</strong> {order.phone}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Address:</strong> {order.address}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Pincode:</strong> {order.pincode}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   <strong>Date:</strong> {formatDate(order.createdAt)}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Crop:</strong> {order.crop}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Purchase Type:</strong> {order.purchaseType}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Status:</strong> {order.status}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Payment Details */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Payment Details
//             </Typography>
//             <Typography variant="body1">
//               <strong>Payment Method:</strong> {order.paymentMethod}
//             </Typography>
//             <Typography variant="body1">
//               <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
//             </Typography>
//             <Typography variant="body1">
//               <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
//             </Typography>
//           </Box>

//           {/* Items Table */}
//           <Divider sx={{ my: 3 }} />
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             Items
//           </Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Item</TableCell>
//                   <TableCell>Size</TableCell>
//                   <TableCell align="right">Quantity</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">GST (%)</TableCell>
//                   <TableCell align="right">Total</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {order.cart.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell>{item.variantSize || "N/A"}</TableCell>
//                     <TableCell align="right">{item.quantity}</TableCell>
//                     <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
//                     <TableCell align="right">{item.gst || 0}</TableCell>
//                     <TableCell align="right">
//                       ₹{(item.totalWithGST || item.price * item.quantity).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={5} align="right">
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       Grand Total:
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="right">
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       ₹{order.totalAmount.toFixed(2)}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Download Button */}
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<DownloadIcon />}
//             onClick={handlePrint}
//             sx={{ px: 4, py: 1 }}
//             className="download-btn"
//           >
//             Download PDF
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Invoice;
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { jsPDF } from "jspdf"; // Install: npm install jspdf
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import DownloadIcon from "@mui/icons-material/Download";
// import "./styles/Invoice.css";

// const Invoice = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const componentRef = useRef();

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders`, {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           const selectedOrder = response.data.orders.find((o) => o._id === orderId);
//           setOrder(selectedOrder || null);
//         }
//       } catch (error) {
//         console.error("Error fetching order:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();
//   }, [orderId]);

//   // Format date as DD/MM/YYYY
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Generate and download PDF with jsPDF
//   const handleDownloadPDF = () => {
//     if (!order) return;

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("AgriHub Service Invoice", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Order ID: ${order._id}`, 20, 40);
//     doc.text(`Customer Name: ${order.name}`, 20, 50);
//     doc.text(`Phone: ${order.phone}`, 20, 60);
//     doc.text(`Address: ${order.address || "N/A"}`, 20, 70);
//     doc.text(`Pincode: ${order.pincode || "N/A"}`, 20, 80);
//     doc.text(`Date: ${formatDate(order.createdAt)}`, 20, 90);
//     doc.text(`Crop: ${order.crop || "N/A"}`, 20, 100);
//     doc.text(`Purchase Type: ${order.purchaseType || "N/A"}`, 20, 110);
//     doc.text(`Status: ${order.status}`, 20, 120);
//     doc.text(`Payment Method: ${order.paymentMethod}`, 20, 130);
//     doc.text(`Total Amount: ₹${order.totalAmount.toFixed(2)}`, 20, 140);
//     doc.text(`Is Due: ${order.isDue ? "Yes" : "No"}`, 20, 150);

//     // Items Table
//     doc.text("Items:", 20, 170);
//     let yPos = 180;
//     order.cart.forEach((item, index) => {
//       doc.text(`${index + 1}. ${item.name} (Size: ${item.size || "N/A"})`, 20, yPos);
//       doc.text(`Qty: ${item.quantity}`, 100, yPos);
//       doc.text(`Price: ₹${item.price.toFixed(2)}`, 130, yPos);
//       doc.text(`GST: ${item.gst || 0}%`, 160, yPos);
//       doc.text(`Total: ₹${(item.totalWithGST || item.price * item.quantity).toFixed(2)}`, 180, yPos);
//       yPos += 10;
//     });
//     doc.text(`Grand Total: ₹${order.totalAmount.toFixed(2)}`, 180, yPos + 10);

//     doc.save(`invoice_${order._id}.pdf`);
//     console.log("PDF downloaded successfully:", `invoice_${order._id}.pdf`);
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       mode: "light", // Default to light mode for invoice; adjust if needed
//       primary: { main: "#4CAF50" },
//       secondary: { main: "#f50057" },
//       background: { default: "#f4f4f4" },
//     },
//     components: {
//       MuiTableCell: {
//         styleOverrides: {
//           head: { fontWeight: "bold", backgroundColor: "#4CAF50", color: "#fff", padding: "12px" },
//           body: { padding: "10px" },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!order) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5 }}>
//         <Typography variant="h6" color="text.secondary">
//           Order not found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ maxWidth: 900, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
//         <Box
//           ref={componentRef}
//           sx={{
//             bgcolor: "white",
//             p: 4,
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           }}
//           className="invoice-content"
//         >
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
//               Invoice
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               Order ID: {order._id}
//             </Typography>
//           </Box>

//           {/* Customer Details */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Customer Details
//             </Typography>
//             <Grid container spacing={1}>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   <strong>Name:</strong> {order.name}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Phone:</strong> {order.phone}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Address:</strong> {order.address || "N/A"}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Pincode:</strong> {order.pincode || "N/A"}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="body1">
//                   <strong>Date:</strong> {formatDate(order.createdAt)}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Crop:</strong> {order.crop || "N/A"}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Purchase Type:</strong> {order.purchaseType || "N/A"}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Status:</strong> {order.status}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Payment Details */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Payment Details
//             </Typography>
//             <Typography variant="body1">
//               <strong>Payment Method:</strong> {order.paymentMethod}
//             </Typography>
//             <Typography variant="body1">
//               <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
//             </Typography>
//             <Typography variant="body1">
//               <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
//             </Typography>
//           </Box>

//           {/* Items Table */}
//           <Divider sx={{ my: 3 }} />
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             Items
//           </Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Item</TableCell>
//                   <TableCell>Size</TableCell> {/* Updated to match AdminOfflinePurchase */}
//                   <TableCell align="right">Quantity</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">GST (%)</TableCell>
//                   <TableCell align="right">Total</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {order.cart.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell>{item.size || "N/A"}</TableCell> {/* Use size instead of variantSize */}
//                     <TableCell align="right">{item.quantity}</TableCell>
//                     <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
//                     <TableCell align="right">{item.gst || 0}</TableCell>
//                     <TableCell align="right">
//                       ₹{(item.totalWithGST || item.price * item.quantity).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={5} align="right">
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       Grand Total:
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="right">
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       ₹{order.totalAmount.toFixed(2)}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Download Button */}
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<DownloadIcon />}
//             onClick={handleDownloadPDF}
//             sx={{ px: 4, py: 1 }}
//             className="download-btn"
//           >
//             Download PDF
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Invoice;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf"; // Install: npm install jspdf
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import HomeIcon from "@mui/icons-material/Home"; // For breadcrumbs
import { motion } from "framer-motion"; // Install: npm install framer-motion
import Logo from "../img/logo-1-removebg.png";
import Seal from "../img/Seal.png";
// Logo and Seal paths (stored in public/)
// const LOGO_PATH = "/logo.png"; // Replace with your logo path in public/
// const SEAL_PATH = "/seal.png"; // Replace with your seal image path in public/

const Invoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [darkMode] = useState(localStorage.getItem("theme") === "dark");

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const selectedOrder = response.data.orders.find((o) => o._id === orderId);
          setOrder(selectedOrder || null);
        }
      } catch (error) {
        console.error("Error fetching order:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    // Handle window resize for mobile detection
    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, [orderId]);

  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate original total (excluding GST)
  const calculateOriginalTotal = (cart) => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  // Generate and download PDF with jsPDF
  const handleDownloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("AgriHub Service Invoice", 20, 20);
    
    // Add logo to PDF
    doc.addImage(Logo, "PNG", 20, 30, 50, 50); // Adjust position and size as needed
    
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 80, 40);
    doc.text(`Customer Name: ${order.name}`, 80, 50);
    doc.text(`Phone: ${order.phone}`, 80, 60);
    doc.text(`Address: ${order.address || "N/A"}`, 80, 70);
    doc.text(`Pincode: ${order.pincode || "N/A"}`, 80, 80);
    doc.text(`Date: ${formatDate(order.createdAt)}`, 80, 90);
    doc.text(`Crop: ${order.crop || "N/A"}`, 80, 100);
    doc.text(`Purchase Type: ${order.purchaseType || "N/A"}`, 80, 110);
    doc.text(`Status: ${order.status}`, 80, 120);
    doc.text(`Payment Method: ${order.paymentMethod}`, 80, 130);
    doc.text(`Total Amount (Original): ₹${calculateOriginalTotal(order.cart)}`, 80, 140);
    doc.text(`Is Due: ${order.isDue ? "Yes" : "No"}`, 80, 150);

    // Items Table
    doc.text("Items:", 20, 170);
    let yPos = 180;
    order.cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (Size: ${item.size || "N/A"})`, 20, yPos);
      doc.text(`Qty: ${item.quantity}`, 100, yPos);
      doc.text(`Price: ₹${item.price.toFixed(2)}`, 130, yPos);
      doc.text(`GST: ${item.gst || 0}%`, 160, yPos);
      doc.text(`Total (Original): ₹${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
      yPos += 10;
    });
    doc.text(`Grand Total (Original): ₹${calculateOriginalTotal(order.cart)}`, 180, yPos + 10);

    // Add seal to PDF
    doc.addImage(Seal, "PNG", 160, yPos + 20, 50, 50); // Adjust position and size as needed

    doc.save(`invoice_${order._id}.pdf`);
    console.log("PDF downloaded successfully:", `invoice_${order._id}.pdf`);
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
      MuiTableCell: {
        styleOverrides: {
          head: { fontWeight: "bold", backgroundColor: darkMode ? "#2E7D32" : "#388E3C", color: "#FFF", padding: "12px" },
          body: { padding: "10px" },
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
    },
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Order not found.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* <NavigationBar /> */}

        {/* Breadcrumbs */}
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9" }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
            <Link to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", md: "1.2rem" } }} /> Home
            </Link>
            <Typography sx={{ color: "primary.main" }}>Invoice</Typography>
          </Breadcrumbs>
        </Box>

        {/* Invoice Content */}
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ maxWidth: 900, mx: "auto", mt: { xs: 2, md: 10 }, p: { xs: 2, sm: 3 }, bgcolor: darkMode ? "#1e1e1e" : "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          ref={componentRef}
        >
          {/* Header with Logo */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="AgriHub Logo"
                style={{ height: isMobile ? 50 : 70, width: "auto", marginRight: 2 }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
              />
              <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "primary.main" }}>
                Invoice
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Order ID: {order._id}
            </Typography>
          </Box>

          {/* Customer Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
              Customer Details
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Name:</strong> {order.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Phone:</strong> {order.phone}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Address:</strong> {order.address || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Pincode:</strong> {order.pincode || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Date:</strong> {formatDate(order.createdAt)}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Crop:</strong> {order.crop || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Purchase Type:</strong> {order.purchaseType || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  <strong>Status:</strong> {order.status}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Payment Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
              Payment Details
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              <strong>Total Amount (Original):</strong> ₹{calculateOriginalTotal(order.cart)}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
            </Typography>
          </Box>

          {/* Items Table */}
          <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
            Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">GST (%)</TableCell>
                  <TableCell align="right">Total (Original)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        {item.size || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        {item.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        ₹{item.price.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        {item.gst || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary" }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography variant={isMobile ? "subtitle1" : "subtitle1"} sx={{ fontWeight: "bold", color: "text.primary" }}>
                      Grand Total (Original):
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant={isMobile ? "subtitle1" : "subtitle1"} sx={{ fontWeight: "bold", color: "text.primary" }}>
                      ₹{calculateOriginalTotal(order.cart)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} align="right" sx={{ pt: 2 }}>
                    <img
                      src={Seal}
                      alt="AgriHub Seal"
                      style={{ height: isMobile ? 80 : 120, width: "auto" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Download Button */}
        <Box sx={{ mt: { xs: 2, md: 3 }, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{
              px: { xs: 2, md: 4 },
              py: { xs: 0.5, md: 1 },
              bgcolor: darkMode ? "#66BB6A" : "#388E3C",
              "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
            }}
          >
            Download PDF
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Invoice;