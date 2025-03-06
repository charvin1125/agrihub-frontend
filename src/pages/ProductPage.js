// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./styles/ProductPage.css"; // Custom CSS
// import NavigationBar from "../components/Navbar";
// const ProductPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container my-5"><NavigationBar />
//       <h1 className="text-center fw-bold mb-4">Our Products</h1>
//       <div className="row g-4">
//         {products.map((product) => (
//           <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
//             <div className="card product-card">
//               <img
//                 src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 className="card-img-top product-image"
//               />
//               <div className="card-body text-center">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text fw-bold text-primary">₹{product.price}</p>
//                 <Link to={`/products/${product._id}`} className="btn btn-outline-primary w-100">
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


//after the design
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./styles/ProductPage.css"; // Custom CSS
// import NavigationBar from "../components/Navbar";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container my-5">
//       <NavigationBar />
//       <h1 className="text-center fw-bold mb-4">Our Products</h1>
//       <div className="row g-4">
//         {products.map((product) => (
//           <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
//             <div className="card product-card">
//               <img
//                 src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 className="card-img-top product-image"
//               />
//               <div className="card-body text-center">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text fw-bold text-primary">
//                   ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
//                 </p>
//                 <Link to={`/products/${product._id}`} className="btn btn-outline-primary w-100">
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";
// import NavigationBar from "../components/Navbar";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <Container sx={{ mt: 5 }}>
//       <NavigationBar />
//       <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
//         Our Products
//       </Typography>
//       <Grid container spacing={4}>
//         {products.map((product) => (
//           <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//             <Card
//               sx={{
//                 transition: "0.3s",
//                 "&:hover": { transform: "scale(1.05)" },
//                 boxShadow: 3,
//                 borderRadius: 2,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 sx={{ objectFit: "cover" }}
//               />
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body1" color="primary" fontWeight="bold">
//                   ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to={`/products/${product._id}`}
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                 >
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ProductPage;
//after the search and filter
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";
// import NavigationBar from "../components/Navbar";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//         setProducts(res.data);

//         // Extract unique categories and brands
//         const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
//         const uniqueBrands = [...new Set(res.data.map((p) => p.brand))];

//         setCategories(uniqueCategories);
//         setBrands(uniqueBrands);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Filtered products based on search, category, and brand
//   const filteredProducts = products.filter((product) => {
//     return (
//       (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (category === "" || product.category === category) &&
//       (brand === "" || product.brand === brand)
//     );
//   });

//   return (
//     <Container sx={{ mt: 10 }}> {/* Adjust margin to fix label issue */}
//       <NavigationBar />
//       <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
//         Our Products
//       </Typography>

//       {/* Search & Filter Section */}
//       <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" sx={{ mb: 4 }}>
//         <TextField
//           label="Search by Name"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: "250px" }}
//         />
//         <FormControl sx={{ width: "200px" }}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <MenuItem value="">All</MenuItem>
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ width: "200px" }}>
//           <InputLabel>Brand</InputLabel>
//           <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
//             <MenuItem value="">All</MenuItem>
//             {brands.map((b) => (
//               <MenuItem key={b} value={b}>
//                 {b}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Product Grid */}
//       <Grid container spacing={4}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//               <Card
//                 sx={{
//                   transition: "0.3s",
//                   "&:hover": { transform: "scale(1.05)" },
//                   boxShadow: 3,
//                   borderRadius: 2,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                   alt={product.name}
//                   sx={{ objectFit: "cover" }}
//                 />
//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Typography variant="h6" fontWeight="bold">
//                     {product.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//   {product.category?.name} | {product.brand?.name}
// </Typography>

//                   <Typography variant="body1" color="primary" fontWeight="bold">
//                     ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
//                   </Typography>
//                   <Button
//                     component={Link}
//                     to={`/products/${product._id}`}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ mt: 2 }}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
//             No products found.
//           </Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default ProductPage;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import NavigationBar from "../components/Navbar";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [brandFilter, setBrandFilter] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const fetchFilters = async () => {
//       try {
//         const categoriesRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list");
//         const brandsRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/brand/list");

//         setCategories(categoriesRes.data);
//         setBrands(brandsRes.data);
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchProducts();
//     fetchFilters();
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (categoryFilter ? product.category?.name === categoryFilter : true) &&
//     (brandFilter ? product.brand?.name === brandFilter : true)
//   );

//   return (
//     <Container sx={{ mt: 10 }}> {/* Moved Our Products label below Navbar */}
//       <NavigationBar />
//       <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
//         Our Products
//       </Typography>

//       {/* 🔍 Search Input */}
//       <TextField
//         label="Search Products"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* 🏷️ Category & Brand Filters */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Category</InputLabel>
//             <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//               <MenuItem value="">All</MenuItem>
//               {categories.map((category) => (
//                 <MenuItem key={category._id} value={category.name}>
//                   {category.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Brand</InputLabel>
//             <Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
//               <MenuItem value="">All</MenuItem>
//               {brands.map((brand) => (
//                 <MenuItem key={brand._id} value={brand.name}>
//                   {brand.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* 🛒 Product Grid */}
//       <Grid container spacing={4}>
//         {filteredProducts.map((product) => (
//           <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//             <Card
//               sx={{
//                 transition: "0.3s",
//                 "&:hover": { transform: "scale(1.05)" },
//                 boxShadow: 3,
//                 borderRadius: 2,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 sx={{ objectFit: "cover" }}
//               />
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {product.categorys?.name || "No Category"} | {product.brand?.name || "No Brand"}
//                 </Typography>
//                 <Typography variant="body1" color="primary" fontWeight="bold">
//                   ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to={`/products/${product._id}`}
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                 >
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ProductPage;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import NavigationBar from "../components/Navbar";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [brands, setBrands] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [brandFilter, setBrandFilter] = useState("");

//   useEffect(() => {
//     fetchProducts();
//     fetchFilters();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list",{ withCredentials: true });
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchFilters = async () => {
//     try {
//       const categoryRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list",{ withCredentials: true });
//       const brandRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list",{ withCredentials: true });

//       // Convert to { _id: name } mapping
//       const categories = categoryRes.data.reduce((acc, category) => {
//         acc[category._id] = category.name;
//         return acc;
//       }, {});

//      const brands = brandRes.data.reduce((acc, brand) => {
//         acc[brand._id] = brand.name;
//         return acc;
//       }, {});

//       setCategories(categories);
//       setBrands(brands);
//     } catch (error) {
//       console.error("Error fetching filters:", error);
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (categoryFilter ? product.category === categoryFilter : true) &&
//     (brandFilter ? product.brand === brandFilter : true)
//   );
  
//   return (
//     <>
//   <NavigationBar/>
//     <Container sx={{ mt: 10 }}> {/* Moves label below Navbar */}
      
//       <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
//         Our Products
//       </Typography>

//       {/* 🔍 Search Input */}
//       <TextField
//         label="Search Products"
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* 🏷️ Category & Brand Filters */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Category</InputLabel>
//             <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//   <MenuItem value="">All</MenuItem>
//   {Object.entries(categories).map(([id, name]) => (
//     <MenuItem key={id} value={id}>
//       {name}
//     </MenuItem>
//   ))}
// </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Brand</InputLabel>
//             <Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
//   <MenuItem value="">All</MenuItem>
//   {Object.entries(brands).map(([id, name]) => (
//     <MenuItem key={id} value={id}>
//       {name}
//     </MenuItem>
//   ))}
// </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* 🛒 Product Grid */}
//       <Grid container spacing={4}>
//         {filteredProducts.map((product) => (
//           <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
//             <Card
//               sx={{
//                 transition: "0.3s",
//                 "&:hover": { transform: "scale(1.05)" },
//                 boxShadow: 3,
//                 borderRadius: 2,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 sx={{ objectFit: "cover" }}
//               />
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {product.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//   {categories[product.category] || "No Category"} | {product.brand?.name || "No Brand"}
// </Typography>

//                 <Typography variant="body1" color="primary" fontWeight="bold">
//                   ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
//                 </Typography>
//                 <Button
//                   component={Link}
//                   to={`/products/${product._id}`}
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                 >
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//     </>
//   );

// };

// export default ProductPage;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar"; // Your updated NavigationBar
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion"; // Install: npm install framer-motion
// import SearchIcon from "@mui/icons-material/Search";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [brands, setBrands] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [brandFilter, setBrandFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");

//   // Fetch products and filters on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productRes, categoryRes, brandRes] = await Promise.all([
//           axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true }),
//           axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true }),
//           axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true }),
//         ]);
//         setProducts(productRes.data || []);
//         setCategories(
//           categoryRes.data.reduce((acc, category) => {
//             acc[category._id] = category.name;
//             return acc;
//           }, {})
//         );
//         setBrands(
//           brandRes.data.reduce((acc, brand) => {
//             acc[brand._id] = brand.name;
//             return acc;
//           }, {})
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Filter products based on search term, category, and brand
//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter ? product.category === categoryFilter : true) &&
//       (brandFilter ? product.brand === brandFilter : true)
//   );

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
//             bgcolor: darkMode ? "#263238" : "#fff",
//             height: "100%", // Uniform card height
//             display: "flex",
//             flexDirection: "column",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             fontSize: { xs: "0.9rem", md: "1rem" },
//             py: 1,
//             px: 2,
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
//     },
//   });

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />

//         {/* Header Section */}
//         <Box
//           component={motion.section}
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           sx={{
//             py: { xs: 6, sm: 8 },
//             textAlign: "center",
//             bgcolor: darkMode ? "#1A3C34" : "#E8F5E9",
//           }}
//         >
//           <Container maxWidth="md">
//             <Typography
//               variant={isMobile ? "h4" : "h3"}
//               sx={{
//                 fontWeight: "bold",
//                 color: darkMode ? "#FFF" : "#388E3C",
//                 mb: 2,
//                 fontSize: { xs: "2rem", md: "3rem" },
//               }}
//             >
//               Our Products
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: darkMode ? "#E0E0E0" : "#757575",
//                 mb: 4,
//                 fontSize: { xs: "1rem", md: "1.25rem" },
//               }}
//             >
//               Discover our range of agricultural products
//             </Typography>
//           </Container>
//         </Box>

//         {/* Filters and Search Section */}
//         <Box sx={{ bgcolor: darkMode ? "#263238" : "#F9F9F9", py: { xs: 4, sm: 6 } }}>
//           <Container maxWidth="lg">
//             <Grid container spacing={2} alignItems="center">
//               {/* Search Bar */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField
//                   variant="outlined"
//                   placeholder="Search products..."
//                   size="small"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon sx={{ color: darkMode ? "#388E3C" : "#757575" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "8px",
//                       bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Category Filter */}
//               <Grid item xs={6} sm={3} md={2}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}>Category</InputLabel>
//                   <Select
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     label="Category"
//                     sx={{ borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {Object.entries(categories).map(([id, name]) => (
//                       <MenuItem key={id} value={id}>
//                         {name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Brand Filter */}
//               <Grid item xs={6} sm={3} md={2}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}>Brand</InputLabel>
//                   <Select
//                     value={brandFilter}
//                     onChange={(e) => setBrandFilter(e.target.value)}
//                     label="Brand"
//                     sx={{ borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {Object.entries(brands).map(([id, name]) => (
//                       <MenuItem key={id} value={id}>
//                         {name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>

//         {/* Products Section */}
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ py: { xs: 6, sm: 8 } }}>
//           <Container maxWidth="lg">
//             {filteredProducts.length === 0 ? (
//               <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                 No products match your filters.
//               </Typography>
//             ) : (
//               <Grid container spacing={4}>
//                 {filteredProducts.map((product) => (
//                   <Grid item xs={12} sm={6} md={4} key={product._id}>
//                     <Card sx={{ maxWidth: 345, mx: "auto" }}>
//                       <CardMedia
//                         component="img"
//                         image={
//                           product.image
//                             ? `https://agrihub-backend-tz4v.onrender.com/${product.image}`
//                             : "https://via.placeholder.com/300x200?text=No+Image"
//                         }
//                         alt={product.name}
//                         sx={{
//                           height: 200, // Fixed height for uniformity
//                           width: "100%", // Full card width
//                           objectFit: "cover", // Ensures full image visibility
//                           borderTopLeftRadius: "12px",
//                           borderTopRightRadius: "12px",
//                         }}
//                       />
//                       <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
//                         <Typography
//                           variant={isMobile ? "h6" : "h5"}
//                           sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
//                         >
//                           {product.name}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary", mb: 1 }}
//                         >
//                           {categories[product.category] || "No Category"} | {brands[product.brand] || "No Brand"}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}
//                         >
//                           Price: ₹{product.variants[0]?.price || "N/A"}
//                         </Typography>
//                         <Button
//                           component={Link}
//                           to={`/products/${product._id}`}
//                           variant="contained"
//                           color="primary"
//                           fullWidth
//                           sx={{
//                             bgcolor: darkMode ? "#66BB6A" : "#388E3C",
//                             "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
//                           }}
//                         >
//                           View Details
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </Container>
//         </Box>

//         {/* Footer Section */}
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/Navbar";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [darkMode] = useState(localStorage.getItem("theme") === "dark");

  // Fetch products and filters on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes, brandRes] = await Promise.all([
          axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list"), // Removed withCredentials for public access
          axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list"),
          axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list"),
        ]);
        setProducts(productRes.data || []);
        setCategories(
          categoryRes.data.reduce((acc, category) => {
            acc[category._id] = category.name;
            return acc;
          }, {})
        );
        setBrands(
          brandRes.data.reduce((acc, brand) => {
            acc[brand._id] = brand.name;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      (brandFilter ? product.brand === brandFilter : true)
  );

  // Theme configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
      background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
      text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
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
            bgcolor: darkMode ? "#263238" : "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9",
              borderRadius: "8px",
              "& fieldset": { borderColor: darkMode ? "#A5D6A7" : "#81C784" },
              "&:hover fieldset": { borderColor: darkMode ? "#81C784" : "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: darkMode ? "#66BB6A" : "#388E3C" },
            },
          },
        },
      },
    },
  });

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <NavigationBar />

        {/* Header Section */}
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ py: { xs: 6, sm: 8 }, textAlign: "center", bgcolor: darkMode ? "#1A3C34" : "#E8F5E9" }}
        >
          <Container maxWidth="md">
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{ fontWeight: "bold", color: darkMode ? "#FFF" : "#388E3C", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Our Products
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: darkMode ? "#E0E0E0" : "#757575", mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Discover our range of agricultural products
            </Typography>
          </Container>
        </Box>

        {/* Filters and Search Section */}
        <Box sx={{ bgcolor: darkMode ? "#263238" : "#F9F9F9", py: { xs: 4, sm: 6 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  placeholder="Search products..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: darkMode ? "#388E3C" : "#757575" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Category"
                    sx={{ borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(categories).map(([id, name]) => (
                      <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}>Brand</InputLabel>
                  <Select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    label="Brand"
                    sx={{ borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(brands).map(([id, name]) => (
                      <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Products Section */}
        <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ py: { xs: 6, sm: 8 } }}>
          <Container maxWidth="lg">
            {filteredProducts.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                No products available at the moment.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Card sx={{ maxWidth: 345, mx: "auto" }}>
                      <CardMedia
                        component="img"
                        image={
                          product.image
                            ? `https://agrihub-backend-tz4v.onrender.com/${product.image}`
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={product.name}
                        sx={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                        <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                          {categories[product.category] || "No Category"} | {brands[product.brand] || "No Brand"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}>
                          Price: ₹{product.variants[0]?.price || "N/A"}
                        </Typography>
                        <Button
                          component={Link}
                          to={`/products/${product._id}`}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>

        {/* Footer Section */}
        <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} AgriHub. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductPage;