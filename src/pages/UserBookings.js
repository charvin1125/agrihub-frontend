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
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/my-bookings", { withCredentials: true });
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { jsPDF } from "jspdf"; // Install jsPDF: npm install jspdf

const UserBookings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openInvoice, setOpenInvoice] = useState(false);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/my-bookings", { withCredentials: true });
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error.response?.data || error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();

    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  // Theme toggler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Handle view invoice
  const handleViewInvoice = (booking) => {
    setSelectedBooking(booking);
    setOpenInvoice(true);
  };

  // Generate and download invoice as PDF
  const generateInvoicePDF = () => {
    if (!selectedBooking) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("AgriHub Service Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${selectedBooking._id}`, 20, 40);
    doc.text(`Customer Name: ${selectedBooking.customerName}`, 20, 50);
    doc.text(`Contact Number: ${selectedBooking.contactNumber}`, 20, 60);
    doc.text(`Service: ${selectedBooking.serviceName}`, 20, 70);
    doc.text(`Crop: ${selectedBooking.crop}`, 20, 80);
    doc.text(`Area: ${selectedBooking.areaInSqFt} Sq Ft`, 20, 90);
    doc.text(`Farm Address: ${selectedBooking.farmAddress}`, 20, 100);
    doc.text(`Pincode: ${selectedBooking.pincode}`, 20, 110);
    doc.text(`Total Price: ₹${selectedBooking.totalPrice.toFixed(2)}`, 20, 120);
    doc.text(`Status: ${selectedBooking.status}`, 20, 130);
    doc.text(`Labor: ${selectedBooking.laborId?.name || "Not Assigned"}`, 20, 140);
    doc.text(`Service Date: ${selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}`, 20, 150);

    doc.save(`invoice_${selectedBooking._id}.pdf`);
  };

  // MUI Theme Configuration with Green Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
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
            backgroundColor: darkMode ? "#388E3C" : "#A5D6A7",
            color: darkMode ? "#fff" : "#212121",
            fontWeight: "bold",
          },
          body: { padding: { xs: "8px", sm: "12px" } },
        },
      },
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
        <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Header */}
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
            My Bookings
          </Typography>
          <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Bookings Section */}
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2, color: "text.primary" }}>
                Your Booked Services
              </Typography>
              {bookings.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                  No bookings found.
                </Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="user bookings table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Crop</TableCell>
                        <TableCell align="right">Area (Sq Ft)</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Labor</TableCell>
                        <TableCell align="right">Service Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
                          <TableCell sx={{ color: "text.primary" }}>{booking.serviceName}</TableCell>
                          <TableCell sx={{ color: "text.primary" }}>{booking.crop}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>{booking.areaInSqFt}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>₹{booking.totalPrice.toFixed(2)}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>{booking.status}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>{booking.laborId?.name || "Not Assigned"}</TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>
                            {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : "Not Set"}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              onClick={() => handleViewInvoice(booking)}
                              sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                            >
                              <VisibilityIcon sx={{ color: "#fff" }} />
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
        <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: darkMode ? "#388E3C" : "#66BB6A", color: "#fff" }}>
            Invoice for {selectedBooking?.serviceName || "Service"}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            {selectedBooking && (
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Booking ID:</strong> {selectedBooking._id}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Customer Name:</strong> {selectedBooking.customerName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Contact Number:</strong> {selectedBooking.contactNumber}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Service:</strong> {selectedBooking.serviceName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Crop:</strong> {selectedBooking.crop}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Area:</strong> {selectedBooking.areaInSqFt} Sq Ft
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Farm Address:</strong> {selectedBooking.farmAddress}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Pincode:</strong> {selectedBooking.pincode}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Total Price:</strong> ₹{selectedBooking.totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Status:</strong> {selectedBooking.status}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Labor:</strong> {selectedBooking.laborId?.name || "Not Assigned"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
                  <strong>Service Date:</strong> {selectedBooking.serviceDate ? new Date(selectedBooking.serviceDate).toLocaleDateString() : "Not Set"}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateInvoicePDF}
              sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
            >
              Generate Invoice
            </Button>
            <Button
              onClick={() => setOpenInvoice(false)}
              color="primary"
              variant="outlined"
              sx={{ borderColor: darkMode ? "#66BB6A" : "#388E3C", color: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Footer */}
        <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} AgriHub. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserBookings;