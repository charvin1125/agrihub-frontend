
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Assuming Sidebar component exists
// import "./styles/manageproduct.css";

// const ManageProducts = () => {
//   const [vendors, setVendors] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     vendor: "",
//     category: "",
//     description: "",
//     type: "",
//     variants: "",
//     image: null,
//   });

//   useEffect(() => {
//     fetchVendors();
//     fetchCategory();
//     fetchProducts();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/vendor/list");
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//       alert("Failed to fetch vendors.");
//     }
//   };

//   const fetchCategory = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/category/list");
//       setCategory(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       alert("Failed to fetch categories.");
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/product/list");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to fetch products.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setProduct({ ...product, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(product).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       if (editingProductId) {
//         await axios.put(`http://localhost:5000/api/product/update/${editingProductId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product updated successfully!");
//       } else {
//         await axios.post("http://localhost:5000/api/product/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Product added successfully!");
//       }

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
//       image: null,
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
//       <Sidebar />
//       <div className="main-content">
//         <h2>Manage Products</h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <select name="vendor" value={product.vendor} onChange={handleChange} required>
//             <option value="">Select Vendor</option>
//             {vendors.map((vendor) => (
//               <option key={vendor._id} value={vendor._id}>
//                 {vendor.name}
//               </option>
//             ))}
//           </select>

//           <select name="category" value={product.category} onChange={handleChange} required>
//             <option value="">Select Category</option>
//             {category.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
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
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod) => (
//               <tr key={prod._id}>
//                 <td>{prod.name}</td>
//                 <td>{prod.price}</td>
//                 <td>{prod.quantity}</td>
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
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/product/list", { withCredentials: true });
//       setProducts(res.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/product/delete/${id}`, { withCredentials: true });
//         setProducts(products.filter((product) => product._id !== id));
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
//         <Link to="/add-product" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
//           + Add New Product
//         </Link>
//         <table className="w-full border-collapse border border-gray-300 mt-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Image</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Category</th>
//               <th className="border p-2">Brand</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr key={product._id} className="border">
//                   <td className="border p-2 text-center">
//                     <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="h-12 w-12 object-cover" />
//                   </td>
//                   <td className="border p-2">{product.name}</td>
//                   <td className="border p-2">{product.category?.name || "N/A"}</td>
//                   <td className="border p-2">{product.brand?.name || "N/A"}</td>
//                   <td className="border p-2">
//                     <Link to={`/edit-product/${product._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
//                       Edit
//                     </Link>
//                     <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-4">No products found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/product/list", { withCredentials: true });
//       setProducts(res.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/product/delete/${id}`, { withCredentials: true });
//         setProducts(products.filter((product) => product._id !== id));
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <Typography variant="h4" gutterBottom>Manage Products</Typography>
//         <Button variant="contained" color="primary" component={Link} to="/add-product" sx={{ mb: 2 }}>
//           + Add New Product
//         </Button>
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Image</b></TableCell>
//                 <TableCell><b>Name</b></TableCell>
//                 <TableCell><b>Category</b></TableCell>
//                 <TableCell><b>Brand</b></TableCell>
//                 <TableCell><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <TableRow key={product._id}>
//                     <TableCell>
//                       <img src={`http://localhost:5000/${product.image}`} alt={product.name} style={{ height: 50, width: 50, objectFit: "cover" }} />
//                     </TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>{product.category?.name || "N/A"}</TableCell>
//                     <TableCell>{product.brand?.name || "N/A"}</TableCell>
//                     <TableCell>
//                       <Button variant="contained" color="warning" component={Link} to={`/edit-product/${product._id}`} sx={{ mr: 1 }}>
//                         Edit
//                       </Button>
//                       <Button variant="contained" color="error" onClick={() => handleDelete(product._id)}>
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">No products found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/product/list", { withCredentials: true });
//       const categoryRes = await axios.get("http://localhost:5000/api/category/list", { withCredentials: true });
//       const brandRes = await axios.get("http://localhost:5000/api/vendor/list", { withCredentials: true });

//       const categories = categoryRes.data.reduce((acc, category) => {
//         acc[category._id] = category.name;
//         return acc;
//       }, {});

//       const brands = brandRes.data.reduce((acc, brand) => {
//         acc[brand._id] = brand.name;
//         return acc;
//       }, {});

//       const updatedProducts = res.data.map(product => ({
//         ...product,
//         categoryName: categories[product.category] || "N/A",
//         brandName: brands[product.brand] || "N/A"
//       }));

//       setProducts(updatedProducts || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/product/delete/${id}`, { withCredentials: true });
//         setProducts(products.filter((product) => product._id !== id));
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <Typography variant="h4" gutterBottom>Manage Products</Typography>
//         <Button variant="contained" color="primary" component={Link} to="/add-product" sx={{ mb: 2 }}>
//           + Add New Product
//         </Button>
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Image</b></TableCell>
//                 <TableCell><b>Name</b></TableCell>
//                 <TableCell><b>Category</b></TableCell>
//                 <TableCell><b>Brand</b></TableCell>
//                 <TableCell><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <TableRow key={product._id}>
//                     <TableCell>
//                       <img src={`http://localhost:5000/${product.image}`} alt={product.name} style={{ height: 50, width: 50, objectFit: "cover" }} />
//                     </TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>{product.categoryName}</TableCell>
//                     <TableCell>{product.brandName}</TableCell>
//                     <TableCell>
//                       <Button variant="contained" color="warning" component={Link} to={`/edit-product/${product._id}`} sx={{ mr: 1 }}>
//                         Edit
//                       </Button>
//                       <Button variant="contained" color="error" onClick={() => handleDelete(product._id)}>
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">No products found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   TextField,
//   IconButton,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import "./styles/manageproduct.css";

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortField, setSortField] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
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
//         categoryName: categories[product.category] || "Unknown Category",
//         brandName: brands[product.brand] || "Unknown Brand", // Fix N/A issue
//       }));

//       setProducts(updatedProducts || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/product/delete/${id}`, { withCredentials: true });
//         setProducts(products.filter((product) => product._id !== id));
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };
//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortOrder === "asc";
//     setSortOrder(isAsc ? "desc" : "asc");
//     setSortField(field);
//     setProducts((prev) =>
//       [...prev].sort((a, b) =>
//         isAsc ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field])
//       )
//     );
//   };
//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Search filter
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.brandName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#1976d2" },
//       secondary: { main: "#f50057" },
//       background: { default: "#f4f4f4" },
//     },
//     components: {
//       MuiTableCell: {
//         styleOverrides: {
//           head: { fontWeight: "bold", backgroundColor: "#1976d2", color: "#fff" },
//           body: { padding: "10px" },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
//               Manage Products
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link}
//               to="/add-product"
//               sx={{ px: 3, py: 1 }}
//             >
//               + Add New Product
//             </Button>
//           </Box>

//           {/* Search Bar */}
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               variant="outlined"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <IconButton>
//                     <SearchIcon />
//                   </IconButton>
//                 ),
//               }}
//               sx={{ width: "100%", maxWidth: "400px" }}
//             />
//           </Box>

//           {/* Table */}
//           <TableContainer component={Paper} sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
//             {loading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Image</TableCell>
//                       <TableCell onClick={() => handleSort("name")}>Name</TableCell>
// <TableCell onClick={() => handleSort("categoryName")}>Category</TableCell>
// <TableCell onClick={() => handleSort("brandName")}>Brand</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredProducts.length > 0 ? (
//                       filteredProducts
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((product) => (
//                           <TableRow
//                             key={product._id}
//                             sx={{
//                               "&:hover": { backgroundColor: "#f5f5f5", transition: "background-color 0.2s" },
//                             }}
//                           >
//                             <TableCell>
//                               <img
//                                 src={`http://localhost:5000/${product.image}`}
//                                 alt={product.name}
//                                 style={{ height: 50, width: 50, objectFit: "cover", borderRadius: "4px" }}
//                               />
//                             </TableCell>
//                             <TableCell>{product.name}</TableCell>
//                             <TableCell>{product.categoryName}</TableCell>
//                             <TableCell>{product.brandName}</TableCell>
//                             <TableCell>
//                               <Tooltip title="Edit">
//                                 <IconButton
//                                   component={Link}
//                                   to={`/edit-product/${product._id}`}
//                                   color="primary"
//                                   sx={{ mr: 1 }}
//                                 >
//                                   <EditIcon />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Delete">
//                                 <IconButton
//                                   onClick={() => handleDelete(product._id)}
//                                   color="error"
//                                 >
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </TableRow>
//                         ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={5} align="center">
//                           No products found
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   component="div"
//                   count={filteredProducts.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </>
//             )}
//           </TableContainer>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default ManageProducts;


//after the advanced styling and Mobile Responsive
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles/manageproduct.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const navigate = useNavigate();

  // Fetch initial data
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
    try {
      setLoading(true);
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
        categoryName: categories[product.category] || "Unknown Category",
        brandName: brands[product.brand] || "Unknown Brand",
      }));

      setProducts(updatedProducts || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/product/delete/${id}`, { withCredentials: true });
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
    setProducts((prev) =>
      [...prev].sort((a, b) =>
        isAsc ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field])
      )
    );
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search filter
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold",
            backgroundColor: darkMode ? "#388E3C" : "#66BB6A",
            color: "#fff",
          },
          body: { padding: { xs: "8px", sm: "10px" } },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
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
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: "background.default",
            width: { xs: "100%", sm: `calc(100% - ${sidebarOpen && !isMobile ? 260 : 70}px)` },
            transition: "width 0.3s ease",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 2, sm: 3 } }}>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Manage Products
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add-product"
              sx={{ px: { xs: 2, sm: 3 }, py: 1, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
            >
              + Add New Product
            </Button>
          </Box>

          {/* Search Bar */}
          <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <TextField
              variant="outlined"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </IconButton>
                ),
              }}
              sx={{ width: { xs: "100%", sm: "400px" } }}
              size={isMobile ? "small" : "medium"}
            />
          </Box>

          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
              borderRadius: "12px",
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <>
                <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="product table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell onClick={() => handleSort("name")} sx={{ cursor: "pointer" }}>
                        Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableCell>
                      <TableCell onClick={() => handleSort("categoryName")} sx={{ cursor: "pointer", display: { xs: "none", sm: "table-cell" } }}>
                        Category {sortField === "categoryName" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableCell>
                      <TableCell onClick={() => handleSort("brandName")} sx={{ cursor: "pointer", display: { xs: "none", md: "table-cell" } }}>
                        Brand {sortField === "brandName" && (sortOrder === "asc" ? "↑" : "↓")}
                      </TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((product) => (
                          <TableRow
                            key={product._id}
                            sx={{
                              "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5", transition: "background-color 0.2s" },
                            }}
                          >
                            <TableCell>
                              <img
                                src={`http://localhost:5000/${product.image}`}
                                alt={product.name}
                                style={{
                                  height: isMobile ? 40 : 50,
                                  width: isMobile ? 40 : 50,
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: "text.primary" }}>{product.name}</TableCell>
                            <TableCell sx={{ color: "text.primary", display: { xs: "none", sm: "table-cell" } }}>{product.categoryName}</TableCell>
                            <TableCell sx={{ color: "text.primary", display: { xs: "none", md: "table-cell" } }}>{product.brandName}</TableCell>
                            <TableCell align="right">
                              <Tooltip title="Edit">
                                <IconButton
                                  component={Link}
                                  to={`/edit-product/${product._id}`}
                                  color="primary"
                                  sx={{ mr: 1 }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton onClick={() => handleDelete(product._id)} color="secondary">
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ color: "text.primary" }}>
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { fontSize: isMobile ? "0.75rem" : "0.875rem" } }}
                />
              </>
            )}
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ManageProducts;