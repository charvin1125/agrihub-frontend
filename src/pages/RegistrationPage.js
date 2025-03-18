// import React, { useState } from "react";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import "./styles/RegistrationPage.css";

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/register", formData);
//       setMessage(response.data.message + ` Username: ${response.data.username}`);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <NavigationBar />
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Register
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default RegistrationPage;
// import React, { useState } from "react";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/register", formData);
//       setMessage(`Success! Username: ${response.data.username}`);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <NavigationBar />
//       <Paper elevation={4} sx={{ padding: 4, mt: 5, borderRadius: 3 }}>
//         <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
//           Register
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <TextField
//               label="Mobile"
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <Button type="submit" variant="contained" color="primary" size="large">
//               Register
//             </Button>
//           </Box>
//         </form>

//         {message && (
//           <Typography color="success.main" mt={2} align="center">
//             {message}
//           </Typography>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default RegistrationPage;
// import React, { useState } from "react";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
//   InputAdornment,
//   Link,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LockIcon from "@mui/icons-material/Lock";
// import "./styles/RegistrationPage.css";

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     securityQuestion: "",
//     securityAnswer: "",
//   });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const securityQuestions = [
//     "What is your mother's maiden name?",
//     "What was the name of your first pet?",
//     "What city were you born in?",
//     "What is your favorite book?",
//     "What was your childhood nickname?",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(formData.mobile)) {
//       setMessage("Mobile number must be 10 digits.");
//       return;
//     }
//     // Rest of the submit logic
  
//     setMessage("");
//     setLoading(true);

//     try {
//       const response = await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/register", formData);
//       setMessage(`Success! Username: ${response.data.username}`);
//       setFormData({
//         firstName: "",
//         lastName: "",
//         mobile: "",
//         securityQuestion: "",
//         securityAnswer: "",
//       });
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Theme configuration
//   const theme = createTheme({
//     palette: {
//       primary: { main: "#4CAF50" }, // Green for AgriHub
//       secondary: { main: "#FF5722" }, // Orange accent
//       background: { default: "#F5F7FA" },
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
//             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//             background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: "8px",
//             textTransform: "none",
//             padding: "12px 24px",
//             "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//           },
//         },
//       },
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               "&:hover fieldset": { borderColor: "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
//             },
//           },
//         },
//       },
//       MuiFormControl: {
//         styleOverrides: {
//           root: {
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               "&:hover fieldset": { borderColor: "#4CAF50" },
//               "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//         <NavigationBar />
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             pt: 8, // Adjust for navbar
//             px: 2,
//           }}
//         >
//           <Card sx={{ maxWidth: 550, width: "100%" }}>
//             <CardContent sx={{ p: 4 }}>
//               <Typography
//                 variant="h4"
//                 sx={{ textAlign: "center", color: "primary.main", mb: 1 }}
//               >
//                 Join AgriHub
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
//               >
//                 Create your account
//               </Typography>

//               <form onSubmit={handleSubmit}>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//                   <TextField
//                     fullWidth
//                     label="First Name"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Last Name"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Mobile"
//                     type="tel"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PhoneIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <FormControl fullWidth>
//                     <InputLabel>Security Question</InputLabel>
//                     <Select
//                       name="securityQuestion"
//                       value={formData.securityQuestion}
//                       onChange={handleChange}
//                       label="Security Question"
//                       required
//                     >
//                       <MenuItem value="">Select a question</MenuItem>
//                       {securityQuestions.map((question, index) => (
//                         <MenuItem key={index} value={question}>
//                           {question}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Security Answer"
//                     name="securityAnswer"
//                     value={formData.securityAnswer}
//                     onChange={handleChange}
//                     required
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LockIcon sx={{ color: "primary.main" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     disabled={loading}
//                     sx={{ py: 1.5, fontSize: "1.1rem" }}
//                   >
//                     {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
//                   </Button>
//                 </Box>
//               </form>

//               {message && (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: message.includes("Success") ? "success.main" : "secondary.main",
//                     textAlign: "center",
//                     mt: 2,
//                   }}
//                 >
//                   {message}
//                 </Typography>
//               )}

//               <Divider sx={{ my: 3 }} />

//               <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
//                 Already have an account?{" "}
//                 <Button
//                   component={Link}
//                   to="/login"
//                   sx={{ color: "primary.main", textDecoration: "underline", p: 0 }}
//                 >
//                   Login
//                 </Button>
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// const securityQuestions = [
//   "What is your mother's maiden name?",
//   "What was the name of your first pet?",
//   "What city were you born in?",
//   "What is your favorite book?",
//   "What was your childhood nickname?",
// ];

// export default RegistrationPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added useNavigate import
import NavigationBar from "../components/Navbar";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import "./styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    securityQuestion: "",
    securityAnswer: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Added useNavigate hook

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your favorite book?",
    "What was your childhood nickname?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.mobile)) {
      setMessage("Mobile number must be 10 digits.");
      return;
    }
    // Rest of the submit logic
  
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("https://agrihub-backend-xu19.onrender.com/api/users/register", formData);
      setMessage(`Success! Username: ${response.data.username}`);
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        securityQuestion: "",
        securityAnswer: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page
  const handleLogin = () => {
    navigate("/login");
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#4CAF50" }, // Green for AgriHub
      secondary: { main: "#FF5722" }, // Orange accent
      background: { default: "#F5F7FA" },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h4: { fontWeight: 700 },
      body1: { fontSize: "1rem" },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            padding: "12px 24px",
            "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover fieldset": { borderColor: "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover fieldset": { borderColor: "#4CAF50" },
              "&.Mui-focused fieldset": { borderColor: "#4CAF50" },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <NavigationBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 8, // Adjust for navbar
            px: 2,
          }}
        >
          <Card sx={{ maxWidth: 550, width: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "primary.main", mb: 1 }}
              >
                Join AgriHub
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
              >
                Create your account
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Mobile"
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Security Question</InputLabel>
                    <Select
                      name="securityQuestion"
                      value={formData.securityQuestion}
                      onChange={handleChange}
                      label="Security Question"
                      required
                    >
                      <MenuItem value="">Select a question</MenuItem>
                      {securityQuestions.map((question, index) => (
                        <MenuItem key={index} value={question}>
                          {question}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Security Answer"
                    name="securityAnswer"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "primary.main" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ py: 1.5, fontSize: "1.1rem" }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                  </Button>
                </Box>
              </form>

              {message && (
                <Typography
                  variant="body2"
                  sx={{
                    color: message.includes("Success") ? "success.main" : "secondary.main",
                    textAlign: "center",
                    mt: 2,
                  }}
                >
                  {message}
                </Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
                Already have an account?{" "}
                <Button
                  onClick={handleLogin}
                  sx={{ color: "primary.main", textDecoration: "underline", p: 0 }}
                >
                  Login
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationPage;