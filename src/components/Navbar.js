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
//         const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/profile", {
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
//       await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/logout", {}, { withCredentials: true });
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
// import Logo from "../img/logo-1-removebg.png";

// const NAVBAR_START = "#B3D8A8";
// const NAVBAR_END = "#3D8D7A";

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   const updateCartCount = () => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(storedCart.length);
//   };

//   useEffect(() => {
//     updateCartCount();

//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Fetch user error:", error.response?.data || error.message);
//         setUser(null);
//       }
//     };
//     fetchUser();

//     window.addEventListener("cartUpdated", updateCartCount);
//     return () => window.removeEventListener("cartUpdated", updateCartCount);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/logout", {}, { withCredentials: true });
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

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const toggleDrawer = (open) => () => setMobileOpen(open);

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       if (mobileOpen) setMobileOpen(false);
//     }
//   };

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
//               borderRadius: "25px",
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
//             width: { xs: "80vw", sm: "300px" },
//             borderRadius: "0 16px 16px 0",
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
//             minHeight: { xs: 56, sm: 64 },
//           }}
//         >
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: "block", md: "none" }, mr: 1, p: 0.5 }}
//           >
//             <MenuIcon sx={{ color: "#000000", fontSize: "1.75rem" }} />
//           </IconButton>

//           <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <Link to="/">
//               <img
//                 src={Logo}
//                 alt="AgriHub Logo"
//                 style={{
//                   height: { xs: "35px", sm: "50px", md: "70px" },
//                   width: "auto",
//                   maxHeight: "70px",
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Logo")}
//               />
//             </Link>
//           </Box>

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
//               "& .MuiInputBase-input": { py: 1.2 },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "#000000", fontSize: "1.5rem" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

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
//                 to="/admin-dashboard"
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
//                 <MenuItem key="track-order" component={Link} to="/order-tracking" onClick={handleMenuClose}>
//                   Track Order
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
//             {user ? (
//               <>
//                 {user.isAdmin && (
//                   <ListItem
//                     button
//                     component={Link}
//                     to="/admin-dashboard"
//                     onClick={toggleDrawer(false)}
//                     sx={{
//                       "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                       py: 1.5,
//                       mb: 1,
//                       transition: "background-color 0.3s ease",
//                     }}
//                   >
//                     <ListItemText primary="Admin Dashboard" sx={{ color: "#000000" }} />
//                   </ListItem>
//                 )}
//                 <ListItem
//                   button
//                   component={Link}
//                   to="/cart"
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                     py: 1.5,
//                     mb: 1,
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   <ShoppingCartIcon sx={{ mr: 1, color: "#000000" }} />
//                   <ListItemText primary={`Cart (${cartCount})`} sx={{ color: "#000000" }} />
//                 </ListItem>
//               </>
//             ) : (
//               <>
//                 <ListItem
//                   button
//                   component={Link}
//                   to="/login"
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                     py: 1.5,
//                     mb: 1,
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   <ListItemText primary="Login" sx={{ color: "#000000" }} />
//                 </ListItem>
//                 <ListItem
//                   button
//                   component={Link}
//                   to="/register"
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     "&:hover": { bgcolor: "#FF8A65", borderRadius: "8px" },
//                     py: 1.5,
//                     mb: 1,
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   <ListItemText primary="Register" sx={{ color: "#000000" }} />
//                 </ListItem>
//               </>
//             )}
//           </List>
//         </Box>
//       </Drawer>

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
  Badge,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../img/logo-1-removebg.png";

const NAVBAR_START = "#B3D8A8";
const NAVBAR_END = "#3D8D7A";

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  useEffect(() => {
    updateCartCount();

    const fetchUser = async () => {
      try {
        const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Fetch user error:", error.response?.data || error.message);
        setUser(null);
      }
    };
    fetchUser();

    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/logout", {}, { withCredentials: true });
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

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setMobileOpen(open);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#2E7D32" },
      secondary: { main: "#81C784" },
      background: { default: "#FFFFFF", paper: "#FFF" },
      text: { primary: "#1A1A1A", secondary: "#616161" },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: `linear-gradient(135deg, ${NAVBAR_START} 0%, ${NAVBAR_END} 100%)`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            padding: { xs: "8px 16px", md: "10px 24px" },
            color: "#1A1A1A",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "#81C784",
              color: "#FFF",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: `linear-gradient(180deg, ${NAVBAR_START} 0%, #E8F5E9 100%)`,
            color: "#1A1A1A",
            width: { xs: "80vw", sm: "320px" },
            borderRadius: "0 16px 16px 0",
            boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            padding: "10px 20px",
            color: "#1A1A1A",
            "&:hover": {
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#1A1A1A",
            "&:hover": {
              backgroundColor: "rgba(129,199,132,0.2)",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Services", path: "/services" },
    { text: "Products", path: "/products" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: { xs: "80vw", sm: "320px" },
        height: "100%",
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#2E7D32", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
        >
          AgriHub
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ fontSize: "2rem", color: "#2E7D32" }} />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
            sx={{
              py: { xs: 1.5, sm: 2 },
              mb: 1,
              borderRadius: "12px",
              "&:hover": { bgcolor: "#81C784", color: "#FFF" },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
        {user ? (
          <>
            {user.isAdmin && (
              <ListItem
                button
                component={Link}
                to="/admin-dashboard"
                onClick={toggleDrawer(false)}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  mb: 1,
                  borderRadius: "12px",
                  "&:hover": { bgcolor: "#81C784", color: "#FFF" },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemText
                  primary="Admin Dashboard"
                  primaryTypographyProps={{
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            )}
            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={toggleDrawer(false)}
              sx={{
                py: { xs: 1.5, sm: 2 },
                mb: 1,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#81C784", color: "#FFF" },
                transition: "all 0.3s ease",
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
              <ListItemText
                primary={`Cart (${cartCount})`}
                primaryTypographyProps={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                py: { xs: 1.5, sm: 2 },
                mb: 1,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#81C784", color: "#FFF" },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={toggleDrawer(false)}
              sx={{
                py: { xs: 1.5, sm: 2 },
                mb: 1,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#81C784", color: "#FFF" },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemText
                primary="Login"
                primaryTypographyProps={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              onClick={toggleDrawer(false)}
              sx={{
                py: { xs: 1.5, sm: 2 },
                mb: 1,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#81C784", color: "#FFF" },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemText
                primary="Register"
                primaryTypographyProps={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 }, // Increased height
            px: { xs: 2, sm: 3 },
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: 70, sm: 80, md: 90 }, // Larger navbar
          }}
        >
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1, p: 0.75 }}
            >
              <MenuIcon sx={{ fontSize: { xs: "2rem", sm: "2.25rem" }, color: "#1A1A1A" }} />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Link to="/">
              <img
                src={Logo}
                alt="AgriHub Logo"
                style={{
                  height: isMobile ? "40px" : "50px", // Increased logo size
                  width: "auto",
                  maxHeight: "80px",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onError={(e) => (e.target.src = "https://via.placeholder.com/80?text=Logo")}
              />
            </Link>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { sm: 2, md: 3 },
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                >
                  {item.text}
                </Button>
              ))}
              {user?.isAdmin && (
                <Button component={Link} to="/admin-dashboard">
                  Admin
                </Button>
              )}
              <IconButton
                component={Link}
                to="/cart"
                sx={{ p: 1 }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon sx={{ fontSize: { xs: "1.75rem", md: "2rem" } }} />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 1 }}
              >
                <AccountCircleIcon sx={{ fontSize: { xs: "1.75rem", md: "2rem" } }} />
              </IconButton>
            </Box>
          )}

          {/* Mobile Icons */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                component={Link}
                to="/cart"
                sx={{ p: 0.75 }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon sx={{ fontSize: "1.75rem" }} />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0.75 }}
              >
                <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#FFF",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            minWidth: "200px",
          },
        }}
      >
        {user ? (
          [
            <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
              Profile {user.isAdmin ? "(Admin)" : ""}
            </MenuItem>,
            <MenuItem key="bookings" component={Link} to="/my-bookings" onClick={handleMenuClose}>
              My Bookings
            </MenuItem>,
            <MenuItem key="track-order" component={Link} to="/order-tracking" onClick={handleMenuClose}>
              Track Order
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

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* Spacer */}
      <Box sx={{ height: { xs: 70, sm: 80, md: 90 } }} />
    </ThemeProvider>
  );
};

export default NavigationBar;