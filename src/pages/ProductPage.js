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
//         const res = await axios.get("http://localhost:5000/api/product/list");
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
//                 src={`http://localhost:5000/${product.image}`}
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
//         const res = await axios.get("http://localhost:5000/api/product/list");
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
//                 src={`http://localhost:5000/${product.image}`}
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
//         const res = await axios.get("http://localhost:5000/api/product/list");
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
//                 image={`http://localhost:5000/${product.image}`}
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
//         const res = await axios.get("http://localhost:5000/api/product/list");
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
//                   image={`http://localhost:5000/${product.image}`}
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
//         const res = await axios.get("http://localhost:5000/api/product/list");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const fetchFilters = async () => {
//       try {
//         const categoriesRes = await axios.get("http://localhost:5000/api/category/list");
//         const brandsRes = await axios.get("http://localhost:5000/api/brand/list");

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
//                 image={`http://localhost:5000/${product.image}`}
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
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import NavigationBar from "../components/Navbar";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/list",{ withCredentials: true });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFilters = async () => {
    try {
      const categoryRes = await axios.get("http://localhost:5000/api/category/list",{ withCredentials: true });
      const brandRes = await axios.get("http://localhost:5000/api/vendor/list",{ withCredentials: true });

      // Convert to { _id: name } mapping
      const categories = categoryRes.data.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

     const brands = brandRes.data.reduce((acc, brand) => {
        acc[brand._id] = brand.name;
        return acc;
      }, {});

      setCategories(categories);
      setBrands(brands);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? product.category === categoryFilter : true) &&
    (brandFilter ? product.brand === brandFilter : true)
  );
  
  return (
    <>
  <NavigationBar/>
    <Container sx={{ mt: 10 }}> {/* Moves label below Navbar */}
      
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        Our Products
      </Typography>

      {/* 🔍 Search Input */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🏷️ Category & Brand Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
  <MenuItem value="">All</MenuItem>
  {Object.entries(categories).map(([id, name]) => (
    <MenuItem key={id} value={id}>
      {name}
    </MenuItem>
  ))}
</Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
  <MenuItem value="">All</MenuItem>
  {Object.entries(brands).map(([id, name]) => (
    <MenuItem key={id} value={id}>
      {name}
    </MenuItem>
  ))}
</Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* 🛒 Product Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${product.image}`}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
  {categories[product.category] || "No Category"} | {product.brand?.name || "No Brand"}
</Typography>

                <Typography variant="body1" color="primary" fontWeight="bold">
                  ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
                </Typography>
                <Button
                  component={Link}
                  to={`/products/${product._id}`}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );

};

export default ProductPage;
