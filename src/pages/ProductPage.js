// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
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
// import { motion } from "framer-motion";
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
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/product/list"), // Removed withCredentials for public access
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/category/list"),
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/vendor/list"),
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

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Filter products
//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter ? product.category === categoryFilter : true) &&
//       (brandFilter ? product.brand === brandFilter : true)
//   );

//   // Theme configuration
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
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } },
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

//   const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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
//           sx={{ py: { xs: 6, sm: 8 }, textAlign: "center", bgcolor: darkMode ? "#1A3C34" : "#E8F5E9" }}
//         >
//           <Container maxWidth="md">
//             <Typography
//               variant={isMobile ? "h4" : "h3"}
//               sx={{ fontWeight: "bold", color: darkMode ? "#FFF" : "#388E3C", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
//             >
//               Our Products
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ color: darkMode ? "#E0E0E0" : "#757575", mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}
//             >
//               Discover our range of agricultural products
//             </Typography>
//           </Container>
//         </Box>

//         {/* Filters and Search Section */}
//         <Box sx={{ bgcolor: darkMode ? "#263238" : "#F9F9F9", py: { xs: 4, sm: 6 } }}>
//           <Container maxWidth="lg">
//             <Grid container spacing={2} alignItems="center">
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
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                 />
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
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
//                 No products available at the moment.
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
//                             ? `https://agrihub-backend-xu19.onrender.com/${product.image}`
//                             : "https://via.placeholder.com/300x200?text=No+Image"
//                         }
//                         alt={product.name}
//                         sx={{
//                           height: 200,
//                           width: "100%",
//                           objectFit: "cover",
//                           borderTopLeftRadius: "12px",
//                           borderTopRightRadius: "12px",
//                         }}
//                       />
//                       <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
//                         <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                           {product.name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//                           {categories[product.category] || "No Category"} | {brands[product.brand] || "No Brand"}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}>
//                           Price: ₹{product.variants[0]?.price || "N/A"}
//                         </Typography>
//                         <Button
//                           component={Link}
//                           to={`/products/${product._id}`}
//                           variant="contained"
//                           color="primary"
//                           fullWidth
//                           sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
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
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
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
// import { motion } from "framer-motion";
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productRes, categoryRes, brandRes] = await Promise.all([
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/product/list"),
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/category/list"),
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/vendor/list"),
//         ]);

//         // Log raw responses for debugging
//         console.log("Raw Product Response:", productRes.data);
//         console.log("Raw Category Response:", categoryRes.data);
//         console.log("Raw Brand Response:", brandRes.data);

//         // Map categories and brands by ID
//         const categoryMap = categoryRes.data.reduce((acc, category) => {
//           acc[category._id] = category.name;
//           return acc;
//         }, {});
//         const brandMap = brandRes.data.reduce((acc, brand) => {
//           acc[brand._id] = brand.name;
//           return acc;
//         }, {});

//         // Process products to ensure category and brand IDs are extracted correctly
//         const updatedProducts = productRes.data.map(product => {
//           const categoryId = typeof product.category === "object" && product.category?._id 
//             ? product.category._id 
//             : product.category;
//           const brandId = typeof product.brand === "object" && product.brand?._id 
//             ? product.brand._id 
//             : product.brand;

//           return {
//             ...product,
//             mainImage: product.images.find(img => img.isMain)?.url || product.images[0]?.url || "",
//             categoryId,
//             brandId,
//             categoryName: categoryMap[categoryId] || "Unknown Category",
//             brandName: brandMap[brandId] || "Unknown Brand",
//           };
//         });

//         console.log("Processed Products:", updatedProducts);

//         setProducts(updatedProducts || []);
//         setCategories(categoryMap);
//         setBrands(brandMap);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter ? product.categoryId === categoryFilter : true) &&
//       (brandFilter ? product.brandId === brandFilter : true)
//   );

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
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } },
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

//   const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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

//         <Box
//           component={motion.section}
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           sx={{ py: { xs: 6, sm: 8 }, textAlign: "center", bgcolor: darkMode ? "#1A3C34" : "#E8F5E9" }}
//         >
//           <Container maxWidth="md">
//             <Typography
//               variant={isMobile ? "h4" : "h3"}
//               sx={{ fontWeight: "bold", color: darkMode ? "#FFF" : "#388E3C", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
//             >
//               Our Products
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ color: darkMode ? "#E0E0E0" : "#757575", mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}
//             >
//               Discover our range of agricultural products
//             </Typography>
//           </Container>
//         </Box>

//         <Box sx={{ bgcolor: darkMode ? "#263238" : "#F9F9F9", py: { xs: 4, sm: 6 } }}>
//           <Container maxWidth="lg">
//             <Grid container spacing={2} alignItems="center">
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
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                 />
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>

//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ py: { xs: 6, sm: 8 } }}>
//           <Container maxWidth="lg">
//             {filteredProducts.length === 0 ? (
//               <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                 No products available at the moment.
//               </Typography>
//             ) : (
//               <Grid container spacing={4}>
//                 {filteredProducts.map((product) => {
//                   const minPrice = product.variants.length > 0 
//                     ? Math.min(...product.variants.map(v => v.sellingPrice))
//                     : "N/A";
//                   const maxPrice = product.variants.length > 1 
//                     ? Math.max(...product.variants.map(v => v.sellingPrice))
//                     : null;

//                   return (
//                     <Grid item xs={12} sm={6} md={4} key={product._id}>
//                       <Card sx={{ maxWidth: 345, mx: "auto" }}>
//                         <CardMedia
//                           component="img"
//                           image={
//                             product.mainImage
//                               ? `https://agrihub-backend-xu19.onrender.com/${product.mainImage}`
//                               : "https://via.placeholder.com/300x200?text=No+Image"
//                           }
//                           alt={product.name}
//                           sx={{
//                             height: 200,
//                             width: "100%",
//                             objectFit: "cover",
//                             borderTopLeftRadius: "12px",
//                             borderTopRightRadius: "12px",
//                           }}
//                         />
//                         <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
//                           <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                             {product.name}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//                             {product.categoryName} | {product.brandName}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}>
//                             Price: ₹{minPrice}{maxPrice && ` - ₹${maxPrice}`}
//                           </Typography>
//                           <Button
//                             component={Link}
//                             to={`/products/${product._id}`}
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                           >
//                             View Details
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             )}
//           </Container>
//         </Box>

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
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
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
// import { motion } from "framer-motion";
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productRes, categoryRes, brandRes] = await Promise.all([
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/product/list"),
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/category/list"),
//           axios.get("https://agrihub-backend-xu19.onrender.com/api/vendor/list"),
//         ]);

//         const categoryMap = categoryRes.data.reduce((acc, category) => {
//           acc[category._id] = category.name;
//           return acc;
//         }, {});
//         const brandMap = brandRes.data.reduce((acc, brand) => {
//           acc[brand._id] = brand.name;
//           return acc;
//         }, {});

//         // Process products with batch-specific pricing
//         const updatedProducts = productRes.data.map((product) => {
//           const categoryId =
//             typeof product.category === "object" && product.category?._id
//               ? product.category._id
//               : product.category;
//           const brandId =
//             typeof product.brand === "object" && product.brand?._id
//               ? product.brand._id
//               : product.brand;

//           return {
//             ...product,
//             mainImage:
//               product.images.find((img) => img.isMain)?.url ||
//               product.images[0]?.url ||
//               "",
//             categoryId,
//             brandId,
//             categoryName: categoryMap[categoryId] || "Unknown Category",
//             brandName: brandMap[brandId] || "Unknown Brand",
//           };
//         });

//         setProducts(updatedProducts || []);
//         setCategories(categoryMap);
//         setBrands(brandMap);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter ? product.categoryId === categoryFilter : true) &&
//       (brandFilter ? product.brandId === brandFilter : true)
//   );

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
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } },
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

//   const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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

//         <Box
//           component={motion.section}
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           sx={{ py: { xs: 6, sm: 8 }, textAlign: "center", bgcolor: darkMode ? "#1A3C34" : "#E8F5E9" }}
//         >
//           <Container maxWidth="md">
//             <Typography
//               variant={isMobile ? "h4" : "h3"}
//               sx={{ fontWeight: "bold", color: darkMode ? "#FFF" : "#388E3C", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
//             >
//               Our Products
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ color: darkMode ? "#E0E0E0" : "#757575", mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}
//             >
//               Discover our range of agricultural products
//             </Typography>
//           </Container>
//         </Box>

//         <Box sx={{ bgcolor: darkMode ? "#263238" : "#F9F9F9", py: { xs: 4, sm: 6 } }}>
//           <Container maxWidth="lg">
//             <Grid container spacing={2} alignItems="center">
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
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                 />
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
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
//                       <MenuItem key={id} value={id}>{name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>

//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ py: { xs: 6, sm: 8 } }}>
//           <Container maxWidth="lg">
//             {filteredProducts.length === 0 ? (
//               <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//                 No products available at the moment.
//               </Typography>
//             ) : (
//               <Grid container spacing={4}>
//                 {filteredProducts.map((product) => {
//                   // Get the latest batch's sellingPrice for each variant
//                   const variantPrices = product.variants.map((variant) => {
//                     const latestBatch = variant.batches
//                       .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//                     return latestBatch ? latestBatch.sellingPrice : Infinity;
//                   });
//                   const minPrice =
//                     variantPrices.length > 0 ? Math.min(...variantPrices.filter((p) => p !== Infinity)) : "N/A";
//                   const maxPrice =
//                     variantPrices.length > 1 ? Math.max(...variantPrices.filter((p) => p !== Infinity)) : null;

//                   return (
//                     <Grid item xs={12} sm={6} md={4} key={product._id}>
//                       <Card sx={{ maxWidth: 345, mx: "auto" }}>
//                         <CardMedia
//                           component="img"
//                           image={
//                             product.mainImage
//                               ? `https://agrihub-backend-xu19.onrender.com/${product.mainImage}`
//                               : "https://via.placeholder.com/300x200?text=No+Image"
//                           }
//                           alt={product.name}
//                           sx={{
//                             height: 200,
//                             width: "100%",
//                             objectFit: "cover",
//                             borderTopLeftRadius: "12px",
//                             borderTopRightRadius: "12px",
//                           }}
//                         />
//                         <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
//                           <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                             {product.name}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//                             {product.categoryName} | {product.brandName}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}>
//                             Price: ₹{minPrice === "N/A" ? "N/A" : minPrice}{maxPrice && ` - ₹${maxPrice}`}
//                           </Typography>
//                           <Button
//                             component={Link}
//                             to={`/products/${product._id}`}
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                           >
//                             View Details
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             )}
//           </Container>
//         </Box>

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
import Footer from "../components/Footer";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes, brandRes] = await Promise.all([
          axios.get("https://agrihub-backend-xu19.onrender.com/api/product/list"),
          axios.get("https://agrihub-backend-xu19.onrender.com/api/category/list"),
          axios.get("https://agrihub-backend-xu19.onrender.com/api/vendor/list"),
        ]);

        const categoryMap = categoryRes.data.reduce((acc, category) => {
          acc[category._id] = category.name;
          return acc;
        }, {});
        const brandMap = brandRes.data.reduce((acc, brand) => {
          acc[brand._id] = brand.name;
          return acc;
        }, {});

        const updatedProducts = productRes.data.map((product) => {
          const categoryId =
            typeof product.category === "object" && product.category?._id
              ? product.category._id
              : product.category;
          const brandId =
            typeof product.brand === "object" && product.brand?._id
              ? product.brand._id
              : product.brand;

          return {
            ...product,
            mainImage:
              product.images.find((img) => img.isMain)?.url ||
              product.images[0]?.url ||
              "",
            categoryId,
            brandId,
            categoryName: categoryMap[categoryId] || "Unknown Category",
            brandName: brandMap[brandId] || "Unknown Brand",
          };
        });

        setProducts(updatedProducts || []);
        setCategories(categoryMap);
        setBrands(brandMap);
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.categoryId === categoryFilter : true) &&
      (brandFilter ? product.brandId === brandFilter : true)
  );

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
            borderRadius: "24px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            },
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #FFFFFF 70%, #F7F9F7 100%)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", md: "1rem" },
            padding: { xs: "10px 18px", md: "12px 24px" },
            backgroundColor: "#2E7D32",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#81C784",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              backgroundColor: "#FFFFFF",
              "& fieldset": { borderColor: "#81C784" },
              "&:hover fieldset": { borderColor: "#2E7D32" },
              "&.Mui-focused fieldset": { borderColor: "#2E7D32" },
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              backgroundColor: "#FFFFFF",
              "& fieldset": { borderColor: "#81C784" },
              "&:hover fieldset": { borderColor: "#2E7D32" },
              "&.Mui-focused fieldset": { borderColor: "#2E7D32" },
            },
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress size={60} sx={{ color: "#2E7D32" }} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
        <NavigationBar />

        {/* Header Section with Breadcrumbs */}
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{
            py: { xs: 4, sm: 5 },
            bgcolor: "#E8F5E9",
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ mb: { xs: 2, sm: 3 }, justifyContent: "center", display: "flex" }}
            >
              <Link to="/">
                <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", sm: "1.25rem" } }} />
                Home
              </Link>
              <Typography color="text.primary">Products</Typography>
            </Breadcrumbs>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 1.5,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              }}
            >
              Our Products
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontWeight: 400,
              }}
            >
              Discover premium agricultural products for modern farming.
            </Typography>
          </Container>
        </Box>

        {/* Filter and Search Section */}
        <Box sx={{ py: { xs: 4, sm: 5 }, bgcolor: "#FFFFFF" }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                  }}
                  sx={{ "& .MuiInputBase-input": { fontSize: { xs: "0.95rem", md: "1rem" } } }}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, fontWeight: 500 }}>
                    Category
                  </InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Category"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(categories).map(([id, name]) => (
                      <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, fontWeight: 500 }}>
                    Brand
                  </InputLabel>
                  <Select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    label="Brand"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
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
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ py: { xs: 5, sm: 7 }, flexGrow: 1 }}
        >
          <Container maxWidth="lg">
            {filteredProducts.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "text.secondary", py: 4, fontWeight: 500 }}
              >
                No products found. Try adjusting your filters!
              </Typography>
            ) : (
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {filteredProducts.map((product) => {
                  const variantPrices = product.variants.map((variant) => {
                    const latestBatch = variant.batches
                      .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
                    return latestBatch ? latestBatch.sellingPrice : Infinity;
                  });
                  const minPrice =
                    variantPrices.length > 0 ? Math.min(...variantPrices.filter((p) => p !== Infinity)) : "N/A";
                  // Assuming size is available in the first variant; adjust if needed
                  const size = product.variants[0]?.size || "N/A";

                  return (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={
                            product.mainImage
                              ? `https://agrihub-backend-xu19.onrender.com/${product.mainImage}`
                              : "https://via.placeholder.com/300x200?text=No+Image"
                          }
                          alt={product.name}
                          sx={{
                            height: { xs: 200, sm: 240, md: 280 },
                            width: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.08)" },
                          }}
                        />
                        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, textAlign: "center" }}>
                          <Typography
                            variant={isMobile ? "h6" : "h5"}
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              mb: 1,
                              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.75rem" },
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.secondary",
                              mb: 1.5,
                              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                              fontWeight: 500,
                            }}
                          >
                            Size: {size}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "primary.main",
                              fontWeight: 700,
                              mb: 2,
                              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                            }}
                          >
                            ₹{minPrice === "N/A" ? "N/A" : minPrice}
                          </Typography>
                          <Button
                            component={Link}
                            to={`/products/${product._id}`}
                            variant="contained"
                            fullWidth
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ProductPage;