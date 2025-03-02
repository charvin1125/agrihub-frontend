// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Input, message } from "antd";

// const InventoryManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [updatedStock, setUpdatedStock] = useState(0);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/product/list");
//       setProducts(response.data); // ✅ Ensure correct response data
//     } catch (error) {
//       message.error("Failed to fetch products");
//     }
//     setLoading(false);
//   };

//   const handleEditStock = (product, variant) => {
//     setSelectedProduct(product);
//     setSelectedVariant(variant);
//     setUpdatedStock(variant.stock);
//     setIsModalVisible(true);
//   };

//   const handleUpdateStock = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}/update-stock`, {
//         variantId: selectedVariant._id, // ✅ Update specific variant stock
//         stock: updatedStock
//       });
//       message.success("Stock updated successfully");
//       setIsModalVisible(false);
//       fetchProducts();
//     } catch (error) {
//       message.error("Failed to update stock");
//     }
//   };

//   const columns = [
//     { title: "Product Name", dataIndex: "name", key: "name" },
//     { 
//       title: "Category", 
//       dataIndex: "category", 
//       key: "category",
//       render: (category) => category?.name || "N/A"  // ✅ Show category name
//     },
//     { 
//       title: "Brand", 
//       dataIndex: "brand", 
//       key: "brand",
//       render: (brand) => brand?.name || "N/A" // ✅ Show brand name
//     },
//     {
//       title: "Stock",
//       key: "stock",
//       render: (_, record) => (
//         <ul>
//           {record.variants.map((variant) => (
//             <li key={variant._id}>
//               {variant.size} - <b>{variant.stock} in stock</b>
//               <Button
//                 type="primary"
//                 style={{ marginLeft: "10px" }}
//                 onClick={() => handleEditStock(record, variant)}
//               >
//                 Edit Stock
//               </Button>
//             </li>
//           ))}
//         </ul>
//       ),
//     }
//   ];
  

//   return (
//     <div>
//       <h2>Inventory Management</h2>
//       <Table dataSource={products} columns={columns} rowKey="_id" loading={loading} />

//       <Modal
//         title="Update Stock"
//         visible={isModalVisible}
//         onOk={handleUpdateStock}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <p>Update stock for {selectedProduct?.name} ({selectedVariant?.size})</p>
//         <Input
//           type="number"
//           value={updatedStock}
//           onChange={(e) => setUpdatedStock(Number(e.target.value))}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default InventoryManagement;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { 
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
//   TextField, Typography, CircularProgress 
// } from "@mui/material";

// const InventoryManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [updatedStock, setUpdatedStock] = useState(0);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // const fetchProducts = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get("http://localhost:5000/api/product/list");
//   //     setProducts(response.data || []); // ✅ Ensure response is an array
//   //   } catch (error) {
//   //     console.error("Failed to fetch products");
//   //   }
//   //   setLoading(false);
//   // };
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       // Fetch Products
//       const productRes = await axios.get("http://localhost:5000/api/product/list",{ withCredentials: true });
//       console.log("🔹 Products:", productRes.data);
  
//       // Fetch Categories
//       const categoryRes = await axios.get("http://localhost:5000/api/category/list",{ withCredentials: true });
//       console.log("🔹 Categories:", categoryRes.data);
  
//       // Fetch Brands
//       const brandRes = await axios.get("http://localhost:5000/api/vendor/list",{ withCredentials: true });
//       console.log("🔹 Brands:", brandRes.data);
  
//       // Check if data is empty
//       if (!productRes.data.length) {
//         console.warn("⚠ No products found!");
//       }
  
//       // Create category and brand mapping
//       const categories = categoryRes.data.reduce((acc, category) => {
//         acc[category._id] = category.name;
//         return acc;
//       }, {});
  
//       const brands = brandRes.data.reduce((acc, brand) => {
//         acc[brand._id] = brand.name;
//         return acc;
//       }, {});
  
//       // Map category and brand names to products
//       const updatedProducts = productRes.data.map(product => ({
//         ...product,
//         categoryName: categories[product.category] || "N/A",
//         brandName: brands[product.brand] || "N/A",
//       }));
  
//       console.log("🔹 Updated Products:", updatedProducts); // Debugging
//       setProducts(updatedProducts || []);
//     } catch (error) {
//       console.error("❌ Error fetching data:", error);
//     }
//     setLoading(false);
//   };
  

//   const handleEditStock = (product, variant) => {
//     setSelectedProduct(product);
//     setSelectedVariant(variant);
//     setUpdatedStock(variant.stock);
//     setOpen(true);
//   };

//   const handleUpdateStock = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}/update-stock`, {
//         variantId: selectedVariant._id,
//         stock: updatedStock
//       });
//       setOpen(false);
//       fetchProducts();
//     } catch (error) {
//       console.error("Failed to update stock");
//     }
//   };

//   // const columns = [
//   //   { field: "name", headerName: "Product Name", flex: 2 },
//   //   { 
//   //     field: "category", 
//   //     headerName: "Category", 
//   //     flex: 1, 
//   //     valueGetter: (params) => params.row?.category?.name || "N/A" // ✅ FIXED
//   //   },
//   //   { 
//   //     field: "brand", 
//   //     headerName: "Brand", 
//   //     flex: 1, 
//   //     valueGetter: (params) => params.row?.brand?.name || "N/A" // ✅ FIXED
//   //   },
//   //   {
//   //     field: "stock",
//   //     headerName: "Stock",
//   //     flex: 2,
//   //     sortable: false,
//   //     renderCell: (params) => {
//   //       const variants = params.row?.variants || [];  // ✅ Ensure variants exist
//   //       return (
//   //         <Box>
//   //           {variants.length > 0 ? (
//   //             variants.map((variant) => (
//   //               <Box key={variant._id} sx={{ display: "flex", gap: 1, mb: 1 }}>
//   //                 <Typography variant="body2">
//   //                   <b>{variant.size}</b>: {variant.stock} in stock
//   //                 </Typography>
//   //               </Box>
//   //             ))
//   //           ) : (
//   //             <Typography variant="body2" color="error">No variants</Typography>
//   //           )}
//   //         </Box>
//   //       );
//   //     }
//   //   }
//   // ];
//   const columns = [
//     { field: "name", headerName: "Product Name", flex: 2 },
//     { field: "categoryName", headerName: "Category", flex: 1 },
//     { field: "brandName", headerName: "Brand", flex: 1 },
//     {
//       field: "stock",
//       headerName: "Stock",
//       flex: 2,
//       sortable: false,
//       renderCell: (params) => {
//         const variants = params.row?.variants || [];
//         return (
//           <Box>
//             {variants.length > 0 ? (
//               variants.map((variant) => (
//                 <Box key={variant._id} sx={{ display: "flex", gap: 1, mb: 1 }}>
//                   <Typography variant="body2">
//                     <b>{variant.size}</b>: {variant.stock} in stock
//                   </Typography>
//                 </Box>
//               ))
//             ) : (
//               <Typography variant="body2" color="error">No variants</Typography>
//             )}
//           </Box>
//         );
//       }
//     }
//   ];
  
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Inventory Management
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <Box sx={{ height: 500, width: "100%" }}>
//           <DataGrid 
//             rows={products} 
//             columns={columns} 
//             getRowId={(row) => row._id}
//             disableSelectionOnClick 
//             pageSize={10} 
//             autoPageSize 
//           />
//         </Box>
//       )}

//       {/* Stock Update Modal */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Update Stock</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Update stock for <b>{selectedProduct?.name}</b> ({selectedVariant?.size})
//           </Typography>
//           <TextField
//             fullWidth
//             type="number"
//             margin="dense"
//             label="Stock Quantity"
//             value={updatedStock}
//             onChange={(e) => setUpdatedStock(Number(e.target.value))}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleUpdateStock}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default InventoryManagement;

//before the not Apply Mobile Responsive
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   CircularProgress,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
//   IconButton,
//   Tooltip,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import SearchIcon from "@mui/icons-material/Search";
// import Sidebar from "../components/Sidebar";
// // import "./styles/InventoryManagement.css";

// const InventoryManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editProduct, setEditProduct] = useState(null);
//   const [editVariant, setEditVariant] = useState(null);
//   const [editStock, setEditStock] = useState(0);
//   const [expanded, setExpanded] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   // Fetch products, categories, and brands
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const [productRes, categoryRes, brandRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/product/list", { withCredentials: true }),
//         axios.get("http://localhost:5000/api/category/list", { withCredentials: true }),
//         axios.get("http://localhost:5000/api/vendor/list", { withCredentials: true }),
//       ]);

//       const categories = categoryRes.data.reduce((acc, category) => {
//         acc[category._id] = category.name;
//         return acc;
//       }, {});

//       const brands = brandRes.data.reduce((acc, brand) => {
//         acc[brand._id] = brand.name;
//         return acc;
//       }, {});

//       const updatedProducts = productRes.data.map((product) => ({
//         ...product,
//         categoryName: categories[product.category] || "N/A",
//         brandName: brands[product.brand] || "N/A",
//       }));

//       setProducts(updatedProducts || []);
//       setFilteredProducts(updatedProducts || []);
//     } catch (error) {
//       console.error("❌ Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(query) ||
//         product.categoryName.toLowerCase().includes(query) ||
//         product.brandName.toLowerCase().includes(query)
//     );
//     setFilteredProducts(filtered);
//   };

//   // Handle stock edit
//   const handleEditStock = (product, variant) => {
//     setEditProduct(product);
//     setEditVariant(variant);
//     setEditStock(variant.stock);
//   };

//   // Handle stock update
//   const handleUpdateStock = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/products/${editProduct._id}/update-stock`,
//         {
//           variantId: editVariant._id,
//           stock: editStock,
//         },
//         { withCredentials: true }
//       );
//       setEditProduct(null);
//       setEditVariant(null);
//       fetchProducts();
//     } catch (error) {
//       console.error("Failed to update stock:", error);
//     }
//   };
//   const handleExport = () => {
//     const csv =
//       "Product Name,Category,Brand,Variants\n" +
//       filteredProducts
//         .map((p) =>
//           `${p.name},${p.categoryName},${p.brandName},${p.variants
//             .map((v) => `${v.size}:${v.stock}`)
//             .join(";")}`
//         )
//         .join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "inventory.csv";
//     a.click();
//   };
//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" }, // Green for AgriHub
//       secondary: { main: "#FF5722" }, // Orange accent
//       background: { default: "#F5F7FA" }, // Light gray background
//     },
//     typography: {
//       fontFamily: "'Roboto', sans-serif",
//       h4: { fontWeight: 700 },
//       body1: { fontSize: "1rem" },
//     },
//     components: {
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: "16px",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//             transition: "transform 0.3s ease",
//             "&:hover": { transform: "translateY(-5px)" },
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none", padding: "10px 20px" },
//         },
//       },
//       MuiTableCell: {
//         styleOverrides: {
//           head: { backgroundColor: "#4CAF50", color: "#fff", fontWeight: "bold" },
//           body: { padding: "14px" },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar />
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: "background.default" }}>
//           {/* Header */}
//           <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="h4" sx={{ color: "primary.main" }}>
//               Inventory Management
//             </Typography>
//             <TextField
//               variant="outlined"
//               placeholder="Search inventory..."
//               value={searchQuery}
//               onChange={handleSearch}
//               InputProps={{
//                 endAdornment: (
//                   <IconButton>
//                     <SearchIcon sx={{ color: "primary.main" }} />
//                   </IconButton>
//                 ),
//               }}
//               sx={{ width: "300px", bgcolor: "white", borderRadius: "8px" }}
//             />
//             <Button variant="outlined" color="primary" onClick={handleExport} sx={{ ml: 2 }}>
//   Export Inventory
// </Button>
//           </Box>

//           {/* Inventory List */}
//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//               <CircularProgress size={60} sx={{ color: "primary.main" }} />
//             </Box>
//           ) : filteredProducts.length === 0 ? (
//             <Box sx={{ textAlign: "center", mt: 5 }}>
//               <Typography variant="h6" color="text.secondary">
//                 No products found in inventory.
//               </Typography>
//             </Box>
//           ) : (
//             <Grid container spacing={3}>
//               {filteredProducts.map((product) => (
//                 <Grid item xs={12} key={product._id}>
//                   <Card>
//                     <CardContent>
//                       {/* Product Header */}
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Box sx={{ cursor: "pointer" }} onClick={() => setExpanded(expanded === product._id ? null : product._id)}>
//                           <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
//                           {product.name} {expanded === product._id ? "▼" : "►"}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Category: {product.categoryName} | Brand: {product.brandName}
//                           </Typography>
//                         </Box>
//                       </Box>
//                       {expanded === product._id && (
//                       /* Variants Table */
//                       <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
//                         <Table>
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>Size</TableCell>
//                               <TableCell align="right">Stock</TableCell>
//                               <TableCell align="right">Action</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {product.variants.length > 0 ? (
//                               product.variants.map((variant) => (
//                                 <TableRow key={variant._id}>
//                                   <TableCell>{variant.size}</TableCell>
//                                   <TableCell align="right">
//                                     <Chip
//                                       label={`${variant.stock} in stock`}
//                                       color={variant.stock <= 5 ? "error" : "success"}
//                                       size="small"
//                                     />
//                                   </TableCell>
//                                   <TableCell align="right">
//                                     <Tooltip title="Edit Stock">
//                                       <IconButton
//                                         color="primary"
//                                         onClick={() => handleEditStock(product, variant)}
//                                       >
//                                         <EditIcon />
//                                       </IconButton>
//                                     </Tooltip>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (
//                               <TableRow>
//                                 <TableCell colSpan={3} align="center">
//                                   <Typography variant="body2" color="error">
//                                     No variants available
//                                   </Typography>
//                                 </TableCell>
//                               </TableRow>
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}

//           {/* Stock Edit Overlay */}
//           {editProduct && (
//             <Box
//               sx={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 bgcolor: "rgba(0,0,0,0.5)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 zIndex: 1300,
//               }}
//             >
//               <Card sx={{ p: 3, width: "400px", borderRadius: "12px" }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                     Update Stock
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 2 }}>
//                     Product: <b>{editProduct.name}</b> ({editVariant.size})
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Stock Quantity"
//                     value={editStock}
//                     onChange={(e) => setEditStock(Number(e.target.value))}
//                     variant="outlined"
//                     inputProps={{ min: 0 }}
//                     sx={{ mb: 3 }}
//                   />
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleUpdateStock}
//                       fullWidth
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       onClick={() => setEditProduct(null)}
//                       fullWidth
//                     >
//                       Cancel
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           )}
//         </Box>
//       </Box>

//     </ThemeProvider>
    
//   );
// };

// export default InventoryManagement;

//after mobile resposive
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [editVariant, setEditVariant] = useState(null);
  const [editStock, setEditStock] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Fetch products, categories, and brands
  useEffect(() => {
    fetchProducts();

    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes, brandRes] = await Promise.all([
        axios.get("http://localhost:5000/api/product/list", { withCredentials: true }),
        axios.get("http://localhost:5000/api/category/list", { withCredentials: true }),
        axios.get("http://localhost:5000/api/vendor/list", { withCredentials: true }),
      ]);

      const categories = categoryRes.data.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

      const brands = brandRes.data.reduce((acc, brand) => {
        acc[brand._id] = brand.name;
        return acc;
      }, {});

      const updatedProducts = productRes.data.map((product) => ({
        ...product,
        categoryName: categories[product.category] || "N/A",
        brandName: brands[product.brand] || "N/A",
      }));

      setProducts(updatedProducts || []);
      setFilteredProducts(updatedProducts || []);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.brandName.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Handle stock edit
  const handleEditStock = (product, variant) => {
    setEditProduct(product);
    setEditVariant(variant);
    setEditStock(variant.stock);
  };

  // Handle stock update
  const handleUpdateStock = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}/update-stock`,
        {
          variantId: editVariant._id,
          stock: editStock,
        },
        { withCredentials: true }
      );
      setEditProduct(null);
      setEditVariant(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update stock:", error);
      alert("Failed to update stock");
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csv =
      "Product Name,Category,Brand,Variants\n" +
      filteredProducts
        .map((p) =>
          `${p.name},${p.categoryName},${p.brandName},${p.variants
            .map((v) => `${v.size}:${v.stock}`)
            .join(";")}`
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
  };

  // Theme toggler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // MUI Theme Configuration with Green Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#66BB6A" : "#388E3C" }, // Green shades for agriculture theme
      secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" }, // Lighter green for secondary
      background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
      text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
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
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#b0b0b0" : "#757575" },
              "&:hover fieldset": { borderColor: darkMode ? "#e0e0e0" : "#212121" },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold",
            backgroundColor: darkMode ? "#388E3C" : "#66BB6A",
            color: "#fff",
          },
          body: { padding: { xs: "8px", sm: "14px" } },
        },
      },
    },
  });

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
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            bgcolor: "background.default",
            width: { xs: "100%", sm: `calc(100% - ${sidebarOpen && !isMobile ? 260 : 70}px)` },
            transition: "width 0.3s ease",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              mb: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Inventory Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", sm: "auto" } }}>
              <TextField
                variant="outlined"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                  ),
                }}
                sx={{ width: { xs: "100%", sm: "300px" }, bgcolor: "background.paper", borderRadius: "8px" }}
                size={isMobile ? "small" : "medium"}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExport}
                sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", color: "#fff", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
              >
                Export Inventory
              </Button>
            </Box>
          </Box>

          {/* Inventory List */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
              <CircularProgress size={60} sx={{ color: "primary.main" }} />
            </Box>
          ) : filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary">
                No products found in inventory.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={isMobile ? 2 : 3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} key={product._id}>
                  <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
                    <CardContent>
                      {/* Product Header */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{ cursor: "pointer" }}
                          onClick={() => setExpanded(expanded === product._id ? null : product._id)}
                        >
                          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary" }}>
                            {product.name} {expanded === product._id ? "▼" : "►"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Category: {product.categoryName} | Brand: {product.brandName}
                          </Typography>
                        </Box>
                      </Box>
                      {expanded === product._id && (
                        <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
                          <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="variants table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {product.variants.length > 0 ? (
                                product.variants.map((variant) => (
                                  <TableRow key={variant._id} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
                                    <TableCell sx={{ color: "text.primary" }}>{variant.size}</TableCell>
                                    <TableCell align="right">
                                      <Chip
                                        label={`${variant.stock} in stock`}
                                        color={variant.stock <= 5 ? "error" : "success"}
                                        size={isMobile ? "small" : "medium"}
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      <Tooltip title="Edit Stock">
                                        <IconButton color="primary" onClick={() => handleEditStock(product, variant)}>
                                          <EditIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={3} align="center">
                                    <Typography variant="body2" color="error">
                                      No variants available
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Stock Edit Overlay */}
          {editProduct && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
              }}
            >
              <Card sx={{ p: 3, width: { xs: "90%", sm: "400px" }, borderRadius: "12px", bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
                <CardContent>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
                    Update Stock
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: "text.primary" }}>
                    Product: <b>{editProduct.name}</b> ({editVariant.size})
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    label="Stock Quantity"
                    value={editStock}
                    onChange={(e) => setEditStock(Number(e.target.value))}
                    variant="outlined"
                    inputProps={{ min: 0 }}
                    sx={{ mb: 3 }}
                    size={isMobile ? "small" : "medium"}
                  />
                  <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateStock}
                      fullWidth
                      sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditProduct(null)}
                      fullWidth
                      sx={{ borderColor: darkMode ? "#A5D6A7" : "#4CAF50", color: darkMode ? "#A5D6A7" : "#4CAF50", "&:hover": { borderColor: darkMode ? "#81C784" : "#388E3C" } }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default InventoryManagement;