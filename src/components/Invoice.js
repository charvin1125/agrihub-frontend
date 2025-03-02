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
//         const response = await axios.get(`http://localhost:5000/api/orders/my-orders`, {
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
//         const response = await axios.get(`http://localhost:5000/api/orders/my-orders`, {
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import "./styles/Invoice.css";

const Invoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/my-orders`, {
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
  }, [orderId]);

  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generate and download PDF with jsPDF
  const handleDownloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("AgriHub Service Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 40);
    doc.text(`Customer Name: ${order.name}`, 20, 50);
    doc.text(`Phone: ${order.phone}`, 20, 60);
    doc.text(`Address: ${order.address || "N/A"}`, 20, 70);
    doc.text(`Pincode: ${order.pincode || "N/A"}`, 20, 80);
    doc.text(`Date: ${formatDate(order.createdAt)}`, 20, 90);
    doc.text(`Crop: ${order.crop || "N/A"}`, 20, 100);
    doc.text(`Purchase Type: ${order.purchaseType || "N/A"}`, 20, 110);
    doc.text(`Status: ${order.status}`, 20, 120);
    doc.text(`Payment Method: ${order.paymentMethod}`, 20, 130);
    doc.text(`Total Amount: ₹${order.totalAmount.toFixed(2)}`, 20, 140);
    doc.text(`Is Due: ${order.isDue ? "Yes" : "No"}`, 20, 150);

    // Items Table
    doc.text("Items:", 20, 170);
    let yPos = 180;
    order.cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (Size: ${item.size || "N/A"})`, 20, yPos);
      doc.text(`Qty: ${item.quantity}`, 100, yPos);
      doc.text(`Price: ₹${item.price.toFixed(2)}`, 130, yPos);
      doc.text(`GST: ${item.gst || 0}%`, 160, yPos);
      doc.text(`Total: ₹${(item.totalWithGST || item.price * item.quantity).toFixed(2)}`, 180, yPos);
      yPos += 10;
    });
    doc.text(`Grand Total: ₹${order.totalAmount.toFixed(2)}`, 180, yPos + 10);

    doc.save(`invoice_${order._id}.pdf`);
    console.log("PDF downloaded successfully:", `invoice_${order._id}.pdf`);
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      mode: "light", // Default to light mode for invoice; adjust if needed
      primary: { main: "#4CAF50" },
      secondary: { main: "#f50057" },
      background: { default: "#f4f4f4" },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: { fontWeight: "bold", backgroundColor: "#4CAF50", color: "#fff", padding: "12px" },
          body: { padding: "10px" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
        },
      },
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="text.secondary">
          Order not found.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
        <Box
          ref={componentRef}
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          className="invoice-content"
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
              Invoice
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Order ID: {order._id}
            </Typography>
          </Box>

          {/* Customer Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Customer Details
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Name:</strong> {order.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {order.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {order.address || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Pincode:</strong> {order.pincode || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(order.createdAt)}
                </Typography>
                <Typography variant="body1">
                  <strong>Crop:</strong> {order.crop || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Purchase Type:</strong> {order.purchaseType || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {order.status}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Payment Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Payment Details
            </Typography>
            <Typography variant="body1">
              <strong>Payment Method:</strong> {order.paymentMethod}
            </Typography>
            <Typography variant="body1">
              <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
            </Typography>
          </Box>

          {/* Items Table */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Size</TableCell> {/* Updated to match AdminOfflinePurchase */}
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">GST (%)</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.size || "N/A"}</TableCell> {/* Use size instead of variantSize */}
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">₹{item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{item.gst || 0}</TableCell>
                    <TableCell align="right">
                      ₹{(item.totalWithGST || item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Grand Total:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      ₹{order.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Download Button */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{ px: 4, py: 1 }}
            className="download-btn"
          >
            Download PDF
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Invoice;