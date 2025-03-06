// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";


// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     brand: "",
//     stock: "",
//     variants: [],
//   });

//   const [variant, setVariant] = useState({ size: "", price: "", discount: 0 });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Admin authentication
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/"); // Redirect non-admins to home page
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/"); // Redirect to login if not authenticated
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         try {
//           const categoryRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true });
//           const brandRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true });
//           const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true });

//           setCategories(categoryRes.data || []);
//           setBrands(brandRes.data || []);
//           setProducts(productRes.data || []);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [user]);

//   const handleVariantAdd = () => {
//     if (variant.size && variant.price) {
//       setProduct((prev) => ({
//         ...prev,
//         variants: [...prev.variants, variant],
//       }));
//       setVariant({ size: "", price: "", discount: 0 });
//     } else {
//       alert("Please fill all variant details");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("category", product.category);
//     formData.append("brand", product.brand);
//     formData.append("stock", product.stock);
//     formData.append("variants", JSON.stringify(product.variants));
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
//         withCredentials: true, // ✅ Ensures authentication cookies are sent
//       });
//       alert("Product added successfully!");
//       // Clear form fields after successful submission
//       setProduct({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         brand: "",
//         stock: "",
//         variants: [],
//       });
//       setImage(null);
//       setVariant({ size: "", price: "", discount: 0 });

//       // Reload products to reflect the newly added product
//       const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//       setProducts(productRes.data || []);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
    
//     <div className="admin-dashboard">
//         <Sidebar />
//         <div className="main-content">
//         <h2>Manage Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={product.name}
//           className="w-full p-2 border rounded"
//           onChange={(e) => setProduct({ ...product, name: e.target.value })}
//         />
//         <textarea
//           placeholder="Description"
//           value={product.description}
//           className="w-full p-2 border rounded"
//           onChange={(e) => setProduct({ ...product, description: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={product.price}
//           className="w-full p-2 border rounded"
//           onChange={(e) => setProduct({ ...product, price: e.target.value })}
//         />

//         {/* Category Dropdown */}
//         <div className="flex space-x-2">
//           <select
//             className="w-full p-2 border rounded"
//             value={product.category}
//             onChange={(e) => setProduct({ ...product, category: e.target.value })}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-category")}>
//             Add Category
//           </button>
//         </div>

//         {/* Brand Dropdown */}
//         <div className="flex space-x-2">
//           <select
//             className="w-full p-2 border rounded"
//             value={product.brand}
//             onChange={(e) => setProduct({ ...product, brand: e.target.value })}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((br) => (
//               <option key={br._id} value={br._id}>
//                 {br.name}
//               </option>
//             ))}
//           </select>
//           <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-vendors")}>
//             Add Vendor
//           </button>
//         </div>

//         <input
//           type="number"
//           placeholder="Stock Quantity"
//           value={product.stock}
//           className="w-full p-2 border rounded"
//           onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//         />

//         {/* Variants */}
//         <div className="border p-4 rounded">
//           <h3 className="font-semibold">Add Variants</h3>
//           <input
//             type="text"
//             placeholder="Size (e.g., 50ml, 1L)"
//             value={variant.size}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setVariant({ ...variant, size: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Variant Price"
//             value={variant.price}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setVariant({ ...variant, price: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Discount %"
//             value={variant.discount}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setVariant({ ...variant, discount: e.target.value })}
//           />
//           <button type="button" className="mt-2 p-2 bg-green-500 text-white rounded" onClick={handleVariantAdd}>
//             Add Variant
//           </button>
//         </div>

//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Add Product
//         </button>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default AddProduct;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     brand: "",
//     stock: "", // Stock at product level
//     variants: [],
//   });

//   // Added stock field for variants
//   const [variant, setVariant] = useState({ size: "", price: "", discount: 0, stock: 0 });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         try {
//           const categoryRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true });
//           const brandRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true });
//           const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true });

//           setCategories(categoryRes.data || []);
//           setBrands(brandRes.data || []);
//           setProducts(productRes.data || []);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [user]);

//   // Function to add a variant with stock management
//   const handleVariantAdd = () => {
//     if (variant.size && variant.price && variant.stock >= 0) {
//       setProduct((prev) => ({
//         ...prev,
//         variants: [...prev.variants, variant],
//       }));
//       setVariant({ size: "", price: "", discount: 0, stock: 0 });
//     } else {
//       alert("Please fill all variant details, including stock.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("category", product.category);
//     formData.append("brand", product.brand);
//     formData.append("stock", product.stock);
//     formData.append("variants", JSON.stringify(product.variants));
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
//         withCredentials: true,
//       });
//       alert("Product added successfully!");
      
//       setProduct({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         brand: "",
//         stock: "",
//         variants: [],
//       });
//       setImage(null);
//       setVariant({ size: "", price: "", discount: 0, stock: 0 });

//       const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//       setProducts(productRes.data || []);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <h2>Manage Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={product.name}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//           />
//           <textarea
//             placeholder="Description"
//             value={product.description}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, description: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={product.price}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//           />

//           {/* Category Dropdown */}
//           <div className="flex space-x-2">
//             <select
//               className="w-full p-2 border rounded"
//               value={product.category}
//               onChange={(e) => setProduct({ ...product, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-category")}>
//               Add Category
//             </button>
//           </div>

//           {/* Brand Dropdown */}
//           <div className="flex space-x-2">
//             <select
//               className="w-full p-2 border rounded"
//               value={product.brand}
//               onChange={(e) => setProduct({ ...product, brand: e.target.value })}
//             >
//               <option value="">Select Brand</option>
//               {brands.map((br) => (
//                 <option key={br._id} value={br._id}>
//                   {br.name}
//                 </option>
//               ))}
//             </select>
//             <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-vendors")}>
//               Add Vendor
//             </button>
//           </div>

//           {/* Product Level Stock */}
//           <input
//             type="number"
//             placeholder="Total Stock Quantity"
//             value={product.stock}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//           />

//           {/* Variants Section */}
//           <div className="border p-4 rounded">
//             <h3 className="font-semibold">Add Variants</h3>
//             <input
//               type="text"
//               placeholder="Size (e.g., 50ml, 1L)"
//               value={variant.size}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, size: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Variant Price"
//               value={variant.price}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Stock for Variant"
//               value={variant.stock}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
//             />
//             <button type="button" className="mt-2 p-2 bg-green-500 text-white rounded" onClick={handleVariantAdd}>
//               Add Variant
//             </button>
//           </div>

//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     brand: "",
//     variants: [],
//   });

//   const [variant, setVariant] = useState({ size: "", price: "", discount: 0, stock: 0 });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         try {
//           const categoryRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true });
//           const brandRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true });
//           const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true });

//           setCategories(categoryRes.data || []);
//           setBrands(brandRes.data || []);
//           setProducts(productRes.data || []);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [user]);

//   // Function to add a variant with discount field
//   const handleVariantAdd = () => {
//     if (variant.size && variant.price && variant.stock >= 0) {
//       setProduct((prev) => ({
//         ...prev,
//         variants: [...prev.variants, variant],
//       }));
//       setVariant({ size: "", price: "", discount: 0, stock: 0 });
//     } else {
//       alert("Please fill all variant details.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("category", product.category);
//     formData.append("brand", product.brand);
//     formData.append("variants", JSON.stringify(product.variants));
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
//         withCredentials: true,
//       });
//       alert("Product added successfully!");
      
//       setProduct({
//         name: "",
//         description: "",
//         category: "",
//         brand: "",
//         variants: [],
//       });
//       setImage(null);
//       setVariant({ size: "", price: "", discount: 0, stock: 0 });

//       const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//       setProducts(productRes.data || []);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <h2>Manage Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={product.name}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//           />
//           <textarea
//             placeholder="Description"
//             value={product.description}
//             className="w-full p-2 border rounded"
//             onChange={(e) => setProduct({ ...product, description: e.target.value })}
//           />

//           {/* Category Dropdown */}
//           <div className="flex space-x-2">
//             <select
//               className="w-full p-2 border rounded"
//               value={product.category}
//               onChange={(e) => setProduct({ ...product, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//             <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-category")}>
//               Add Category
//             </button>
//           </div>

//           {/* Brand Dropdown */}
//           <div className="flex space-x-2">
//             <select
//               className="w-full p-2 border rounded"
//               value={product.brand}
//               onChange={(e) => setProduct({ ...product, brand: e.target.value })}
//             >
//               <option value="">Select Brand</option>
//               {brands.map((br) => (
//                 <option key={br._id} value={br._id}>
//                   {br.name}
//                 </option>
//               ))}
//             </select>
//             <button type="button" className="p-2 bg-blue-500 text-white rounded" onClick={() => navigate("/manage-vendors")}>
//               Add Vendor
//             </button>
//           </div>

//           {/* Variants Section with Discount */}
//           <div className="border p-4 rounded">
//             <h3 className="font-semibold">Add Variants</h3>
//             <input
//               type="text"
//               placeholder="Size (e.g., 50ml, 1L)"
//               value={variant.size}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, size: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Variant Price"
//               value={variant.price}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, price: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Discount (%)"
//               value={variant.discount}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, discount: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Stock for Variant"
//               value={variant.stock}
//               className="w-full p-2 border rounded"
//               onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
//             />
//             <button type="button" className="mt-2 p-2 bg-green-500 text-white rounded" onClick={handleVariantAdd}>
//               Add Variant
//             </button>
//           </div>

//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     brand: "",
//     variants: [],
//   });

//   const [variant, setVariant] = useState({ size: "", price: "", discount: 0, stock: 0, gst: "" });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         try {
//           const categoryRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true });
//           const brandRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true });
//           const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true });

//           setCategories(categoryRes.data || []);
//           setBrands(brandRes.data || []);
//           setProducts(productRes.data || []);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [user]);

//   const handleVariantAdd = () => {
//     if (variant.size && variant.price && variant.stock >= 0 && variant.gst !== "") {
//       setProduct((prev) => ({
//         ...prev,
//         variants: [...prev.variants, variant],
//       }));
//       setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });
//     } else {
//       alert("Please fill all variant details including GST.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("category", product.category);
//     formData.append("brand", product.brand);
//     formData.append("variants", JSON.stringify(product.variants));
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
//         withCredentials: true,
//       });
//       alert("Product added successfully!");
      
//       setProduct({
//         name: "",
//         description: "",
//         category: "",
//         brand: "",
//         variants: [],
//       });
//       setImage(null);
//       setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });

//       const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//       setProducts(productRes.data || []);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <h2>Manage Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" placeholder="Product Name" value={product.name} className="w-full p-2 border rounded" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
//           <textarea placeholder="Description" value={product.description} className="w-full p-2 border rounded" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          
//           {/* Category Dropdown */}
//           <div className="flex space-x-2">
//             <select className="w-full p-2 border rounded" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Brand Dropdown */}
//           <div className="flex space-x-2">
//             <select className="w-full p-2 border rounded" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })}>
//               <option value="">Select Brand</option>
//               {brands.map((br) => (
//                 <option key={br._id} value={br._id}>{br.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Variants Section with GST */}
//           <div className="border p-4 rounded">
//             <h3 className="font-semibold">Add Variants</h3>
//             <input type="text" placeholder="Size (e.g., 50ml, 1L)" value={variant.size} className="w-full p-2 border rounded" onChange={(e) => setVariant({ ...variant, size: e.target.value })} />
//             <input type="number" placeholder="Variant Price" value={variant.price} className="w-full p-2 border rounded" onChange={(e) => setVariant({ ...variant, price: e.target.value })} />
//             <input type="number" placeholder="Discount (%)" value={variant.discount} className="w-full p-2 border rounded" onChange={(e) => setVariant({ ...variant, discount: e.target.value })} />
//             <input type="number" placeholder="Stock for Variant" value={variant.stock} className="w-full p-2 border rounded" onChange={(e) => setVariant({ ...variant, stock: e.target.value })} />
//             <input type="number" placeholder="GST (%)" value={variant.gst} className="w-full p-2 border rounded" onChange={(e) => setVariant({ ...variant, gst: e.target.value })} />
//             <button type="button" className="mt-2 p-2 bg-green-500 text-white rounded" onClick={handleVariantAdd}>Add Variant</button>
//           </div>

//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Product</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Card,
//   CardContent,
//   Divider,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// // import "./styles/AddProduct.css";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     brand: "",
//     variants: [],
//   });
//   const [variant, setVariant] = useState({ size: "", price: "", discount: 0, stock: 0, gst: "" });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const handleVariantEdit = (index) => {
//     const editVariant = product.variants[index];
//     setVariant(editVariant);
//     handleVariantDelete(index);
//   };
//   // Fetch user and data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
//         if (res.data && res.data.isAdmin) {
//           setUser(res.data);
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   useEffect(() => {
//     if (user) {
//       const fetchData = async () => {
//         try {
//           const [categoryRes, brandRes, productRes] = await Promise.all([
//             axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true }),
//             axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true }),
//             axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true }),
//           ]);
//           setCategories(categoryRes.data || []);
//           setBrands(brandRes.data || []);
//           setProducts(productRes.data || []);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     }
//   }, [user]);

//   // Handle variant addition
//   const handleVariantAdd = () => {
//     if (variant.size && variant.price && variant.stock >= 0 && variant.gst !== "") {
//       setProduct((prev) => ({
//         ...prev,
//         variants: [...prev.variants, { ...variant }],
//       }));
//       setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });
//     } else {
//       alert("Please fill all variant details including GST.");
//     }
//   };

//   // Handle variant deletion
//   const handleVariantDelete = (index) => {
//     setProduct((prev) => ({
//       ...prev,
//       variants: prev.variants.filter((_, i) => i !== index),
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("category", product.category);
//     formData.append("brand", product.brand);
//     formData.append("variants", JSON.stringify(product.variants));
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
//         withCredentials: true,
//       });
//       alert("Product added successfully!");
//       setProduct({ name: "", description: "", category: "", brand: "", variants: [] });
//       setImage(null);
//       setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });

//       const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list");
//       setProducts(productRes.data || []);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" }, // Green for AgriHub theme
//       secondary: { main: "#f50057" },
//       background: { default: "#f4f4f4" },
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: { marginBottom: "16px" },
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

//   if (!user) return null;

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
//           <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}>
//             Add New Product
//           </Typography>

//           <Card sx={{ p: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 {/* Product Details */}
//                 <TextField
//                   fullWidth
//                   label="Product Name"
//                   value={product.name}
//                   onChange={(e) => setProduct({ ...product, name: e.target.value })}
//                   variant="outlined"
//                 />
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   value={product.description}
//                   onChange={(e) => setProduct({ ...product, description: e.target.value })}
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                 />
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     value={product.category}
//                     onChange={(e) => setProduct({ ...product, category: e.target.value })}
//                     label="Category"
//                   >
//                     <MenuItem value="">Select Category</MenuItem>
//                     {categories.map((cat) => (
//                       <MenuItem key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Brand</InputLabel>
//                   <Select
//                     value={product.brand}
//                     onChange={(e) => setProduct({ ...product, brand: e.target.value })}
//                     label="Brand"
//                   >
//                     <MenuItem value="">Select Brand</MenuItem>
//                     {brands.map((br) => (
//                       <MenuItem key={br._id} value={br._id}>
//                         {br.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   fullWidth
//                   type="file"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   InputLabelProps={{ shrink: true }}
//                   label="Product Image"
//                   variant="outlined"
//                 />

//                 {/* Variants Section */}
//                 <Divider sx={{ my: 3 }} />
//                 <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                   Add Variants
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
//                   <TextField
//                     label="Size (e.g., 50ml, 1L)"
//                     value={variant.size}
//                     onChange={(e) => setVariant({ ...variant, size: e.target.value })}
//                     variant="outlined"
//                     sx={{ width: "150px" }}
//                   />
//                   <TextField
//                     label="Price"
//                     type="number"
//                     value={variant.price}
//                     onChange={(e) => setVariant({ ...variant, price: e.target.value })}
//                     variant="outlined"
//                     sx={{ width: "120px" }}
//                   />
//                   <TextField
//                     label="Discount (%)"
//                     type="number"
//                     value={variant.discount}
//                     onChange={(e) => setVariant({ ...variant, discount: e.target.value })}
//                     variant="outlined"
//                     sx={{ width: "120px" }}
//                   />
//                   <TextField
//                     label="Stock"
//                     type="number"
//                     value={variant.stock}
//                     onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
//                     variant="outlined"
//                     sx={{ width: "120px" }}
//                   />
//                   <TextField
//                     label="GST (%)"
//                     type="number"
//                     value={variant.gst}
//                     onChange={(e) => setVariant({ ...variant, gst: e.target.value })}
//                     variant="outlined"
//                     sx={{ width: "120px" }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddIcon />}
//                     onClick={handleVariantAdd}
//                     sx={{ height: "56px" }}
//                   >
//                     Add
//                   </Button>
//                 </Box>

//                 {/* Variants Table */}
//                 {product.variants.length > 0 && (
//                   <TableContainer component={Paper} sx={{ mb: 3 }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Size</TableCell>
//                           <TableCell align="right">Price</TableCell>
//                           <TableCell align="right">Discount (%)</TableCell>
//                           <TableCell align="right">Stock</TableCell>
//                           <TableCell align="right">GST (%)</TableCell>
//                           <TableCell align="right">Action</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {product.variants.map((v, index) => (
//                           <TableRow key={index}>
//                             <TableCell>{v.size}</TableCell>
//                             <TableCell align="right">₹{v.price}</TableCell>
//                             <TableCell align="right">{v.discount}</TableCell>
//                             <TableCell align="right">{v.stock}</TableCell>
//                             <TableCell align="right">{v.gst}</TableCell>
//                             <TableCell align="right">
//                               <Button
//                                 variant="outlined"
//                                 color="secondary"
//                                 startIcon={<DeleteIcon />}
//                                 onClick={() => handleVariantDelete(index)}
//                                 size="small"
//                               >
//                                 Delete
//                               </Button>
//                               <Button
//   variant="outlined"
//   color="primary"
//   onClick={() => handleVariantEdit(index)}
//   size="small"
//   sx={{ mr: 1 }}
// >
//   Edit
// </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}

//                 {/* Submit Button */}
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   sx={{ py: 1.5, fontSize: "1.1rem" }}
//                 >
//                   Add Product
//                 </Button>
              
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AddProduct;
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
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";

const AddProduct = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    variants: [],
  });
  const [variant, setVariant] = useState({ size: "", price: "", discount: 0, stock: 0, gst: "" });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Fetch user and data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/users/me", { withCredentials: true });
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
      const fetchData = async () => {
        try {
          const [categoryRes, brandRes, productRes] = await Promise.all([
            axios.get("https://agrihub-backend-tz4v.onrender.com/api/category/list", { withCredentials: true }),
            axios.get("https://agrihub-backend-tz4v.onrender.com/api/vendor/list", { withCredentials: true }),
            axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true }),
          ]);
          setCategories(categoryRes.data || []);
          setBrands(brandRes.data || []);
          setProducts(productRes.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  // Handle variant addition
  const handleVariantAdd = () => {
    if (variant.size && variant.price && variant.stock >= 0 && variant.gst !== "") {
      setProduct((prev) => ({
        ...prev,
        variants: [...prev.variants, { ...variant }],
      }));
      setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });
    } else {
      alert("Please fill all variant details including GST.");
    }
  };

  // Handle variant deletion
  const handleVariantDelete = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // Handle variant edit
  const handleVariantEdit = (index) => {
    const editVariant = product.variants[index];
    setVariant(editVariant);
    handleVariantDelete(index);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("variants", JSON.stringify(product.variants));
    if (image) formData.append("image", image);

    try {
      await axios.post("https://agrihub-backend-tz4v.onrender.com/api/product/add", formData, {
        withCredentials: true,
      });
      alert("Product added successfully!");
      setProduct({ name: "", description: "", category: "", brand: "", variants: [] });
      setImage(null);
      setVariant({ size: "", price: "", discount: 0, stock: 0, gst: "" });

      const productRes = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/product/list", { withCredentials: true });
      setProducts(productRes.data || []);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
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
          body: { padding: { xs: "8px", sm: "10px" } },
        },
      },
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) return null;

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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 2, sm: 4 } }}>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "text.primary" }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary", flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
              Add New Product
            </Typography>
          </Box>

          {/* Form Card */}
          <Card sx={{ bgcolor: darkMode ? "#263238" : "#E8F5E9" }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Product Details */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      variant="outlined"
                      multiline
                      rows={isMobile ? 3 : 4}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        label="Category"
                        size={isMobile ? "small" : "medium"}
                        required
                      >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Brand</InputLabel>
                      <Select
                        value={product.brand}
                        onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                        label="Brand"
                        size={isMobile ? "small" : "medium"}
                        required
                      >
                        <MenuItem value="">Select Brand</MenuItem>
                        {brands.map((br) => (
                          <MenuItem key={br._id} value={br._id}>
                            {br.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      InputLabelProps={{ shrink: true }}
                      label="Product Image"
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>

                  {/* Variants Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: { xs: 2, sm: 3 } }} />
                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
                      Add Variants
                    </Typography>
                    <Grid container spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          label="Size (e.g., 50ml, 1L)"
                          value={variant.size}
                          onChange={(e) => setVariant({ ...variant, size: e.target.value })}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Price"
                          type="number"
                          value={variant.price}
                          onChange={(e) => setVariant({ ...variant, price: e.target.value })}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Discount (%)"
                          type="number"
                          value={variant.discount}
                          onChange={(e) => setVariant({ ...variant, discount: e.target.value })}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="Stock"
                          type="number"
                          value={variant.stock}
                          onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <TextField
                          fullWidth
                          label="GST (%)"
                          type="number"
                          value={variant.gst}
                          onChange={(e) => setVariant({ ...variant, gst: e.target.value })}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={handleVariantAdd}
                          fullWidth={isMobile}
                          sx={{ height: isMobile ? "40px" : "56px", bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Variants Table */}
                  {product.variants.length > 0 && (
                    <Grid item xs={12}>
                      <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
                        <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="variants table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Size</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Discount (%)</TableCell>
                              <TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>Stock</TableCell>
                              <TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>GST (%)</TableCell>
                              <TableCell align="right">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {product.variants.map((v, index) => (
                              <TableRow key={index} sx={{ "&:hover": { bgcolor: darkMode ? "#2e2e2e" : "#f5f5f5" } }}>
                                <TableCell sx={{ color: "text.primary" }}>{v.size}</TableCell>
                                <TableCell align="right" sx={{ color: "text.primary" }}>₹{v.price}</TableCell>
                                <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", sm: "table-cell" } }}>{v.discount}</TableCell>
                                <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", md: "table-cell" } }}>{v.stock}</TableCell>
                                <TableCell align="right" sx={{ color: "text.primary", display: { xs: "none", md: "table-cell" } }}>{v.gst}</TableCell>
                                <TableCell align="right">
                                  <IconButton onClick={() => handleVariantEdit(index)} color="primary" sx={{ mr: 1 }}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton onClick={() => handleVariantDelete(index)} color="secondary">
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ py: { xs: 1, sm: 1.5 }, fontSize: { xs: "1rem", sm: "1.1rem" }, bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
                    >
                      Add Product
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

export default AddProduct;