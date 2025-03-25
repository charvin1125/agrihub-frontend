// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Grid,
//   Divider,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import LockIcon from "@mui/icons-material/Lock";
// import defaultProfilePic from "../components/imgs/customer.png";
// import "./styles/ProfilePage.css";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate();

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-pvfl.onrender.com/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(response.data);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, [navigate]);

//   // Handle logout
//   const handleLogout = () => {
//     axios
//       .post("https://agrihub-backend-pvfl.onrender.com/api/users/logout", {}, { withCredentials: true })
//       .then(() => {
//         localStorage.removeItem("user");
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout failed:", error));
//   };

//   // Handle edit toggle
//   const handleEditClick = () => setIsEditing(true);
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setFormData(user);
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile save
//   const handleSave = async () => {
//     try {
//       const response = await axios.put("https://agrihub-backend-pvfl.onrender.com/api/users/update", formData, {
//         withCredentials: true,
//       });
//       setUser(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   // Handle password change dialog
//   const handlePasswordChangeOpen = () => setOpenPasswordDialog(true);
//   const handlePasswordChangeClose = () => {
//     setOpenPasswordDialog(false);
//     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   };

//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordSave = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New password and confirm password do not match!");
//       return;
//     }
//     try {
//       await axios.put(
//         "https://agrihub-backend-pvfl.onrender.com/api/users/change-password",
//         {
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword,
//         },
//         { withCredentials: true }
//       );
//       alert("Password changed successfully!");
//       handlePasswordChangeClose();
//     } catch (error) {
//       console.error("Failed to change password:", error);
//       alert("Error changing password. Please check your current password.");
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
//       MuiCard: {
//         styleOverrides: {
//           root: { boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" },
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
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!user) return null;

//   return (
//     <ThemeProvider theme={theme}>
//       <NavigationBar />
//       <Box sx={{ maxWidth: 1200, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
//         <Grid container spacing={4}>
//           {/* Profile Picture & Basic Info */}
//           <Grid item xs={12} md={4}>
//             <Card>
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Avatar
//                   src={user.profilePhoto || defaultProfilePic}
//                   alt={`${user.firstName} ${user.lastName}`}
//                   sx={{ width: 150, height: 150, mx: "auto", mb: 2, border: "4px solid #4CAF50" }}
//                 />
//                 <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                   {user.firstName} {user.lastName}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   {user.location || "No location provided"}
//                 </Typography>
//                 {!isEditing && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<EditIcon />}
//                     onClick={handleEditClick}
//                     sx={{ mb: 1 }}
//                   >
//                     Edit Profile
//                   </Button>
//                 )}
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<LockIcon />}
//                   onClick={handlePasswordChangeOpen}
//                 >
//                   Change Password
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Profile Details */}
//           <Grid item xs={12} md={8}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                   Profile Details
//                 </Typography>
//                 {[
//                   { label: "Customer ID", name: "username", type: "text", disabled: true },
//                   { label: "First Name", name: "firstName", type: "text" },
//                   { label: "Last Name", name: "lastName", type: "text" },
//                   { label: "Email", name: "email", type: "email" },
//                   { label: "Phone", name: "mobile", type: "text" },
//                 ].map(({ label, name, type, disabled }) => (
//                   <Grid container spacing={2} sx={{ mb: 2 }} key={name}>
//                     <Grid item xs={4}>
//                       <Typography variant="body1" sx={{ fontWeight: "medium" }}>
//                         {label}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={8}>
//                       {isEditing && !disabled ? (
//                         <TextField
//                           fullWidth
//                           type={type}
//                           name={name}
//                           value={formData[name] || ""}
//                           onChange={handleChange}
//                           variant="outlined"
//                           size="small"
//                         />
//                       ) : (
//                         <Typography variant="body1" color="text.secondary">
//                           {user[name] || "N/A"}
//                         </Typography>
//                       )}
//                     </Grid>
//                   </Grid>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
//               {isEditing ? (
//                 <>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SaveIcon />}
//                     onClick={handleSave}
//                   >
//                     Save Changes
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     startIcon={<CancelIcon />}
//                     onClick={handleCancelEdit}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <Button variant="contained" color="secondary" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Change Password Dialog */}
//       <Dialog open={openPasswordDialog} onClose={handlePasswordChangeClose}>
//         <DialogTitle>Change Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Current Password"
//             type="password"
//             name="currentPassword"
//             value={passwordData.currentPassword}
//             onChange={handlePasswordInputChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             name="newPassword"
//             value={passwordData.newPassword}
//             onChange={handlePasswordInputChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Confirm New Password"
//             type="password"
//             name="confirmPassword"
//             value={passwordData.confirmPassword}
//             onChange={handlePasswordInputChange}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handlePasswordChangeClose}>Cancel</Button>
//           <Button onClick={handlePasswordSave} color="primary" variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/Navbar";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import defaultProfilePic from "../components/imgs/customer.png";
import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://agrihub-backend-pvfl.onrender.com/api/users/profile", {
          withCredentials: true, // Ensure cookies are sent
        });
        console.log("Profile fetch response:", response.data); // Debug log
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          // Unauthorized, redirect to login
          navigate("/login");
        } else {
          // Other errors, stay on page but show an error state
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("https://agrihub-backend-pvfl.onrender.com/api/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  // Handle edit toggle
  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(user);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile save
  const handleSave = async () => {
    try {
      const response = await axios.put(
        "https://agrihub-backend-pvfl.onrender.com/api/users/update",
        formData,
        { withCredentials: true }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error.response?.data || error.message);
    }
  };

  // Handle password change dialog
  const handlePasswordChangeOpen = () => setOpenPasswordDialog(true);
  const handlePasswordChangeClose = () => {
    setOpenPasswordDialog(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      await axios.put(
        "https://agrihub-backend-pvfl.onrender.com/api/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );
      alert("Password changed successfully!");
      handlePasswordChangeClose();
    } catch (error) {
      console.error("Failed to change password:", error.response?.data || error.message);
      alert("Error changing password. Please check your current password.");
    }
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#4CAF50" },
      secondary: { main: "#f50057" },
      background: { default: "#f4f4f4" },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" },
        },
      },
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

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">Unable to load profile. Please log in again.</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/login")} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 10, p: 3, bgcolor: "background.default" }}>
        <Grid container spacing={4}>
          {/* Profile Picture & Basic Info */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  src={user.profilePhoto || defaultProfilePic}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ width: 150, height: 150, mx: "auto", mb: 2, border: "4px solid #4CAF50" }}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {user.location || "No location provided"}
                </Typography>
                {!isEditing && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleEditClick}
                    sx={{ mb: 1 }}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LockIcon />}
                  onClick={handlePasswordChangeOpen}
                >
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Profile Details
                </Typography>
                {[
                  { label: "Customer ID", name: "username", type: "text", disabled: true },
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "mobile", type: "text" },
                ].map(({ label, name, type, disabled }) => (
                  <Grid container spacing={2} sx={{ mb: 2 }} key={name}>
                    <Grid item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                        {label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      {isEditing && !disabled ? (
                        <TextField
                          fullWidth
                          type={type}
                          name={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          {user[name] || "N/A"}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handlePasswordChangeClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordChangeClose}>Cancel</Button>
          <Button onClick={handlePasswordSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfilePage;