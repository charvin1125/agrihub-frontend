// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import dashboardIcon from './imgs/dashboards.png';
// import vendorsIcon from './imgs/cashier.png';
// import productsIcon from './imgs/organic-product.png';
// import categoryIcon from './imgs/product-page.png';
// import customersIcon from './imgs/customer (1).png';
// import promotionsIcon from './imgs/discount-tag (1).png';
// import './styles/Sidebar.css';

// const Sidebar = () => {
//   const [user, setUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const navigate = useNavigate();
  
//  useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");  // Remove token
//     localStorage.removeItem("user");   // Remove user data
//     setUser(null); // Reset user state
//     navigate("/login");  // Redirect to login page
//   };

//   return (
//     <div className="sidebar">
//       <h4 className="sidebar-title">AgriHub Admin</h4>
//       <ul className="nav-links">
//         <li>
//           <Link to="/admin-dashboard" className="nav-link">
//             <img src={dashboardIcon} alt="Dashboard" className="nav-icon" />
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link to="/manage-vendors" className="nav-link">
//             <img src={vendorsIcon} alt="Manage Vendors" className="nav-icon" />
//             Manage Vendors
//           </Link>
//         </li>
//         <li>
//           <Link to="/manage-products" className="nav-link">
//             <img src={productsIcon} alt="Manage Products" className="nav-icon" />
//             Manage Products
//           </Link>
//         </li>
//         <li>
//           <Link to="/manage-category" className="nav-link">
//             <img src={categoryIcon} alt="Manage Category" className="nav-icon" />
//             Manage Category
//           </Link>
//         </li>
//         <li>
//           <Link to="/manage-customers" className="nav-link">
//             <img src={customersIcon} alt="Manage Customers" className="nav-icon" />
//             Manage Customers
//           </Link>
//         </li>
//         <li>
//           <Link to="/manage-promotions" className="nav-link">
//             <img src={promotionsIcon} alt="Manage Promotions" className="nav-icon" />
//             Manage Promotions
//           </Link>
//         </li>
//       </ul>
//       {/* Logout Button */}
//       <button className="logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CategoryIcon from "@mui/icons-material/Category";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import MenuIcon from "@mui/icons-material/Menu";
// import "./styles/Sidebar.css";

// const Sidebar = () => {
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(true); // Sidebar state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Sidebar Toggle Button */}
//       <IconButton onClick={() => setOpen(!open)} className="menu-button">
//         <MenuIcon />
//       </IconButton>

//       {/* Sidebar Drawer */}
//       <Drawer variant="permanent" open={open} className={`sidebar ${open ? "open" : "closed"}`}>
//         <h3 className="sidebar-title">AgriHub Admin</h3>
//         <Divider />
//         <List>
//           <ListItemButton component={Link} to="/admin-dashboard">
//             <ListItemIcon><DashboardIcon /></ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//           <ListItemButton component={Link} to="/manage-vendors">
//             <ListItemIcon><StorefrontIcon /></ListItemIcon>
//             <ListItemText primary="Manage Vendors" />
//           </ListItemButton>
//           <ListItemButton component={Link} to="/manage-products">
//             <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
//             <ListItemText primary="Manage Products" />
//           </ListItemButton>
//           <ListItemButton component={Link} to="/manage-category">
//             <ListItemIcon><CategoryIcon /></ListItemIcon>
//             <ListItemText primary="Manage Category" />
//           </ListItemButton>
//           <ListItemButton component={Link} to="/manage-customers">
//             <ListItemIcon><PeopleIcon /></ListItemIcon>
//             <ListItemText primary="Manage Customers" />
//           </ListItemButton>
//           <ListItemButton component={Link} to="/manage-promotions">
//             <ListItemIcon><LocalOfferIcon /></ListItemIcon>
//             <ListItemText primary="Manage Promotions" />
//           </ListItemButton>
//         </List>
//         <Divider />

//         {/* Logout Button */}
//         <ListItemButton onClick={handleLogout} className="logout-btn">
//           <ListItemIcon><ExitToAppIcon color="error" /></ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   IconButton,
//   Typography,
//   Box,
//   Avatar,
//   Collapse,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CategoryIcon from "@mui/icons-material/Category";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import "./styles/Sidebar.css";

// const Sidebar = () => {
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(true); // Sidebar collapsed/expanded state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-dashboard" },
//     { text: "Manage Vendors", icon: <StorefrontIcon />, path: "/manage-vendors" },
//     { text: "Manage Products", icon: <ShoppingCartIcon />, path: "/manage-products" },
//     { text: "Manage Category", icon: <CategoryIcon />, path: "/manage-category" },
//     { text: "Manage Customers", icon: <PeopleIcon />, path: "/manage-customers" },
//     { text: "Manage Promotions", icon: <LocalOfferIcon />, path: "/manage-promotions" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: open ? 240 : 60,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 240 : 60,
//             boxSizing: "border-box",
//             transition: "width 0.3s ease",
//             overflowX: "hidden",
//             backgroundColor: "#1a1a2e", // Dark modern background
//             color: "#e0e0e0", // Light text
//           },
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: open ? "space-between" : "center",
//             padding: "10px",
//             backgroundColor: "#16213e", // Slightly darker header
//           }}
//         >
//           {open && (
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
//               AgriHub Admin
//             </Typography>
//           )}
//           <IconButton onClick={() => setOpen(!open)} sx={{ color: "#fff" }}>
//             {open ? <ChevronLeftIcon /> : <MenuIcon />}
//           </IconButton>
//         </Box>

//         {/* User Profile (Optional) */}
//         {open && user && (
//           <Box sx={{ padding: "15px", textAlign: "center" }}>
//             <Avatar sx={{ bgcolor: "#0f3460", margin: "0 auto" }}>
//               {user.name?.charAt(0) || "U"}
//             </Avatar>
//             <Typography variant="body1" sx={{ mt: 1, color: "#fff" }}>
//               {user.name || "Admin"}
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
//               {user.email || "admin@agrihub.com"}
//             </Typography>
//           </Box>
//         )}
//         <Divider sx={{ bgcolor: "#2e2e4e" }} />

//         {/* Menu Items */}
//         <List>
//           {menuItems.map((item) => (
//             <ListItemButton
//               key={item.text}
//               component={Link}
//               to={item.path}
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//                 "&:hover": { bgcolor: "#0f3460" },
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: "#e94560" }}>
//                 {item.icon}
//               </ListItemIcon>
//               <Collapse in={open} orientation="horizontal">
//                 <ListItemText primary={item.text} sx={{ color: "#e0e0e0" }} />
//               </Collapse>
//             </ListItemButton>
//           ))}
//         </List>

//         <Divider sx={{ bgcolor: "#2e2e4e" }} />

//         {/* Logout Button */}
//         <ListItemButton
//           onClick={handleLogout}
//           sx={{
//             mt: "auto",
//             justifyContent: open ? "initial" : "center",
//             "&:hover": { bgcolor: "#0f3460" },
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: "#e94560" }}>
//             <ExitToAppIcon />
//           </ListItemIcon>
//           <Collapse in={open} orientation="horizontal">
//             <ListItemText primary="Logout" sx={{ color: "#e0e0e0" }} />
//           </Collapse>
//         </ListItemButton>
//       </Drawer>

//       {/* Main Content Placeholder */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         {/* Add your main content here */}
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   IconButton,
//   Typography,
//   Box,
//   Avatar,
//   Collapse,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CategoryIcon from "@mui/icons-material/Category";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import InventoryIcon from "@mui/icons-material/Inventory"; // For Inventory Management
// import ReceiptIcon from "@mui/icons-material/Receipt"; // For Customer Orders
// import StoreIcon from "@mui/icons-material/Store"; // For Offline Purchase
// import "./styles/Sidebar.css";

// const Sidebar = () => {
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(true); // Sidebar collapsed/expanded state
//   const navigate = useNavigate();
//   const location = useLocation(); // To highlight active route

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     axios
//       .post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
//       .then(() => {
//         const savedDataKey = `savedCustomerData_${user.username}`;
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("cart");
//         localStorage.removeItem(savedDataKey); // Clear user-specific checkout data
//         setUser(null);
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout failed:", error));
//   };
//   // Updated menu items with new pages
//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-dashboard" },
//     { text: "Manage Vendors", icon: <StorefrontIcon />, path: "/manage-vendors" },
//     { text: "Manage Products", icon: <ShoppingCartIcon />, path: "/manage-products" },
//     { text: "Manage Category", icon: <CategoryIcon />, path: "/manage-category" },
//     { text: "Manage Customers", icon: <PeopleIcon />, path: "/manage-customers" },
//     { text: "Manage Promotions", icon: <LocalOfferIcon />, path: "/manage-promotions" },
//     { text: "Inventory Management", icon: <InventoryIcon />, path: "/manage-inventory" },
//     { text: "Customer Orders", icon: <ReceiptIcon />, path: "/customer-order" },
//     { text: "Offline Purchase", icon: <StoreIcon />, path: "/offline-order" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: open ? 260 : 70,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 260 : 70,
//             boxSizing: "border-box",
//             transition: "width 0.3s ease",
//             overflowX: "hidden",
//             background: "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)", // Gradient background
//             color: "#E0E0E0",
//             borderRight: "none",
//           },
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: open ? "space-between" : "center",
//             padding: "12px 16px",
//             backgroundColor: "#0F3460",
//           }}
//         >
//           {open && (
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF", letterSpacing: "1px" }}>
//               AgriHub Admin
//             </Typography>
//           )}
//           <IconButton onClick={() => setOpen(!open)} sx={{ color: "#FFF" }}>
//             {open ? <ChevronLeftIcon /> : <MenuIcon />}
//           </IconButton>
//         </Box>

//         {/* User Profile */}
//         {open && user && (
//           <Box sx={{ padding: "16px", textAlign: "center", bgcolor: "#16213E" }}>
//             <Avatar
//               sx={{
//                 bgcolor: "#4CAF50",
//                 margin: "0 auto",
//                 width: 50,
//                 height: 50,
//                 border: "2px solid #E94560",
//               }}
//             >
//               {user.name?.charAt(0) || "U"}
//             </Avatar>
//             <Typography variant="body1" sx={{ mt: 1, color: "#FFF", fontWeight: "medium" }}>
//               {user.name || "Admin"}
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#B0B0B0" }}>
//               {user.email || "admin@agrihub.com"}
//             </Typography>
//           </Box>
//         )}
//         <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

//         {/* Menu Items */}
//         <List>
//           {menuItems.map((item) => (
//             <ListItemButton
//               key={item.text}
//               component={Link}
//               to={item.path}
//               sx={{
//                 minHeight: 50,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//                 bgcolor: location.pathname === item.path ? "#0F3460" : "transparent",
//                 "&:hover": {
//                   bgcolor: "#0F3460",
//                   "& .MuiListItemIcon-root": { color: "#FFF" },
//                 },
//                 transition: "background-color 0.2s ease",
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: open ? 40 : 0,
//                   color: location.pathname === item.path ? "#E94560" : "#E94560",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <Collapse in={open} orientation="horizontal">
//                 <ListItemText
//                   primary={item.text}
//                   sx={{
//                     color: location.pathname === item.path ? "#FFF" : "#E0E0E0",
//                     "& .MuiTypography-root": { fontWeight: 500 },
//                   }}
//                 />
//               </Collapse>
//             </ListItemButton>
//           ))}
//         </List>

//         {/* Logout Button */}
//         <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
//         <ListItemButton
//           onClick={handleLogout}
//           sx={{
//             mt: "auto",
//             justifyContent: open ? "initial" : "center",
//             "&:hover": { bgcolor: "#0F3460" },
//             transition: "background-color 0.2s ease",
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: "#E94560" }}>
//             <ExitToAppIcon />
//           </ListItemIcon>
//           <Collapse in={open} orientation="horizontal">
//             <ListItemText
//               primary="Logout"
//               sx={{ color: "#E0E0E0", "& .MuiTypography-root": { fontWeight: 500 } }}
//             />
//           </Collapse>
//         </ListItemButton>
//       </Drawer>

//       {/* Main Content Placeholder */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         {/* Add your main content here */}
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;




//before the mobile responsive
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   IconButton,
//   Typography,
//   Box,
//   Avatar,
//   Collapse,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CategoryIcon from "@mui/icons-material/Category";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import StoreIcon from "@mui/icons-material/Store";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import "./styles/Sidebar.css";

// const Sidebar = ({ darkMode, toggleDarkMode }) => {
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setUser(null);
//         localStorage.removeItem("user");
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     axios
//       .post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
//       .then(() => {
//         const savedDataKey = `savedCustomerData_${user?.username}`;
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("cart");
//         localStorage.removeItem(savedDataKey);
//         setUser(null);
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout failed:", error));
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-dashboard" },
//     { text: "Manage Vendors", icon: <StorefrontIcon />, path: "/manage-vendors" },
//     { text: "Manage Products", icon: <ShoppingCartIcon />, path: "/manage-products" },
//     { text: "Manage Category", icon: <CategoryIcon />, path: "/manage-category" },
//     { text: "Manage Customers", icon: <PeopleIcon />, path: "/manage-customers" },
//     { text: "Manage Promotions", icon: <LocalOfferIcon />, path: "/manage-promotions" },
//     { text: "Inventory Management", icon: <InventoryIcon />, path: "/manage-inventory" },
//     { text: "Customer Orders", icon: <ReceiptIcon />, path: "/customer-order" },
//     { text: "Offline Purchase", icon: <StoreIcon />, path: "/offline-order" },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: open ? 260 : 70,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? 260 : 70,
//           boxSizing: "border-box",
//           transition: "width 0.3s ease",
//           background: darkMode
//             ? "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)"
//             : "linear-gradient(180deg, #F5F5F5 0%, #E0E0E0 100%)",
//           color: darkMode ? "#E0E0E0" : "#212121",
//           borderRight: "none",
//         },
//       }}
//     >
//       {/* Header Section */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: open ? "space-between" : "center",
//           padding: "12px 16px",
//           backgroundColor: darkMode ? "#0F3460" : "#1976d2",
//         }}
//       >
//         {open && (
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF", letterSpacing: "1px" }}>
//             AgriHub Admin
//           </Typography>
//         )}
//         <IconButton onClick={() => setOpen(!open)} sx={{ color: "#FFF" }}>
//           {open ? <ChevronLeftIcon /> : <MenuIcon />}
//         </IconButton>
//       </Box>

//       {/* User Profile */}
//       {open && user && (
//         <Box sx={{ padding: "16px", textAlign: "center", bgcolor: darkMode ? "#16213E" : "#E0E0E0" }}>
//           <Avatar
//             sx={{
//               bgcolor: "#4CAF50",
//               margin: "0 auto",
//               width: 50,
//               height: 50,
//               border: `2px solid ${darkMode ? "#E94560" : "#1976d2"}`,
//             }}
//           >
//             {user.username?.charAt(0) || "U"}
//           </Avatar>
//           <Typography variant="body1" sx={{ mt: 1, color: darkMode ? "#FFF" : "#212121", fontWeight: "medium" }}>
//             {user.username || "Admin"}
//           </Typography>
//           <Typography variant="caption" sx={{ color: darkMode ? "#B0B0B0" : "#757575" }}>
//             {user.email || "admin@agrihub.com"}
//           </Typography>
//         </Box>
//       )}
//       <Divider sx={{ bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

//       {/* Menu Items */}
//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.text}
//             component={Link}
//             to={item.path}
//             sx={{
//               minHeight: 50,
//               justifyContent: open ? "initial" : "center",
//               px: 2.5,
//               bgcolor: location.pathname === item.path ? (darkMode ? "#0F3460" : "#BBDEFB") : "transparent",
//               "&:hover": {
//                 bgcolor: darkMode ? "#0F3460" : "#BBDEFB",
//                 "& .MuiListItemIcon-root": { color: darkMode ? "#FFF" : "#1976d2" },
//               },
//               transition: "background-color 0.2s ease",
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: open ? 40 : 0,
//                 color: location.pathname === item.path ? (darkMode ? "#E94560" : "#1976d2") : darkMode ? "#E94560" : "#757575",
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <Collapse in={open} orientation="horizontal">
//               <ListItemText
//                 primary={item.text}
//                 sx={{
//                   color: location.pathname === item.path ? (darkMode ? "#FFF" : "#1976d2") : darkMode ? "#E0E0E0" : "#212121",
//                   "& .MuiTypography-root": { fontWeight: 500 },
//                 }}
//               />
//             </Collapse>
//           </ListItemButton>
//         ))}
//       </List>

//       {/* Theme Toggle and Logout */}
//       <Box sx={{ mt: "auto" }}>
//         <Divider sx={{ bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//         {open && (
//           <ListItemButton onClick={toggleDarkMode} sx={{ justifyContent: "initial", px: 2.5 }}>
//             <ListItemIcon sx={{ minWidth: 40, color: darkMode ? "#E94560" : "#757575" }}>
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </ListItemIcon>
//             <ListItemText
//               primary={darkMode ? "Light Mode" : "Dark Mode"}
//               sx={{ color: darkMode ? "#E0E0E0" : "#212121", "& .MuiTypography-root": { fontWeight: 500 } }}
//             />
//           </ListItemButton>
//         )}
//         <ListItemButton
//           onClick={handleLogout}
//           sx={{
//             justifyContent: open ? "initial" : "center",
//             "&:hover": { bgcolor: darkMode ? "#0F3460" : "#BBDEFB" },
//             transition: "background-color 0.2s ease",
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: darkMode ? "#E94560" : "#757575" }}>
//             <ExitToAppIcon />
//           </ListItemIcon>
//           <Collapse in={open} orientation="horizontal">
//             <ListItemText
//               primary="Logout"
//               sx={{ color: darkMode ? "#E0E0E0" : "#212121", "& .MuiTypography-root": { fontWeight: 500 } }}
//             />
//           </Collapse>
//         </ListItemButton>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
//after responsive that 
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Box,
  Avatar,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./styles/Sidebar.css";

const Sidebar = ({ darkMode, toggleDarkMode, onToggleSidebar, isMobile, open, setOpen }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/users/logout", {}, { withCredentials: true })
      .then(() => {
        const savedDataKey = `savedCustomerData_${user?.username}`;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        localStorage.removeItem(savedDataKey);
        setUser(null);
        navigate("/login");
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin-dashboard" },
    { text: "Manage Vendors", icon: <StorefrontIcon />, path: "/manage-vendors" },
    { text: "Manage Products", icon: <ShoppingCartIcon />, path: "/manage-products" },
    { text: "Manage Category", icon: <CategoryIcon />, path: "/manage-category" },
    { text: "Manage Customers", icon: <PeopleIcon />, path: "/manage-customers" },
    { text: "Manage Promotions", icon: <LocalOfferIcon />, path: "/manage-promotions" },
    { text: "Inventory Management", icon: <InventoryIcon />, path: "/manage-inventory" },
    { text: "Customer Orders", icon: <ReceiptIcon />, path: "/customer-order" },
    { text: "Offline Purchase", icon: <StoreIcon />, path: "/offline-order" },
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={() => isMobile && setOpen(false)}
      sx={{
        width: open ? 260 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 260 : 70,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          background: darkMode
            ? "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)"
            : "linear-gradient(180deg, #F5F5F5 0%, #E0E0E0 100%)",
          color: darkMode ? "#E0E0E0" : "#212121",
          borderRight: "none",
          zIndex: 1200,
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          padding: "12px 16px",
          backgroundColor: darkMode ? "#0F3460" : "#1976d2",
        }}
      >
        {open && (
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFF", letterSpacing: "1px" }}>
            AgriHub Admin
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "#FFF" }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Box>

      {/* User Profile */}
      {open && user && (
        <Box sx={{ padding: "16px", textAlign: "center", bgcolor: darkMode ? "#16213E" : "#E0E0E0" }}>
          <Avatar
            sx={{
              bgcolor: "#4CAF50",
              margin: "0 auto",
              width: 50,
              height: 50,
              border: `2px solid ${darkMode ? "#E94560" : "#1976d2"}`,
            }}
          >
            {user.username?.charAt(0) || "U"}
          </Avatar>
          <Typography variant="body1" sx={{ mt: 1, color: darkMode ? "#FFF" : "#212121", fontWeight: "medium" }}>
            {user.username || "Admin"}
          </Typography>
          <Typography variant="caption" sx={{ color: darkMode ? "#B0B0B0" : "#757575" }}>
            {user.email || "admin@agrihub.com"}
          </Typography>
        </Box>
      )}
      <Divider sx={{ bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => isMobile && setOpen(false)} // Close sidebar on mobile after click
            sx={{
              minHeight: 50,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              bgcolor: location.pathname === item.path ? (darkMode ? "#0F3460" : "#BBDEFB") : "transparent",
              "&:hover": {
                bgcolor: darkMode ? "#0F3460" : "#BBDEFB",
                "& .MuiListItemIcon-root": { color: darkMode ? "#FFF" : "#1976d2" },
              },
              transition: "background-color 0.2s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: open ? 40 : 0,
                color: location.pathname === item.path ? (darkMode ? "#E94560" : "#1976d2") : darkMode ? "#E94560" : "#757575",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <Collapse in={open} orientation="horizontal">
              <ListItemText
                primary={item.text}
                sx={{
                  color: location.pathname === item.path ? (darkMode ? "#FFF" : "#1976d2") : darkMode ? "#E0E0E0" : "#212121",
                  "& .MuiTypography-root": { fontWeight: 500 },
                }}
              />
            </Collapse>
          </ListItemButton>
        ))}
      </List>

      {/* Theme Toggle and Logout */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
        {open && (
          <ListItemButton onClick={toggleDarkMode} sx={{ justifyContent: "initial", px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 40, color: darkMode ? "#E94560" : "#757575" }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText
              primary={darkMode ? "Light Mode" : "Dark Mode"}
              sx={{ color: darkMode ? "#E0E0E0" : "#212121", "& .MuiTypography-root": { fontWeight: 500 } }}
            />
          </ListItemButton>
        )}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            justifyContent: open ? "initial" : "center",
            "&:hover": { bgcolor: darkMode ? "#0F3460" : "#BBDEFB" },
            transition: "background-color 0.2s ease",
          }}
        >
          <ListItemIcon sx={{ minWidth: open ? 40 : 0, color: darkMode ? "#E94560" : "#757575" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <Collapse in={open} orientation="horizontal">
            <ListItemText
              primary="Logout"
              sx={{ color: darkMode ? "#E0E0E0" : "#212121", "& .MuiTypography-root": { fontWeight: 500 } }}
            />
          </Collapse>
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;