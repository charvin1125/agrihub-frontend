// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import "./styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data); // Store user info
//         } else {
//           navigate("/"); // Redirect non-admins to home page
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/"); // Redirect to login if not authenticated
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <h2 className="dashboard-title">Admin Dashboard</h2>
//         <div className="cards-container">
//           <div className="card bg-secondary">
//             <h5 className="card-title">Manage Vendors</h5>
//             <p>View, add, and update Vendors.</p>
//             <Link to="/manage-vendors" className="btn">Go to Vendors</Link>
//           </div>
//           <div className="card bg-info">
//             <h5 className="card-title">Manage category</h5>
//             <p>View, add, and update category.</p>
//             <Link to="/manage-category" className="btn">Go to Category</Link>
//           </div>
//           <div className="card bg-primary">
//             <h5 className="card-title">Manage Products</h5>
//             <p>View, add, and update products.</p>
//             <Link to="/manage-products" className="btn">Go to Products</Link>
//           </div>
//           <div className="card bg-success">
//             <h5 className="card-title">Manage Customers</h5>
//             <p>View customer details and manage accounts.</p>
//             <Link to="/manage-customers" className="btn">Go to Customers</Link>
//           </div>
//           <div className="card bg-warning">
//             <h5 className="card-title">Manage Promotions</h5>
//             <p>Create and manage promotional offers.</p>
//             <Link to="/manage-promotions" className="btn">Go to Promotions</Link>
//           </div>
//           <div className="card bg-info">
//             <h5 className="card-title">Orders Overview</h5>
//             <p>View and manage orders.</p>
//             <Link to="/manage-orders" className="btn">View Orders</Link>
//           </div>
//           <div className="card bg-danger">
//             <h5 className="card-title">Reports</h5>
//             <p>View sales and customer reports.</p>
//             <Link to="/view-reports" className="btn">View Reports</Link>
//           </div>
//           <div className="card bg-danger">
//             <h5 className="card-title">Stock</h5>
//             <p>View Low Stock notification.</p>
//             <Link to="/low-stock" className="btn">Stock</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Badge, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
// import "./styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         setLowStockProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <div className="dashboard-header">
//           <h2 className="dashboard-title">Admin Dashboard</h2>
          
//           {/* 🔔 Notification Bell with Badge */}
//           <Tooltip title="Low Stock Alerts">
//             <IconButton color="inherit" onClick={handleClick}>
//               <Badge badgeContent={lowStockProducts.length} color="error">
//                 <NotificationsIcon fontSize="large" />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           {/* Dropdown Menu for Low Stock Alerts */}
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//             {lowStockProducts.length > 0 ? (
//               lowStockProducts.map((product) => (
//                 <MenuItem key={product._id} onClick={handleClose}>
//                   {product.name} (Stock: {product.stock})
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem onClick={handleClose}>No low-stock products</MenuItem>
//             )}
//           </Menu>
//         </div>

//         {/* Cards Section */}
//         <div className="cards-container">
//           <div className="card bg-secondary">
//             <h5 className="card-title">Manage Vendors</h5>
//             <p>View, add, and update Vendors.</p>
//             <Link to="/manage-vendors" className="btn">Go to Vendors</Link>
//           </div>
//           <div className="card bg-info">
//             <h5 className="card-title">Manage category</h5>
//             <p>View, add, and update category.</p>
//             <Link to="/manage-category" className="btn">Go to Category</Link>
//           </div>
//           <div className="card bg-primary">
//             <h5 className="card-title">Manage Products</h5>
//             <p>View, add, and update products.</p>
//             <Link to="/manage-products" className="btn">Go to Products</Link>
//           </div>
//           <div className="card bg-success">
//             <h5 className="card-title">Manage Customers</h5>
//             <p>View customer details and manage accounts.</p>
//             <Link to="/manage-customers" className="btn">Go to Customers</Link>
//           </div>
//           <div className="card bg-warning">
//             <h5 className="card-title">Manage Promotions</h5>
//             <p>Create and manage promotional offers.</p>
//             <Link to="/manage-promotions" className="btn">Go to Promotions</Link>
//           </div>
//           <div className="card bg-info">
//             <h5 className="card-title">Orders Overview</h5>
//             <p>View and manage orders.</p>
//             <Link to="/manage-orders" className="btn">View Orders</Link>
//           </div>
//           <div className="card bg-danger">
//             <h5 className="card-title">Reports</h5>
//             <p>View sales and customer reports.</p>
//             <Link to="/view-reports" className="btn">View Reports</Link>
//           </div>
//           <div className="card bg-danger">
//             <h5 className="card-title">Stock</h5>
//             <p>View Low Stock notification.</p>
//             <Link to="/low-stock" className="btn">Stock</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { Badge, IconButton, Menu, MenuItem, Tooltip, Switch } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import "./styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         setLowStockProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   // Theme toggler function
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       background: { default: darkMode ? "#121212" : "#f4f4f4" },
//       text: { primary: darkMode ? "#fff" : "#000" },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="admin-dashboard">
//         <Sidebar />

//         <div className="dashboard-content">
//           <div className="dashboard-header">
//             <h2 className="dashboard-title">Admin Dashboard</h2>

//             {/* Light & Dark Mode Toggle */}
//             <IconButton onClick={toggleDarkMode} color="inherit">
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>

//             {/* Notification Bell */}
//             <Tooltip title="Low Stock Alerts">
//               <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                 <Badge badgeContent={lowStockProducts.length} color="error">
//                   <NotificationsIcon fontSize="large" />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {/* Dropdown Menu for Low Stock Alerts */}
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//               {lowStockProducts.length > 0 ? (
//                 lowStockProducts.map((product) => (
//                   <MenuItem key={product._id} onClick={() => setAnchorEl(null)}>
//                     {product.name} (Stock: {product.stock})
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//               )}
//             </Menu>
//           </div>

//           {/* Cards Section */}
//           <div className="cards-container">
//             <div className="card bg-secondary">
//               <h5 className="card-title">Manage Vendors</h5>
//               <p>View, add, and update Vendors.</p>
//               <Link to="/manage-vendors" className="btn">Go to Vendors</Link>
//             </div>
//             <div className="card bg-info">
//               <h5 className="card-title">Manage Category</h5>
//               <p>View, add, and update Category.</p>
//               <Link to="/manage-category" className="btn">Go to Category</Link>
//             </div>
//             <div className="card bg-primary">
//               <h5 className="card-title">Manage Products</h5>
//               <p>View, add, and update products.</p>
//               <Link to="/manage-products" className="btn">Go to Products</Link>
//             </div>
//             <div className="card bg-success">
//               <h5 className="card-title">Manage Customers</h5>
//               <p>View customer details and manage accounts.</p>
//               <Link to="/manage-customers" className="btn">Go to Customers</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;

//main before added charts

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { Badge, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import "./styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockVariants, setLowStockVariants] = useState([]); // ✅ Store low stock at variant level
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });

//         // ✅ Flatten product variants that have low stock
//         const lowStockItems = res.data.flatMap(product =>
//           product.variants
//             .filter(variant => variant.stock < 10) // Only low stock variants
//             .map(variant => ({
//               productId: product._id,
//               name: product.name,
//               size: variant.size,
//               stock: variant.stock,
//             }))
//         );

//         setLowStockVariants(lowStockItems);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   // Theme toggler function
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       background: { default: darkMode ? "#121212" : "#f4f4f4" },
//       text: { primary: darkMode ? "#fff" : "#000" },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="admin-dashboard">
//         <Sidebar />

//         <div className="dashboard-content">
//           <div className="dashboard-header">
//             <h2 className="dashboard-title">Admin Dashboard</h2>

//             {/* Light & Dark Mode Toggle */}
//             <IconButton onClick={toggleDarkMode} color="inherit">
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>

//             {/* Notification Bell */}
//             <Tooltip title="Low Stock Alerts">
//               <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                 <Badge badgeContent={lowStockVariants.length} color="error">
//                   <NotificationsIcon fontSize="large" />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {/* Dropdown Menu for Low Stock Alerts */}
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//               {lowStockVariants.length > 0 ? (
//                 lowStockVariants.map((variant, index) => (
//                   <MenuItem key={index} onClick={() => setAnchorEl(null)}>
//                     {variant.name} ({variant.size}) - Stock: {variant.stock}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//               )}
//             </Menu>
//           </div>

//           {/* Cards Section */}
//           <div className="cards-container">
//             <div className="card bg-secondary">
//               <h5 className="card-title">Manage Vendors</h5>
//               <p>View, add, and update Vendors.</p>
//               <Link to="/manage-vendors" className="btn">Go to Vendors</Link>
//             </div>
//             <div className="card bg-info">
//               <h5 className="card-title">Manage Category</h5>
//               <p>View, add, and update Category.</p>
//               <Link to="/manage-category" className="btn">Go to Category</Link>
//             </div>
//             <div className="card bg-primary">
//               <h5 className="card-title">Manage Products</h5>
//               <p>View, add, and update products.</p>
//               <Link to="/manage-products" className="btn">Go to Products</Link>
//             </div>
//             <div className="card bg-success">
//               <h5 className="card-title">Customer Order</h5>
//               <p>View customer Orders and manage accounts.</p>
//               <Link to="/customer-order" className="btn">Go to Customers Orders</Link>
//             </div>
//             <div className="card bg-danger">
//               <h5 className="card-title">Inventory Management</h5>
//               <p>View Inventory Of The Stock.</p>
//               <Link to="/manage-inventory" className="btn">Go to Inventory</Link>
//             </div>

//           </div>



//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";

// Chart.register(...registerables);

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [brandStock, setBrandStock] = useState([]);
//   const [orderStats, setOrderStats] = useState([]);
//   const [salesTrends, setSalesTrends] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsRes, brandStockRes, orderStatsRes, salesTrendsRes, topProductsRes] = await Promise.all([
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/stats"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/brand-stock"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/order-stats"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/sales-trends"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/top-products"),
//         ]);

//         setStats(statsRes.data);
//         setBrandStock(brandStockRes.data);
//         setOrderStats(orderStatsRes.data);
//         setSalesTrends(salesTrendsRes.data);
//         setTopProducts(topProductsRes.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       {/* Summary Stats */}
//       {stats && (
//         <div className="grid grid-cols-3 gap-6">
//           <div className="p-4 bg-blue-100 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">Total Users</h2>
//             <p className="text-xl font-bold">{stats.totalUsers}</p>
//           </div>
//           <div className="p-4 bg-green-100 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">Total Orders</h2>
//             <p className="text-xl font-bold">{stats.totalOrders}</p>
//           </div>
//           <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">Total Revenue</h2>
//             <p className="text-xl font-bold">${stats.totalRevenue}</p>
//           </div>
//         </div>
//       )}

//       {/* Charts */}
//       <div className="grid grid-cols-2 gap-6 mt-6">
//         {/* Brand Stock Bar Chart */}
//         {brandStock.length > 0 && (
//           <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Brand Stock</h2>
//             <Bar
//               data={{
//                 labels: brandStock.map((item) => item._id),
//                 datasets: [
//                   {
//                     label: "Stock",
//                     data: brandStock.map((item) => item.totalStock),
//                     backgroundColor: "rgba(54, 162, 235, 0.6)",
//                   },
//                 ],
//               }}
//             />
//           </div>
//         )}

//         {/* Order Status Pie Chart */}
//         {orderStats.length > 0 && (
//           <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Order Status</h2>
//             <Pie
//               data={{
//                 labels: orderStats.map((item) => item._id),
//                 datasets: [
//                   {
//                     label: "Orders",
//                     data: orderStats.map((item) => item.count),
//                     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//                   },
//                 ],
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Sales Trends & Top Products */}
//       <div className="grid grid-cols-2 gap-6 mt-6">
//         {/* Sales Trends Line Chart */}
//         {salesTrends.length > 0 && (
//           <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Sales Trends</h2>
//             <Line
//               data={{
//                 labels: salesTrends.map((item) => `Month ${item._id}`),
//                 datasets: [
//                   {
//                     label: "Sales",
//                     data: salesTrends.map((item) => item.totalSales),
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     borderWidth: 2,
//                     fill: false,
//                   },
//                 ],
//               }}
//             />
//           </div>
//         )}

//         {/* Top Products */}
//         {topProducts.length > 0 && (
//           <div className="p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Top Selling Products</h2>
//             <ul>
//               {topProducts.map((product, index) => (
//                 <li key={index} className="text-md font-medium">
//                   {product._id} - {product.totalSold} Sold
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import { Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// import { AccountCircle, ShoppingCart, AttachMoney } from "@mui/icons-material";

// Chart.register(...registerables);

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [brandStock, setBrandStock] = useState([]);
//   const [orderStats, setOrderStats] = useState([]);
//   const [salesTrends, setSalesTrends] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statsRes, brandStockRes, orderStatsRes, salesTrendsRes, topProductsRes] = await Promise.all([
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/stats"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/brand-stock"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/order-stats"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/sales-trends"),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/top-products"),
//         ]);
// const brand = brandStockRes.data.reduce((acc,brand)=>{
//   acc[brand._id] = brand.name;
//   return acc;
// },{});
//         setStats(statsRes.data);
//         setBrandStock(brandStockRes.data);
//         setOrderStats(orderStatsRes.data);
//         setSalesTrends(salesTrendsRes.data);
//         setTopProducts(topProductsRes.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         Admin Dashboard
//       </Typography>

//       {/* Stats Cards */}
//       <Grid container spacing={3}>
//         {stats && (
//           <>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ backgroundColor: "#1976d2", color: "white" }}>
//                 <CardContent>
//                   <AccountCircle fontSize="large" />
//                   <Typography variant="h6">Total Users</Typography>
//                   <Typography variant="h4">{stats.totalUsers}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Card sx={{ backgroundColor: "#43a047", color: "white" }}>
//                 <CardContent>
//                   <ShoppingCart fontSize="large" />
//                   <Typography variant="h6">Total Orders</Typography>
//                   <Typography variant="h4">{stats.totalOrders}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Card sx={{ backgroundColor: "#fbc02d", color: "white" }}>
//                 <CardContent>
//                   <AttachMoney fontSize="large" />
//                   <Typography variant="h6">Total Revenue</Typography>
//                   <Typography variant="h4">${stats.totalRevenue}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3} mt={3}>
//         {/* Brand Stock Bar Chart */}
//         {brandStock.length > 0 && (
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" mb={2}>
//                   Brand Stock
//                 </Typography>
//                 <Bar
//                   data={{
//                     labels: brandStock.map((item) => item._id),
//                     datasets: [
//                       {
//                         label: "Stock",
//                         data: brandStock.map((item) => item.totalStock),
//                         backgroundColor: "rgba(54, 162, 235, 0.6)",
//                       },
//                     ],
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </Grid>
//         )}

//         {/* Order Status Pie Chart */}
//         {orderStats.length > 0 && (
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" mb={2}>
//                   Order Status
//                 </Typography>
//                 <Pie
//                   data={{
//                     labels: orderStats.map((item) => item._id),
//                     datasets: [
//                       {
//                         label: "Orders",
//                         data: orderStats.map((item) => item.count),
//                         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//                       },
//                     ],
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Grid>

//       {/* Sales Trends & Top Products */}
//       <Grid container spacing={3} mt={3}>
//         {/* Sales Trends Line Chart */}
//         {salesTrends.length > 0 && (
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" mb={2}>
//                   Sales Trends
//                 </Typography>
//                 <Line
//                   data={{
//                     labels: salesTrends.map((item) => `Month ${item._id}`),
//                     datasets: [
//                       {
//                         label: "Sales",
//                         data: salesTrends.map((item) => item.totalSales),
//                         borderColor: "rgba(75, 192, 192, 1)",
//                         borderWidth: 2,
//                         fill: false,
//                       },
//                     ],
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           </Grid>
//         )}

//         {/* Top Products List */}
//         {topProducts.length > 0 && (
//           <Grid item xs={12} md={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" mb={2}>
//                   Top Selling Products
//                 </Typography>
//                 <ul>
//                   {topProducts.map((product, index) => (
//                     <li key={index} style={{ fontSize: "16px", fontWeight: "500", marginBottom: "6px" }}>
//                       {product._id} - {product.totalSold} Sold
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           </Grid>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Your updated Sidebar
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { Bar, Pie } from "react-chartjs-2"; // For charts
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import "./styles/AdminDashboard.css";

// // Register ChartJS components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ArcElement);

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockVariants, setLowStockVariants] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   // Sample chart data (replace with API calls)
//   const [orderData, setOrderData] = useState({
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "Orders",
//         data: [12, 19, 3, 5, 2],
//         backgroundColor: "#42a5f5",
//       },
//     ],
//   });
//   const [salesData, setSalesData] = useState({
//     labels: ["Online", "Offline"],
//     datasets: [
//       {
//         data: [65, 35],
//         backgroundColor: ["#66bb6a", "#ef5350"],
//       },
//     ],
//   });

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         const lowStockItems = res.data.flatMap((product) =>
//           product.variants
//             .filter((variant) => variant.stock < 10)
//             .map((variant) => ({
//               productId: product._id,
//               name: product.name,
//               size: variant.size,
//               stock: variant.stock,
//             }))
//         );
//         setLowStockVariants(lowStockItems);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);
//   useEffect(() => {
//     const fetchOrderStats = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/stats", { withCredentials: true });
//         const labels = res.data.map((d) => `Month ${d.month}`);
//         const data = res.data.map((d) => d.count);
//         setOrderData({
//           labels,
//           datasets: [{ label: "Orders", data, backgroundColor: "#42a5f5" }],
//         });
//       } catch (error) {
//         console.error("Error fetching order stats:", error);
//       }
//     };
//     fetchOrderStats();
//   }, []);
  
//   useEffect(() => {
//     const fetchSalesDistribution = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/sales", { withCredentials: true });
//         const labels = res.data.map((d) => d._id);
//         const data = res.data.map((d) => d.total);
//         setSalesData({
//           labels,
//           datasets: [{ data, backgroundColor: ["#66bb6a", "#ef5350"] }],
//         });
//       } catch (error) {
//         console.error("Error fetching sales distribution:", error);
//       }
//     };
//     fetchSalesDistribution();
//   }, []);
//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       background: { default: darkMode ? "#121212" : "#f4f4f4" },
//       text: { primary: darkMode ? "#fff" : "#000" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             borderRadius: "12px",
//             transition: "transform 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)" },
//           },
//         },
//       },
//     },
//   });

//   // Chart options
//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top" }, title: { display: true, text: "Monthly Orders" } },
//   };
//   const pieOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top" }, title: { display: true, text: "Sales Distribution" } },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 4,
//             }}
//           >
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
//               Admin Dashboard
//             </Typography>
//             <Box>
//               <IconButton onClick={toggleDarkMode} color="inherit">
//                 {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//               </IconButton>
//               <Tooltip title="Low Stock Alerts">
//                 <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                   <Badge badgeContent={lowStockVariants.length} color="error">
//                     <NotificationsIcon fontSize="large" />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>
//               <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                 {lowStockVariants.length > 0 ? (
//                   lowStockVariants.map((variant, index) => (
//                     <MenuItem key={index} onClick={() => setAnchorEl(null)}>
//                       {variant.name} ({variant.size}) - Stock: {variant.stock}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//                 )}
//               </Menu>
//             </Box>
//           </Box>

//           {/* Cards & Charts */}
//           <Grid container spacing={3}>
//             {/* Cards */}
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Vendors</Typography>
//                   <Typography variant="body2">View, add, and update Vendors.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-vendors" size="small" sx={{ color: "#fff" }}>
//                     Go to Vendors
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#0288d1", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Category</Typography>
//                   <Typography variant="body2">View, add, and update Category.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-category" size="small" sx={{ color: "#fff" }}>
//                     Go to Category
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#42a5f5", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Products</Typography>
//                   <Typography variant="body2">View, add, and update products.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-products" size="small" sx={{ color: "#fff" }}>
//                     Go to Products
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#66bb6a", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Customer Orders</Typography>
//                   <Typography variant="body2">View and manage customer orders.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/customer-order" size="small" sx={{ color: "#fff" }}>
//                     Go to Orders
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>

//             {/* Charts */}
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Bar data={orderData} options={barOptions} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Pie data={salesData} options={pieOptions} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import "./styles/AdminDashboard.css";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   ChartTooltip,
//   Legend,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockVariants, setLowStockVariants] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const navigate = useNavigate();

//   // Chart data states
//   const [stockData, setStockData] = useState({
//     labels: [],
//     datasets: [{ data: [], backgroundColor: [] }],
//   });
//   const [orderData, setOrderData] = useState({
//     labels: [],
//     datasets: [{ label: "Orders", data: [], borderColor: "#42a5f5", fill: false }],
//   });
//   const [salesData, setSalesData] = useState({
//     labels: ["Online", "Offline"],
//     datasets: [{ data: [], backgroundColor: ["#66bb6a", "#ef5350"] }],
//   });

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         const lowStockItems = res.data.flatMap((product) =>
//           product.variants
//             .filter((variant) => variant.stock < 10)
//             .map((variant) => ({
//               productId: product._id,
//               name: product.name,
//               size: variant.size,
//               stock: variant.stock,
//             }))
//         );
//         setLowStockVariants(lowStockItems);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   // Fetch stock data by vendor (Pie Chart)
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/stock-by-vendor", {
//           withCredentials: true,
//         });
//         const labels = res.data.map((vendor) => vendor.vendorName);
//         const data = res.data.map((vendor) => vendor.totalStock);
//         const backgroundColor = res.data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`); // Random colors
//         setStockData({
//           labels,
//           datasets: [{ data, backgroundColor }],
//         });
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, []);

//   // Fetch monthly orders (Line Chart)
//   useEffect(() => {
//     const fetchOrderStats = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/stats", { withCredentials: true });
//         const labels = res.data.map((d) => `Month ${d.month}`);
//         const data = res.data.map((d) => d.count);
//         setOrderData({
//           labels,
//           datasets: [{ label: "Orders", data, borderColor: "#42a5f5", fill: false }],
//         });
//       } catch (error) {
//         console.error("Error fetching order stats:", error);
//       }
//     };
//     fetchOrderStats();
//   }, []);

//   // Fetch sales distribution (Bar Chart)
//   useEffect(() => {
//     const fetchSalesDistribution = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/sales", { withCredentials: true });
//         const data = [res.data.find((d) => d._id === "Online")?.total || 0, res.data.find((d) => d._id === "Offline")?.total || 0];
//         setSalesData({
//           labels: ["Online", "Offline"],
//           datasets: [{ data, backgroundColor: ["#66bb6a", "#ef5350"] }],
//         });
//       } catch (error) {
//         console.error("Error fetching sales distribution:", error);
//       }
//     };
//     fetchSalesDistribution();
//   }, []);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       background: { default: darkMode ? "#121212" : "#f4f4f4" },
//       text: { primary: darkMode ? "#fff" : "#000" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             borderRadius: "12px",
//             transition: "transform 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)" },
//           },
//         },
//       },
//     },
//   });

//   // Chart options
//   const pieOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top" }, title: { display: true, text: "Stock by Vendor" } },
//   };
//   const lineOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top" }, title: { display: true, text: "Monthly Orders" } },
//   };
//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: "top" }, title: { display: true, text: "Sales Distribution" } },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
//               Admin Dashboard
//             </Typography>
//             <Box>
//               <IconButton onClick={toggleDarkMode} color="inherit">
//                 {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//               </IconButton>
//               <Tooltip title="Low Stock Alerts">
//                 <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                   <Badge badgeContent={lowStockVariants.length} color="error">
//                     <NotificationsIcon fontSize="large" />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>
//               <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                 {lowStockVariants.length > 0 ? (
//                   lowStockVariants.map((variant, index) => (
//                     <MenuItem key={index} onClick={() => setAnchorEl(null)}>
//                       {variant.name} ({variant.size}) - Stock: {variant.stock}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//                 )}
//               </Menu>
//             </Box>
//           </Box>

//           {/* Cards & Charts */}
//           <Grid container spacing={3}>
//             {/* Cards */}
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#1976d2", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Vendors</Typography>
//                   <Typography variant="body2">View, add, and update Vendors.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-vendors" size="small" sx={{ color: "#fff" }}>
//                     Go to Vendors
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#0288d1", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Category</Typography>
//                   <Typography variant="body2">View, add, and update Category.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-category" size="small" sx={{ color: "#fff" }}>
//                     Go to Category
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#42a5f5", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Manage Products</Typography>
//                   <Typography variant="body2">View, add, and update products.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/manage-products" size="small" sx={{ color: "#fff" }}>
//                     Go to Products
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Card sx={{ bgcolor: "#66bb6a", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Customer Orders</Typography>
//                   <Typography variant="body2">View and manage customer orders.</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button component={Link} to="/customer-order" size="small" sx={{ color: "#fff" }}>
//                     Go to Orders
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>

//             {/* Charts */}
//             {/* <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Pie data={stockData} options={pieOptions} />
//                 </CardContent>
//               </Card>
//             </Grid> */}
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Line data={orderData} options={lineOptions} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Bar data={salesData} options={barOptions} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Assuming this exists
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   ChartTooltip,
//   Legend,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockVariants, setLowStockVariants] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const navigate = useNavigate();

//   // Chart data states
//   const [stockData, setStockData] = useState({
//     labels: [],
//     datasets: [{ data: [], backgroundColor: [] }],
//   });
//   const [orderData, setOrderData] = useState({
//     labels: [],
//     datasets: [{ label: "Orders", data: [], borderColor: "#42a5f5", fill: false }],
//   });
//   const [salesData, setSalesData] = useState({
//     labels: ["Online", "Offline"],
//     datasets: [{ data: [], backgroundColor: ["#66bb6a", "#ef5350"] }],
//   });

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch dashboard stats
//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const [usersRes, revenueRes, ordersRes] = await Promise.all([
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-users", { withCredentials: true }),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-revenue", { withCredentials: true }),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-orders", { withCredentials: true }),
//         ]);
//         setTotalUsers(usersRes.data.totalUsers);
//         setTotalRevenue(revenueRes.data.totalRevenue);
//         setTotalOrders(ordersRes.data.totalOrders);
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       }
//     };
//     fetchDashboardStats();
//   }, []);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         const lowStockItems = res.data.flatMap((product) =>
//           product.variants
//             .filter((variant) => variant.stock < 10)
//             .map((variant) => ({
//               productId: product._id,
//               name: product.name,
//               size: variant.size,
//               stock: variant.stock,
//             }))
//         );
//         setLowStockVariants(lowStockItems);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   // Fetch stock, order, and sales data (unchanged from your code)
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/stock-by-vendor", { withCredentials: true });
//         const labels = res.data.map((vendor) => vendor.vendorName);
//         const data = res.data.map((vendor) => vendor.totalStock);
//         const backgroundColor = res.data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
//         setStockData({ labels, datasets: [{ data, backgroundColor }] });
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, []);

//   useEffect(() => {
//     const fetchOrderStats = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/stats", { withCredentials: true });
//         const labels = res.data.map((d) => `Month ${d.month}`);
//         const data = res.data.map((d) => d.count);
//         setOrderData({
//           labels,
//           datasets: [{ label: "Orders", data, borderColor: "#42a5f5", fill: false }],
//         });
//       } catch (error) {
//         console.error("Error fetching order stats:", error);
//       }
//     };
//     fetchOrderStats();
//   }, []);

//   useEffect(() => {
//     const fetchSalesDistribution = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/sales", { withCredentials: true });
//         const data = [
//           res.data.find((d) => d._id === "Online")?.total || 0,
//           res.data.find((d) => d._id === "Offline")?.total || 0,
//         ];
//         setSalesData({
//           labels: ["Online", "Offline"],
//           datasets: [{ data, backgroundColor: ["#66bb6a", "#ef5350"] }],
//         });
//       } catch (error) {
//         console.error("Error fetching sales distribution:", error);
//       }
//     };
//     fetchSalesDistribution();
//   }, []);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       secondary: { main: darkMode ? "#f48fb1" : "#d81b60" },
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
//     },
//   });

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top", labels: { color: theme.palette.text.primary } },
//       title: { display: true, color: theme.palette.text.primary },
//     },
//     scales: {
//       x: { ticks: { color: theme.palette.text.secondary } },
//       y: { ticks: { color: theme.palette.text.secondary } },
//     },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
//               Admin Dashboard
//             </Typography>
//             <Box>
//               <Tooltip title="Low Stock Alerts">
//                 <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                   <Badge badgeContent={lowStockVariants.length} color="error">
//                     <NotificationsIcon sx={{ color: "text.primary" }} />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>
//               <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                 {lowStockVariants.length > 0 ? (
//                   lowStockVariants.map((variant, index) => (
//                     <MenuItem key={index} onClick={() => setAnchorEl(null)}>
//                       {variant.name} ({variant.size}) - Stock: {variant.stock}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//                 )}
//               </Menu>
//             </Box>
//           </Box>

//           {/* Stats Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#0288d1" : "#42a5f5", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Users</Typography>
//                   <Typography variant="h4">{totalUsers}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#d81b60" : "#f06292", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Revenue</Typography>
//                   <Typography variant="h4">₹{totalRevenue.toLocaleString()}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#388e3c" : "#66bb6a", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Orders</Typography>
//                   <Typography variant="h4">{totalOrders}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Management Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             {[
//               { title: "Manage Vendors", desc: "View, add, and update Vendors.", to: "/manage-vendors", color: "#1976d2" },
//               { title: "Manage Category", desc: "View, add, and update Category.", to: "/manage-category", color: "#0288d1" },
//               { title: "Manage Products", desc: "View, add, and update products.", to: "/manage-products", color: "#42a5f5" },
//               { title: "Customer Orders", desc: "View and manage customer orders.", to: "/customer-order", color: "#66bb6a" },
//             ].map((item, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Card sx={{ bgcolor: item.color, color: "#fff" }}>
//                   <CardContent>
//                     <Typography variant="h6">{item.title}</Typography>
//                     <Typography variant="body2">{item.desc}</Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button component={Link} to={item.to} size="small" sx={{ color: "#fff" }}>
//                       Go to {item.title.split(" ")[1]}
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Charts */}
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Pie data={stockData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Stock by Vendor" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Line data={orderData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Monthly Orders" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Bar data={salesData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Sales Distribution" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;




//before the add Mobile responsive

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Updated import
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   ChartTooltip,
//   Legend,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [lowStockVariants, setLowStockVariants] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const navigate = useNavigate();

//   // Chart data states
//   const [stockData, setStockData] = useState({
//     labels: [],
//     datasets: [{ data: [], backgroundColor: [] }],
//   });
//   const [orderData, setOrderData] = useState({
//     labels: [],
//     datasets: [{ label: "Orders", data: [], borderColor: "#42a5f5", fill: false }],
//   });
//   const [salesData, setSalesData] = useState({
//     labels: ["Online", "Offline"],
//     datasets: [{ data: [], backgroundColor: ["#66bb6a", "#ef5350"] }],
//   });

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Fetch dashboard stats
//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const [usersRes, revenueRes, ordersRes] = await Promise.all([
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-users", { withCredentials: true }),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-revenue", { withCredentials: true }),
//           axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-orders", { withCredentials: true }),
//         ]);
//         setTotalUsers(usersRes.data.totalUsers);
//         setTotalRevenue(revenueRes.data.totalRevenue);
//         setTotalOrders(ordersRes.data.totalOrders);
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       }
//     };
//     fetchDashboardStats();
//   }, []);

//   // Fetch low stock notifications
//   useEffect(() => {
//     const fetchLowStock = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
//         const lowStockItems = res.data.flatMap((product) =>
//           product.variants
//             .filter((variant) => variant.stock < 10)
//             .map((variant) => ({
//               productId: product._id,
//               name: product.name,
//               size: variant.size,
//               stock: variant.stock,
//             }))
//         );
//         setLowStockVariants(lowStockItems);
//       } catch (error) {
//         console.error("Error fetching low-stock products:", error);
//       }
//     };
//     fetchLowStock();
//   }, []);

//   // Fetch chart data
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/product/stock-by-vendor", { withCredentials: true });
//         const labels = res.data.map((vendor) => vendor.vendorName);
//         const data = res.data.map((vendor) => vendor.totalStock);
//         const backgroundColor = res.data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
//         setStockData({ labels, datasets: [{ data, backgroundColor }] });
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, []);

//   useEffect(() => {
//     const fetchOrderStats = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/stats", { withCredentials: true });
//         const labels = res.data.map((d) => `Month ${d.month}`);
//         const data = res.data.map((d) => d.count);
//         setOrderData({
//           labels,
//           datasets: [{ label: "Orders", data, borderColor: "#42a5f5", fill: false }],
//         });
//       } catch (error) {
//         console.error("Error fetching order stats:", error);
//       }
//     };
//     fetchOrderStats();
//   }, []);

//   useEffect(() => {
//     const fetchSalesDistribution = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/sales", { withCredentials: true });
//         const data = [
//           res.data.find((d) => d._id === "Online")?.total || 0,
//           res.data.find((d) => d._id === "Offline")?.total || 0,
//         ];
//         setSalesData({
//           labels: ["Online", "Offline"],
//           datasets: [{ data, backgroundColor: ["#66bb6a", "#ef5350"] }],
//         });
//       } catch (error) {
//         console.error("Error fetching sales distribution:", error);
//       }
//     };
//     fetchSalesDistribution();
//   }, []);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#90caf9" : "#1976d2" },
//       secondary: { main: darkMode ? "#f48fb1" : "#d81b60" },
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
//     },
//   });

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top", labels: { color: theme.palette.text.primary } },
//       title: { display: true, color: theme.palette.text.primary },
//     },
//     scales: {
//       x: { ticks: { color: theme.palette.text.secondary } },
//       y: { ticks: { color: theme.palette.text.secondary } },
//     },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
//               Admin Dashboard
//             </Typography>
//             <Box>
//               <Tooltip title="Low Stock Alerts">
//                 <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
//                   <Badge badgeContent={lowStockVariants.length} color="error">
//                     <NotificationsIcon sx={{ color: "text.primary" }} />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>
//               <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
//                 {lowStockVariants.length > 0 ? (
//                   lowStockVariants.map((variant, index) => (
//                     <MenuItem key={index} onClick={() => setAnchorEl(null)}>
//                       {variant.name} ({variant.size}) - Stock: {variant.stock}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
//                 )}
//               </Menu>
//             </Box>
//           </Box>

//           {/* Stats Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#0288d1" : "#42a5f5", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Users</Typography>
//                   <Typography variant="h4">{totalUsers}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#d81b60" : "#f06292", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Revenue</Typography>
//                   <Typography variant="h4">₹{totalRevenue.toLocaleString()}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Card sx={{ bgcolor: darkMode ? "#388e3c" : "#66bb6a", color: "#fff" }}>
//                 <CardContent>
//                   <Typography variant="h6">Total Orders</Typography>
//                   <Typography variant="h4">{totalOrders}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Management Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             {[
//               { title: "Manage Vendors", desc: "View, add, and update Vendors.", to: "/manage-vendors", color: "#1976d2" },
//               { title: "Manage Category", desc: "View, add, and update Category.", to: "/manage-category", color: "#0288d1" },
//               { title: "Manage Products", desc: "View, add, and update products.", to: "/manage-products", color: "#42a5f5" },
//               { title: "Customer Orders", desc: "View and manage customer orders.", to: "/customer-order", color: "#66bb6a" },
//             ].map((item, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Card sx={{ bgcolor: item.color, color: "#fff" }}>
//                   <CardContent>
//                     <Typography variant="h6">{item.title}</Typography>
//                     <Typography variant="body2">{item.desc}</Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button component={Link} to={item.to} size="small" sx={{ color: "#fff" }}>
//                       Go to {item.title.split(" ")[1]}
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Charts */}
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Pie data={stockData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Stock by Vendor" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Line data={orderData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Monthly Orders" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardContent>
//                   <Bar data={salesData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: "Sales Distribution" } } }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;


//after monbile Responsive
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [lowStockVariants, setLowStockVariants] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const navigate = useNavigate();

  // Chart data states
  const [stockData, setStockData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [{ label: "Orders", data: [], borderColor: "#42a5f5", fill: false }],
  });
  const [salesData, setSalesData] = useState({
    labels: ["Online", "Offline"],
    datasets: [{ data: [], backgroundColor: ["#66bb6a", "#ef5350"] }],
  });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false); // Collapse sidebar on mobile by default
      else setSidebarOpen(true); // Expand on desktop
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://agrihub-backend.onrender.com/api/users/me", { withCredentials: true });
        if (res.data && res.data.isAdmin) {
          setUser(res.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [usersRes, revenueRes, ordersRes] = await Promise.all([
          axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-users", { withCredentials: true }),
          axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-revenue", { withCredentials: true }),
          axios.get("https://agrihub-backend.onrender.com/api/dashboard/total-orders", { withCredentials: true }),
        ]);
        setTotalUsers(usersRes.data.totalUsers);
        setTotalRevenue(revenueRes.data.totalRevenue);
        setTotalOrders(ordersRes.data.totalOrders);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchDashboardStats();
  }, []);

  // Fetch low stock notifications
  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get("https://agrihub-backend.onrender.com/api/product/low-stock", { withCredentials: true });
        const lowStockItems = res.data.flatMap((product) =>
          product.variants
            .filter((variant) => variant.stock < 10)
            .map((variant) => ({
              productId: product._id,
              name: product.name,
              size: variant.size,
              stock: variant.stock,
            }))
        );
        setLowStockVariants(lowStockItems);
      } catch (error) {
        console.error("Error fetching low-stock products:", error);
      }
    };
    fetchLowStock();
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get("https://agrihub-backend.onrender.com/api/product/stock-by-vendor", { withCredentials: true });
        const labels = res.data.map((vendor) => vendor.vendorName);
        const data = res.data.map((vendor) => vendor.totalStock);
        const backgroundColor = res.data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
        setStockData({ labels, datasets: [{ data, backgroundColor }] });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchStockData();
  }, []);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/stats", { withCredentials: true });
        const labels = res.data.map((d) => `Month ${d.month}`);
        const data = res.data.map((d) => d.count);
        setOrderData({
          labels,
          datasets: [{ label: "Orders", data, borderColor: "#42a5f5", fill: false }],
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    };
    fetchOrderStats();
  }, []);

  useEffect(() => {
    const fetchSalesDistribution = async () => {
      try {
        const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/sales", { withCredentials: true });
        const data = [
          res.data.find((d) => d._id === "Online")?.total || 0,
          res.data.find((d) => d._id === "Offline")?.total || 0,
        ];
        setSalesData({
          labels: ["Online", "Offline"],
          datasets: [{ data, backgroundColor: ["#66bb6a", "#ef5350"] }],
        });
      } catch (error) {
        console.error("Error fetching sales distribution:", error);
      }
    };
    fetchSalesDistribution();
  }, []);

  // Theme toggler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // MUI Theme Configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1976d2" },
      secondary: { main: darkMode ? "#f48fb1" : "#d81b60" },
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
    },
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to resize better on mobile
    plugins: {
      legend: { position: "top", labels: { color: theme.palette.text.primary, fontSize: isMobile ? 12 : 14 } },
      title: { display: true, color: theme.palette.text.primary, font: { size: isMobile ? 14 : 16 } },
    },
    scales: {
      x: { ticks: { color: theme.palette.text.secondary, font: { size: isMobile ? 10 : 12 } } },
      y: { ticks: { color: theme.palette.text.secondary, font: { size: isMobile ? 10 : 12 } } },
    },
  };

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
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: "background.default",
            width: { xs: "100%", sm: `calc(100% - ${sidebarOpen && !isMobile ? 260 : 70}px)` },
            transition: "width 0.3s ease",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 2, sm: 4 },
            }}
          >
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Admin Dashboard
            </Typography>
            <Box>
              <Tooltip title="Low Stock Alerts">
                <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Badge badgeContent={lowStockVariants.length} color="error">
                    <NotificationsIcon sx={{ color: "text.primary" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {lowStockVariants.length > 0 ? (
                  lowStockVariants.map((variant, index) => (
                    <MenuItem key={index} onClick={() => setAnchorEl(null)}>
                      {variant.name} ({variant.size}) - Stock: {variant.stock}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem onClick={() => setAnchorEl(null)}>No low-stock products</MenuItem>
                )}
              </Menu>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 4 } }}>
            {[
              { title: "Total Users", value: totalUsers, color: darkMode ? "#0288d1" : "#42a5f5" },
              { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: darkMode ? "#d81b60" : "#f06292" },
              { title: "Total Orders", value: totalOrders, color: darkMode ? "#388e3c" : "#66bb6a" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ bgcolor: stat.color, color: "#fff" }}>
                  <CardContent>
                    <Typography variant={isMobile ? "subtitle1" : "h6"}>{stat.title}</Typography>
                    <Typography variant={isMobile ? "h5" : "h4"}>{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Management Cards */}
          <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 4 } }}>
            {[
              { title: "Manage Vendors", desc: "View, add, and update Vendors.", to: "/manage-vendors", color: "#1976d2" },
              { title: "Manage Category", desc: "View, add, and update Category.", to: "/manage-category", color: "#0288d1" },
              { title: "Manage Products", desc: "View, add, and update products.", to: "/manage-products", color: "#42a5f5" },
              { title: "Customer Orders", desc: "View and manage customer orders.", to: "/customer-order", color: "#66bb6a" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ bgcolor: item.color, color: "#fff" }}>
                  <CardContent>
                    <Typography variant={isMobile ? "subtitle1" : "h6"}>{item.title}</Typography>
                    <Typography variant="body2">{item.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={item.to} size="small" sx={{ color: "#fff" }}>
                      Go to {item.title.split(" ")[1]}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={2}>
            {[
              { type: "Pie", data: stockData, title: "Stock by Vendor" },
              { type: "Line", data: orderData, title: "Monthly Orders" },
              { type: "Bar", data: salesData, title: "Sales Distribution" },
            ].map((chart, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent sx={{ height: isMobile ? 200 : 300 }}>
                    {chart.type === "Pie" && (
                      <Pie data={chart.data} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: chart.title } } }} />
                    )}
                    {chart.type === "Line" && (
                      <Line data={chart.data} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: chart.title } } }} />
                    )}
                    {chart.type === "Bar" && (
                      <Bar data={chart.data} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: chart.title } } }} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;