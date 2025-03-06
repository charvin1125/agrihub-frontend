// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // Optional: For notifications
// import "react-toastify/dist/ReactToastify.css"; // Optional: Toast styling
// import "./styles/MyOrder.css";// Optional: For custom styling

// const MyOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch orders when the component mounts
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders", {
//           withCredentials: true, // Include credentials (session) for authentication
//         });

//         if (response.data.success) {
//           setOrders(response.data.orders); // Set all orders, no filtering by status
//         } else {
//           toast.error(response.data.message || "Failed to fetch orders");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         toast.error("Something went wrong while fetching your orders.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Render loading state
//   if (loading) {
//     return <div className="loading">Loading your orders...</div>;
//   }

//   // Render when no orders are found
//   if (orders.length === 0) {
//     return <div className="no-orders">No orders found.</div>;
//   }

//   return (
//     <div className="my-orders-container">
//       <h1>My Orders</h1>
//       <div className="orders-list">
//         {orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <h3>Order ID: {order._id}</h3>
//             <p>
//               <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Name:</strong> {order.name}
//             </p>
//             <p>
//               <strong>Phone:</strong> {order.phone}
//             </p>
//             <p>
//               <strong>Address:</strong> {order.address}
//             </p>
//             <p>
//               <strong>Pincode:</strong> {order.pincode}
//             </p>
//             <p>
//               <strong>Crop:</strong> {order.crop}
//             </p>
//             <p>
//               <strong>Total Amount:</strong> ₹{order.totalAmount}
//             </p>
//             <p>
//               <strong>Payment Method:</strong> {order.paymentMethod}
//             </p>
//             <p>
//               <strong>Purchase Type:</strong> {order.purchaseType}
//             </p>
//             <p>
//               <strong>Status:</strong> {order.status}
//             </p>
//             <p>
//               <strong>Is Due:</strong> {order.isDue ? "Yes" : "No"}
//             </p>
//             <h4>Items:</h4>
//             <ul className="cart-items">
//               {order.cart.map((item, index) => (
//                 <li key={index} className="cart-item">
//                   <span>{item.name} ({item.size})</span>
//                   <span>Qty: {item.quantity}</span>
//                   <span>Price: ₹{item.price}</span>
//                   <span>GST: ₹{item.gst || 0}</span>
//                   <span>Total: ₹{item.totalWithGST || item.price * item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrder;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TextField,
  IconButton,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import "./styles/MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/orders/my-orders", {
          withCredentials: true,
        });

        if (response.data.success) {
          setOrders(response.data.orders);
          setFilteredOrders(response.data.orders);
        } else {
          toast.error(response.data.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Something went wrong while fetching your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle View button click
  const handleViewOrder = (orderId) => {
    navigate(`/invoice/${orderId}`);
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(query) ||
        order.crop.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.paymentMethod.toLowerCase().includes(query) ||
        order.purchaseType.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  // Handle sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);

    const sorted = [...filteredOrders].sort((a, b) => {
      if (field === "createdAt") {
        return isAsc
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      } else if (field === "totalAmount") {
        return isAsc ? a[field] - b[field] : b[field] - a[field];
      } else {
        return isAsc
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });
    setFilteredOrders(sorted);
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#4CAF50" }, // Green for AgriHub theme
      secondary: { main: "#f50057" },
      background: { default: "#f4f4f4" },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: { fontWeight: "bold", backgroundColor: "#4CAF50", color: "#fff" },
          body: { padding: "12px" },
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}>
          My Orders
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>

        {/* Orders Table */}
        <TableContainer component={Paper} sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
          {filteredOrders.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No orders found.
              </Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    { label: "Date", field: "createdAt" },
                    { label: "Order ID", field: "_id" },
                    { label: "Crop", field: "crop" },
                    { label: "Order Status", field: "status" },
                    { label: "Payment Method", field: "paymentMethod" },
                    { label: "Purchase Type", field: "purchaseType" },
                    { label: "Total Amount", field: "totalAmount" },
                    { label: "Action", field: null },
                  ].map(({ label, field }) => (
                    <TableCell key={label}>
                      {field ? (
                        <TableSortLabel
                          active={sortField === field}
                          direction={sortField === field ? sortOrder : "asc"}
                          onClick={() => handleSort(field)}
                        >
                          {label}
                        </TableSortLabel>
                      ) : (
                        label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5", transition: "background-color 0.2s" },
                    }}
                  >
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.crop}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor:
                            order.status === "Completed"
                              ? "success.light"
                              : order.status === "Pending"
                              ? "warning.light"
                              : "error.light",
                          color: "white",
                          borderRadius: "12px",
                          textAlign: "center",
                          py: 0.5,
                        }}
                      >
                        {order.status}
                      </Box>
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.purchaseType}</TableCell>
                    <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewOrder(order._id)}
                        size="small"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={filteredOrders.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(e, newPage) => setPage(newPage)}
  onRowsPerPageChange={(e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }}
/>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default MyOrder;