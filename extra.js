// // src/components/Navbar.js

// import React from 'react';
// import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './styles/Navbar.css';
//  // To use React Router for navigation

// const NavigationBar = () => {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//       <Container>
//         {/* Logo or Brand Name */}
//         <Navbar.Brand as={Link} to="/">AgriHub</Navbar.Brand>

//         {/* Toggle button for mobile view */}
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         {/* Navbar links */}
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             {/* Home Link */}
//             <Nav.Link as={Link} to="/">Home</Nav.Link>

//             {/* Features Dropdown */}
//             <NavDropdown title="Features" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/crop-management">Crop Management</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/weather-updates">Weather Updates</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/market-insights">Market Insights</NavDropdown.Item>
//             </NavDropdown>

//             {/* Services Link */}
//             <Nav.Link as={Link} to="/services">Services</Nav.Link>

//             <Nav.Link as={Link} to="/product">Products</Nav.Link>
//             {/* About Link */}
//             <Nav.Link as={Link} to="/about">About</Nav.Link>

//             {/* Contact Link */}
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

//             {/* User Dropdown (for login or profile options) */}
//             <NavDropdown title="User" id="user-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;
//after add the profilepage 
// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import './styles/Navbar.css';

// const NavigationBar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
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
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//       <Container>
//         {/* Logo or Brand Name */}
//         <Navbar.Brand as={Link} to="/">AgriHub</Navbar.Brand>

//         {/* Toggle button for mobile view */}
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         {/* Navbar links */}
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             {/* Home Link */}
//             <Nav.Link as={Link} to="/">Home</Nav.Link>

//             {/* Features Dropdown */}
//             <NavDropdown title="Features" id="basic-nav-dropdown">
//               <NavDropdown.Item as={Link} to="/crop-management">Crop Management</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/weather-updates">Weather Updates</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/market-insights">Market Insights</NavDropdown.Item>
//             </NavDropdown>

//             {/* Services Link */}
//             <Nav.Link as={Link} to="/services">Services</Nav.Link>

//             <Nav.Link as={Link} to="/product">Products</Nav.Link>

//             {/* About Link */}
//             <Nav.Link as={Link} to="/about">About</Nav.Link>

//             {/* Contact Link */}
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

//             {/* User Dropdown - Show Profile & Logout if logged in, otherwise show Login/Register */}
//             <NavDropdown title={user ? user.username : "User"} id="user-nav-dropdown">
//               {user ? (
//                 <>
//                   <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
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

// // src/pages/AdminDashboard.js
// import React from 'react';

// const AdminDashboard = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//       <p>Welcome to the admin dashboard!</p>
//       {/* Add more admin features here */}
//     </div>
//   );
// };

// export default AdminDashboard;
// src/pages/AdminDashboard.js
// import React from "react";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-2 bg-dark text-white p-4">
//           <h4 className="mb-4">AgriHub Admin</h4>
//           <ul className="nav flex-column">
//             <li className="nav-item">
//               <Link to="/admin-dashboard" className="nav-link text-white">
//                 Dashboard
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/manage-products" className="nav-link text-white">
//                 Manage Products
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/manage-customers" className="nav-link text-white">
//                 Manage Customers
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/manage-promotions" className="nav-link text-white">
//                 Manage Promotions
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-10 p-4">
//           <h2 className="mb-4">Admin Dashboard</h2>
//           <div className="row">
//             {/* Manage Products Card */}
//             <div className="col-md-4 mb-4">
//               <div className="card text-white bg-primary">
//                 <div className="card-body">
//                   <h5 className="card-title">Manage Products</h5>
//                   <p className="card-text">View, add, and update products.</p>
//                   <Link to="/manage-products" className="btn btn-light">
//                     Go to Products
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Manage Customers Card */}
//             <div className="col-md-4 mb-4">
//               <div className="card text-white bg-success">
//                 <div className="card-body">
//                   <h5 className="card-title">Manage Customers</h5>
//                   <p className="card-text">View customer details and manage accounts.</p>
//                   <Link to="/manage-customers" className="btn btn-light">
//                     Go to Customers
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Manage Promotions Card */}
//             <div className="col-md-4 mb-4">
//               <div className="card text-white bg-warning">
//                 <div className="card-body">
//                   <h5 className="card-title">Manage Promotions</h5>
//                   <p className="card-text">Create and manage promotional offers.</p>
//                   <Link to="/manage-promotions" className="btn btn-light">
//                     Go to Promotions
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Add more cards or widgets here */}
//           <div className="row">
//             {/* Additional widgets */}
//             <div className="col-md-4 mb-4">
//               <div className="card text-white bg-info">
//                 <div className="card-body">
//                   <h5 className="card-title">Orders Overview</h5>
//                   <p className="card-text">View and manage orders.</p>
//                   <Link to="/manage-orders" className="btn btn-light">
//                     View Orders
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4 mb-4">
//               <div className="card text-white bg-danger">
//                 <div className="card-body">
//                   <h5 className="card-title">Reports</h5>
//                   <p className="card-text">View sales and customer reports.</p>
//                   <Link to="/view-reports" className="btn btn-light">
//                     View Reports
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React from 'react';
// import './styles/HomePage.css'; // Updated CSS file for styling
// // import NavigationBar from './Navbar';
// import NavigationBar from "../components/Navbar";
// const HomePage = () => {
//   return (
//     <div className="home-container">
    
//      <NavigationBar /> 
//       {/* Hero Section */}
//       <header className="hero-section">
//         <div className="hero-content">
//           <h1>Welcome to <span className="highlight">AgriHub</span></h1>
//           <p>Your one-stop solution for agriculture management</p>
//           <button className="cta-button">Explore Now</button>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2 className="section-title">Our Features</h2>
//         <div className="features">
//           <div className="feature">
//             <h3>Crop Management</h3>
//             <p>Manage your crops effectively with our tools, ensuring optimal growth and harvest.</p>
//           </div>
//           <div className="feature">
//             <h3>Weather Updates</h3>
//             <p>Get real-time weather updates for your region, helping you plan your agricultural activities.</p>
//           </div>
//           <div className="feature">
//             <h3>Market Insights</h3>
//             <p>Stay informed about market trends and prices to make better decisions on crop sales.</p>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="services-section">
//         <h2 className="section-title">Our Services</h2>
//         <div className="services">
//           <div className="service">
//             <h3>Consultation</h3>
//             <p>Expert advice on crop management, pest control, and sustainable farming practices.</p>
//           </div>
//           <div className="service">
//             <h3>Crop Disease Detection</h3>
//             <p>Using advanced image processing and AI to detect diseases early and recommend treatments.</p>
//           </div>
//           <div className="service">
//             <h3>Farming Equipment</h3>
//             <p>Access to modern farming tools and machinery to improve productivity and efficiency.</p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h2 className="section-title">What Our Users Say</h2>
//         <div className="testimonials">
//           <div className="testimonial">
//             <p>"AgriHub has revolutionized the way I manage my farm. The weather updates and crop management tools are a game-changer!"</p>
//             <h4>- Rajesh Kumar, Farmer</h4>
//           </div>
//           <div className="testimonial">
//             <p>"The crop disease detection feature saved my crops from a potential outbreak. Highly recommended!"</p>
//             <h4>- Sunita Devi, Farmer</h4>
//           </div>
//           <div className="testimonial">
//             <p>"I love the market insights. They help me decide the best time to sell my produce for maximum profit."</p>
//             <h4>- Anil Sharma, Grower</h4>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="footer">
//         <p>&copy; 2025 AgriHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState } from "react";
// import axios from "axios";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/login", formData);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>
//       {message && <p className="mt-4 text-red-600">{message}</p>}
//     </div>
//   );
// };

// export default LoginPage;
// src/pages/LoginPage.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import NavigationBar from "../components/Navbar";
// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();  // For navigation after login

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/login", formData);
//       setMessage(response.data.message);
      
//       // Check if the user is an admin
//       if (response.data.user.isAdmin) {
//         navigate("/admin-dashboard");  // Redirect to Admin Dashboard
//       } else {
//         navigate("/");  // Redirect to home or user dashboard
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
    
//     <div className="p-4 max-w-md mx-auto">
//       <NavigationBar />
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>
//       {message && <p className="mt-4 text-red-600">{message}</p>}
//     </div>
//   );
// };

// export default LoginPage;
//after the profile Page 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import NavigationBar from "../components/Navbar";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();  

//   useEffect(() => {
//     // If user is already logged in, redirect to profile
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/profile");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/login", formData);
      
//       // Store token & user data
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       setMessage("Login successful!");

//       // Redirect user based on role
//       if (response.data.user.isAdmin) {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/profile"); // Redirect to profile page
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <NavigationBar />
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>
//       {message && <p className="mt-4 text-red-600">{message}</p>}
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManageCategory = () => {
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Handle input change for the category form
//   const handleInputChange = (e) => {
//     setCategory(e.target.value);
//   };

//   // Handle form submission to add a new category
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/categories", { name: category });
//       if (response.status === 201) {
//         alert("Category added successfully!");
//         setCategory(""); // Clear the input field
//         fetchCategories(); // Refresh the categories list
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       alert("Failed to add category. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle category deletion
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/categories/${id}`);
//         alert("Category deleted successfully!");
//         fetchCategories(); // Refresh the categories list
//       } catch (error) {
//         console.error("Error deleting category:", error);
//         alert("Failed to delete category. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="manage-category">
//       <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="category" className="block font-medium">
//             Category Name
//           </label>
//           <input
//             type="text"
//             id="category"
//             value={category}
//             onChange={handleInputChange}
//             placeholder="Enter category name"
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Adding..." : "Add Category"}
//         </button>
//       </form>

//       <h2 className="text-xl font-bold mt-8 mb-4">Existing Categories</h2>
//       <ul className="space-y-2">
//         {categories.map((cat) => (
//           <li
//             key={cat._id}
//             className="flex justify-between items-center border p-2 rounded"
//           >
//             <span>{cat.name}</span>
//             <button
//               onClick={() => handleDelete(cat._id)}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageCategory;
// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import"./styles/Category.css";
// const ManageCategory = () => {
//   const [category, setCategory] = useState({
//     name: "",
//   });

//   const handleChange = (e) => {
//     setCategory({ ...category, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/category/add", category);
//       alert(response.data.message);
//       setCategory({ name: ""});
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <h4 className="sidebar-title">AgriHub Admin</h4>
//         <ul className="nav-links">
//           <li>
//             <Link to="/admin-dashboard" className="nav-link">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-vendors" className="nav-link">
//               Manage Vendors
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-products" className="nav-link">
//               Manage Products
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-category" className="nav-link">
//               Manage Category
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-customers" className="nav-link">
//               Manage Customers
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-promotions" className="nav-link">
//               Manage Promotions
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//       <h2>Manage Category</h2>
//       <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     name="name"
//     placeholder="Category Name"
//     value={category.name}
//     onChange={handleChange}
//     required
//   />
  
//   <button type="submit">Add Category</button>
// </form>
// </div>
// </div>
//   );
// };
  
// export default ManageCategory;


// // src/pages/ManageProducts.js
// import React from "react";

// const ManageProducts = () => {
//   return (
//     <div className="container">
//       <h2>Manage Products</h2>
//       <p>Here you can manage products.</p>
//     </div>
//   );
// };

// export default ManageProducts;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./styles/manageproduct.css";
// const ManageProducts = () => {
//   const [vendors, setVendors] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     vendor: "",
//     category:"",
//   });

//   useEffect(() => {
//     // Fetch vendors for the dropdown
//     const fetchVendors = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/vendor/list");
//         setVendors(response.data);
//       } catch (error) {
//         alert("Failed to fetch vendors.");
//       }
//     };
//     fetchVendors();
    
//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/category/list");
//         setCategory(response.data);
//       } catch (error) {
//         alert("Failed to fetch category.");
//       }
//     };
//     fetchCategory();
//   }, []);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/product/add", product);
//       alert(response.data.message);
//       setProduct({ name: "", price: "", quantity: "", vendor: "" ,category:""});
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//      <div className="admin-dashboard">
//           <div className="sidebar">
//             <h4 className="sidebar-title">AgriHub Admin</h4>
//             <ul className="nav-links">
//               <li>
//                 <Link to="/admin-dashboard" className="nav-link">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manage-vendors" className="nav-link">
//                   Manage Vendors
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manage-products" className="nav-link">
//                   Manage Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manage-category" className="nav-link">
//                   Manage Category
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manage-customers" className="nav-link">
//                   Manage Customers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manage-promotions" className="nav-link">
//                   Manage Promotions
//                 </Link>
//               </li>
//             </ul>
//           </div>
    
//           <div className="main-content">
//           <h2>Manage Products</h2>
// <form onSubmit={handleSubmit}>
//   <select
//     name="vendor"
//     value={product.vendor}
//     onChange={handleChange}
//     required
//   >
//     <option value="">Select Vendor</option>
//     {vendors.map((vendor) => (
//       <option key={vendor._id} value={vendor._id}>
//         {vendor.name}
//       </option>
//     ))}
//   </select>

//   <select
//     name="category"
//     value={product.category}
//     onChange={handleChange}
//     required
//   >
//     <option value="">Select category</option>
//     {category.map((category) => (
//       <option key={category._id} value={category._id}>
//         {category.name}
//       </option>
//     ))}
//   </select>

//   <input
//     type="text"
//     name="name"
//     placeholder="Product Name"
//     value={product.name}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="number"
//     name="price"
//     placeholder="Price"
//     value={product.price}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="number"
//     name="quantity"
//     placeholder="Quantity"
//     value={product.quantity}
//     onChange={handleChange}
//     required
//   />
//   <button type="submit">Add Product</button>
// </form>
//     </div>
//     </div>
//   );
// };

// export default ManageProducts;
//change after the add new fields
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./styles/manageproduct.css";

// const ManageProducts = () => {
//   const [vendors, setVendors] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     vendor: "",
//     category: "",
//     description: "",
//     type: "",
//     variants:"",
//     image: null, // For file upload
//   });

//   useEffect(() => {
//     // Fetch vendors and categories for the dropdowns
//     const fetchVendors = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/vendor/list");
//         setVendors(response.data);
//       } catch (error) {
//         alert("Failed to fetch vendors.");
//       }
//     };

//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/category/list");
//         setCategory(response.data);
//       } catch (error) {
//         alert("Failed to fetch category.");
//       }
//     };

//     fetchVendors();
//     fetchCategory();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setProduct({ ...product, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare form data for the file upload
//     const formData = new FormData();
//     Object.entries(product).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       const response = await axios.post("http://localhost:5000/api/product/add", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert(response.data.message);
//       setProduct({
//         name: "",
//         price: "",
//         quantity: "",
//         vendor: "",
//         category: "",
//         description: "",
//         type: "",
//         variants:"",
//         image: null,
//       });
//     } catch (error) {
//       alert(error.response?.data?.error || "Failed to add product.");
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <h4 className="sidebar-title">AgriHub Admin</h4>
//         <ul className="nav-links">
//           <li><Link to="/admin-dashboard" className="nav-link">Dashboard</Link></li>
//           <li><Link to="/manage-vendors" className="nav-link">Manage Vendors</Link></li>
//           <li><Link to="/manage-products" className="nav-link">Manage Products</Link></li>
//           <li><Link to="/manage-category" className="nav-link">Manage Category</Link></li>
//           <li><Link to="/manage-customers" className="nav-link">Manage Customers</Link></li>
//           <li><Link to="/manage-promotions" className="nav-link">Manage Promotions</Link></li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <h2>Manage Products</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <select name="vendor" value={product.vendor} onChange={handleChange} required>
//             <option value="">Select Vendor</option>
//             {vendors.map((vendor) => (
//               <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
//             ))}
//           </select>

//           <select name="category" value={product.category} onChange={handleChange} required>
//             <option value="">Select Category</option>
//             {category.map((cat) => (
//               <option key={cat._id} value={cat._id}>{cat.name}</option>
//             ))}
//           </select>

//           <input
//             type="text"
//             name="name"
//             placeholder="Product Name"
//             value={product.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={product.price}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={product.quantity}
//             onChange={handleChange}
//             required
//           />
//            <textarea
//     name="description"
//     placeholder="Product Description"
//     value={product.description}
//     onChange={handleChange}
//     required
//   ></textarea>

//           <select name="type" value={product.type} onChange={handleChange} required>
//             <option value="">Select Type</option>
//             <option value="Liquid">Liquid</option>
//             <option value="Powder">Powder</option>
//           </select>

//           {/* {product.type === "Liquid" ? (
//             <input
//               type="text"
//               name="size"
//               placeholder="Product Size (e.g., 50ml, 100ml)"
//               value={product.size}
//               onChange={handleChange}
//             />
//           ) : (
//             <input
//               type="text"
//               name="weight"
//               placeholder="Product Weight (e.g., 500gm, 1kg)"
//               value={product.weight}
//               onChange={handleChange}
//             />
//           )} */}
//           <input
//     type="text"
//     name="variants"
//     placeholder="Product Variants (comma-separated)"
//     value={product.variants}
//     onChange={(e) =>
//       setProduct({ ...product, variants: e.target.value.split(",") })
//     }
//     required
//   />
//           <input
//     type="file"
//     name="image"
//     onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
//     required
//   />
//           <button type="submit">Add Product</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
//for the after the crud operation
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { Link } from "react-router-dom";
// import "./styles/manageproduct.css";

// const ManageProducts = () => {
//   const [vendors, setVendors] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [products, setProducts] = useState([]); // To display product list
//   const [editingProductId, setEditingProductId] = useState(null); // For editing a product
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     vendor: "",
//     category: "",
//     description: "",
//     type: "",
//     variants: "",
//     image: null, // For file upload
//   });

//   useEffect(() => {
//       fetchVendors();
//       fetchCategory();
//       fetchProducts();
//     }, []);
  

//     const fetchVendors = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/vendor/list");
//         console.log('Fetched vendors:', response.data);  // Log the vendor data
//         setVendors(response.data);
//       } catch (error) {
//         console.error("Error fetching vendors:", error);
//         alert("Failed to fetch vendors.");
//       }
//     };
  
//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/category/list");
//         console.log('Fetched categories:', response.data);  // Log the category data
//         setCategory(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         alert("Failed to fetch categories.");
//       }
//     };
  
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/product/list");
//         console.log('Fetched products:', response.data);  // Log the product data
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         alert("Failed to fetch products.");
//       }
//     };
  
    

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setProduct({ ...product, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare form data for file upload
//     const formData = new FormData();
//     Object.entries(product).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       if (editingProductId) {
//         // Update product
//         await axios.put(`http://localhost:5000/api/product/update/${editingProductId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product updated successfully!");
//       } else {
//         // Add new product
//         await axios.post("http://localhost:5000/api/product/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product added successfully!");
//       }

//       // Reset form and fetch updated products
//       setProduct({
//         name: "",
//         price: "",
//         quantity: "",
//         vendor: "",
//         category: "",
//         description: "",
//         type: "",
//         variants: "",
//         image: null,
//       });
//       setEditingProductId(null);
//       fetchProducts();
//     } catch (error) {
//       alert(error.response?.data?.error || "Failed to save product.");
//     }
//   };

//   const handleEdit = (product) => {
//     setProduct({
//       name: product.name,
//       price: product.price,
//       quantity: product.quantity,
//       vendor: product.vendor._id,
//       category: product.category._id,
//       description: product.description,
//       type: product.type,
//       variants: product.variants.join(","),
//       image: null, // Image won't be prefilled
//     });
//     setEditingProductId(product._id);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/product/delete/${productId}`);
//         alert("Product deleted successfully!");
//         setProducts(products.filter((product) => product._id !== productId));
//       } catch (error) {
//         alert(error.response?.data?.error || "Failed to delete product.");
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
      
//       <div className="main-content">
//         <h2>Manage Products</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <select name="vendor" value={product.vendor} onChange={handleChange} required>
//             <option value="">Select Vendor</option>
//             {vendors.map((vendor) => (
//               <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
//             ))}
//           </select>

//           <select name="category" value={product.category} onChange={handleChange} required>
//             <option value="">Select Category</option>
//             {category.map((cat) => (
//               <option key={cat._id} value={cat._id}>{cat.name}</option>
//             ))}
//           </select>

//           <input
//             type="text"
//             name="name"
//             placeholder="Product Name"
//             value={product.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={product.price}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={product.quantity}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Product Description"
//             value={product.description}
//             onChange={handleChange}
//             required
//           ></textarea>

//           <select name="type" value={product.type} onChange={handleChange} required>
//             <option value="">Select Type</option>
//             <option value="Liquid">Liquid</option>
//             <option value="Powder">Powder</option>
//           </select>

//           <input
//             type="text"
//             name="variants"
//             placeholder="Product Variants (comma-separated)"
//             value={product.variants}
//             onChange={(e) => setProduct({ ...product, variants: e.target.value })}
//             required
//           />
//           <input type="file" name="image" onChange={handleFileChange} required={!editingProductId} />
//           <button type="submit">{editingProductId ? "Update Product" : "Add Product"}</button>
//         </form>

//         <h3>Product List</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Vendor</th>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod) => (
//               <tr key={prod._id}>
//                 <td>{prod.name}</td>
//                 <td>{prod.price}</td>
//                 <td>{prod.quantity}</td>
//                 {/* <td>{prod.vendor.name}</td>
//                 <td>{prod.category.name}</td> */}
//                 <td>
//                   <button onClick={() => handleEdit(prod)}>Edit</button>
//                   <button onClick={() => handleDelete(prod._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;

// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import"./styles/vendor.css";
// const ManageVendors = () => {
//   const [vendor, setVendor] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     setVendor({ ...vendor, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/vendor/add", vendor);
//       alert(response.data.message);
//       setVendor({ name: "", email: "", phone: "", address: "" });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <h4 className="sidebar-title">AgriHub Admin</h4>
//         <ul className="nav-links">
//           <li>
//             <Link to="/admin-dashboard" className="nav-link">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-vendors" className="nav-link">
//               Manage Vendors
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-products" className="nav-link">
//               Manage Products
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-category" className="nav-link">
//               Manage Category
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-customers" className="nav-link">
//               Manage Customers
//             </Link>
//           </li>
//           <li>
//             <Link to="/manage-promotions" className="nav-link">
//               Manage Promotions
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//       <h2>Manage Vendors</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Company Name"
//           value={vendor.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={vendor.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={vendor.phone}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="address"
//           placeholder="Address"
//           value={vendor.address}
//           onChange={handleChange}
//         ></textarea>
//         <button type="submit">Add Vendor</button>
//       </form>
// </div>
// </div>
//   );
// };

// export default ManageVendors;


// import React, { useState } from 'react';
// import wheatSeedsImg from '../img/biovita-bio-activator.avif';
// import fertilizerPackImg from '../img/fantac-plus-growth-promoter.avif';
// import handTrowelImg from '../img/isabion-insecticide.avif';
// import wateringCanImg from '../img/katyayani-activated.avif';
// import "./styles/Product.css"; // Import the CSS file
// import NavigationBar from "../components/Navbar";
// const ShopPage = () => {
//     const [cart, setCart] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null); // For the modal

//     const products = [
//         {
//             id: 1,
//             name: 'Wheat Seeds,Biovita Liquid BioFertilizer',
//             price: 20,
//             image: wheatSeedsImg,
//             description: 'High-quality wheat seeds for better yield.',
//         },
//         {
//             id: 2,
//             name: 'Fertilizer Pack',
//             price: 50,
//             image: fertilizerPackImg,
//             description: 'Organic fertilizer for healthy crops.',
//         },
//         {
//             id: 3,
//             name: 'Hand Trowel',
//             price: 15,
//             image: handTrowelImg,
//             description: 'Durable hand tool for planting.',
//         },
//         {
//             id: 4,
//             name: 'Watering Can',
//             price: 30,
//             image: wateringCanImg,
//             description: 'Lightweight can with a comfortable handle.',
//         },
//     ];

//     // Add product to cart
//     const addToCart = (product) => {
//         setCart((prevCart) => [...prevCart, product]);
//     };

//     // Calculate total price in the cart
//     const totalPrice = cart.reduce((total, item) => total + item.price, 0);

//     // Open modal with product details
//     const openProductDetails = (product) => {
//         setSelectedProduct(product);
//     };

//     // Close modal
//     const closeProductDetails = () => {
//         setSelectedProduct(null);
//     };

//     return (
//         <div className="shop-page"><NavigationBar />
//             <h1>Agriculture Products Shop</h1>

//             {/* Products Section */}
//             <div className="products-grid">
//                 {products.map((product) => (
//                     <div key={product.id} className="product-card">
//                         <img
//                             src={product.image}
//                             alt={product.name}
//                             onClick={() => openProductDetails(product)} // Open modal on click
//                             style={{ cursor: 'pointer' }}
//                         />
//                         <h3>{product.name}</h3>
//                         <p>{product.description}</p>
//                         <p className="price">${product.price}</p>
//                         <button onClick={() => addToCart(product)}>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>

//             {/* Cart Section */}
//             <div className="cart-section">
//                 <h2>Shopping Cart</h2>
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <>
//                         <ul>
//                             {cart.map((item, index) => (
//                                 <li key={index}>
//                                     {item.name} - ${item.price}
//                                 </li>
//                             ))}
//                         </ul>
//                         <h3>Total: ${totalPrice}</h3>
//                     </>
//                 )}
//             </div>

//             {/* Product Details Modal */}
//             {selectedProduct && (
//                 <div className="product-modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={closeProductDetails}>
//                             &times;
//                         </span>
//                         <img src={selectedProduct.image} alt={selectedProduct.name} />
//                         <h2>{selectedProduct.name}</h2>
//                         <p>{selectedProduct.description}</p>
//                         <p className="price">${selectedProduct.price}</p>
//                         <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
//                         <button className="order-now" onClick={() => alert('Order placed!')}>
//                             Order Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShopPage;
//after show the dynamic product
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./styles/Product.css"; // Import the CSS file

// const ShopPage = () => {
//     const [cart, setCart] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]); // State for storing fetched products

//     // Fetch products from the backend
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/product/list");
//             console.log("Fetched products:", response.data); // Debugging log
//             setProducts(response.data); // Store fetched products in state
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             alert("Failed to fetch products.");
//         }
//     };

//     // Add product to cart
//     const addToCart = (product) => {
//         setCart((prevCart) => [...prevCart, product]);
//     };

//     // Calculate total price in the cart
//     const totalPrice = cart.reduce((total, item) => total + item.price, 0);

//     // Open modal with product details
//     const openProductDetails = (product) => {
//         setSelectedProduct(product);
//     };

//     // Close modal
//     const closeProductDetails = () => {
//         setSelectedProduct(null);
//     };

//     return (
//         <div className="shop-page">
//             <h1>Agriculture Products Shop</h1>

//             {/* Products Section */}
//             <div className="products-grid">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <div key={product._id} className="product-card">
//                             <img
//                                 src={`http://localhost:5000/uploads/${product.image}`} // Fetch image dynamically
//                                 alt={product.name}
//                                 onClick={() => openProductDetails(product)}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p className="price">${product.price}</p>
//                             <button onClick={() => addToCart(product)}>Add to Cart</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading products...</p>
//                 )}
//             </div>

//             {/* Cart Section */}
//             <div className="cart-section">
//                 <h2>Shopping Cart</h2>
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <>
//                         <ul>
//                             {cart.map((item, index) => (
//                                 <li key={index}>
//                                     {item.name} - ${item.price}
//                                 </li>
//                             ))}
//                         </ul>
//                         <h3>Total: ${totalPrice}</h3>
//                     </>
//                 )}
//             </div>

//             {/* Product Details Modal */}
//             {selectedProduct && (
//                 <div className="product-modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={closeProductDetails}>
//                             &times;
//                         </span>
//                         <img src={`http://localhost:5000/uploads/${selectedProduct.image}`} alt={selectedProduct.name} />
//                         <h2>{selectedProduct.name}</h2>
//                         <p>{selectedProduct.description}</p>
//                         <p className="price">${selectedProduct.price}</p>
//                         <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
//                         <button className="order-now" onClick={() => alert('Order placed!')}>
//                             Order Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShopPage;
//after add styling
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./styles/Product.css"; // Import the CSS file
// import NavigationBar from "../components/Navbar";
// const ShopPage = () => {
//     const [cart, setCart] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]); // State for storing fetched products

//     // Fetch products from the backend
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/product/list");
//             console.log("Fetched products:", response.data); // Debugging log
//             setProducts(response.data); // Store fetched products in state
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             alert("Failed to fetch products.");
//         }
//     };

//     // Add product to cart
//     const addToCart = (product) => {
//         setCart((prevCart) => [...prevCart, product]);
//     };

//     // Calculate total price in the cart
//     const totalPrice = cart.reduce((total, item) => total + item.price, 0);

//     // Open modal with product details
//     const openProductDetails = (product) => {
//         setSelectedProduct(product);
//     };

//     // Close modal
//     const closeProductDetails = () => {
//         setSelectedProduct(null);
//     };

//     return (
//         <div className="shop-page">
//           <NavigationBar />
//             <h1>Agriculture Products Shop</h1>

//             {/* Products Section */}
//             <div className="products-grid">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <div key={product._id} className="product-card">
//                             <img
//                                 src={`http://localhost:5000/uploads/${product.image}`} // Fetch image dynamically
//                                 alt={product.name}
//                                 onClick={() => openProductDetails(product)}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p className="price">${product.price}</p>
//                             <button onClick={() => addToCart(product)}>Add to Cart</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading products...</p>
//                 )}
//             </div>

//             {/* Cart Section */}
//             <div className="cart-section">
//                 <h2>Shopping Cart</h2>
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <>
//                         <ul>
//                             {cart.map((item, index) => (
//                                 <li key={index}>
//                                     {item.name} - ${item.price}
//                                 </li>
//                             ))}
//                         </ul>
//                         <h3>Total: ${totalPrice}</h3>
//                     </>
//                 )}
//             </div>

//             {/* Product Details Modal */}
//             {selectedProduct && (
//                 <div className="product-modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={closeProductDetails}>
//                             &times;
//                         </span>
//                         <img src={`http://localhost:5000/uploads/${selectedProduct.image}`} alt={selectedProduct.name} />
//                         <h2>{selectedProduct.name}</h2>
//                         <p>{selectedProduct.description}</p>
//                         <p className="price">${selectedProduct.price}</p>
//                         <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
//                         <button className="order-now" onClick={() => alert('Order placed!')}>
//                             Order Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShopPage;


// import React, { useState } from "react";
// import axios from "axios";

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     isAdmin: false,
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/users/register", formData);
//       setMessage(response.data.message + ` Username: ${response.data.username}`);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Register
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default RegistrationPage;