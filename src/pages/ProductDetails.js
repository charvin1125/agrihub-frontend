// import { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   Rating,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Breadcrumbs,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import HomeIcon from "@mui/icons-material/Home";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [brandId, setBrandId] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Added error state
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [openReviewDialog, setOpenReviewDialog] = useState(false);
//   const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset error state
//         console.log(`Fetching product with ID: ${id}`); // Debug log
//         const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
//           withCredentials: true, // Include credentials if authentication is required
//         });
//         const productData = response.data;
//         console.log("Product data:", productData); // Debug log
//         if (!productData) throw new Error("No product data returned");
//         setProduct(productData);
//         setSelectedVariant(productData.variants[0] || null);
//         setBrandId(productData.brand || "N/A");
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setError(error.response?.data?.message || error.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 600);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [id]);

//   const addToCart = () => {
//     if (!selectedVariant || selectedVariant.stock === 0) {
//       alert("This product is out of stock or no variant selected!");
//       return;
//     }
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) => item._id === product._id && item.variantId === selectedVariant._id
//     );
//     if (existingIndex !== -1) {
//       if (cart[existingIndex].quantity < selectedVariant.stock) {
//         cart[existingIndex].quantity += 1;
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//       }
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         image: product.image,
//         price: selectedVariant.price,
//         variantId: selectedVariant._id,
//         variantSize: selectedVariant.size,
//         quantity: 1,
//         gst: selectedVariant.gst || 0,
//       });
//       alert("Product added to cart!");
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//   };

//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     return description.split(".").map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 0);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
//         reviewData,
//         { withCredentials: true }
//       );
//       alert("Review submitted successfully!");
//       setReviewData({ rating: 0, comment: "" });
//       setOpenReviewDialog(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({ ...prev, [name]: name === "rating" ? parseInt(value) : value }));
//   };

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
//             "&:hover": { transform: "translateY(-5px)", boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)" },
//             bgcolor: darkMode ? "#263238" : "#fff",
//           },
//         },
//       },
//       MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } } },
//       MuiChip: { styleOverrides: { root: { fontSize: { xs: "0.7rem", md: "0.8rem" } } } },
//       MuiBreadcrumbs: { styleOverrides: { root: { fontSize: { xs: "1rem", md: "1.2rem" } }, li: { "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } } } } },
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

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Error: {error}
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Product not found
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   const breadcrumbPath = [
//     <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
//       </Box>
//     </Link>,
//     <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       Products
//     </Link>,
//     <Typography key="product" sx={{ color: "text.primary" }}>
//       {product.name}
//     </Typography>,
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>{breadcrumbPath}</Breadcrumbs>
//         </Box>
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ maxWidth: 500, mx: "auto" }}>
//                 <CardMedia component="img" image={`https://agrihub-backend-xu19.onrender.com/${product.image}`} alt={product.name} sx={{ height: isMobile ? 250 : 400, width: "100%", objectFit: "contain", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }} />
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>{product.name}</Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>Brand ID: <strong>{brandId}</strong></Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
//                 <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>(4.5/5)</Typography>
//               </Box>
//               <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>Variants</Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//                 {product.variants.map((variant, index) => {
//                   const discount = variant.originalPrice ? Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100) : 0;
//                   const isLowStock = variant.stock > 0 && variant.stock <= 5;
//                   const isOutOfStock = variant.stock === 0;
//                   return (
//                     <Card key={index} sx={{
//                       p: 3, width: { xs: 140, md: 180 }, textAlign: "center", cursor: isOutOfStock ? "not-allowed" : "pointer",
//                       bgcolor: selectedVariant === variant ? (darkMode ? "#2E7D32" : "#A5D6A7") : (darkMode ? "#263238" : "#fff"),
//                       color: selectedVariant === variant ? "#FFF" : "text.primary", border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`, opacity: isOutOfStock ? 0.5 : 1,
//                       transition: "all 0.2s", "&:hover": { transform: isOutOfStock ? "none" : "scale(1.05)", bgcolor: selectedVariant === variant ? (darkMode ? "#388E3C" : "#4CAF50") : (darkMode ? "#2E7D32" : "#F1F8E9") },
//                     }} onClick={() => !isOutOfStock && setSelectedVariant(variant)}>
//                       {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}>{variant.size}</Typography>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", md: "1.3rem" }, color: selectedVariant === variant ? "#FFF" : "text.primary" }}>₹{variant.price}</Typography>
//                         <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary", ml: 0.5, mr: 0.5 }}>+ GST</Typography>
//                       </Box>
//                     </Card>
//                   );
//                 })}
//               </Box>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//                 <Button variant="contained" color="primary" startIcon={<ShoppingCartIcon />} onClick={addToCart} disabled={!selectedVariant || selectedVariant.stock === 0} sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}>
//                   {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                 </Button>
//                 <Button variant="outlined" color="primary" component={Link} to="/cart" sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}>Go to Cart</Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Product Description</Typography>
//               <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
//                 <List>
//                   {formatDescription(product.description).map((sentence, index) => (
//                     <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
//                       <ListItemIcon><FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} /></ListItemIcon>
//                       <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Leave a Review</Typography>
//               <Button variant="outlined" color="primary" onClick={() => setOpenReviewDialog(true)} sx={{ color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}>Submit Review</Button>
//               <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
//                 <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                   <FormControl component="fieldset" sx={{ mt: 2 }}>
//                     <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>Rating</FormLabel>
//                     <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <FormControlLabel key={value} value={value} control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />} label={value} sx={{ color: "text.secondary" }} />
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                   <TextField fullWidth label="Your Comment" multiline rows={4} name="comment" value={reviewData.comment} onChange={handleReviewChange} sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }} />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
//                   <Button onClick={handleReviewSubmit} color="primary" variant="contained" sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}>Submit</Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>© {new Date().getFullYear()} AgriHub. All rights reserved.</Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   Rating,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Breadcrumbs,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import HomeIcon from "@mui/icons-material/Home";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [openReviewDialog, setOpenReviewDialog] = useState(false);
//   const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         console.log(`Fetching product with ID: ${id}`);
//         const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
//           withCredentials: true,
//         });
//         const productData = response.data;
//         console.log("Product data:", productData);

//         if (!productData) throw new Error("No product data returned");

//         // Process product data
//         const mainImage = productData.images.find(img => img.isMain)?.url || productData.images[0]?.url || "";
//         setProduct({
//           ...productData,
//           categoryName: productData.category?.name || "Unknown Category",
//           brandName: productData.brand?.name || "Unknown Brand",
//         });
//         setSelectedVariant(productData.variants[0] || null);
//         setSelectedImage(mainImage);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setError(error.response?.data?.message || error.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [id]);

//   const addToCart = () => {
//     if (!selectedVariant || selectedVariant.stock === 0) {
//       alert("This product is out of stock or no variant selected!");
//       return;
//     }
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) => item._id === product._id && item.variantId === selectedVariant._id
//     );
//     if (existingIndex !== -1) {
//       if (cart[existingIndex].quantity < selectedVariant.stock) {
//         cart[existingIndex].quantity += 1;
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//       }
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         image: selectedImage,
//         price: selectedVariant.sellingPrice,
//         variantId: selectedVariant._id,
//         variantSize: selectedVariant.size,
//         quantity: 1,
//         gst: selectedVariant.gst || 0,
//       });
//       alert("Product added to cart!");
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//   };

//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     return description.split(".").map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 0);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
//         reviewData,
//         { withCredentials: true }
//       );
//       alert("Review submitted successfully!");
//       setReviewData({ rating: 0, comment: "" });
//       setOpenReviewDialog(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({ ...prev, [name]: name === "rating" ? parseInt(value) : value }));
//   };

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
//             "&:hover": { transform: "translateY(-5px)", boxShadow: darkMode ? "0 6px 24px rgba(255,255,255,0.2)" : "0 6px 24px rgba(0,0,0,0.15)" },
//             bgcolor: darkMode ? "#263238" : "#fff",
//           },
//         },
//       },
//       MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } } },
//       MuiChip: { styleOverrides: { root: { fontSize: { xs: "0.7rem", md: "0.8rem" } } } },
//       MuiBreadcrumbs: { styleOverrides: { root: { fontSize: { xs: "1rem", md: "1.2rem" } }, li: { "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } } } } },
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

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Error: {error}
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Product not found
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   const breadcrumbPath = [
//     <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
//       </Box>
//     </Link>,
//     <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       Products
//     </Link>,
//     <Typography key="product" sx={{ color: "text.primary" }}>
//       {product.name}
//     </Typography>,
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>{breadcrumbPath}</Breadcrumbs>
//         </Box>
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ maxWidth: 500, mx: "auto" }}>
//                 <CardMedia
//                   component="img"
//                   image={selectedImage ? `https://agrihub-backend-xu19.onrender.com/${selectedImage}` : "https://via.placeholder.com/400x400?text=No+Image"}
//                   alt={product.name}
//                   sx={{ height: isMobile ? 250 : 400, width: "100%", objectFit: "contain", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
//                 />
//                 <CardContent sx={{ p: 2 }}>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
//                     {product.images.map((img, index) => (
//                       <Box
//                         key={index}
//                         component="img"
//                         src={`https://agrihub-backend-xu19.onrender.com/${img.url}`}
//                         alt={`Thumbnail ${index}`}
//                         sx={{
//                           width: 60,
//                           height: 60,
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           border: selectedImage === img.url ? `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}` : "2px solid transparent",
//                         }}
//                         onClick={() => setSelectedImage(img.url)}
//                       />
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>{product.name}</Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
//                 {product.categoryName} | {product.brandName} | Batch: {product.batchNumber || "N/A"}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
//                 <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>(4.5/5)</Typography>
//               </Box>
//               <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>Variants</Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//                 {product.variants.map((variant, index) => {
//                   const discount = variant.discount ? Math.round((variant.costPrice - variant.sellingPrice) / variant.costPrice * 100) : 0;
//                   const isLowStock = variant.stock > 0 && variant.stock <= 5;
//                   const isOutOfStock = variant.stock === 0;
//                   return (
//                     <Card
//                       key={index}
//                       sx={{
//                         p: 3,
//                         width: { xs: 140, md: 180 },
//                         textAlign: "center",
//                         cursor: isOutOfStock ? "not-allowed" : "pointer",
//                         bgcolor: selectedVariant === variant ? (darkMode ? "#2E7D32" : "#A5D6A7") : (darkMode ? "#263238" : "#fff"),
//                         color: selectedVariant === variant ? "#FFF" : "text.primary",
//                         border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`,
//                         opacity: isOutOfStock ? 0.5 : 1,
//                         transition: "all 0.2s",
//                         "&:hover": { transform: isOutOfStock ? "none" : "scale(1.05)", bgcolor: selectedVariant === variant ? (darkMode ? "#388E3C" : "#4CAF50") : (darkMode ? "#2E7D32" : "#F1F8E9") },
//                       }}
//                       onClick={() => !isOutOfStock && setSelectedVariant(variant)}
//                     >
//                       {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}>{variant.size}</Typography>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", md: "1.3rem" }, color: selectedVariant === variant ? "#FFF" : "text.primary" }}>
//                           ₹{variant.sellingPrice}
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary", ml: 0.5, mr: 0.5 }}>
//                           + GST
//                         </Typography>
//                       </Box>
//                     </Card>
//                   );
//                 })}
//               </Box>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={addToCart}
//                   disabled={!selectedVariant || selectedVariant.stock === 0}
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   component={Link}
//                   to="/cart"
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   Go to Cart
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Product Description</Typography>
//               <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
//                 <List>
//                   {formatDescription(product.description).map((sentence, index) => (
//                     <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
//                       <ListItemIcon><FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} /></ListItemIcon>
//                       <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Leave a Review</Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => setOpenReviewDialog(true)}
//                 sx={{ color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//               >
//                 Submit Review
//               </Button>
//               <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
//                 <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                   <FormControl component="fieldset" sx={{ mt: 2 }}>
//                     <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>Rating</FormLabel>
//                     <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <FormControlLabel key={value} value={value} control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />} label={value} sx={{ color: "text.secondary" }} />
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Your Comment"
//                     multiline
//                     rows={4}
//                     name="comment"
//                     value={reviewData.comment}
//                     onChange={handleReviewChange}
//                     sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                   />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
//                   <Button
//                     onClick={handleReviewSubmit}
//                     color="primary"
//                     variant="contained"
//                     sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                   >
//                     Submit
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>© {new Date().getFullYear()} AgriHub. All rights reserved.</Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   Rating,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Breadcrumbs,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import HomeIcon from "@mui/icons-material/Home";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState(null); // New state for selected batch
//   const [selectedImage, setSelectedImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [openReviewDialog, setOpenReviewDialog] = useState(false);
//   const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
//           withCredentials: true,
//         });
//         const productData = response.data;

//         if (!productData) throw new Error("No product data returned");

//         const mainImage =
//           productData.images.find((img) => img.isMain)?.url ||
//           productData.images[0]?.url ||
//           "";
//         const processedProduct = {
//           ...productData,
//           categoryName: productData.category?.name || "Unknown Category",
//           brandName: productData.brand?.name || "Unknown Brand",
//         };

//         setProduct(processedProduct);

//         // Set the first variant and its latest batch as default
//         if (productData.variants.length > 0) {
//           const firstVariant = productData.variants[0];
//           const latestBatch = firstVariant.batches
//             .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//           setSelectedVariant(firstVariant);
//           setSelectedBatch(latestBatch || null);
//         }

//         setSelectedImage(mainImage);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setError(error.response?.data?.message || error.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [id]);

//   const addToCart = () => {
//     if (!selectedVariant || !selectedBatch || selectedBatch.stock === 0) {
//       alert("This product is out of stock or no variant/batch selected!");
//       return;
//     }
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) =>
//         item._id === product._id &&
//         item.variantId === selectedVariant._id &&
//         item.batchId === selectedBatch._id
//     );
//     if (existingIndex !== -1) {
//       if (cart[existingIndex].quantity < selectedBatch.stock) {
//         cart[existingIndex].quantity += 1;
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//       }
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         image: selectedImage,
//         price: selectedBatch.sellingPrice,
//         variantId: selectedVariant._id,
//         batchId: selectedBatch._id, // Include batch ID
//         variantSize: selectedVariant.size,
//         quantity: 1,
//         gst: selectedBatch.gst || 0,
//       });
//       alert("Product added to cart!");
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//   };

//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     return description
//       .split(".")
//       .map((sentence) => sentence.trim())
//       .filter((sentence) => sentence.length > 0);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
//         reviewData,
//         { withCredentials: true }
//       );
//       alert("Review submitted successfully!");
//       setReviewData({ rating: 0, comment: "" });
//       setOpenReviewDialog(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? parseInt(value) : value,
//     }));
//   };

//   const handleVariantSelect = (variant) => {
//     setSelectedVariant(variant);
//     const latestBatch = variant.batches
//       .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//     setSelectedBatch(latestBatch || null);
//   };

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
//           },
//         },
//       },
//       MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } } },
//       MuiChip: { styleOverrides: { root: { fontSize: { xs: "0.7rem", md: "0.8rem" } } } },
//       MuiBreadcrumbs: { styleOverrides: { root: { fontSize: { xs: "1rem", md: "1.2rem" } }, li: { "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } } } } },
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

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Error: {error}
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Product not found
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   const breadcrumbPath = [
//     <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
//       </Box>
//     </Link>,
//     <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       Products
//     </Link>,
//     <Typography key="product" sx={{ color: "text.primary" }}>
//       {product.name}
//     </Typography>,
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>{breadcrumbPath}</Breadcrumbs>
//         </Box>
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ maxWidth: 500, mx: "auto" }}>
//                 <CardMedia
//                   component="img"
//                   image={selectedImage ? `https://agrihub-backend-xu19.onrender.com/${selectedImage}` : "https://via.placeholder.com/400x400?text=No+Image"}
//                   alt={product.name}
//                   sx={{ height: isMobile ? 250 : 400, width: "100%", objectFit: "contain", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
//                 />
//                 <CardContent sx={{ p: 2 }}>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
//                     {product.images.map((img, index) => (
//                       <Box
//                         key={index}
//                         component="img"
//                         src={`https://agrihub-backend-xu19.onrender.com/${img.url}`}
//                         alt={`Thumbnail ${index}`}
//                         sx={{
//                           width: 60,
//                           height: 60,
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           border: selectedImage === img.url ? `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}` : "2px solid transparent",
//                         }}
//                         onClick={() => setSelectedImage(img.url)}
//                       />
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>{product.name}</Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
//                 {product.categoryName} | {product.brandName}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
//                 <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>(4.5/5)</Typography>
//               </Box>
//               <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>Variants</Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//                 {product.variants.map((variant, index) => {
//                   const latestBatch = variant.batches
//                     .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//                   if (!latestBatch) return null;

//                   const discount = latestBatch.discount
//                     ? Math.round((latestBatch.costPrice - latestBatch.sellingPrice) / latestBatch.costPrice * 100)
//                     : 0;
//                   const isLowStock = latestBatch.stock > 0 && latestBatch.stock <= 5;
//                   const isOutOfStock = latestBatch.stock === 0;

//                   return (
//                     <Card
//                       key={index}
//                       sx={{
//                         p: 3,
//                         width: { xs: 140, md: 180 },
//                         textAlign: "center",
//                         cursor: isOutOfStock ? "not-allowed" : "pointer",
//                         bgcolor: selectedVariant === variant ? (darkMode ? "#2E7D32" : "#A5D6A7") : (darkMode ? "#263238" : "#fff"),
//                         color: selectedVariant === variant ? "#FFF" : "text.primary",
//                         border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`,
//                         opacity: isOutOfStock ? 0.5 : 1,
//                         transition: "all 0.2s",
//                         "&:hover": {
//                           transform: isOutOfStock ? "none" : "scale(1.05)",
//                           bgcolor: selectedVariant === variant ? (darkMode ? "#388E3C" : "#4CAF50") : (darkMode ? "#2E7D32" : "#F1F8E9"),
//                         },
//                       }}
//                       onClick={() => !isOutOfStock && handleVariantSelect(variant)}
//                     >
//                       {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}>{variant.size}</Typography>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", md: "1.3rem" }, color: selectedVariant === variant ? "#FFF" : "text.primary" }}>
//                           ₹{latestBatch.sellingPrice}
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary", ml: 0.5, mr: 0.5 }}>
//                           + GST {latestBatch.gst}%
//                         </Typography>
//                       </Box>
//                       <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary" }}>
//                         Batch: {latestBatch.batchNumber}
//                       </Typography>
//                     </Card>
//                   );
//                 })}
//               </Box>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={addToCart}
//                   disabled={!selectedVariant || !selectedBatch || selectedBatch.stock === 0}
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   {selectedBatch?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   component={Link}
//                   to="/cart"
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   Go to Cart
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Product Description</Typography>
//               <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
//                 <List>
//                   {formatDescription(product.description).map((sentence, index) => (
//                     <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
//                       <ListItemIcon><FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} /></ListItemIcon>
//                       <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Leave a Review</Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => setOpenReviewDialog(true)}
//                 sx={{ color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//               >
//                 Submit Review
//               </Button>
//               <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
//                 <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                   <FormControl component="fieldset" sx={{ mt: 2 }}>
//                     <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>Rating</FormLabel>
//                     <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <FormControlLabel key={value} value={value} control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />} label={value} sx={{ color: "text.secondary" }} />
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Your Comment"
//                     multiline
//                     rows={4}
//                     name="comment"
//                     value={reviewData.comment}
//                     onChange={handleReviewChange}
//                     sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                   />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
//                   <Button
//                     onClick={handleReviewSubmit}
//                     color="primary"
//                     variant="contained"
//                     sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                   >
//                     Submit
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>© {new Date().getFullYear()} AgriHub. All rights reserved.</Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   Rating,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Breadcrumbs,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import HomeIcon from "@mui/icons-material/Home";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [openReviewDialog, setOpenReviewDialog] = useState(false);
//   const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
//           withCredentials: true,
//         });
//         const productData = response.data;

//         if (!productData) throw new Error("No product data returned");

//         const mainImage =
//           productData.images.find((img) => img.isMain)?.url ||
//           productData.images[0]?.url ||
//           "";
//         const processedProduct = {
//           ...productData,
//           categoryName: productData.category?.name || "Unknown Category",
//           brandName: productData.brand?.name || "Unknown Brand",
//         };

//         setProduct(processedProduct);

//         if (productData.variants.length > 0) {
//           const firstVariant = productData.variants[0];
//           const latestBatch = firstVariant.batches
//             .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//           setSelectedVariant(firstVariant);
//           setSelectedBatch(latestBatch || null);
//         }

//         setSelectedImage(mainImage);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setError(error.response?.data?.message || error.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [id]);

//   const addToCart = () => {
//     if (!selectedVariant || !selectedBatch || selectedBatch.stock === 0) {
//       alert("This product is out of stock or no variant/batch selected!");
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) =>
//         item.productId === product._id.toString() &&
//         item.variantId === selectedVariant._id.toString() &&
//         item.batchId === selectedBatch._id.toString()
//     );

//     if (existingIndex !== -1) {
//       if (cart[existingIndex].quantity < selectedBatch.stock) {
//         cart[existingIndex].quantity += 1;
//         cart[existingIndex].totalWithGST =
//           cart[existingIndex].price * cart[existingIndex].quantity * (1 + (selectedBatch.gst || 0) / 100);
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//         return;
//       }
//     } else {
//       const newItem = {
//         productId: product._id.toString(),
//         variantId: selectedVariant._id.toString(),
//         batchId: selectedBatch._id.toString(),
//         name: product.name,
//         size: selectedVariant.size,
//         price: selectedBatch.sellingPrice,
//         gst: selectedBatch.gst || 0,
//         stock: selectedBatch.stock,
//         quantity: 1,
//         totalWithGST: selectedBatch.sellingPrice * (1 + (selectedBatch.gst || 0) / 100),
//         image: selectedImage,
//       };
//       cart.push(newItem);
//       alert("Product added to cart!");
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     console.log("Cart updated:", JSON.stringify(cart, null, 2)); // Debug log
//   };

//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     return description
//       .split(".")
//       .map((sentence) => sentence.trim())
     

// .filter((sentence) => sentence.length > 0);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
//         reviewData,
//         { withCredentials: true }
//       );
//       alert("Review submitted successfully!");
//       setReviewData({ rating: 0, comment: "" });
//       setOpenReviewDialog(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? parseInt(value) : value,
//     }));
//   };

//   const handleVariantSelect = (variant) => {
//     setSelectedVariant(variant);
//     const latestBatch = variant.batches
//       .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//     setSelectedBatch(latestBatch || null);
//   };

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
//           },
//         },
//       },
//       MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } } },
//       MuiChip: { styleOverrides: { root: { fontSize: { xs: "0.7rem", md: "0.8rem" } } } },
//       MuiBreadcrumbs: { styleOverrides: { root: { fontSize: { xs: "1rem", md: "1.2rem" } }, li: { "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } } } } },
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

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Error: {error}
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Product not found
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   const breadcrumbPath = [
//     <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
//       </Box>
//     </Link>,
//     <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       Products
//     </Link>,
//     <Typography key="product" sx={{ color: "text.primary" }}>
//       {product.name}
//     </Typography>,
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>{breadcrumbPath}</Breadcrumbs>
//         </Box>
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ maxWidth: 500, mx: "auto" }}>
//                 <CardMedia
//                   component="img"
//                   image={selectedImage ? `https://agrihub-backend-xu19.onrender.com/${selectedImage}` : "https://via.placeholder.com/400x400?text=No+Image"}
//                   alt={product.name}
//                   sx={{ height: isMobile ? 250 : 400, width: "100%", objectFit: "contain", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
//                 />
//                 <CardContent sx={{ p: 2 }}>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
//                     {product.images.map((img, index) => (
//                       <Box
//                         key={index}
//                         component="img"
//                         src={`https://agrihub-backend-xu19.onrender.com/${img.url}`}
//                         alt={`Thumbnail ${index}`}
//                         sx={{
//                           width: 60,
//                           height: 60,
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           border: selectedImage === img.url ? `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}` : "2px solid transparent",
//                         }}
//                         onClick={() => setSelectedImage(img.url)}
//                       />
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>{product.name}</Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
//                 {product.categoryName} | {product.brandName}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
//                 <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>(4.5/5)</Typography>
//               </Box>
//               <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>Variants</Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//                 {product.variants.map((variant, index) => {
//                   const latestBatch = variant.batches
//                     .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))[0];
//                   if (!latestBatch) return null;

//                   const discount = latestBatch.discount
//                     ? Math.round((latestBatch.costPrice - latestBatch.sellingPrice) / latestBatch.costPrice * 100)
//                     : 0;
//                   const isLowStock = latestBatch.stock > 0 && latestBatch.stock <= 5;
//                   const isOutOfStock = latestBatch.stock === 0;

//                   return (
//                     <Card
//                       key={index}
//                       sx={{
//                         p: 3,
//                         width: { xs: 140, md: 180 },
//                         textAlign: "center",
//                         cursor: isOutOfStock ? "not-allowed" : "pointer",
//                         bgcolor: selectedVariant === variant ? (darkMode ? "#2E7D32" : "#A5D6A7") : (darkMode ? "#263238" : "#fff"),
//                         color: selectedVariant === variant ? "#FFF" : "text.primary",
//                         border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`,
//                         opacity: isOutOfStock ? 0.5 : 1,
//                         transition: "all 0.2s",
//                         "&:hover": {
//                           transform: isOutOfStock ? "none" : "scale(1.05)",
//                           bgcolor: selectedVariant === variant ? (darkMode ? "#388E3C" : "#4CAF50") : (darkMode ? "#2E7D32" : "#F1F8E9"),
//                         },
//                       }}
//                       onClick={() => !isOutOfStock && handleVariantSelect(variant)}
//                     >
//                       {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}>{variant.size}</Typography>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", md: "1.3rem" }, color: selectedVariant === variant ? "#FFF" : "text.primary" }}>
//                           ₹{latestBatch.sellingPrice}
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary", ml: 0.5, mr: 0.5 }}>
//                           + GST {latestBatch.gst}%
//                         </Typography>
//                       </Box>
//                       <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary" }}>
//                         Batch: {latestBatch.batchNumber}
//                       </Typography>
//                     </Card>
//                   );
//                 })}
//               </Box>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={addToCart}
//                   disabled={!selectedVariant || !selectedBatch || selectedBatch.stock === 0}
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   {selectedBatch?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   component={Link}
//                   to="/cart"
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   Go to Cart
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Product Description</Typography>
//               <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
//                 <List>
//                   {formatDescription(product.description).map((sentence, index) => (
//                     <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
//                       <ListItemIcon><FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} /></ListItemIcon>
//                       <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Leave a Review</Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => setOpenReviewDialog(true)}
//                 sx={{ color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//               >
//                 Submit Review
//               </Button>
//               <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
//                 <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                   <FormControl component="fieldset" sx={{ mt: 2 }}>
//                     <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>Rating</FormLabel>
//                     <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <FormControlLabel key={value} value={value} control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />} label={value} sx={{ color: "text.secondary" }} />
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Your Comment"
//                     multiline
//                     rows={4}
//                     name="comment"
//                     value={reviewData.comment}
//                     onChange={handleReviewChange}
//                     sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                   />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
//                   <Button
//                     onClick={handleReviewSubmit}
//                     color="primary"
//                     variant="contained"
//                     sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                   >
//                     Submit
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>© {new Date().getFullYear()} AgriHub. All rights reserved.</Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   Rating,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Breadcrumbs,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import HomeIcon from "@mui/icons-material/Home";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   const [openReviewDialog, setOpenReviewDialog] = useState(false);
//   const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
//           withCredentials: true,
//         });
//         const productData = response.data;

//         if (!productData) throw new Error("No product data returned");

//         const mainImage =
//           productData.images.find((img) => img.isMain)?.url ||
//           productData.images[0]?.url ||
//           "";
//         const processedProduct = {
//           ...productData,
//           categoryName: productData.category?.name || "Unknown Category",
//           brandName: productData.brand?.name || "Unknown Brand",
//         };

//         setProduct(processedProduct);

//         if (productData.variants.length > 0) {
//           const firstVariant = productData.variants[0];
//           const availableBatch = getLatestAvailableBatch(firstVariant.batches);
//           setSelectedVariant(firstVariant);
//           setSelectedBatch(availableBatch || null);
//         }

//         setSelectedImage(mainImage);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setError(error.response?.data?.message || error.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();

//     const handleResize = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, [id]);

//   // Helper function to get the latest batch with stock > 0
//   const getLatestAvailableBatch = (batches) => {
//     const sortedBatches = [...batches].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
//     return sortedBatches.find((batch) => batch.stock > 0) || sortedBatches[0] || null;
//   };

//   const addToCart = () => {
//     if (!selectedVariant || !selectedBatch || selectedBatch.stock === 0) {
//       alert("This product is out of stock or no variant/batch selected!");
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) =>
//         item.productId === product._id.toString() &&
//         item.variantId === selectedVariant._id.toString() &&
//         item.batchId === selectedBatch._id.toString()
//     );

//     if (existingIndex !== -1) {
//       if (cart[existingIndex].quantity < selectedBatch.stock) {
//         cart[existingIndex].quantity += 1;
//         cart[existingIndex].totalWithGST =
//           cart[existingIndex].price * cart[existingIndex].quantity * (1 + (selectedBatch.gst || 0) / 100);
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//         return;
//       }
//     } else {
//       const newItem = {
//         productId: product._id.toString(),
//         variantId: selectedVariant._id.toString(),
//         batchId: selectedBatch._id.toString(),
//         name: product.name,
//         size: selectedVariant.size,
//         price: selectedBatch.sellingPrice,
//         gst: selectedBatch.gst || 0,
//         stock: selectedBatch.stock,
//         quantity: 1,
//         totalWithGST: selectedBatch.sellingPrice * (1 + (selectedBatch.gst || 0) / 100),
//         image: selectedImage,
//       };
//       cart.push(newItem);
//       alert("Product added to cart!");
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     console.log("Cart updated:", JSON.stringify(cart, null, 2));
//   };

//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     return description
//       .split(".")
//       .map((sentence) => sentence.trim())
//       .filter((sentence) => sentence.length > 0);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
//         reviewData,
//         { withCredentials: true }
//       );
//       alert("Review submitted successfully!");
//       setReviewData({ rating: 0, comment: "" });
//       setOpenReviewDialog(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Failed to submit review. Please try again.");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({
//       ...prev,
//       [name]: name === "rating" ? parseInt(value) : value,
//     }));
//   };

//   const handleVariantSelect = (variant) => {
//     setSelectedVariant(variant);
//     const availableBatch = getLatestAvailableBatch(variant.batches);
//     setSelectedBatch(availableBatch || null);
//   };

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
//           },
//         },
//       },
//       MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontSize: { xs: "0.9rem", md: "1rem" }, py: 1, px: 2 } } },
//       MuiChip: { styleOverrides: { root: { fontSize: { xs: "0.7rem", md: "0.8rem" } } } },
//       MuiBreadcrumbs: { styleOverrides: { root: { fontSize: { xs: "1rem", md: "1.2rem" } }, li: { "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } } } } },
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

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Error: {error}
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
//         <Typography variant="h6" sx={{ color: "text.secondary" }}>
//           Product not found
//         </Typography>
//         <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2 }}>
//           Back to Products
//         </Button>
//       </Box>
//     );
//   }

//   const breadcrumbPath = [
//     <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
//       </Box>
//     </Link>,
//     <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
//       Products
//     </Link>,
//     <Typography key="product" sx={{ color: "text.primary" }}>
//       {product.name}
//     </Typography>,
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
//         <NavigationBar />
//         <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>{breadcrumbPath}</Breadcrumbs>
//         </Box>
//         <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ maxWidth: 500, mx: "auto" }}>
//                 <CardMedia
//                   component="img"
//                   image={selectedImage ? `https://agrihub-backend-xu19.onrender.com/${selectedImage}` : "https://via.placeholder.com/400x400?text=No+Image"}
//                   alt={product.name}
//                   sx={{ height: isMobile ? 250 : 400, width: "100%", objectFit: "contain", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
//                 />
//                 <CardContent sx={{ p: 2 }}>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
//                     {product.images.map((img, index) => (
//                       <Box
//                         key={index}
//                         component="img"
//                         src={`https://agrihub-backend-xu19.onrender.com/${img.url}`}
//                         alt={`Thumbnail ${index}`}
//                         sx={{
//                           width: 60,
//                           height: 60,
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           border: selectedImage === img.url ? `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}` : "2px solid transparent",
//                         }}
//                         onClick={() => setSelectedImage(img.url)}
//                       />
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>{product.name}</Typography>
//               <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
//                 {product.categoryName} | {product.brandName}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
//                 <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>(4.5/5)</Typography>
//               </Box>
//               <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>Variants</Typography>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//                 {product.variants.map((variant, index) => {
//                   const latestBatch = getLatestAvailableBatch(variant.batches);
//                   if (!latestBatch) return null;

//                   const discount = latestBatch.discount
//                     ? Math.round((latestBatch.costPrice - latestBatch.sellingPrice) / latestBatch.costPrice * 100)
//                     : 0;
//                   const isLowStock = latestBatch.stock > 0 && latestBatch.stock <= 5;
//                   const isOutOfStock = latestBatch.stock === 0;

//                   return (
//                     <Card
//                       key={index}
//                       sx={{
//                         p: 3,
//                         width: { xs: 140, md: 180 },
//                         textAlign: "center",
//                         cursor: isOutOfStock ? "not-allowed" : "pointer",
//                         bgcolor: selectedVariant === variant ? (darkMode ? "#2E7D32" : "#A5D6A7") : (darkMode ? "#263238" : "#fff"),
//                         color: selectedVariant === variant ? "#FFF" : "text.primary",
//                         border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`,
//                         opacity: isOutOfStock ? 0.5 : 1,
//                         transition: "all 0.2s",
//                         "&:hover": {
//                           transform: isOutOfStock ? "none" : "scale(1.05)",
//                           bgcolor: selectedVariant === variant ? (darkMode ? "#388E3C" : "#4CAF50") : (darkMode ? "#2E7D32" : "#F1F8E9"),
//                         },
//                       }}
//                       onClick={() => !isOutOfStock && handleVariantSelect(variant)}
//                     >
//                       {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />}
//                       <Typography variant="body2" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}>{variant.size}</Typography>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
//                         <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", md: "1.3rem" }, color: selectedVariant === variant ? "#FFF" : "text.primary" }}>
//                           ₹{latestBatch.sellingPrice}
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary", ml: 0.5, mr: 0.5 }}>
//                           + GST {latestBatch.gst}%
//                         </Typography>
//                       </Box>
//                       <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, color: selectedVariant === variant ? "#FFF" : "text.secondary" }}>
//                         Batch: {latestBatch.batchNumber} (Stock: {latestBatch.stock})
//                       </Typography>
//                     </Card>
//                   );
//                 })}
//               </Box>
//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<ShoppingCartIcon />}
//                   onClick={addToCart}
//                   disabled={!selectedVariant || !selectedBatch || selectedBatch.stock === 0}
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   {selectedBatch?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   component={Link}
//                   to="/cart"
//                   sx={{ px: { xs: 2, md: 4 }, py: { xs: 0.5, md: 1 }, color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//                 >
//                   Go to Cart
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Product Description</Typography>
//               <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
//                 <List>
//                   {formatDescription(product.description).map((sentence, index) => (
//                     <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
//                       <ListItemIcon><FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} /></ListItemIcon>
//                       <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
//               <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
//               <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}>Leave a Review</Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => setOpenReviewDialog(true)}
//                 sx={{ color: darkMode ? "#E0E0E0" : "#388E3C", borderColor: darkMode ? "#A5D6A7" : "#81C784", "&:hover": { bgcolor: darkMode ? "#2E7D32" : "#F1F8E9", borderColor: darkMode ? "#81C784" : "#4CAF50" } }}
//               >
//                 Submit Review
//               </Button>
//               <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
//                 <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
//                 <DialogContent>
//                   <FormControl component="fieldset" sx={{ mt: 2 }}>
//                     <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>Rating</FormLabel>
//                     <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <FormControlLabel key={value} value={value} control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />} label={value} sx={{ color: "text.secondary" }} />
//                       ))}
//                     </RadioGroup>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Your Comment"
//                     multiline
//                     rows={4}
//                     name="comment"
//                     value={reviewData.comment}
//                     onChange={handleReviewChange}
//                     sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
//                   />
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>Cancel</Button>
//                   <Button
//                     onClick={handleReviewSubmit}
//                     color="primary"
//                     variant="contained"
//                     sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                   >
//                     Submit
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </Grid>
//           </Grid>
//         </Box>
//         <Box sx={{ py: 4, bgcolor: darkMode ? "#1A3C34" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>© {new Date().getFullYear()} AgriHub. All rights reserved.</Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Chip,
  Divider,
  Rating,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const location = useLocation();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://agrihub-backend-xu19.onrender.com/api/product/${id}`, {
          withCredentials: true,
        });
        const productData = response.data;

        if (!productData) throw new Error("No product data returned");

        const mainImage =
          productData.images.find((img) => img.isMain)?.url ||
          productData.images[0]?.url ||
          "";
        const processedProduct = {
          ...productData,
          categoryName: productData.category?.name || "Unknown Category",
          brandName: productData.brand?.name || "Unknown Brand",
        };

        setProduct(processedProduct);

        if (productData.variants.length > 0) {
          const firstVariant = productData.variants[0];
          const availableBatch = getLatestAvailableBatch(firstVariant.batches);
          setSelectedVariant(firstVariant);
          setSelectedBatch(availableBatch || null);
        }

        setSelectedImage(mainImage);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.response?.data?.message || error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();

    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const getLatestAvailableBatch = (batches) => {
    const sortedBatches = [...batches].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    return sortedBatches.find((batch) => batch.stock > 0) || sortedBatches[0] || null;
  };

  const addToCart = () => {
    if (!selectedVariant || !selectedBatch || selectedBatch.stock === 0) {
      alert("This product is out of stock or no variant/batch selected!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product._id.toString() &&
        item.variantId === selectedVariant._id.toString() &&
        item.batchId === selectedBatch._id.toString()
    );

    if (existingIndex !== -1) {
      if (cart[existingIndex].quantity < selectedBatch.stock) {
        cart[existingIndex].quantity += 1;
        cart[existingIndex].totalWithGST =
          cart[existingIndex].price * cart[existingIndex].quantity * (1 + (selectedBatch.gst || 0) / 100);
        alert("Product quantity updated in cart!");
      } else {
        alert("Cannot add more than available stock!");
        return;
      }
    } else {
      const newItem = {
        productId: product._id.toString(),
        variantId: selectedVariant._id.toString(),
        batchId: selectedBatch._id.toString(),
        name: product.name,
        size: selectedVariant.size,
        price: selectedBatch.sellingPrice,
        gst: selectedBatch.gst || 0,
        stock: selectedBatch.stock,
        quantity: 1,
        totalWithGST: selectedBatch.sellingPrice * (1 + (selectedBatch.gst || 0) / 100),
        image: selectedImage,
      };
      cart.push(newItem);
      alert("Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); // Trigger cart update event
  };

  const formatDescription = (description) => {
    if (!description) return ["No description available."];
    return description
      .split(".")
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://agrihub-backend-xu19.onrender.com/api/review/products/${id}/product-review`,
        reviewData,
        { withCredentials: true }
      );
      alert("Review submitted successfully!");
      setReviewData({ rating: 0, comment: "" });
      setOpenReviewDialog(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    const availableBatch = getLatestAvailableBatch(variant.batches);
    setSelectedBatch(availableBatch || null);
  };

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
            borderRadius: "20px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
            },
            overflow: "hidden",
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
            "&:hover": {
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontSize: { xs: "0.75rem", md: "0.85rem" },
            fontWeight: 500,
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
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            backgroundColor: "#FFFFFF",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              "& fieldset": { borderColor: "#81C784" },
              "&:hover fieldset": { borderColor: "#2E7D32" },
              "&.Mui-focused fieldset": { borderColor: "#2E7D32" },
            },
          },
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

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
        <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Error: {error}
        </Typography>
        <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2, color: "#2E7D32", borderColor: "#81C784" }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
        <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 500 }}>
          Product not found
        </Typography>
        <Button variant="outlined" component={Link} to="/products" sx={{ mt: 2, color: "#2E7D32", borderColor: "#81C784" }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
        <NavigationBar />
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: "#FFFFFF" }}>
          <Container maxWidth="lg">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link to="/">
                <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1rem", md: "1.25rem" } }} /> Home
              </Link>
              <Link to="/products">Products</Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>
          </Container>
        </Box>
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 4, sm: 5 }, flexGrow: 1 }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={selectedImage ? `https://agrihub-backend-xu19.onrender.com/${selectedImage}` : "https://via.placeholder.com/400x400?text=No+Image"}
                  alt={product.name}
                  sx={{
                    height: { xs: 250, sm: 350, md: 450 },
                    width: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
                    {product.images.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={`https://agrihub-backend-xu19.onrender.com/${img.url}`}
                        alt={`Thumbnail ${index}`}
                        sx={{
                          width: { xs: 50, md: 70 },
                          height: { xs: 50, md: 70 },
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border: selectedImage === img.url ? "3px solid #2E7D32" : "1px solid #81C784",
                          transition: "border 0.3s ease",
                          "& calamansi:hover": { border: "3px solid #81C784" },
                        }}
                        onClick={() => setSelectedImage(img.url)}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 1.5,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                }}
              >
                {product.categoryName} | {product.brandName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly sx={{ color: "#2E7D32" }} />
                <Typography variant="body2" sx={{ ml: 1, color: "text.secondary", fontSize: { xs: "0.85rem", md: "1rem" } }}>
                  (4.5/5)
                </Typography>
              </Box>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 2,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Variants
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 }, flexWrap: "wrap", mb: 3 }}>
                {product.variants.map((variant, index) => {
                  const latestBatch = getLatestAvailableBatch(variant.batches);
                  if (!latestBatch) return null;

                  const discount = latestBatch.discount
                    ? Math.round((latestBatch.costPrice - latestBatch.sellingPrice) / latestBatch.costPrice * 100)
                    : 0;
                  const isLowStock = latestBatch.stock > 0 && latestBatch.stock <= 5;
                  const isOutOfStock = latestBatch.stock === 0;

                  return (
                    <Card
                      key={index}
                      sx={{
                        p: { xs: 2, md: 3 },
                        width: { xs: 140, md: 180 },
                        textAlign: "center",
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                        bgcolor: selectedVariant === variant ? "#E8F5E9" : "#FFFFFF",
                        border: `2px solid ${selectedVariant === variant ? "#2E7D32" : "#81C784"}`,
                        opacity: isOutOfStock ? 0.6 : 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: isOutOfStock ? "none" : "scale(1.05)",
                          bgcolor: isOutOfStock ? "#FFFFFF" : "#F1F8E9",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                      onClick={() => !isOutOfStock && handleVariantSelect(variant)}
                    >
                      {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1 }} />}
                      {isLowStock && !isOutOfStock && <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1 }} />}
                      {discount > 0 && <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1 }} />}
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
                        {variant.size}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", md: "1.3rem" }, color: "primary.main" }}>
                          ₹{latestBatch.sellingPrice}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "text.secondary", ml: 0.5 }}>
                          + GST {latestBatch.gst}%
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" }, color: "text.secondary" }}>
                        Stock: {latestBatch.stock}
                      </Typography>
                    </Card>
                  );
                })}
              </Box>
              <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 }, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                  disabled={!selectedVariant || !selectedBatch || selectedBatch.stock === 0}
                  sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#81C784" } }}
                >
                  {selectedBatch?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/cart"
                  sx={{ color: "#2E7D32", borderColor: "#81C784", "&:hover": { bgcolor: "#F1F8E9", borderColor: "#2E7D32" } }}
                >
                  Go to Cart
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: { xs: 3, md: 4 } }}>
              <Divider sx={{ my: 3, bgcolor: "rgba(0, 0, 0, 0.1)" }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                }}
              >
                Product Description
              </Typography>
              <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#FFFFFF", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                <List>
                  {formatDescription(product.description).map((sentence, index) => (
                    <ListItem key={index} sx={{ py: { xs: 0.75, md: 1 } }}>
                      <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 12, color: "#2E7D32" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={sentence}
                        primaryTypographyProps={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: "text.secondary" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: { xs: 3, md: 4 } }}>
              <Divider sx={{ my: 3, bgcolor: "rgba(0, 0, 0, 0.1)" }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                }}
              >
                Leave a Review
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenReviewDialog(true)}
                sx={{ color: "#2E7D32", borderColor: "#81C784", "&:hover": { bgcolor: "#F1F8E9", borderColor: "#2E7D32" } }}
              >
                Submit Review
              </Button>
              <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
                <DialogTitle sx={{ fontWeight: 600, color: "text.primary", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                  Submit Your Review
                </DialogTitle>
                <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
                  <FormControl component="fieldset" sx={{ mt: 1 }}>
                    <FormLabel component="legend" sx={{ color: "text.primary", mb: 1, fontWeight: 500 }}>
                      Rating
                    </FormLabel>
                    <RadioGroup name="rating" value={reviewData.rating} onChange={handleReviewChange} row>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          control={<Radio sx={{ color: "#81C784", "&.Mui-checked": { color: "#2E7D32" } }} />}
                          label={value}
                          sx={{ color: "text.secondary" }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Your Comment"
                    multiline
                    rows={4}
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    sx={{ mt: 2 }}
                  />
                </DialogContent>
                <DialogActions sx={{ p: { xs: 2, md: 3 } }}>
                  <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReviewSubmit}
                    color="primary"
                    variant="contained"
                    sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#81C784" } }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetails;