// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// const Services = () => {
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

//   // Fetch services from backend
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/services/list");
//         setServices(res.data || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServices([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration with Green Theme
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" }, // Green shades for agriculture theme
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" }, // Lighter green for secondary
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
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
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
//             AgriHub Services
//           </Typography>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Box>

//         {/* Services Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: { xs: 2, sm: 4 }, color: "text.primary", textAlign: "center" }}>
//             Our Farming Services
//           </Typography>
//           {services.length === 0 ? (
//             <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//               No services available at the moment.
//             </Typography>
//           ) : (
//             <Grid container spacing={3}>
//               {services.map((service) => (
//                 <Grid item xs={12} sm={6} md={4} key={service._id}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height={isMobile ? "150" : "200"}
//                       image={service.image ? `https://agrihub-backend-tz4v.onrender.com/${service.image}` : "https://via.placeholder.com/300x200?text=No+Image"}
//                       alt={service.name}
//                       sx={{ objectFit: "cover" }}
//                     />
//                     <CardContent>
//                       <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                         {service.name}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//                         {service.description}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.primary", fontWeight: "medium", mb: 2 }}>
//                         Price: ₹{service.pricePer100SqFt} per 100 Sq Ft
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                       >
//                         Book Service
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Services;
//pages/Services.js
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Ensure Link is imported
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// const Services = () => {
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

//   // Fetch services from backend
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/services/list");
//         setServices(res.data || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServices([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();

//     const handleResize = () => {
//       const mobile = window.innerWidth < 600;
//       setIsMobile(mobile);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Theme toggler
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("theme", newMode ? "dark" : "light");
//   };

//   // MUI Theme Configuration with Green Theme
//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: { main: darkMode ? "#66BB6A" : "#388E3C" },
//       secondary: { main: darkMode ? "#A5D6A7" : "#4CAF50" },
//       background: { default: darkMode ? "#121212" : "#f5f5f5", paper: darkMode ? "#1e1e1e" : "#fff" },
//       text: { primary: darkMode ? "#e0e0e0" : "#212121", secondary: darkMode ? "#b0b0b0" : "#757575" },
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
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: { borderRadius: "8px", textTransform: "none" },
//         },
//       },
//     },
//   });

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: darkMode ? "#121212" : "#f5f5f5" }}>
//         <CircularProgress size={60} sx={{ color: darkMode ? "#66BB6A" : "#388E3C" }} />
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 4 },
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9",
//           }}
//         >
//           <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "text.primary" }}>
//             AgriHub Services
//           </Typography>
//           <IconButton onClick={toggleDarkMode} sx={{ color: "text.primary" }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Box>

//         {/* Services Section */}
//         <Box sx={{ p: { xs: 2, sm: 4 } }}>
//           <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: { xs: 2, sm: 4 }, color: "text.primary", textAlign: "center" }}>
//             Our Farming Services
//           </Typography>
//           {services.length === 0 ? (
//             <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
//               No services available at the moment.
//             </Typography>
//           ) : (
//             <Grid container spacing={3}>
//               {services.map((service) => (
//                 <Grid item xs={12} sm={6} md={4} key={service._id}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height={isMobile ? "150" : "200"}
//                       image={service.image ? `https://agrihub-backend-tz4v.onrender.com/${service.image}` : "https://via.placeholder.com/300x200?text=No+Image"}
//                       alt={service.name}
//                       sx={{ objectFit: "cover" }}
//                     />
//                     <CardContent>
//                       <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
//                         {service.name}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
//                         {service.description}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.primary", fontWeight: "medium", mb: 2 }}>
//                         Price: ₹{service.pricePer100SqFt} per 100 Sq Ft
//                       </Typography>
//                       <Button
//                         component={Link}
//                         to="/service-booking"
//                         state={{ service }} // Pass service data via state
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ bgcolor: darkMode ? "#66BB6A" : "#388E3C", "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" } }}
//                       >
//                         Book Service
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>

//         {/* Footer */}
//         <Box sx={{ p: 2, bgcolor: darkMode ? "#1e1e1e" : "#E8F5E9", textAlign: "center" }}>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             © {new Date().getFullYear()} AgriHub. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Services;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion"; // Install: npm install framer-motion
import NavigationBar from "../components/Navbar"; // Updated NavigationBar

const Services = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const navigate = useNavigate();

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://agrihub-backend-tz4v.onrender.com/api/services/list");
        setServices(res.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();

    const handleResize = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          sx={{
            py: { xs: 6, sm: 8 },
            textAlign: "center",
            bgcolor: darkMode ? "#1A3C34" : "#E8F5E9",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                fontWeight: "bold",
                color: darkMode ? "#FFF" : "#388E3C",
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              AgriHub Services
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: darkMode ? "#E0E0E0" : "#757575",
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Discover our range of farming solutions
            </Typography>
          </Container>
        </Box>

        {/* Services Section */}
        <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn} sx={{ py: { xs: 6, sm: 8 } }}>
          <Container maxWidth="lg">
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                textAlign: "center",
                mb: { xs: 4, sm: 6 },
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Our Farming Services
            </Typography>
            {services.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                No services available at the moment.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height={isMobile ? "150" : "200"}
                        image={
                          service.image
                            ? `https://agrihub-backend-tz4v.onrender.com/${service.image}`
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={service.name}
                        sx={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant={isMobile ? "h6" : "h5"}
                          sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
                        >
                          {service.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                          {service.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: darkMode ? "#81C784" : "#388E3C", fontWeight: "medium", mb: 2 }}
                        >
                          Price: ₹{service.pricePer100SqFt} per 100 Sq Ft
                        </Typography>
                        <Button
                          component={Link}
                          to="/service-booking"
                          state={{ service }}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            bgcolor: darkMode ? "#66BB6A" : "#388E3C",
                            "&:hover": { bgcolor: darkMode ? "#81C784" : "#4CAF50" },
                          }}
                        >
                          Book Service
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

export default Services;