// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Sidebar from "../components/Sidebar";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddStock = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState("");
//   const [batchNumber, setBatchNumber] = useState("");
//   const [stock, setStock] = useState("");
//   const [costPrice, setCostPrice] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [gst, setGst] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/products/list", { withCredentials: true });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast.error("Failed to load products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddStock = async () => {
//     if (!selectedProduct || !selectedVariant || !batchNumber || !stock || !costPrice || !sellingPrice || !gst) {
//       toast.warning("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.put(
//         `https://agrihub-backend-xu19.onrender.com/api/products/add-stock/${selectedProduct}`,
//         {
//           variantId: selectedVariant,
//           batch: { batchNumber, stock: parseInt(stock), costPrice: parseFloat(costPrice), sellingPrice: parseFloat(sellingPrice), gst: parseFloat(gst) },
//         },
//         { withCredentials: true }
//       );
//       toast.success("Stock added successfully!");
//       setBatchNumber("");
//       setStock("");
//       setCostPrice("");
//       setSellingPrice("");
//       setGst("");
//     } catch (error) {
//       console.error("Error adding stock:", error);
//       toast.error("Failed to add stock");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#E0E0E0" : "#212121", secondary: darkMode ? "#B0B0B0" : "#757575" },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
//         <Box sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
//             Add Stock
//           </Typography>
//           <Card>
//             <CardContent>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Select Product</InputLabel>
//                 <Select
//                   value={selectedProduct}
//                   onChange={(e) => setSelectedProduct(e.target.value)}
//                   label="Select Product"
//                 >
//                   {products.map((product) => (
//                     <MenuItem key={product._id} value={product._id}>
//                       {product.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {selectedProduct && (
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Select Variant</InputLabel>
//                   <Select
//                     value={selectedVariant}
//                     onChange={(e) => setSelectedVariant(e.target.value)}
//                     label="Select Variant"
//                   >
//                     {products
//                       .find((p) => p._id === selectedProduct)
//                       ?.variants.map((variant) => (
//                         <MenuItem key={variant._id} value={variant._id}>
//                           {variant.size}
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//               )}

//               {selectedVariant && (
//                 <>
//                   <TextField
//                     label="Batch Number"
//                     value={batchNumber}
//                     onChange={(e) => setBatchNumber(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                   <TextField
//                     label="Stock Quantity"
//                     type="number"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                   <TextField
//                     label="Cost Price"
//                     type="number"
//                     value={costPrice}
//                     onChange={(e) => setCostPrice(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                   <TextField
//                     label="Selling Price"
//                     type="number"
//                     value={sellingPrice}
//                     onChange={(e) => setSellingPrice(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                   <TextField
//                     label="GST (%)"
//                     type="number"
//                     value={gst}
//                     onChange={(e) => setGst(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddStock}
//                     disabled={loading}
//                   >
//                     {loading ? <CircularProgress size={24} /> : "Add Stock"}
//                   </Button>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AddStock;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

const AddStock = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [batch, setBatch] = useState({
    batchNumber: "",
    costPrice: "",
    sellingPrice: "",
    discount: 0,
    stock: 0,
    gst: "",
  });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/me", { withCredentials: true });
        if (res.data && res.data.isAdmin) {
          setUser(res.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };
    fetchUser();

    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get("https://agrihub-backend-xu19.onrender.com/api/product/list", { withCredentials: true });
          setProducts(res.data || []);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    setSelectedVariant(""); // Reset variant when product changes
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleBatchChange = (e) => {
    const { name, value } = e.target;
    setBatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !selectedVariant || !batch.batchNumber || !batch.costPrice || !batch.sellingPrice || !batch.stock || !batch.gst) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.put(
        `https://agrihub-backend-xu19.onrender.com/api/product/${selectedProduct}/add-stock`,
        {
          variantId: selectedVariant,
          batch: {
            batchNumber: batch.batchNumber,
            costPrice: Number(batch.costPrice),
            sellingPrice: Number(batch.sellingPrice),
            discount: Number(batch.discount),
            stock: Number(batch.stock),
            gst: Number(batch.gst),
          },
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Stock added successfully!");
        setBatch({
          batchNumber: "",
          costPrice: "",
          sellingPrice: "",
          discount: 0,
          stock: 0,
          gst: "",
        });
        setSelectedProduct("");
        setSelectedVariant("");
      } else {
        alert(response.data.message || "Failed to add stock");
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) return null;

  const selectedProductData = products.find((p) => p._id === selectedProduct);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobile={isMobile}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Add Stock
            </Typography>
          </Box>

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Product</InputLabel>
                      <Select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        label="Product"
                        required
                      >
                        <MenuItem value="">Select Product</MenuItem>
                        {products.map((product) => (
                          <MenuItem key={product._id} value={product._id}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!selectedProduct}>
                      <InputLabel>Variant</InputLabel>
                      <Select
                        value={selectedVariant}
                        onChange={handleVariantChange}
                        label="Variant"
                        required
                      >
                        <MenuItem value="">Select Variant</MenuItem>
                        {selectedProductData?.variants.map((variant) => (
                          <MenuItem key={variant._id} value={variant._id}>
                            {variant.size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      Batch Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Batch Number"
                          name="batchNumber"
                          value={batch.batchNumber}
                          onChange={handleBatchChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Cost Price"
                          type="number"
                          name="costPrice"
                          value={batch.costPrice}
                          onChange={handleBatchChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Selling Price"
                          type="number"
                          name="sellingPrice"
                          value={batch.sellingPrice}
                          onChange={handleBatchChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Discount (%)"
                          type="number"
                          name="discount"
                          value={batch.discount}
                          onChange={handleBatchChange}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Stock"
                          type="number"
                          name="stock"
                          value={batch.stock}
                          onChange={handleBatchChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="GST (%)"
                          type="number"
                          name="gst"
                          value={batch.gst}
                          onChange={handleBatchChange}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddIcon />}
                    >
                      Add Stock
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AddStock;