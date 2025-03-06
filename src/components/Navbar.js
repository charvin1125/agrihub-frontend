// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './styles/Navbar.css';

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true, // Ensure session cookies are sent
//         });
//         setUser(response.data);
//       } catch (error) {
//         setUser(null); // Ensure UI updates if user is not logged in
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null); // Reset state after logout
//       navigate("/login"); // Redirect to login
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom-navbar">
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">AgriHub</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>

//             <NavDropdown title="Features" id="basic-nav-dropdown" className="nav-dropdown-custom">
//               <NavDropdown.Item as={Link} to="/crop-management">Crop Management</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/weather-updates">Weather Updates</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/market-insights">Market Insights</NavDropdown.Item>
//             </NavDropdown>

//             <Nav.Link as={Link} to="/services" className="nav-link-custom">Services</Nav.Link>
//             <Nav.Link as={Link} to="/products" className="nav-link-custom">Products</Nav.Link>
//             <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
//             <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>

//             {/* User Dropdown - Show Profile & Logout if logged in, otherwise show Login/Register */}
//             <NavDropdown title={user ? user.username : "User"} id="user-nav-dropdown" className="nav-dropdown-custom">
//               {user ? (
//                 <>
//                   <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
//                   <NavDropdown.Item as={Link} to="/previous-bills">My PreviousBills</NavDropdown.Item>
//                   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//                 </>
//               ) : (
//                 <>
//                   <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
//                   <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
//                 </>
//               )}
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;
// import React, { useEffect, useState } from "react";
// import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Drawer, List, ListItem, ListItemText, TextField, InputAdornment } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const toggleDrawer = (open) => () => {
//     setMobileOpen(open);
//   };

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery}`);
//     }
//   };

//   return (
//     <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #1B5E20, #66BB6A)" }}> {/* 🌿 Green Gradient Navbar */}
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Mobile Menu Button */}
//         <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ display: { xs: "block", md: "none" } }}>
//           <MenuIcon />
//         </IconButton>

//         {/* Logo */}
//         <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>
//           AgriHub
//         </Typography>

//         {/* Search Bar */}
//         <TextField
//           variant="outlined"
//           placeholder="Search products..."
//           size="small"
//           sx={{ backgroundColor: "white", borderRadius: "5px", width: { xs: "50%", md: "30%" } }}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyPress={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Desktop Navigation */}
//         <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/services">Services</Button>
//           <Button color="inherit" component={Link} to="/products">Products</Button>
//           <Button color="inherit" component={Link} to="/about">About</Button>
//           <Button color="inherit" component={Link} to="/contact">Contact</Button>
//           <IconButton color="inherit" component={Link} to="/cart">
//             <ShoppingCartIcon />
//           </IconButton>
//         </Box>

//         {/* Profile Dropdown */}
//         <IconButton color="inherit" onClick={handleMenuOpen}>
//           <AccountCircleIcon />
//         </IconButton>

//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           {user ? (
//             <>
//               <MenuItem component={Link} to="/profile">Profile</MenuItem>
//               <MenuItem component={Link} to="/previous-bills">My Previous Bills</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </>
//           ) : (
//             <>
//               <MenuItem component={Link} to="/login">Login</MenuItem>
//               <MenuItem component={Link} to="/register">Register</MenuItem>
//             </>
//           )}
//         </Menu>
//       </Toolbar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <List>
//           <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/services" onClick={toggleDrawer(false)}>
//             <ListItemText primary="Services" />
//           </ListItem>
//           <ListItem button component={Link} to="/products" onClick={toggleDrawer(false)}>
//             <ListItemText primary="Products" />
//           </ListItem>
//           <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button component={Link} to="/contact" onClick={toggleDrawer(false)}>
//             <ListItemText primary="Contact" />
//           </ListItem>
//           <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
//             <ShoppingCartIcon sx={{ marginRight: 1 }} />
//             <ListItemText primary="Cart" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </AppBar>
//   );
// };

// export default NavigationBar;
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null); // Clear user state
//       handleMenuClose();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
//     }
//   };

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//     }
//   };

//   return (
//     <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #1B5E20, #66BB6A)" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
//         <IconButton
//           edge="start"
//           color="inherit"
//           onClick={toggleDrawer(true)}
//           sx={{ display: { xs: "block", md: "none" } }}
//         >
//           <MenuIcon />
//         </IconButton>

//         <Typography
//           variant="h5"
//           component={Link}
//           to="/"
//           sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
//         >
//           AgriHub
//         </Typography>

//         <TextField
//           variant="outlined"
//           placeholder="Search products..."
//           size="small"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyPress={handleSearch}
//           sx={{ backgroundColor: "white", borderRadius: "5px", width: { xs: "40%", md: "30%" } }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/services">Services</Button>
//           <Button color="inherit" component={Link} to="/products">Products</Button>
//           <Button color="inherit" component={Link} to="/about">About</Button>
//           <Button color="inherit" component={Link} to="/contact">Contact</Button>
//           {user?.isAdmin && (
//             <Button color="inherit" component={Link} to="/admin/dashboard">Admin</Button>
//           )}
//           <IconButton color="inherit" component={Link} to="/cart">
//             <ShoppingCartIcon />
//           </IconButton>
//         </Box>

//         <IconButton color="inherit" onClick={handleMenuOpen}>
//           <AccountCircleIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           {user ? (
//             [
//               <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
//                 Profile {user.isAdmin ? "(Admin)" : ""}
//               </MenuItem>,
//               <MenuItem key="bills" component={Link} to="/previous-bills" onClick={handleMenuClose}>
//                 My Previous Bills
//               </MenuItem>,
//               user.isAdmin && (
//                 <MenuItem key="admin" component={Link} to="/admin/dashboard" onClick={handleMenuClose}>
//                   Admin Dashboard
//                 </MenuItem>
//               ),
//               <MenuItem key="logout" onClick={handleLogout}>
//                 Logout
//               </MenuItem>,
//             ]
//           ) : (
//             [
//               <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
//                 Login
//               </MenuItem>,
//               <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
//                 Register
//               </MenuItem>,
//             ]
//           )}
//         </Menu>
//       </Toolbar>

//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250, bgcolor: "#1B5E20", height: "100%", color: "white" }}>
//           <List>
//             {["Home", "Services", "Products", "About", "Contact"].map((text) => (
//               <ListItem
//                 button
//                 key={text}
//                 component={Link}
//                 to={`/${text.toLowerCase()}`}
//                 onClick={toggleDrawer(false)}
//               >
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//             {user?.isAdmin && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admin/dashboard"
//                 onClick={toggleDrawer(false)}
//               >
//                 <ListItemText primary="Admin Dashboard" />
//               </ListItem>
//             )}
//             <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
//               <ShoppingCartIcon sx={{ mr: 1 }} />
//               <ListItemText primary="Cart" />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </AppBar>
//   );
// };

// export default NavigationBar;
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   InputAdornment,
//   Badge,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Logo from "../img/logo-1-removebg.png"; // Logo stored in public/

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   // Fetch user data and cart count on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(storedCart.length);
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem("cart");
//       setCartCount(0);
//       handleMenuClose();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
//     }
//   };

//   // Menu and drawer handlers
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   // Search handler
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       if (mobileOpen) setMobileOpen(false);
//     }
//   };

//   // Theme configuration with green agriculture palette
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             background: darkMode
//               ? "linear-gradient(90deg, #1A3C34 0%, #388E3C 100%)"
//               : "linear-gradient(90deg, #388E3C 0%, #66BB6A 100%)",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             color: "#FFF",
//             "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
//             fontSize: { xs: "0.9rem", md: "1rem" },
//             px: { xs: 1.5, md: 2 },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
//               borderRadius: "8px",
//               "& fieldset": { borderColor: darkMode ? "#A5D6A7" : "#81C784" },
//               "&:hover fieldset": { borderColor: darkMode ? "#81C784" : "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: darkMode ? "#66BB6A" : "#388E3C" },
//             },
//           },
//         },
//       },
//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             background: darkMode ? "#1A3C34" : "#388E3C",
//             color: "#FFF",
//           },
//         },
//       },
//     },
//   });

//   // Menu items for desktop and mobile navigation
//   const menuItems = [
//     { text: "Home", path: "/" },
//     { text: "Services", path: "/services" },
//     { text: "Products", path: "/products" },
//     { text: "About", path: "/about" },
//     { text: "Contact", path: "/contact" },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="fixed">
//         <Toolbar sx={{ py: 1, px: { xs: 1, sm: 2 }, justifyContent: "space-between" }}>
//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Link to="/">
//               <img
//                 src={Logo} // Logo from public/
//                 alt="AgriHub Logo"
//                 style={{
//                   height: { xs: "50px", sm: "60px", md: "70px" }, // Increased size, responsive
//                   width: "auto",
//                   maxHeight: "70px", // Ensure it fits within AppBar
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")} // Fallback
//               />
//             </Link>
//           </Box>

//           {/* Search Bar */}
//           <TextField
//             variant="outlined"
//             placeholder="Search products..."
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleSearch}
//             sx={{
//               mx: { xs: 1, md: 2 },
//               width: { xs: "100px", sm: "200px", md: "300px" },
//               bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: darkMode ? "#388E3C" : "#757575" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Desktop Navigation */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: { md: 1, lg: 2 }, alignItems: "center" }}>
//             {menuItems.map((item) => (
//               <Button key={item.text} color="inherit" component={Link} to={item.path}>
//                 {item.text}
//               </Button>
//             ))}
//             {user?.isAdmin && (
//               <Button color="inherit" component={Link} to="/admin/dashboard">
//                 Admin
//               </Button>
//             )}
//             <IconButton color="inherit" component={Link} to="/cart">
//               <Badge badgeContent={cartCount} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit" onClick={handleMenuOpen}>
//               <AccountCircleIcon />
//             </IconButton>
//           </Box>

//           {/* User Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             sx={{ "& .MuiPaper-root": { bgcolor: darkMode ? "#263238" : "#E8F5E9" } }}
//           >
//             {user ? (
//               [
//                 <MenuItem
//                   key="profile"
//                   component={Link}
//                   to="/profile"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Profile {user.isAdmin ? "(Admin)" : ""}
//                 </MenuItem>,
//                 <MenuItem
//                   key="bookings"
//                   component={Link}
//                   to="/my-bookings"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   My Bookings
//                 </MenuItem>,
//                 user.isAdmin && (
//                   <MenuItem
//                     key="admin"
//                     component={Link}
//                     to="/admin/dashboard"
//                     onClick={handleMenuClose}
//                     sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                   >
//                     Admin Dashboard
//                   </MenuItem>
//                 ),
//                 <MenuItem
//                   key="logout"
//                   onClick={handleLogout}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Logout
//                 </MenuItem>,
//               ]
//             ) : (
//               [
//                 <MenuItem
//                   key="login"
//                   component={Link}
//                   to="/login"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Login
//                 </MenuItem>,
//                 <MenuItem
//                   key="register"
//                   component={Link}
//                   to="/register"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Register
//                 </MenuItem>,
//               ]
//             )}
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250, bgcolor: darkMode ? "#1A3C34" : "#388E3C", height: "100%", color: "#FFF" }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 key={item.text}
//                 button
//                 component={Link}
//                 to={item.path}
//                 onClick={toggleDrawer(false)}
//                 sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//               >
//                 <ListItemText primary={item.text} sx={{ color: "#FFF" }} />
//               </ListItem>
//             ))}
//             {user?.isAdmin && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admin/dashboard"
//                 onClick={toggleDrawer(false)}
//                 sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//               >
//                 <ListItemText primary="Admin Dashboard" sx={{ color: "#FFF" }} />
//               </ListItem>
//             )}
//             <ListItem
//               button
//               component={Link}
//               to="/cart"
//               onClick={toggleDrawer(false)}
//               sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//             >
//               <ShoppingCartIcon sx={{ mr: 1 }} />
//               <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#FFF" }} />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Spacer to prevent content overlap */}
//       <Box sx={{ height: { xs: 56, sm: 64 } }} />
//     </ThemeProvider>
//   );
// };

// export default NavigationBar;
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   InputAdornment,
//   Badge,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Logo from "../img/logo-1-removebg.png"; 
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// // Logo path
// // Stored in public/

// // Define custom navbar colors
// const LIGHT_NAVBAR_START = "#3E2723"; // Earthy brown start (light mode)
// const LIGHT_NAVBAR_END = "#6D4C41";   // Earthy brown end (light mode)
// const DARK_NAVBAR_START = "#1C2526";  // Dark grayish-brown start (dark mode)
// const DARK_NAVBAR_END = "#3E4A4B";    // Dark grayish-brown end (dark mode)

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   // Fetch user data and cart count on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(storedCart.length);
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem("cart");
//       setCartCount(0);
//       handleMenuClose();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
//     }
//   };
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };
//   // Menu and drawer handlers
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   // Search handler
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       if (mobileOpen) setMobileOpen(false);
//     }
//   };

//   // Theme configuration with custom navbar color
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" }, // Keep green for buttons
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             background: darkMode
//               ? `linear-gradient(90deg, ${DARK_NAVBAR_START} 0%, ${DARK_NAVBAR_END} 100%)`
//               : `linear-gradient(90deg, ${LIGHT_NAVBAR_START} 0%, ${LIGHT_NAVBAR_END} 100%)`,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             color: "#FFF",
//             "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
//             fontSize: { xs: "0.9rem", md: "1rem" },
//             px: { xs: 1.5, md: 2 },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
//               borderRadius: "8px",
//               "& fieldset": { borderColor: darkMode ? "#A5D6A7" : "#81C784" },
//               "&:hover fieldset": { borderColor: darkMode ? "#81C784" : "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: darkMode ? "#66BB6A" : "#388E3C" },
//             },
//           },
//         },
//       },
//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             background: darkMode ? DARK_NAVBAR_START : LIGHT_NAVBAR_START, // Match navbar start color
//             color: "#FFF",
//           },
//         },
//       },
//     },
//   });

//   // Menu items for desktop and mobile navigation
//   const menuItems = [
//     { text: "Home", path: "/" },
//     { text: "Services", path: "/services" },
//     { text: "Products", path: "/products" },
//     { text: "About", path: "/about" },
//     { text: "Contact", path: "/contact" },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="fixed">
//         <Toolbar sx={{ py: 1, px: { xs: 1, sm: 2 }, justifyContent: "space-between" }}>
//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Link to="/">
//               <img
//                 src={Logo}
//                 alt="AgriHub Logo"
//                 style={{
//                   height: { xs: "50px", sm: "60px", md: "70px" }, // Responsive height
//                   width: "auto",
//                   maxHeight: "70px",
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
//               />
//             </Link>
//           </Box>

//           {/* Search Bar */}
//           <TextField
//             variant="outlined"
//             placeholder="Search products..."
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleSearch}
//             sx={{
//               mx: { xs: 1, md: 2 },
//               width: { xs: "100px", sm: "200px", md: "300px" },
//               bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: darkMode ? "#388E3C" : "#757575" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Desktop Navigation */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: { md: 1, lg: 2 }, alignItems: "center" }}>
//             {menuItems.map((item) => (
//               <Button key={item.text} color="inherit" component={Link} to={item.path}>
//                 {item.text}
//               </Button>
//             ))}
//             {user?.isAdmin && (
//               <Button color="inherit" component={Link} to="/admin/dashboard">
//                 Admin
//               </Button>
//             )}
//             <IconButton color="inherit" component={Link} to="/cart">
//               <Badge badgeContent={cartCount} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit" onClick={handleMenuOpen}>
//               <AccountCircleIcon />
//             </IconButton>
//           </Box>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//           {/* User Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             sx={{ "& .MuiPaper-root": { bgcolor: darkMode ? "#263238" : "#E8F5E9" } }}
//           >
//             {user ? (
//               [
//                 <MenuItem
//                   key="profile"
//                   component={Link}
//                   to="/profile"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Profile {user.isAdmin ? "(Admin)" : ""}
//                 </MenuItem>,
//                 <MenuItem
//                   key="bookings"
//                   component={Link}
//                   to="/my-bookings"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   My Bookings
//                 </MenuItem>,
//                 <MenuItem
//                   key="my-previousbill"
//                   component={Link}
//                   to="/previous-bills"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   My previos Order
//                 </MenuItem>,
//                 user.isAdmin && (
//                   <MenuItem
//                     key="admin"
//                     component={Link}
//                     to="/admin-dashboard"
//                     onClick={handleMenuClose}
//                     sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                   >
//                     Admin Dashboard
//                   </MenuItem>
//                 ),
//                 <MenuItem
//                   key="logout"
//                   onClick={handleLogout}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Logout
//                 </MenuItem>,
//               ]
//             ) : (
//               [
//                 <MenuItem
//                   key="login"
//                   component={Link}
//                   to="/login"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Login
//                 </MenuItem>,
//                 <MenuItem
//                   key="register"
//                   component={Link}
//                   to="/register"
//                   onClick={handleMenuClose}
//                   sx={{ color: darkMode ? "#E0E0E0" : "#212121" }}
//                 >
//                   Register
//                 </MenuItem>,
//               ]
//             )}
//           </Menu>
//         </Toolbar>
//       </AppBar>
      
//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <Box sx={{ width: 250, bgcolor: darkMode ? DARK_NAVBAR_START : LIGHT_NAVBAR_START, height: "100%", color: "#FFF" }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 key={item.text}
//                 button
//                 component={Link}
//                 to={item.path}
//                 onClick={toggleDrawer(false)}
//                 sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//               >
//                 <ListItemText primary={item.text} sx={{ color: "#FFF" }} />
//               </ListItem>
//             ))}
//             {user?.isAdmin && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admin/dashboard"
//                 onClick={toggleDrawer(false)}
//                 sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//               >
//                 <ListItemText primary="Admin Dashboard" sx={{ color: "#FFF" }} />
//               </ListItem>
//             )}
//             <ListItem
//               button
//               component={Link}
//               to="/cart"
//               onClick={toggleDrawer(false)}
//               sx={{ "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#4CAF50" } }}
//             >
//               <ShoppingCartIcon sx={{ mr: 1 }} />
//               <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#FFF" }} />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Spacer to prevent content overlap */}
//       <Box sx={{ height: { xs: 56, sm: 64 } }} />
//     </ThemeProvider>
//   );
// };

// export default NavigationBar;
// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   InputAdornment,
//   Badge,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Logo from "../img/logo-1-removebg.png"; // Logo path

// // Define custom navbar colors
// const NAVBAR_START = "#B3D8A8"; // Soft green
// const NAVBAR_END = "#3D8D7A";   // Teal

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   // Fetch user data and cart count on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(storedCart.length);
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem("cart");
//       setCartCount(0);
//       handleMenuClose();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
//     }
//   };

//   // Menu and drawer handlers
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   // Search handler
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       if (mobileOpen) setMobileOpen(false);
//     }
//   };

//   // Theme configuration with custom navbar color and black text
//   const theme = createTheme({
//     palette: {
//       mode: "light",
//       primary: { main: "#FF7043" }, // Vibrant coral for buttons
//       secondary: { main: "#FF8A65" }, // Soft orange for accents
//       background: { default: "#F5F5F5", paper: "#FFF" },
//       text: { primary: "#000000", secondary: "#555555" }, // Black primary text, dark gray secondary
//     },
//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             background: `linear-gradient(90deg, ${NAVBAR_START} 0%, ${NAVBAR_END} 100%)`,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             color: "#FFF", // Keep button text white for contrast on primary color
//             "&:hover": { bgcolor: "#FF8A65" },
//             fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
//             padding: { xs: "6px 12px", md: "8px 16px" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               bgcolor: "#FFF8E1",
//               borderRadius: "8px",
//               "& fieldset": { borderColor: "#FF8A65" },
//               "&:hover fieldset": { borderColor: "#FF7043" },
//               "&.Mui-focused fieldset": { borderColor: "#FF7043" },
//             },
//           },
//         },
//       },
//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             background: NAVBAR_START,
//             color: "#000000", // Black text in drawer
//             width: { xs: "75vw", sm: "250px" },
//           },
//         },
//       },
//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             color: "#000000", // Black text in menu items
//           },
//         },
//       },
//     },
//   });

//   // Menu items for navigation
//   const menuItems = [
//     { text: "Home", path: "/" },
//     { text: "Services", path: "/services" },
//     { text: "Products", path: "/products" },
//     { text: "About", path: "/about" },
//     { text: "Contact", path: "/contact" },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="fixed">
//         <Toolbar
//           sx={{
//             py: { xs: 0.5, sm: 1 },
//             px: { xs: 1, sm: 2 },
//             flexWrap: { xs: "wrap", md: "nowrap" },
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
//           >
//             <MenuIcon sx={{ color: "#000000" }} /> {/* Black icon */}
//           </IconButton>

//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <Link to="/">
//               <img
//                 src={Logo}
//                 alt="AgriHub Logo"
//                 style={{
//                   height: { xs: "40px", sm: "50px", md: "70px" },
//                   width: "auto",
//                   maxHeight: "70px",
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
//               />
//             </Link>
//           </Box>

//           {/* Search Bar */}
//           <TextField
//             variant="outlined"
//             placeholder="Search products..."
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleSearch}
//             sx={{
//               mx: { xs: 1, md: 2 },
//               width: { xs: "100%", sm: "200px", md: "300px" },
//               mt: { xs: 1, md: 0 },
//               bgcolor: "#FFF8E1",
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "#000000" }} /> {/* Black icon */}
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Desktop Navigation */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: { md: 1, lg: 2 },
//               alignItems: "center",
//               flexShrink: 0,
//             }}
//           >
//             {menuItems.map((item) => (
//               <Button
//                 key={item.text}
//                 color="inherit"
//                 component={Link}
//                 to={item.path}
//                 sx={{ color: "#000000" }} // Black text for buttons
//               >
//                 {item.text}
//               </Button>
//             ))}
//             {user?.isAdmin && (
//               <Button
//                 color="inherit"
//                 component={Link}
//                 to="/admin/dashboard"
//                 sx={{ color: "#000000" }} // Black text
//               >
//                 Admin
//               </Button>
//             )}
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/cart"
//               sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }} // Black icon
//             >
//               <Badge badgeContent={cartCount} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               color="inherit"
//               onClick={handleMenuOpen}
//               sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }} // Black icon
//             >
//               <AccountCircleIcon />
//             </IconButton>
//           </Box>

//           {/* User Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             sx={{ "& .MuiPaper-root": { bgcolor: "#FFF8E1" } }}
//           >
//             {user ? (
//               [
//                 <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
//                   Profile {user.isAdmin ? "(Admin)" : ""}
//                 </MenuItem>,
//                 <MenuItem key="bookings" component={Link} to="/my-bookings" onClick={handleMenuClose}>
//                   My Bookings
//                 </MenuItem>,
//                 <MenuItem key="my-previousbill" component={Link} to="/previous-bills" onClick={handleMenuClose}>
//                   My Previous Order
//                 </MenuItem>,
//                 user.isAdmin && (
//                   <MenuItem key="admin" component={Link} to="/admin-dashboard" onClick={handleMenuClose}>
//                     Admin Dashboard
//                   </MenuItem>
//                 ),
//                 <MenuItem key="logout" onClick={handleLogout}>
//                   Logout
//                 </MenuItem>,
//               ]
//             ) : (
//               [
//                 <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
//                   Login
//                 </MenuItem>,
//                 <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
//                   Register
//                 </MenuItem>,
//               ]
//             )}
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <Box
//           sx={{
//             width: { xs: "75vw", sm: "250px" },
//             bgcolor: NAVBAR_START,
//             height: "100%",
//             color: "#000000", // Black text in drawer
//             p: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//             <IconButton onClick={toggleDrawer(false)} sx={{ color: "#000000" }}>
//               <MenuIcon />
//             </IconButton>
//           </Box>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 key={item.text}
//                 button
//                 component={Link}
//                 to={item.path}
//                 onClick={toggleDrawer(false)}
//                 sx={{
//                   "&:hover": { bgcolor: "#FF8A65" },
//                   py: 1.5,
//                 }}
//               >
//                 <ListItemText primary={item.text} sx={{ color: "#000000" }} />
//               </ListItem>
//             ))}
//             {user?.isAdmin && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admin/dashboard"
//                 onClick={toggleDrawer(false)}
//                 sx={{
//                   "&:hover": { bgcolor: "#FF8A65" },
//                   py: 1.5,
//                 }}
//               >
//                 <ListItemText primary="Admin Dashboard" sx={{ color: "#000000" }} />
//               </ListItem>
//             )}
//             <ListItem
//               button
//               component={Link}
//               to="/cart"
//               onClick={toggleDrawer(false)}
//               sx={{
//                 "&:hover": { bgcolor: "#FF8A65" },
//                 py: 1.5,
//               }}
//             >
//               <ShoppingCartIcon sx={{ mr: 1, color: "#000000" }} />
//               <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#000000" }} />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Spacer to prevent content overlap */}
//       <Box sx={{ height: { xs: 56, sm: 64, md: 70 } }} />
//     </ThemeProvider>
//   );
// };

// export default NavigationBar;

// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   InputAdornment,
//   Badge,
//   Button,
//   Typography,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CloseIcon from "@mui/icons-material/Close";
// import Logo from "../img/logo-1-removebg.png"; // Logo path

// // Define custom navbar colors
// const NAVBAR_START = "#B3D8A8"; // Soft green
// const NAVBAR_END = "#3D8D7A";   // Teal

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   // Sync cart count with localStorage on mount and updates
//   useEffect(() => {
//     const updateCartCount = () => {
//       const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartCount(storedCart.length);
//     };

//     // Initial update on mount
//     updateCartCount();

//     // Listen for storage changes (e.g., from other tabs or manual updates)
//     window.addEventListener("storage", updateCartCount);

//     // Clean up event listener
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       localStorage.removeItem("cart");
//       setCartCount(0);
//       handleMenuClose();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
//     }
//   };

//   // Menu and drawer handlers
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   // Search handler
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       if (mobileOpen) setMobileOpen(false);
//     }
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       mode: "light",
//       primary: { main: "#FF7043" },
//       secondary: { main: "#FF8A65" },
//       background: { default: "#F5F5F5", paper: "#FFF" },
//       text: { primary: "#000000", secondary: "#555555" },
//     },
//     components: {
//       MuiAppBar: {
//         styleOverrides: {
//           root: {
//             background: `linear-gradient(90deg, ${NAVBAR_START} 0%, ${NAVBAR_END} 100%)`,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             color: "#FFF",
//             "&:hover": { bgcolor: "#FF8A65" },
//             fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
//             padding: { xs: "6px 12px", md: "8px 16px" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               bgcolor: "#FFF8E1",
//               borderRadius: "25px", // Rounded for mobile
//               "& fieldset": { borderColor: "#FF8A65" },
//               "&:hover fieldset": { borderColor: "#FF7043" },
//               "&.Mui-focused fieldset": { borderColor: "#FF7043" },
//             },
//           },
//         },
//       },
//       MuiDrawer: {
//         styleOverrides: {
//           paper: {
//             background: NAVBAR_START,
//             color: "#000000",
//             width: { xs: "80vw", sm: "300px" }, // Wider on mobile
//             borderRadius: "0 16px 16px 0", // Rounded edges
//             boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
//           },
//         },
//       },
//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             color: "#000000",
//           },
//         },
//       },
//     },
//   });

//   // Menu items for navigation
//   const menuItems = [
//     { text: "Home", path: "/" },
//     { text: "Services", path: "/services" },
//     { text: "Products", path: "/products" },
//     { text: "About", path: "/about" },
//     { text: "Contact", path: "/contact" },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="fixed">
//         <Toolbar
//           sx={{
//             py: { xs: 0.75, sm: 1 },
//             px: { xs: 1, sm: 2 },
//             flexWrap: { xs: "wrap", md: "nowrap" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             minHeight: { xs: 56, sm: 64 }, // Consistent height
//           }}
//         >
//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" }, mr: 1, p: 0.5 }}
//           >
//             <MenuIcon sx={{ color: "#000000", fontSize: "1.75rem" }} /> {/* Larger icon */}
//           </IconButton>

//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <Link to="/">
//               <img
//                 src={Logo}
//                 alt="AgriHub Logo"
//                 style={{
//                   height: { xs: "35px", sm: "50px", md: "70px" }, // Smaller on mobile
//                   width: "auto",
//                   maxHeight: "70px",
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
//               />
//             </Link>
//           </Box>

//           {/* Search Bar */}
//           <TextField
//             variant="outlined"
//             placeholder="Search products..."
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleSearch}
//             sx={{
//               mx: { xs: 0, sm: 1, md: 2 },
//               width: { xs: "100%", sm: "200px", md: "300px" },
//               mt: { xs: 1, md: 0 },
//               "& .MuiInputBase-input": { py: 1.2 }, // Taller input
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "#000000", fontSize: "1.5rem" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Desktop Navigation */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: { md: 1, lg: 2 },
//               alignItems: "center",
//               flexShrink: 0,
//             }}
//           >
//             {menuItems.map((item) => (
//               <Button
//                 key={item.text}
//                 color="inherit"
//                 component={Link}
//                 to={item.path}
//                 sx={{ color: "#000000" }}
//               >
//                 {item.text}
//               </Button>
//             ))}
//             {user?.isAdmin && (
//               <Button
//                 color="inherit"
//                 component={Link}
//                 to="/admin/dashboard"
//                 sx={{ color: "#000000" }}
//               >
//                 Admin
//               </Button>
//             )}
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/cart"
//               sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }}
//             >
//               <Badge badgeContent={cartCount} color="error">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               color="inherit"
//               onClick={handleMenuOpen}
//               sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }}
//             >
//               <AccountCircleIcon />
//             </IconButton>
//           </Box>

//           {/* User Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             sx={{ "& .MuiPaper-root": { bgcolor: "#FFF8E1", borderRadius: "12px" } }}
//           >
//             {user ? (
//               [
//                 <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
//                   Profile {user.isAdmin ? "(Admin)" : ""}
//                 </MenuItem>,
//                 <MenuItem key="bookings" component={Link} to="/my-bookings" onClick={handleMenuClose}>
//                   My Bookings
//                 </MenuItem>,
//                 <MenuItem key="my-previousbill" component={Link} to="/previous-bills" onClick={handleMenuClose}>
//                   My Previous Order
//                 </MenuItem>,
//                 user.isAdmin && (
//                   <MenuItem key="admin" component={Link} to="/admin-dashboard" onClick={handleMenuClose}>
//                     Admin Dashboard
//                   </MenuItem>
//                 ),
//                 <MenuItem key="logout" onClick={handleLogout}>
//                   Logout
//                 </MenuItem>,
//               ]
//             ) : (
//               [
//                 <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
//                   Login
//                 </MenuItem>,
//                 <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
//                   Register
//                 </MenuItem>,
//               ]
//             )}
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
//         <Box
//           sx={{
//             width: { xs: "80vw", sm: "300px" },
//             bgcolor: NAVBAR_START,
//             height: "100%",
//             color: "#000000",
//             p: 2,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Drawer Header */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Menu
//             </Typography>
//             <IconButton onClick={toggleDrawer(false)} sx={{ color: "#000000" }}>
//               <CloseIcon sx={{ fontSize: "1.75rem" }} />
//             </IconButton>
//           </Box>

//           {/* Drawer Items */}
//           <List sx={{ flexGrow: 1 }}>
//             {menuItems.map((item) => (
//               <ListItem
//                 key={item.text}
//                 button
//                 component={Link}
//                 to={item.path}
//                 onClick={toggleDrawer(false)}
//                 sx={{
//                   "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                   py: 1.5,
//                   mb: 1,
//                   transition: "background-color 0.3s ease",
//                 }}
//               >
//                 <ListItemText primary={item.text} sx={{ color: "#000000" }} />
//               </ListItem>
//             ))}
//             {user?.isAdmin && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admin/dashboard"
//                 onClick={toggleDrawer(false)}
//                 sx={{
//                   "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                   py: 1.5,
//                   mb: 1,
//                   transition: "background-color 0.3s ease",
//                 }}
//               >
//                 <ListItemText primary="Admin Dashboard" sx={{ color: "#000000" }} />
//               </ListItem>
//             )}
//             <ListItem
//               button
//               component={Link}
//               to="/cart"
//               onClick={toggleDrawer(false)}
//               sx={{
//                 "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                 py: 1.5,
//                 mb: 1,
//                 transition: "background-color 0.3s ease",
//               }}
//             >
//               <ShoppingCartIcon sx={{ mr: 1, color: "#000000" }} />
//               <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#000000" }} />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Spacer to prevent content overlap */}
//       <Box sx={{ height: { xs: 56, sm: 64, md: 70 } }} />
//     </ThemeProvider>
//   );
// };

// export default NavigationBar;
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../img/logo-1-removebg.png"; // Logo path

// Define custom navbar colors
const NAVBAR_START = "#B3D8A8"; // Soft green
const NAVBAR_END = "#3D8D7A";   // Teal

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Sync cart count with localStorage on mount and updates
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/profile");
        console.log("Navbar profile response:", response.data); // Debug
        console.log("Navbar profile headers:", response.headers); // Check cookies
        setUser(response.data);
      } catch (error) {
        console.error("Navbar fetch user error:", error.response?.data || error.message); // Debug
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("https://agrihub-backend-tz4v.onrender.com/api/users/logout", {});
      console.log("Logout response:", response.data); // Debug
      setUser(null);
      localStorage.removeItem("cart");
      setCartCount(0);
      handleMenuClose();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed: " + (error.response?.data.message || "Unknown error"));
    }
  };

  // Menu and drawer handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setMobileOpen(open);

  // Search handler
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      if (mobileOpen) setMobileOpen(false);
    }
  };

  // Theme configuration (unchanged)
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#FF7043" },
      secondary: { main: "#FF8A65" },
      background: { default: "#F5F5F5", paper: "#FFF" },
      text: { primary: "#000000", secondary: "#555555" },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: `linear-gradient(90deg, ${NAVBAR_START} 0%, ${NAVBAR_END} 100%)`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            color: "#FFF",
            "&:hover": { bgcolor: "#FF8A65" },
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            padding: { xs: "6px 12px", md: "8px 16px" },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              bgcolor: "#FFF8E1",
              borderRadius: "25px",
              "& fieldset": { borderColor: "#FF8A65" },
              "&:hover fieldset": { borderColor: "#FF7043" },
              "&.Mui-focused fieldset": { borderColor: "#FF7043" },
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: NAVBAR_START,
            color: "#000000",
            width: { xs: "80vw", sm: "300px" },
            borderRadius: "0 16px 16px 0",
            boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "#000000",
          },
        },
      },
    },
  });

  // Menu items for navigation
  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Services", path: "/services" },
    { text: "Products", path: "/products" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            py: { xs: 0.75, sm: 1 },
            px: { xs: 1, sm: 2 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" }, mr: 1, p: 0.5 }}
          >
            <MenuIcon sx={{ color: "#000000", fontSize: "1.75rem" }} />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Link to="/">
              <img
                src={Logo}
                alt="AgriHub Logo"
                style={{
                  height: { xs: "35px", sm: "50px", md: "70px" },
                  width: "auto",
                  maxHeight: "70px",
                }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
              />
            </Link>
          </Box>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search products..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              mx: { xs: 0, sm: 1, md: 2 },
              width: { xs: "100%", sm: "200px", md: "300px" },
              mt: { xs: 1, md: 0 },
              "& .MuiInputBase-input": { py: 1.2 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#000000", fontSize: "1.5rem" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { md: 1, lg: 2 },
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ color: "#000000" }}
              >
                {item.text}
              </Button>
            ))}
            {user?.isAdmin && (
              <Button
                color="inherit"
                component={Link}
                to="/admin/dashboard"
                sx={{ color: "#000000" }}
              >
                Admin
              </Button>
            )}
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ p: { xs: 0.5, md: 1 }, color: "#000000" }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ "& .MuiPaper-root": { bgcolor: "#FFF8E1", borderRadius: "12px" } }}
          >
            {user ? (
              [
                <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
                  Profile {user.isAdmin ? "(Admin)" : ""}
                </MenuItem>,
                <MenuItem key="bookings" component={Link} to="/my-bookings" onClick={handleMenuClose}>
                  My Bookings
                </MenuItem>,
                <MenuItem key="my-previousbill" component={Link} to="/previous-bills" onClick={handleMenuClose}>
                  My Previous Order
                </MenuItem>,
                user.isAdmin && (
                  <MenuItem key="admin" component={Link} to="/admin-dashboard" onClick={handleMenuClose}>
                    Admin Dashboard
                  </MenuItem>
                ),
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            ) : (
              [
                <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>,
                <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
                  Register
                </MenuItem>,
              ]
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: { xs: "80vw", sm: "300px" },
            bgcolor: NAVBAR_START,
            height: "100%",
            color: "#000000",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "#000000" }}>
              <CloseIcon sx={{ fontSize: "1.75rem" }} />
            </IconButton>
          </Box>

          {/* Drawer Items */}
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
                  py: 1.5,
                  mb: 1,
                  transition: "background-color 0.3s ease",
                }}
              >
                <ListItemText primary={item.text} sx={{ color: "#000000" }} />
              </ListItem>
            ))}
            {user?.isAdmin && (
              <ListItem
                button
                component={Link}
                to="/admin/dashboard"
                onClick={toggleDrawer(false)}
                sx={{
                  "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
                  py: 1.5,
                  mb: 1,
                  transition: "background-color 0.3s ease",
                }}
              >
                <ListItemText primary="Admin Dashboard" sx={{ color: "#000000" }} />
              </ListItem>
            )}
            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={toggleDrawer(false)}
              sx={{
                "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
                py: 1.5,
                mb: 1,
                transition: "background-color 0.3s ease",
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1, color: "#000000" }} />
              <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#000000" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: { xs: 56, sm: 64, md: 70 } }} />
    </ThemeProvider>
  );
};

export default NavigationBar;