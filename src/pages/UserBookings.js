// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration with Green Theme
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)",
//             },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: darkMode ? "#388E3C" : "#A5D6A7",
//             color: darkMode ? "#fff" : "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
//             My Bookings
//           </Typography>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "text.primary" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="user bookings table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.serviceName}</TableCell>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.crop}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>₹{booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.status}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { jsPDF } from "jspdf"; // Install jsPDF: npm install jspdf

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openInvoice, setOpenInvoice] = useState(false);

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // Handle view invoice
//   const handleViewInvoice = (booking) => {
//     setSelectedBooking(booking);
//     setOpenInvoice(true);
//   };

//   // Generate and download invoice as PDF
//   const generateInvoicePDF = () => {
//     if (!selectedBooking) return;

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("AgriHub Service Invoice", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Booking ID: ${selectedBooking._id}`, 20, 40);
//     doc.text(`Customer Name: ${selectedBooking.customerName}`, 20, 50);
//     doc.text(`Contact Number: ${selectedBooking.contactNumber}`, 20, 60);
//     doc.text(`Service: ${selectedBooking.serviceName}`, 20, 70);
//     doc.text(`Crop: ${selectedBooking.crop}`, 20, 80);
//     doc.text(`Area: ${selectedBooking.areaInSqFt} Sq Ft`, 20, 90);
//     doc.text(`Farm Address: ${selectedBooking.farmAddress}`, 20, 100);
//     doc.text(`Pincode: ${selectedBooking.pincode}`, 20, 110);
//     doc.text(`Total Price: ₹${selectedBooking.totalPrice.toFixed(2)}`, 20, 120);
//     doc.text(`Status: ${selectedBooking.status}`, 20, 130);
//     doc.text(`Labor: ${selectedBooking.laborId?.name || "Not Assigned"}`, 20, 140);
//     doc.text(`Service Date: ${selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}`, 20, 150);

//     doc.save(`invoice_${selectedBooking._id}.pdf`);
//   };

//   // MUI Theme Configuration with Green Theme
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)",
//             },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: darkMode ? "#388E3C" : "#A5D6A7",
//             color: darkMode ? "#fff" : "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
//             My Bookings
//           </Typography>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "text.primary" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="user bookings table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.serviceName}</TableCell>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.crop}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>₹{booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.status}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               color="primary"
//                               onClick={() => handleViewInvoice(booking)}
//                               sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                             >
//                               <VisibilityIcon sx={{ color: "#fff" }} />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Invoice Dialog */}
//         <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ bgcolor: darkMode ? "#388E3C" : "#66BB6A", color: "#fff" }}>
//             Invoice for {selectedBooking?.serviceName || "Service"}
//           </DialogTitle>
//           <DialogContent sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             {selectedBooking && (
//               <Box sx={{ py: 2 }}>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Booking ID:</strong> {selectedBooking._id}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Customer Name:</strong> {selectedBooking.customerName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Contact Number:</strong> {selectedBooking.contactNumber}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Service:</strong> {selectedBooking.serviceName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Crop:</strong> {selectedBooking.crop}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Area:</strong> {selectedBooking.areaInSqFt} Sq Ft
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Farm Address:</strong> {selectedBooking.farmAddress}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Pincode:</strong> {selectedBooking.pincode}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Total Price:</strong> ₹{selectedBooking.totalPrice.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Status:</strong> {selectedBooking.status}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Labor:</strong> {selectedBooking.laborId?.name || "Not Assigned"}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Service Date:</strong> {selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}
//                 </Typography>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={generateInvoicePDF}
//               sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//             >
//               Generate Invoice
//             </Button>
//             <Button
//               onClick={() => setOpenInvoice(false)}
//               color="primary"
//               variant="outlined"
//               sx={{ borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { jsPDF } from "jspdf";

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openInvoice, setOpenInvoice] = useState(false);

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         console.log("Fetched Bookings:", res.data); // Debug log
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // Handle view invoice
//   const handleViewInvoice = (booking) => {
//     console.log("Selected Booking for Invoice:", booking); // Debug log
//     setSelectedBooking(booking);
//     setOpenInvoice(true);
//   };

//   // Generate and download invoice as PDF
//   const generateInvoicePDF = () => {
//     if (!selectedBooking) return;

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("AgriHub Service Invoice", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Booking ID: ${selectedBooking._id}`, 20, 40);
//     doc.text(`Customer Name: ${selectedBooking.customerName}`, 20, 50);
//     doc.text(`Contact Number: ${selectedBooking.contactNumber}`, 20, 60);
//     doc.text(`Service: ${selectedBooking.serviceName}`, 20, 70);
//     doc.text(`Crop: ${selectedBooking.crop}`, 20, 80);
//     doc.text(`Area: ${selectedBooking.areaInSqFt} Sq Ft`, 20, 90);
//     doc.text(`Farm Address: ${selectedBooking.farmAddress}`, 20, 100);
//     doc.text(`Pincode: ${selectedBooking.pincode}`, 20, 110);
//     doc.text(`Total Price: ₹${selectedBooking.totalPrice.toFixed(2)}`, 20, 120);
//     doc.text(`Status: ${selectedBooking.status}`, 20, 130);
//     doc.text(`Labor: ${selectedBooking.laborId?.name || "Not Assigned"}`, 20, 140);
//     doc.text(`Labor Mobile: ${selectedBooking.laborId?.mobile || "N/A"}`, 20, 150);
//     doc.text(`Service Date: ${selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}`, 20, 160);

//     doc.save(`invoice_${selectedBooking._id}.pdf`);
//   };

//   // MUI Theme Configuration with Green Theme
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)",
//             },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: darkMode ? "#388E3C" : "#A5D6A7",
//             color: darkMode ? "#fff" : "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
//             My Bookings
//           </Typography>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "text.primary" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="user bookings table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Labor Mobile</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.serviceName}</TableCell>
//                           <TableCell sx={{ color: "text.primary" }}>{booking.crop}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>₹{booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.status}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>{booking.laborId?.mobile || "N/A"}</TableCell>
//                           <TableCell align="right" sx={{ color: "text.primary" }}>
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               color="primary"
//                               onClick={() => handleViewInvoice(booking)}
//                               sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                             >
//                               <VisibilityIcon sx={{ color: "#fff" }} />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Invoice Dialog */}
//         <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ bgcolor: darkMode ? "#388E3C" : "#66BB6A", color: "#fff" }}>
//             Invoice for {selectedBooking?.serviceName || "Service"}
//           </DialogTitle>
//           <DialogContent sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             {selectedBooking && (
//               <Box sx={{ py: 2 }}>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Booking ID:</strong> {selectedBooking._id}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Customer Name:</strong> {selectedBooking.customerName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Contact Number:</strong> {selectedBooking.contactNumber}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Service:</strong> {selectedBooking.serviceName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Crop:</strong> {selectedBooking.crop}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Area:</strong> {selectedBooking.areaInSqFt} Sq Ft
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Farm Address:</strong> {selectedBooking.farmAddress}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Pincode:</strong> {selectedBooking.pincode}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Total Price:</strong> ₹{selectedBooking.totalPrice.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Status:</strong> {selectedBooking.status}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Labor:</strong> {selectedBooking.laborId?.name || "Not Assigned"}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Labor Mobile:</strong> {selectedBooking.laborId?.mobile || "N/A"}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
//                   <strong>Service Date:</strong> {selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}
//                 </Typography>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={generateInvoicePDF}
//               sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//             >
//               Generate Invoice
//             </Button>
//             <Button
//               onClick={() => setOpenInvoice(false)}
//               color="primary"
//               variant="outlined"
//               sx={{ borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Install with: npm install jspdf-autotable

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openInvoice, setOpenInvoice] = useState(false);

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Handle view invoice
//   const handleViewInvoice = (booking) => {
//     setSelectedBooking(booking);
//     setOpenInvoice(true);
//   };

//   // Generate and download invoice as PDF
//   const generateInvoicePDF = () => {
//     if (!selectedBooking) return;

//     const doc = new jsPDF();
    
//     // Header: AgriHub Branding
//     doc.setFontSize(20);
//     doc.setTextColor(40, 142, 60); // Green color
//     doc.text("AgriHub", 20, 20);
//     doc.setFontSize(10);
//     doc.setTextColor(0);
//     doc.text("Your Trusted Farming Partner", 20, 28);
//     doc.text("Email: support@agrihub.com | Phone: +91 123-456-7890", 20, 34);
//     // Placeholder for logo (uncomment and adjust if you have a logo image)
//     // doc.addImage("/logo.png", "PNG", 160, 10, 30, 30);

//     // Invoice Title
//     doc.setFontSize(16);
//     doc.setTextColor(40, 142, 60);
//     doc.text("Invoice", 20, 50);

//     // Customer and Invoice Details
//     doc.setFontSize(12);
//     doc.setTextColor(0);
//     doc.text(`Invoice ID: ${selectedBooking._id}`, 20, 60);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 66);
//     doc.text(`Customer: ${selectedBooking.customerName}`, 20, 72);
//     doc.text(`Contact: ${selectedBooking.contactNumber}`, 20, 78);

//     // Table for Service Details
//     doc.autoTable({
//       startY: 90,
//       head: [["Description", "Details"]],
//       body: [
//         ["Service", selectedBooking.serviceName],
//         ["Crop", selectedBooking.crop],
//         ["Area", `${selectedBooking.areaInSqFt} Sq Ft`],
//         ["Farm Address", selectedBooking.farmAddress],
//         ["Pincode", selectedBooking.pincode],
//         ["Labor", selectedBooking.laborId?.name || "Not Assigned"],
//         ["Labor Mobile", selectedBooking.laborId?.mobile || "N/A"],
//         ["Service Date", selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"],
//         ["Status", selectedBooking.status],
//       ],
//       styles: { fontSize: 10, cellPadding: 2 },
//       headStyles: { fillColor: [40, 142, 60], textColor: 255 },
//       alternateRowStyles: { fillColor: [245, 245, 245] },
//     });

//     // Total Price
//     const finalY = doc.lastAutoTable.finalY + 10;
//     doc.setFontSize(12);
//     doc.setTextColor(0);
//     doc.text(`Total Amount: ₹${selectedBooking.totalPrice.toFixed(2)}`, 20, finalY);

//     // Footer
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Thank you for choosing AgriHub!", 20, finalY + 20);
//     doc.text("© 2025 AgriHub. All rights reserved.", 20, finalY + 26);

//     doc.save(`invoice_${selectedBooking._id}.pdf`);
//   };

//   // MUI Theme Configuration (Light Theme Only)
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#388E3C" }, // Green
//       secondary: { main: "#4CAF50" },
//       background: { default: "#f5f5f5", paper: "#fff" },
//       text: { primary: "#212121", secondary: "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)", boxShadow: "0 6px 24px rgba(0,0,0,0.15)" },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: "#A5D6A7",
//             color: "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
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
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             bgcolor: "#E8F5E9",
//             borderBottom: "1px solid #ddd",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "primary.main" }}>
//             My Bookings
//           </Typography>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "primary.main" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 750 } }}>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Labor Mobile</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
//                           <TableCell>{booking.serviceName}</TableCell>
//                           <TableCell>{booking.crop}</TableCell>
//                           <TableCell align="right">{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right">₹{booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right">{booking.status}</TableCell>
//                           <TableCell align="right">{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right">{booking.laborId?.mobile || "N/A"}</TableCell>
//                           <TableCell align="right">
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               onClick={() => handleViewInvoice(booking)}
//                               sx={{ color: "#388E3C", "&:hover": { color: "#4CAF50" } }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Invoice Dialog */}
//         <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ bgcolor: "#388E3C", color: "#fff", textAlign: "center" }}>
//             Invoice - {selectedBooking?.serviceName || "Service"}
//           </DialogTitle>
//           <DialogContent sx={{ bgcolor: "#fff", p: 3 }}>
//             {selectedBooking && (
//               <Box>
//                 {/* Header */}
//                 <Box sx={{ textAlign: "center", mb: 3 }}>
//                   {/* Placeholder for logo */}
//                   {/* <img src="/logo.png" alt="AgriHub Logo" style={{ width: "80px", marginBottom: "10px" }} /> */}
//                   <Typography variant="h4" sx={{ color: "#388E3C", fontWeight: "bold" }}>
//                     AgriHub
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Your Trusted Farming Partner
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Email: support@agrihub.com | Phone: +91 123-456-7890
//                   </Typography>
//                 </Box>

//                 {/* Invoice Details */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                   <Box>
//                     <Typography variant="body1"><strong>Invoice ID:</strong> {selectedBooking._id}</Typography>
//                     <Typography variant="body1"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
//                   </Box>
//                   <Box sx={{ textAlign: "right" }}>
//                     <Typography variant="body1"><strong>Customer:</strong> {selectedBooking.customerName}</Typography>
//                     <Typography variant="body1"><strong>Contact:</strong> {selectedBooking.contactNumber}</Typography>
//                   </Box>
//                 </Box>

//                 {/* Service Details Table */}
//                 <TableContainer component={Paper} sx={{ mb: 2, border: "1px solid #ddd" }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#A5D6A7" }}>
//                         <TableCell><strong>Description</strong></TableCell>
//                         <TableCell><strong>Details</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>{selectedBooking.serviceName}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Crop</TableCell>
//                         <TableCell>{selectedBooking.crop}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Area</TableCell>
//                         <TableCell>{selectedBooking.areaInSqFt} Sq Ft</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Farm Address</TableCell>
//                         <TableCell>{selectedBooking.farmAddress}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Pincode</TableCell>
//                         <TableCell>{selectedBooking.pincode}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor</TableCell>
//                         <TableCell>{selectedBooking.laborId?.name || "Not Assigned"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor Mobile</TableCell>
//                         <TableCell>{selectedBooking.laborId?.mobile || "N/A"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Service Date</TableCell>
//                         <TableCell>{selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Status</TableCell>
//                         <TableCell>{selectedBooking.status}</TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Total */}
//                 <Box sx={{ textAlign: "right" }}>
//                   <Typography variant="h6" sx={{ color: "#388E3C" }}>
//                     Total Amount: ₹{selectedBooking.totalPrice.toFixed(2)}
//                   </Typography>
//                 </Box>

//                 {/* Footer */}
//                 <Box sx={{ textAlign: "center", mt: 3 }}>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Thank you for choosing AgriHub!
//                   </Typography>
//                 </Box>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ bgcolor: "#fff" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={generateInvoicePDF}
//               sx={{ bgcolor: "#388E3C", "&:hover": { bgcolor: "#4CAF50" } }}
//             >
//               Download Invoice
//             </Button>
//             <Button
//               onClick={() => setOpenInvoice(false)}
//               color="primary"
//               variant="outlined"
//               sx={{ borderColor: "#388E3C", color: "#388E3C", "&:hover": { borderColor: "#4CAF50" } }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: "#E8F5E9", textAlign: "center", borderTop: "1px solid #ddd" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openInvoice, setOpenInvoice] = useState(false);

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Handle view invoice
//   const handleViewInvoice = (booking) => {
//     setSelectedBooking(booking);
//     setOpenInvoice(true);
//   };

//   // Generate and download invoice as PDF
//   const generateInvoicePDF = () => {
//     if (!selectedBooking) return;

//     const doc = new jsPDF();

//     // Header: AgriHub Branding
//     doc.setFontSize(20);
//     doc.setTextColor(40, 142, 60); // Green color
//     doc.text("AgriHub", 20, 20);
//     doc.setFontSize(10);
//     doc.setTextColor(0);
//     doc.text("Your Trusted Farming Partner", 20, 28);
//     doc.text("Email: support@agrihub.com | Phone: +91 123-456-7890", 20, 34);
//     // Placeholder for logo (uncomment and adjust if you have a logo image)
//     // doc.addImage("/logo.png", "PNG", 160, 10, 30, 30);

//     // Invoice Title
//     doc.setFontSize(16);
//     doc.setTextColor(40, 142, 60);
//     doc.text("Invoice", 20, 50);

//     // Customer and Invoice Details
//     doc.setFontSize(12);
//     doc.setTextColor(0);
//     doc.text(`Invoice ID: ${selectedBooking._id}`, 20, 60);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 66);
//     doc.text(`Customer: ${selectedBooking.customerName}`, 20, 72);
//     doc.text(`Contact: ${selectedBooking.contactNumber}`, 20, 78);

//     // Table for Service Details with Total Price
//     doc.autoTable({
//       startY: 90,
//       head: [["Description", "Details"]],
//       body: [
//         ["Service", selectedBooking.serviceName],
//         ["Crop", selectedBooking.crop],
//         ["Area", `${selectedBooking.areaInSqFt} Sq Ft`],
//         ["Farm Address", selectedBooking.farmAddress],
//         ["Pincode", selectedBooking.pincode],
//         ["Labor", selectedBooking.laborId?.name || "Not Assigned"],
//         ["Labor Mobile", selectedBooking.laborId?.mobile || "N/A"],
//         ["Service Date", selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"],
//         ["Status", selectedBooking.status],
//         ["Total Amount", `₹ ${selectedBooking.totalPrice.toFixed(2)}`], // Explicitly add rupee symbol
//       ],
//       styles: { fontSize: 10, cellPadding: 2, font: "helvetica" }, // Default font supports basic Unicode
//       headStyles: { fillColor: [40, 142, 60], textColor: 255 },
//       alternateRowStyles: { fillColor: [245, 245, 245] },
//       didDrawCell: (data) => {
//         if (data.row.index === 9 && data.column.index === 1) { // Bold Total Amount
//           doc.setFont("helvetica", "bold");
//         } else {
//           doc.setFont("helvetica", "normal");
//         }
//       },
//     });

//     // Footer
//     const finalY = doc.lastAutoTable.finalY + 10;
//     doc.setFontSize(8);
//     doc.setTextColor(100);
//     doc.text("Thank you for choosing AgriHub!", 20, finalY);
//     doc.text("© 2025 AgriHub. All rights reserved.", 20, finalY + 6);

//     doc.save(`invoice_${selectedBooking._id}.pdf`);
//   };

//   // MUI Theme Configuration (Light Theme Only)
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#388E3C" }, // Green
//       secondary: { main: "#4CAF50" },
//       background: { default: "#f5f5f5", paper: "#fff" },
//       text: { primary: "#212121", secondary: "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)", boxShadow: "0 6px 24px rgba(0,0,0,0.15)" },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: "#A5D6A7",
//             color: "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
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
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             bgcolor: "#E8F5E9",
//             borderBottom: "1px solid #ddd",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "primary.main" }}>
//             My Bookings
//           </Typography>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "primary.main" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 750 } }}>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Labor Mobile</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
//                           <TableCell>{booking.serviceName}</TableCell>
//                           <TableCell>{booking.crop}</TableCell>
//                           <TableCell align="right">{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right">₹ {booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right">{booking.status}</TableCell>
//                           <TableCell align="right">{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right">{booking.laborId?.mobile || "N/A"}</TableCell>
//                           <TableCell align="right">
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               onClick={() => handleViewInvoice(booking)}
//                               sx={{ color: "#388E3C", "&:hover": { color: "#4CAF50" } }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Invoice Dialog */}
//         <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ bgcolor: "#388E3C", color: "#fff", textAlign: "center" }}>
//             Invoice - {selectedBooking?.serviceName || "Service"}
//           </DialogTitle>
//           <DialogContent sx={{ bgcolor: "#fff", p: 3 }}>
//             {selectedBooking && (
//               <Box>
//                 {/* Header */}
//                 <Box sx={{ textAlign: "center", mb: 3 }}>
//                   {/* Placeholder for logo */}
//                   {/* <img src="/logo.png" alt="AgriHub Logo" style={{ width: "80px", marginBottom: "10px" }} /> */}
//                   <Typography variant="h4" sx={{ color: "#388E3C", fontWeight: "bold" }}>
//                     AgriHub
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Your Trusted Farming Partner
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Email: support@agrihub.com | Phone: +91 123-456-7890
//                   </Typography>
//                 </Box>

//                 {/* Invoice Details */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                   <Box>
//                     <Typography variant="body1"><strong>Invoice ID:</strong> {selectedBooking._id}</Typography>
//                     <Typography variant="body1"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
//                   </Box>
//                   <Box sx={{ textAlign: "right" }}>
//                     <Typography variant="body1"><strong>Customer:</strong> {selectedBooking.customerName}</Typography>
//                     <Typography variant="body1"><strong>Contact:</strong> {selectedBooking.contactNumber}</Typography>
//                   </Box>
//                 </Box>

//                 {/* Service Details Table */}
//                 <TableContainer component={Paper} sx={{ mb: 2, border: "1px solid #ddd" }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#A5D6A7" }}>
//                         <TableCell><strong>Description</strong></TableCell>
//                         <TableCell><strong>Details</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>{selectedBooking.serviceName}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Crop</TableCell>
//                         <TableCell>{selectedBooking.crop}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Area</TableCell>
//                         <TableCell>{selectedBooking.areaInSqFt} Sq Ft</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Farm Address</TableCell>
//                         <TableCell>{selectedBooking.farmAddress}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Pincode</TableCell>
//                         <TableCell>{selectedBooking.pincode}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor</TableCell>
//                         <TableCell>{selectedBooking.laborId?.name || "Not Assigned"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor Mobile</TableCell>
//                         <TableCell>{selectedBooking.laborId?.mobile || "N/A"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Service Date</TableCell>
//                         <TableCell>{selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Status</TableCell>
//                         <TableCell>{selectedBooking.status}</TableCell>
//                       </TableRow>
//                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                         <TableCell><strong>Total Amount</strong></TableCell>
//                         <TableCell><strong>₹ {selectedBooking.totalPrice.toFixed(2)}</strong></TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Footer */}
//                 <Box sx={{ textAlign: "center", mt: 3 }}>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Thank you for choosing AgriHub!
//                   </Typography>
//                 </Box>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ bgcolor: "#fff" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={generateInvoicePDF}
//               sx={{ bgcolor: "#388E3C", "&:hover": { bgcolor: "#4CAF50" } }}
//             >
//               Download Invoice
//             </Button>
//             <Button
//               onClick={() => setOpenInvoice(false)}
//               color="primary"
//               variant="outlined"
//               sx={{ borderColor: "#388E3C", color: "#388E3C", "&:hover": { borderColor: "#4CAF50" } }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: "#E8F5E9", textAlign: "center", borderTop: "1px solid #ddd" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas"; // Ensure installed: npm install html2canvas

// const UserBookings = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openInvoice, setOpenInvoice] = useState(false);
//   const invoiceRef = useRef();

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
//         setBookings(res.data || []);
//       } catch (error) {
//         console.error("Error fetching bookings:", error.response?.data || error.message);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   // Handle view invoice
//   const handleViewInvoice = (booking) => {
//     setSelectedBooking(booking);
//     setOpenInvoice(true);
//   };

//   // Generate and download invoice as PDF with margins
//   const generateInvoicePDF = () => {
//     if (!selectedBooking || !invoiceRef.current) return;

//     const input = invoiceRef.current;

//     html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const pageWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const margin = 15; // 15mm margin on all sides
//       const contentWidth = pageWidth - 2 * margin; // Width available for content
//       const imgHeight = (canvas.height * contentWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = margin; // Start at top margin

//       // Add first page with margins
//       pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
//       heightLeft -= (pageHeight - 2 * margin);

//       // Add additional pages if content exceeds one page
//       while (heightLeft > 0) {
//         pdf.addPage();
//         position = heightLeft - imgHeight + margin;
//         pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
//         heightLeft -= (pageHeight - 2 * margin);
//       }

//       pdf.save(`invoice_${selectedBooking._id}.pdf`);
//       console.log("PDF downloaded successfully:", `invoice_${selectedBooking._id}.pdf`);
//     }).catch((error) => {
//       console.error("Error generating PDF:", error);
//     });
//   };

//   // MUI Theme Configuration (Light Theme Only)
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#388E3C" },
//       secondary: { main: "#4CAF50" },
//       background: { default: "#f5f5f5", paper: "#fff" },
//       text: { primary: "#212121", secondary: "#757575" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)", boxShadow: "0 6px 24px rgba(0,0,0,0.15)" },
//           },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: "#A5D6A7",
//             color: "#212121",
//             fontWeight: "bold",
//           },
//           body: { padding: { xs: "8px", sm: "12px" } },
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
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "#E8F5E9", borderBottom: "1px solid #ddd" }}>
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "primary.main" }}>
//             My Bookings
//           </Typography>
//         </Box>

//         {/* Bookings Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Card>
//             <CardContent>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "primary.main" }}>
//                 Your Booked Services
//               </Typography>
//               {bookings.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                   No bookings found.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 750 } }}>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>Crop</TableCell>
//                         <TableCell align="right">Area (Sq Ft)</TableCell>
//                         <TableCell align="right">Total Price</TableCell>
//                         <TableCell align="right">Status</TableCell>
//                         <TableCell align="right">Labor</TableCell>
//                         <TableCell align="right">Labor Mobile</TableCell>
//                         <TableCell align="right">Service Date</TableCell>
//                         <TableCell align="right">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
//                           <TableCell>{booking.serviceName}</TableCell>
//                           <TableCell>{booking.crop}</TableCell>
//                           <TableCell align="right">{booking.areaInSqFt}</TableCell>
//                           <TableCell align="right">₹ {booking.totalPrice.toFixed(2)}</TableCell>
//                           <TableCell align="right">{booking.status}</TableCell>
//                           <TableCell align="right">{booking.laborId?.name || "Not Assigned"}</TableCell>
//                           <TableCell align="right">{booking.laborId?.mobile || "N/A"}</TableCell>
//                           <TableCell align="right">
//                             {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
//                           </TableCell>
//                           <TableCell align="right">
//                             <IconButton
//                               onClick={() => handleViewInvoice(booking)}
//                               sx={{ color: "#388E3C", "&:hover": { color: "#4CAF50" } }}
//                             >
//                               <VisibilityIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Invoice Dialog */}
//         <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ bgcolor: "#388E3C", color: "#fff", textAlign: "center" }}>
//             Invoice - {selectedBooking?.serviceName || "Service"}
//           </DialogTitle>
//           <DialogContent sx={{ bgcolor: "#f5f5f5", p: 3 }}>
//             {selectedBooking && (
//               <Box
//                 ref={invoiceRef}
//                 sx={{
//                   bgcolor: "#fff",
//                   p: 3, // Padding inside the invoice content
//                   borderRadius: "8px",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Subtle shadow for paper-like effect
//                   maxWidth: "500px", // Constrain width for a paper-like feel
//                   mx: "auto", // Center the content
//                 }}
//               >
//                 {/* Header */}
//                 <Box sx={{ textAlign: "center", mb: 3 }}>
//                   {/* Placeholder for logo */}
//                   {/* <img src="/logo.png" alt="AgriHub Logo" style={{ width: "80px", marginBottom: "10px" }} /> */}
//                   <Typography variant="h4" sx={{ color: "#388E3C", fontWeight: "bold" }}>
//                     AgriHub
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Your Trusted Farming Partner
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Email: support@agrihub.com | Phone: +91 123-456-7890
//                   </Typography>
//                 </Box>

//                 {/* Invoice Details */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                   <Box>
//                     <Typography variant="body1"><strong>Invoice ID:</strong> {selectedBooking._id}</Typography>
//                     <Typography variant="body1"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
//                   </Box>
//                   <Box sx={{ textAlign: "right" }}>
//                     <Typography variant="body1"><strong>Customer:</strong> {selectedBooking.customerName}</Typography>
//                     <Typography variant="body1"><strong>Contact:</strong> {selectedBooking.contactNumber}</Typography>
//                   </Box>
//                 </Box>

//                 {/* Service Details Table */}
//                 <TableContainer component={Paper} sx={{ mb: 2, border: "1px solid #ddd" }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#A5D6A7" }}>
//                         <TableCell><strong>Description</strong></TableCell>
//                         <TableCell><strong>Details</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell>Service</TableCell>
//                         <TableCell>{selectedBooking.serviceName}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Crop</TableCell>
//                         <TableCell>{selectedBooking.crop}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Area</TableCell>
//                         <TableCell>{selectedBooking.areaInSqFt} Sq Ft</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Farm Address</TableCell>
//                         <TableCell>{selectedBooking.farmAddress}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Pincode</TableCell>
//                         <TableCell>{selectedBooking.pincode}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor</TableCell>
//                         <TableCell>{selectedBooking.laborId?.name || "Not Assigned"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Labor Mobile</TableCell>
//                         <TableCell>{selectedBooking.laborId?.mobile || "N/A"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Service Date</TableCell>
//                         <TableCell>{selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Status</TableCell>
//                         <TableCell>{selectedBooking.status}</TableCell>
//                       </TableRow>
//                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                         <TableCell><strong>Total Amount</strong></TableCell>
//                         <TableCell><strong>₹ {selectedBooking.totalPrice.toFixed(2)}</strong></TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Footer */}
//                 <Box sx={{ textAlign: "center", mt: 3 }}>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Thank you for choosing AgriHub!
//                   </Typography>
//                 </Box>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ bgcolor: "#fff" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={generateInvoicePDF}
//               sx={{ bgcolor: "#388E3C", "&:hover": { bgcolor: "#4CAF50" } }}
//             >
//               Download Invoice
//             </Button>
//             <Button
//               onClick={() => setOpenInvoice(false)}
//               color="primary"
//               variant="outlined"
//               sx={{ borderColor: "#388E3C", color: "#388E3C", "&:hover": { borderColor: "#4CAF50" } }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: "#E8F5E9", textAlign: "center", borderTop: "1px solid #ddd" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserBookings;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";

const UserBookings = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openInvoice, setOpenInvoice] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/my-bookings", { withCredentials: true });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();

    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleViewInvoice = (booking) => {
    setSelectedBooking(booking);
    setOpenInvoice(true);
  };

  const handleTrackBookings = () => {
    navigate("/booking-tracking"); // Adjust route as needed
  };

  const generateInvoicePDF = () => {
    if (!selectedBooking || !invoiceRef.current) return;

    const input = invoiceRef.current;

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= (pageHeight - 2 * margin);

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight + margin;
        pdf.addImage(imgData, "PNG", margin, position, contentWidth, imgHeight);
        heightLeft -= (pageHeight - 2 * margin);
      }

      pdf.save(`invoice_${selectedBooking._id}.pdf`);
    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
  };

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
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "#2E7D32",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
            padding: { xs: "8px", sm: "10px", md: "14px" },
            whiteSpace: "nowrap",
          },
          body: {
            padding: { xs: "8px", sm: "10px", md: "14px" },
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
            padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
            "&:hover": {
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
            background: "linear-gradient(180deg, #FFFFFF 70%, #F7F9F7 100%)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "20px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress size={40} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

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
              <Typography color="text.primary">My Bookings</Typography>
            </Breadcrumbs>
          </Container>
        </Box>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 1.5, sm: 3, md: 4 }, py: { xs: 3, sm: 5 }, flexGrow: 1 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "primary.main",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              background: "linear-gradient(45deg, #2E7D32, #81C784)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Bookings
          </Typography>

          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: "primary.main", fontWeight: 600, mb: { xs: 1, sm: 0 } }}>
                  Your Booked Services
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<TrackChangesIcon />}
                  onClick={handleTrackBookings}
                  sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#81C784" }, width: { xs: "100%", sm: "auto" } }}
                >
                  Track Bookings
                </Button>
              </Box>
              {bookings.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                  No bookings found.
                </Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: { xs: 300, sm: 750 } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Crop</TableCell>
                        <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Area (Sq Ft)</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>Labor</TableCell>
                        <TableCell align="right" sx={{ display: { xs: "none", lg: "table-cell" } }}>Labor Mobile</TableCell>
                        <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Service Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: "#F1F8E9" } }}>
                          <TableCell sx={{ minWidth: { xs: 150, sm: 200 } }}>
                            <Box>
                              <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: "text.primary", fontWeight: 500 }}>
                                {booking.serviceName}
                              </Typography>
                              {isMobile && (
                                <Typography sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                                  Area: {booking.areaInSqFt} Sq Ft | {booking.status}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>{booking.crop}</TableCell>
                          <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{booking.areaInSqFt}</TableCell>
                          <TableCell align="right">₹{booking.totalPrice.toFixed(2)}</TableCell>
                          <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                            <Box
                              sx={{
                                bgcolor:
                                  booking.status === "Completed"
                                    ? "#81C784"
                                    : booking.status === "Pending"
                                    ? "#FFB300"
                                    : "#EF5350",
                                color: "#FFFFFF",
                                borderRadius: "10px",
                                textAlign: "center",
                                py: 0.5,
                                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                              }}
                            >
                              {booking.status}
                            </Box>
                          </TableCell>
                          <TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>{booking.laborId?.name || "Not Assigned"}</TableCell>
                          <TableCell align="right" sx={{ display: { xs: "none", lg: "table-cell" } }}>{booking.laborId?.mobile || "N/A"}</TableCell>
                          <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
                            {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => handleViewInvoice(booking)}
                              sx={{ color: "#2E7D32", "&:hover": { color: "#81C784" } }}
                            >
                              <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Invoice Dialog */}
        <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth fullScreen={isMobile}>
          <DialogTitle sx={{ bgcolor: "#2E7D32", color: "#FFFFFF", textAlign: "center", fontWeight: 600 }}>
            Invoice - {selectedBooking?.serviceName || "Service"}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#F7F9F7", p: { xs: 2, sm: 3 } }}>
            {selectedBooking && (
              <Box
                ref={invoiceRef}
                sx={{
                  bgcolor: "#FFFFFF",
                  p: 3,
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography variant="h4" sx={{ color: "#2E7D32", fontWeight: 700 }}>
                    AgriHub
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Your Trusted Farming Partner
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Email: support@agrihub.com | Phone: +91 123-456-7890
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
                  <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                    <Typography variant="body1" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}><strong>Invoice ID:</strong> {selectedBooking._id}</Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
                  </Box>
                  <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Typography variant="body1" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}><strong>Customer:</strong> {selectedBooking.customerName}</Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}><strong>Contact:</strong> {selectedBooking.contactNumber}</Typography>
                  </Box>
                </Box>

                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#81C784" }}>
                        <TableCell sx={{ color: "#FFFFFF", fontWeight: 600 }}><strong>Description</strong></TableCell>
                        <TableCell sx={{ color: "#FFFFFF", fontWeight: 600 }}><strong>Details</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>{selectedBooking.serviceName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Crop</TableCell>
                        <TableCell>{selectedBooking.crop}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Area</TableCell>
                        <TableCell>{selectedBooking.areaInSqFt} Sq Ft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Farm Address</TableCell>
                        <TableCell>{selectedBooking.farmAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pincode</TableCell>
                        <TableCell>{selectedBooking.pincode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Labor</TableCell>
                        <TableCell>{selectedBooking.laborId?.name || "Not Assigned"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Labor Mobile</TableCell>
                        <TableCell>{selectedBooking.laborId?.mobile || "N/A"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Service Date</TableCell>
                        <TableCell>{selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{selectedBooking.status}</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: "#F1F8E9" }}>
                        <TableCell><strong>Total Amount</strong></TableCell>
                        <TableCell><strong>₹{selectedBooking.totalPrice.toFixed(2)}</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Thank you for choosing AgriHub!
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#FFFFFF", p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateInvoicePDF}
              sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#81C784" } }}
            >
              Download Invoice
            </Button>
            <Button
              onClick={() => setOpenInvoice(false)}
              color="primary"
              variant="outlined"
              sx={{ borderColor: "#2E7D32", color: "#2E7D32", "&:hover": { borderColor: "#81C784", color: "#81C784" } }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default UserBookings;