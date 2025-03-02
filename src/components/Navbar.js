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
//         const response = await axios.get("http://localhost:5000/api/users/profile", {
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
//       await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
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
//         const response = await axios.get("http://localhost:5000/api/users/profile", {
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
//       await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
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
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Fetch user error:", error.response?.data || error.message);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      setUser(null); // Clear user state
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

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <AppBar position="fixed" sx={{ background: "linear-gradient(90deg, #1B5E20, #66BB6A)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
          AgriHub
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search products..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
          sx={{ backgroundColor: "white", borderRadius: "5px", width: { xs: "40%", md: "30%" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/services">Services</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          {user?.isAdmin && (
            <Button color="inherit" component={Link} to="/admin/dashboard">Admin</Button>
          )}
          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
        </Box>

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {user ? (
            [
              <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
                Profile {user.isAdmin ? "(Admin)" : ""}
              </MenuItem>,
              <MenuItem key="bills" component={Link} to="/previous-bills" onClick={handleMenuClose}>
                My Previous Bills
              </MenuItem>,
              user.isAdmin && (
                <MenuItem key="admin" component={Link} to="/admin/dashboard" onClick={handleMenuClose}>
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

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, bgcolor: "#1B5E20", height: "100%", color: "white" }}>
          <List>
            {["Home", "Services", "Products", "About", "Contact"].map((text) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={`/${text.toLowerCase()}`}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
            {user?.isAdmin && (
              <ListItem
                button
                component={Link}
                to="/admin/dashboard"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            )}
            <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavigationBar;