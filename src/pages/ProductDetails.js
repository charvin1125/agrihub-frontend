// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   useEffect(() => {
//     axios.get(`https://agrihub-backend.onrender.com/api/product/${id}`).then((response) => {
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
//             <img src={`https://agrihub-backend.onrender.com/${product.image}`} alt={product.name} className="img-fluid rounded shadow" />
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
//     axios.get(`https://agrihub-backend.onrender.com/api/product/${id}`).then((response) => {
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
//                 src={`https://agrihub-backend.onrender.com/${product.image}`}
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
//     axios.get(`https://agrihub-backend.onrender.com/api/product/${id}`).then(async (response) => {
//       const productData = response.data;
//       setProduct(productData);
//       setSelectedVariant(productData.variants[0]); // Default selection
      
//       // Fetch brand name
//       if (productData.brand) {
//         try {
//           const brandRes = await axios.get(`https://agrihub-backend.onrender.com/api/vendor/${productData.brand}`);
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
//                 src={`https://agrihub-backend.onrender.com/${product.image}`}
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
//     axios.get(`https://agrihub-backend.onrender.com/api/product/${id}`).then(async (response) => {
//       const productData = response.data;
//       setProduct(productData);
//       setSelectedVariant(productData.variants[0]); // Default selection
      
//       // Fetch brand name
//       if (productData.brand) {
//         try {
//           const brandRes = await axios.get(`https://agrihub-backend.onrender.com/api/vendor/${productData.brand}`);
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
//                 src={`https://agrihub-backend.onrender.com/${product.image}`}
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
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/Navbar";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // Bullet icon
import "./styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://agrihub-backend.onrender.com/api/product/${id}`);
        const productData = response.data;
        setProduct(productData);
        setSelectedVariant(productData.variants[0]); // Default to first variant

        // Fetch brand name
        if (productData.brand) {
          const brandRes = await axios.get(`https://agrihub-backend.onrender.com/api/vendor/${productData.brand}`);
          setBrandName(brandRes.data.name || "Unknown Brand");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const addToCart = () => {
    if (selectedVariant.stock === 0) {
      alert("This product is out of stock!");
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
    // Split by full stop, filter out empty strings, and trim whitespace
    return description
      .split(".")
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#1976d2" },
      secondary: { main: "#f50057" },
      background: { default: "#f4f4f4" },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
        },
      },
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 15, p: 3 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
              <CardMedia
                component="img"
                image={`https://agrihub-backend.onrender.com/${product.image}`}
                alt={product.name}
                sx={{ height: 350, objectFit: "cover", borderRadius: "12px 12px 0 0" }}
              />
            </Card>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Brand: <strong>{brandName}</strong>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (4.5/5)
              </Typography>
            </Box>

            {/* Variants */}
            <Typography variant="h6" sx={{ mb: 1 }}>
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
                      p: 2,
                      width: 140,
                      textAlign: "center",
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      bgcolor: selectedVariant === variant ? "primary.light" : "white",
                      color: selectedVariant === variant ? "white" : "text.primary",
                      opacity: isOutOfStock ? 0.5 : 1,
                      transition: "all 0.2s",
                      "&:hover": { transform: isOutOfStock ? "none" : "scale(1.05)" },
                    }}
                    onClick={() => !isOutOfStock && setSelectedVariant(variant)}
                  >
                    {isOutOfStock && <Chip label="Out of Stock" color="default" size="small" sx={{ mb: 1 }} />}
                    {isLowStock && !isOutOfStock && (
                      <Chip label="Low Stock" color="error" size="small" sx={{ mb: 1 }} />
                    )}
                    {discount > 0 && (
                      <Chip label={`${discount}% OFF`} color="warning" size="small" sx={{ mb: 1 }} />
                    )}
                    <Typography variant="body1">{variant.size}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ₹{variant.price} + GST
                    </Typography>
                  </Card>
                );
              })}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={addToCart}
                disabled={selectedVariant?.stock === 0}
                sx={{ px: 4, py: 1 }}
              >
                {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outlined" color="primary" component={Link} to="/cart" sx={{ px: 4, py: 1 }}>
                Go to Cart
              </Button>
            </Box>
          </Grid>

          {/* Description as Bullet Points */}
          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Product Description
            </Typography>
            <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: "8px" }}>
              <List>
                {formatDescription(product.description).map((sentence, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <FiberManualRecordIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                    </ListItemIcon>
                    <ListItemText primary={sentence} sx={{ color: "text.secondary" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetails;