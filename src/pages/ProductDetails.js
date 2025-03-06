// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`).then((response) => {
//       setProduct(response.data);
//       setSelectedVariant(response.data.variants[0]);
//     });
//   }, [id]);

//   const addToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push({ ...product, price: selectedVariant.price, quantity: 1 });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");
//   };

//   return (
//     <div className="container mt-5">
//       {product ? (
//         <div className="row">
//           <div className="col-md-6">
//             <img src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`} alt={product.name} className="img-fluid rounded shadow" />
//           </div>
//           <div className="col-md-6">
//             <h2>{product.name}</h2>
//             <p className="text-muted">{product.description}</p>
//             <h4>${selectedVariant?.price}</h4>
//             <label>Choose Variant:</label>
//             <select className="form-select mb-3" onChange={(e) => setSelectedVariant(JSON.parse(e.target.value))}>
//               {product.variants.map((variant, index) => (
//                 <option key={index} value={JSON.stringify(variant)}>
//                   {variant.size} - ${variant.price}
//                 </option>
//               ))}
//             </select>
//             <button className="btn btn-primary me-2" onClick={addToCart}>Add to Cart</button>
//             <Link to="/cart" className="btn btn-success">Go to Cart</Link>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center">Loading product details...</p>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav } from "react-bootstrap";
// import { FaShoppingCart } from "react-icons/fa";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`).then((response) => {
//       setProduct(response.data);
//       setSelectedVariant(response.data.variants[0]); // Default selection
//     });
//   }, [id]);

//   const addToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push({ ...product, price: selectedVariant.price, quantity: 1 });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");
//   };

//   return (
//     <>
//       {/* ✅ Navigation Bar */}
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand as={Link} to="/">AgriHub</Navbar.Brand>
//         <Nav className="ms-auto">
//           <Nav.Link as={Link} to="/cart" className="text-white">
//             <FaShoppingCart size={22} /> Cart
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       <div className="container mt-4">
//         {product ? (
//           <div className="row">
//             {/* ✅ Left Side: Product Image */}
//             <div className="col-md-6 text-center">
//               <img
//                 src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 className="img-fluid rounded shadow"
//                 style={{ maxHeight: "350px" }}
//               />
//             </div>

//             {/* ✅ Right Side: Product Details */}
//             <div className="col-md-6">
//               <h2>{product.name}</h2>
//               <p className="text-muted">Vendor: <strong>{product.brand}</strong></p>

//               {/* ✅ Reviews Section (Placeholder for future updates) */}
//               <p className="text-warning">⭐⭐⭐⭐☆ (4.5/5)</p>

//               {/* ✅ Variant Selection Cards */}
//               <h5 className="mt-3">Variants</h5>
//               <div className="d-flex gap-3 flex-wrap">
//                 {product.variants.map((variant, index) => {
//                   const discount = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
//                   return (
//                     <div
//                       key={index}
//                       className={`p-3 border rounded text-center shadow-sm ${selectedVariant === variant ? "bg-success text-white" : "bg-white"}`}
//                       style={{ cursor: "pointer", minWidth: "120px" }}
//                       onClick={() => setSelectedVariant(variant)}
//                     >
//                       <div className="badge bg-warning text-dark mb-2">{variant.discount}% OFF</div>
//                       <h6>{variant.size}</h6>
//                       <h5 className="fw-bold">₹{variant.price}</h5>
//                       {/* <s className="text-muted">₹{variant.originalPrice}</s> */}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* ✅ Buttons */}
//               <button className="btn btn-primary mt-3 me-2" onClick={addToCart}>
//                 Add to Cart
//               </button>
//               <Link to="/cart" className="btn btn-success mt-3">
//                 Go to Cart
//               </Link>
//             </div>

//             {/* ✅ Below Image: Product Description */}
//             <div className="col-12 mt-4">
//               <h4>Product Description</h4>
//               <p className="text-muted">{product.description}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center">Loading product details...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav } from "react-bootstrap";
// import { FaShoppingCart } from "react-icons/fa";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [brandName, setBrandName] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`).then(async (response) => {
//       const productData = response.data;
//       setProduct(productData);
//       setSelectedVariant(productData.variants[0]); // Default selection
      
//       // Fetch brand name
//       if (productData.brand) {
//         try {
//           const brandRes = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/vendor/${productData.brand}`);
//           setBrandName(brandRes.data.name);
//         } catch (error) {
//           console.error("Error fetching brand name:", error);
//         }
//       }
//     });
//   }, [id]);

//   const addToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push({ ...product, price: selectedVariant.price, quantity: 1 });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");
//   };

//   return (
//     <>
//       <Navbar bg="success" variant="dark" expand="lg" className="px-3">
//         <Navbar.Brand as={Link} to="/">AgriHub</Navbar.Brand>
//         <Nav className="ms-auto">
//           <Nav.Link as={Link} to="/cart" className="text-white">
//             <FaShoppingCart size={22} /> Cart
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       <div className="container mt-4">
//         {product ? (
//           <div className="row">
//             <div className="col-md-6 text-center">
//               <img
//                 src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 className="img-fluid rounded shadow"
//                 style={{ maxHeight: "350px" }}
//               />
//             </div>

//             <div className="col-md-6">
//               <h2>{product.name}</h2>
//               <p className="text-muted">Vendor: <strong>{brandName}</strong></p>
//               <p className="text-warning">⭐⭐⭐⭐☆ (4.5/5)</p>

//               <h5 className="mt-3">Variants</h5>
//               <div className="d-flex gap-3 flex-wrap">
//                 {product.variants.map((variant, index) => {
//                   const discount = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
//                   const isLowStock = variant.stock > 0 && variant.stock <= 5;
//                   return (
//                     <div
//                       key={index}
//                       className={`p-3 border rounded text-center shadow-sm ${selectedVariant === variant ? "bg-success text-white" : "bg-white"}`}
//                       style={{ cursor: "pointer", minWidth: "120px" }}
//                       onClick={() => setSelectedVariant(variant)}
//                     >
//                       {isLowStock && <div className="badge bg-danger mb-2">Only Few Stock Available!</div>}<br></br>
//                       <div className="badge bg-warning text-dark mb-2">{variant.discount}% OFF</div>
//                       <h6>{variant.size}</h6>
//                       <h5 className="fw-bold">₹{variant.price} + GST</h5>
//                     </div>
//                   );
//                 })}
//               </div>

//               <button className="btn btn-primary mt-3 me-2" onClick={addToCart}>
//                 Add to Cart
//               </button>
//               <Link to="/cart" className="btn btn-success mt-3">
//                 Go to Cart
//               </Link>
//             </div>

//             <div className="col-12 mt-4">
//               <h4>Product Description</h4>
//               <p className="text-muted">{product.description}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center">Loading product details...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavigationBar from "../components/Navbar";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [brandName, setBrandName] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`).then(async (response) => {
//       const productData = response.data;
//       setProduct(productData);
//       setSelectedVariant(productData.variants[0]); // Default selection
      
//       // Fetch brand name
//       if (productData.brand) {
//         try {
//           const brandRes = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/vendor/${productData.brand}`);
//           setBrandName(brandRes.data.name);
//         } catch (error) {
//           console.error("Error fetching brand name:", error);
//         }
//       }
//     });
//   }, [id]);

//   const addToCart = () => {
//     if (selectedVariant.stock === 0) {
//       alert("This product is out of stock!");
//       return;
//     }
  
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
//     // Check if product variant is already in cart
//     const existingIndex = cart.findIndex(
//       (item) => item._id === product._id && item.variantId === selectedVariant._id
//     );
  
//     if (existingIndex !== -1) {
//       // If product is already in cart, increase quantity
//       if (cart[existingIndex].quantity < selectedVariant.stock) {
//         cart[existingIndex].quantity += 1;
//         alert("Product quantity updated in cart!");
//       } else {
//         alert("Cannot add more than available stock!");
//       }
//     } else {
//       // Otherwise, add a new item
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
  
//   return (
//     <>
     

//      <div className="container mt-15" style={{ marginTop: "100px" }}>
//       <NavigationBar/>
//         {product ? (
//           <div className="row">
//             <div className="col-md-6 text-center">
//               <img
//                 src={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 className="img-fluid rounded shadow"
//                 style={{ maxHeight: "350px" }}
//               />
//             </div>

//             <div className="col-md-6">
//               <h2>{product.name}</h2>
//               {/* <p className="text-muted">Vendor: <strong>{product.brandName}</strong></p> */}
//               <p className="text-warning">⭐⭐⭐⭐☆ (4.5/5)</p>

//               <h5 className="mt-3">Variants</h5>
//               <div className="d-flex gap-3 flex-wrap">
//                 {product.variants.map((variant, index) => {
//                   const discount = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
//                   const isLowStock = variant.stock > 0 && variant.stock <= 5;
//                   const isOutOfStock = variant.stock === 0;
//                   return (
//                     <div
//                       key={index}
//                       className={`p-3 border rounded text-center shadow-sm ${selectedVariant === variant ? "bg-success text-white" : "bg-white"}`}
//                       style={{ cursor: isOutOfStock ? "not-allowed" : "pointer", minWidth: "120px", opacity: isOutOfStock ? 0.5 : 1 }}
//                       onClick={() => !isOutOfStock && setSelectedVariant(variant)}
//                     >
//                       {isOutOfStock && <div className="badge bg-dark mb-2">Out of Stock</div>}
//                       {isLowStock && !isOutOfStock && <div className="badge bg-danger mb-2">Only Few Stock Available!</div>}<br></br>
//                       <div className="badge bg-warning text-dark mb-2">{variant.discount}% OFF</div>
//                       <h6>{variant.size}</h6>
//                       <h5 className="fw-bold">₹{variant.price} + GST</h5>
//                     </div>
//                   );
//                 })}
//               </div>

//               <button className="btn btn-primary mt-3 me-2" onClick={addToCart} disabled={selectedVariant?.stock === 0}>
//                 {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//               </button>
//               <Link to="/cart" className="btn btn-success mt-3">
//                 Go to Cart
//               </Link>
//             </div>

//             <div className="col-12 mt-4">
//               <h4>Product Description</h4>
//               <p className="text-muted">{product.description}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center">Loading product details...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
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
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // Bullet icon
// import "./styles/ProductDetails.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [brandName, setBrandName] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`);
//         const productData = response.data;
//         setProduct(productData);
//         setSelectedVariant(productData.variants[0]); // Default to first variant

//         // Fetch brand name
//         if (productData.brand) {
//           const brandRes = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/vendor/${productData.brand}`);
//           setBrandName(brandRes.data.name || "Unknown Brand");
//         }
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();
//   }, [id]);

//   const addToCart = () => {
//     if (selectedVariant.stock === 0) {
//       alert("This product is out of stock!");
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

//   // Function to split description into bullet points
//   const formatDescription = (description) => {
//     if (!description) return ["No description available."];
//     // Split by full stop, filter out empty strings, and trim whitespace
//     return description
//       .split(".")
//       .map((sentence) => sentence.trim())
//       .filter((sentence) => sentence.length > 0);
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#1976d2" },
//       secondary: { main: "#f50057" },
//       background: { default: "#f4f4f4" },
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5 }}>
//         <Typography variant="h6">Product not found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <NavigationBar />
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 15, p: 3 }}>
//         <Grid container spacing={4}>
//           {/* Product Image */}
//           <Grid item xs={12} md={6}>
//             <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
//               <CardMedia
//                 component="img"
//                 image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
//                 alt={product.name}
//                 sx={{ height: 350, objectFit: "cover", borderRadius: "12px 12px 0 0" }}
//               />
//             </Card>
//           </Grid>

//           {/* Product Details */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
//               {product.name}
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
//               Brand: <strong>{brandName}</strong>
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <Rating value={4.5} precision={0.5} readOnly />
//               <Typography variant="body2" sx={{ ml: 1 }}>
//                 (4.5/5)
//               </Typography>
//             </Box>

//             {/* Variants */}
//             <Typography variant="h6" sx={{ mb: 1 }}>
//               Variants
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
//               {product.variants.map((variant, index) => {
//                 const discount = variant.originalPrice
//                   ? Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100)
//                   : 0;
//                 const isLowStock = variant.stock > 0 && variant.stock <= 5;
//                 const isOutOfStock = variant.stock === 0;

//                 return (
//                   <Card
//                     key={index}
//                     sx={{
//                       p: 2,
//                       width: 140,
//                       textAlign: "center",
//                       cursor: isOutOfStock ? "not-allowed" : "pointer",
//                       bgcolor: selectedVariant === variant ? "primary.light" : "white",
//                       color: selectedVariant === variant ? "white" : "text.primary",
//                       opacity: isOutOfStock ? 0.5 : 1,
//                       transition: "all 0.2s",
//                       "&:hover": { transform: isOutOfStock ? "none" : "scale(1.05)" },
//                     }}
//                     onClick={() => !isOutOfStock && setSelectedVariant(variant)}
//                   >
//                     {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1 }} />}
//                     {isLowStock && !isOutOfStock && (
//                       <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1 }} />
//                     )}
//                     {discount > 0 && (
//                       <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1 }} />
//                     )}
//                     <Typography variant="body1">{variant.size}</Typography>
//                     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                       ₹{variant.price} + GST
//                     </Typography>
//                   </Card>
//                 );
//               })}
//             </Box>

//             {/* Buttons */}
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<ShoppingCartIcon />}
//                 onClick={addToCart}
//                 disabled={selectedVariant?.stock === 0}
//                 sx={{ px: 4, py: 1 }}
//               >
//                 {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
//               </Button>
//               <Button variant="outlined" color="primary" component={Link} to="/cart" sx={{ px: 4, py: 1 }}>
//                 Go to Cart
//               </Button>
//             </Box>
//           </Grid>

//           {/* Description as Bullet Points */}
//           <Grid item xs={12}>
//             <Divider sx={{ my: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//               Product Description
//             </Typography>
//             <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: "8px" }}>
//               <List>
//                 {formatDescription(product.description).map((sentence, index) => (
//                   <ListItem key={index} sx={{ py: 0.5 }}>
//                     <ListItemIcon>
//                       <FiberManualRecordIcon sx={{ fontSize: 12, color: "text.secondary" }} />
//                     </ListItemIcon>
//                     <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ProductDetails;
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; // Added useLocation for breadcrumbs
import axios from "axios";
import NavigationBar from "../components/Navbar"; // Updated NavigationBar
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
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
import { motion } from "framer-motion"; // Install: npm install framer-motion
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // Bullet icon
import HomeIcon from "@mui/icons-material/Home"; // For breadcrumbs

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brandId, setBrandId] = useState(""); // Store brand ID instead of name
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const location = useLocation(); // For breadcrumbs

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://agrihub-backend-tz4v.onrender.com/api/product/${id}`);
        const productData = response.data;
        setProduct(productData);
        setSelectedVariant(productData.variants[0] || null); // Default to first variant or null if none

        // Fetch brand ID (no name, just ID for simplicity)
        if (productData.brand) {
          setBrandId(productData.brand); // Store only the brand ID
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();

    // Handle window resize for mobile detection
    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const addToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) {
      alert("This product is out of stock or no variant selected!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) => item._id === product._id && item.variantId === selectedVariant._id
    );

    if (existingIndex !== -1) {
      if (cart[existingIndex].quantity < selectedVariant.stock) {
        cart[existingIndex].quantity += 1;
        alert("Product quantity updated in cart!");
      } else {
        alert("Cannot add more than available stock!");
      }
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: selectedVariant.price,
        variantId: selectedVariant._id,
        variantSize: selectedVariant.size,
        quantity: 1,
        gst: selectedVariant.gst || 0,
      });
      alert("Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Function to split description into bullet points
  const formatDescription = (description) => {
    if (!description) return ["No description available."];
    return description
      .split(".")
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  };

  // Handle review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://agrihub-backend-tz4v.onrender.com/api/product/${id}/review`,
        {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
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

  // Handle review input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: name === "rating" ? parseInt(value) : value }));
  };

  // Theme configuration with green agriculture palette
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
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontSize: { xs: "0.9rem", md: "1rem" },
            py: 1,
            px: 2,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontSize: { xs: "0.7rem", md: "0.8rem" },
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            fontSize: { xs: "1rem", md: "1.2rem" }, // Increased size
          },
          li: {
            "& .MuiTypography-root": { fontSize: { xs: "1rem", md: "1.2rem" } }, // Increased text size
          },
        },
      },
    },
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.default" }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Product not found
        </Typography>
      </Box>
    );
  }

  // Generate breadcrumbs
  const breadcrumbPath = [
    <Link key="home" to="/" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <HomeIcon sx={{ mr: 0.5, fontSize: { xs: "1.2rem", md: "1.5rem" } }} /> Home
      </Box>
    </Link>,
    <Link key="products" to="/products" style={{ color: darkMode ? "#A5D6A7" : "#388E3C", textDecoration: "none" }}>
      Products
    </Link>,
    <Typography key="product" sx={{ color: "text.primary" }}>
      {product.name}
    </Typography>,
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <NavigationBar />

        {/* Breadcrumbs with Increased Size and Margin Top */}
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", mt: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
            {breadcrumbPath}
          </Breadcrumbs>
        </Box>

        {/* Product Details Section */}
        <Box
          component={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, sm: 4 } }}
        >
          <Grid container spacing={4}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 500, mx: "auto" }}>
                <CardMedia
                  component="img"
                  image={`https://agrihub-backend-tz4v.onrender.com/${product.image}`}
                  alt={product.name}
                  sx={{
                    height: isMobile ? 250 : 400, // Reduced on mobile for better fit
                    width: "100%",
                    objectFit: "contain", // Ensures full image visibility without cropping
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
              </Card>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Brand ID: <strong>{brandId || "N/A"}</strong>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly sx={{ color: darkMode ? "#81C784" : "#388E3C" }} />
                <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
                  (4.5/5)
                </Typography>
              </Box>

              {/* Variants */}
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
              >
                Variants
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                {product.variants.map((variant, index) => {
                  const discount = variant.originalPrice
                    ? Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100)
                    : 0;
                  const isLowStock = variant.stock > 0 && variant.stock <= 5;
                  const isOutOfStock = variant.stock === 0;

                  return (
                    <Card
                      key={index}
                      sx={{
                        p: 3, // Increased padding for larger size
                        width: { xs: 140, md: 180 }, // Increased size (140px mobile, 180px desktop)
                        textAlign: "center",
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                        bgcolor: selectedVariant === variant
                          ? darkMode ? "#2E7D32" : "#A5D6A7" // Selected: Dark green (dark mode), Light green (light mode)
                          : darkMode ? "#263238" : "#fff", // Default: Dark gray (dark mode), White (light mode)
                        color: selectedVariant === variant ? "#FFF" : "text.primary",
                        border: `2px solid ${darkMode ? "#66BB6A" : "#388E3C"}`, // Green border for all
                        opacity: isOutOfStock ? 0.5 : 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          transform: isOutOfStock ? "none" : "scale(1.05)",
                          bgcolor: selectedVariant === variant
                            ? darkMode ? "#388E3C" : "#4CAF50" // Hover: Darker green (dark), Bright green (light)
                            : darkMode ? "#2E7D32" : "#F1F8E9", // Default hover: Medium green (dark), Light green (light)
                        },
                      }}
                      onClick={() => !isOutOfStock && setSelectedVariant(variant)}
                    >
                      {isOutOfStock && (
                        <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />
                      )}
                      {isLowStock && !isOutOfStock && (
                        <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1, fontSize: "0.7rem" }} />
                      )}
                      {discount > 0 && (
                        <Chip
                          label={`${discount}% OFF`}
                          color="warning"
                          size="small"
                          sx={{ mb: 1, fontSize: "0.7rem" }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" }, mb: 1 }}
                      >
                        {variant.size}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1.1rem", md: "1.3rem" },
                            color: selectedVariant === variant ? "#FFF" : "text.primary",
                          }}
                        >
                          ₹{variant.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: { xs: "0.6rem", md: "0.7rem" }, // Decreased size of + GST label
                            color: selectedVariant === variant ? "#FFF" : "text.secondary",
                            ml: 0.5,
                            mr: 0.5, // Added margin to ensure visibility
                          }}
                        >
                          + GST
                        </Typography>
                      </Box>
                    </Card>
                  );
                })}
              </Box>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                  disabled={!selectedVariant || selectedVariant.stock === 0}
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: { xs: 0.5, md: 1 },
                    bgcolor: darkMode ? "#66BB6A" : "#388E3C",
                    "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
                  }}
                >
                  {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/cart"
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: { xs: 0.5, md: 1 },
                    color: darkMode ? "#E0E0E0" : "#388E3C",
                    borderColor: darkMode ? "#A5D6A7" : "#81C784",
                    "&:hover": {
                      bgcolor: darkMode ? "#2E7D32" : "#F1F8E9",
                      borderColor: darkMode ? "#81C784" : "#4CAF50",
                    },
                  }}
                >
                  Go to Cart
                </Button>
              </Box>
            </Grid>

            {/* Description as Bullet Points */}
            <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
              <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
              >
                Product Description
              </Typography>
              <Box sx={{ p: 2, bgcolor: darkMode ? "#263238" : "#F9F9F9", borderRadius: "12px" }}>
                <List>
                  {formatDescription(product.description).map((sentence, index) => (
                    <ListItem key={index} sx={{ py: { xs: 0.5, md: 1 } }}>
                      <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 12, color: darkMode ? "#A5D6A7" : "#388E3C" }} />
                      </ListItemIcon>
                      <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>

            {/* Product Review Form */}
            <Grid item xs={12} sx={{ mt: { xs: 2, md: 4 } }}>
              <Divider sx={{ my: 3, bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
              >
                Leave a Review
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenReviewDialog(true)}
                sx={{
                  color: darkMode ? "#E0E0E0" : "#388E3C",
                  borderColor: darkMode ? "#A5D6A7" : "#81C784",
                  "&:hover": {
                    bgcolor: darkMode ? "#2E7D32" : "#F1F8E9",
                    borderColor: darkMode ? "#81C784" : "#4CAF50",
                  },
                }}
              >
                Submit Review
              </Button>

              {/* Review Dialog */}
              <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
                <DialogTitle sx={{ color: "text.primary" }}>Submit Your Review</DialogTitle>
                <DialogContent>
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend" sx={{ color: "text.primary", mb: 1 }}>
                      Rating
                    </FormLabel>
                    <RadioGroup
                      name="rating"
                      value={reviewData.rating}
                      onChange={handleReviewChange}
                      row
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          control={<Radio sx={{ color: darkMode ? "#A5D6A7" : "#388E3C" }} />}
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
                    sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: darkMode ? "#E8F5E9" : "#F1F8E9" } }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenReviewDialog(false)} sx={{ color: "text.secondary" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReviewSubmit}
                    color="primary"
                    variant="contained"
                    sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
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

export default ProductDetails;