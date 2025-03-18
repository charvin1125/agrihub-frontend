// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavigationBar from "../components/Navbar";
// import "./styles/ProfilePage.css";
// import defaultProfilePic from "../components/imgs/customer.png"; // Add a default profile picture

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setFormData(userData); // Initialize form data with user data
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleDelete = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setFormData(user); // Revert changes if cancel is clicked
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     localStorage.setItem("user", JSON.stringify(formData));
//     setUser(formData); // Update user data
//     setIsEditing(false);
//   };

//   if (!user) return null;

//   return (
//     <section style={{ backgroundColor: "#eee", padding: "2rem 0" }}>
//        <NavigationBar />
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-4">
//             <div className="card mb-4">
//               <div className="card-body text-center">
//                 <img
//                   src={user.profilePhoto || defaultProfilePic}
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: "150px" }}
//                 />
//                 <p className="text-muted mb-1">{user.firstName} {user.lastName}</p>
//                 <p className="text-muted mb-4">{user.location || ""}</p>
//                 <div className="d-flex justify-content-center mb-2">
//                   {!isEditing && (
//                     <button className="btn btn-primary" onClick={handleEditClick}>
//                       Edit Profile
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-8">
//             <div className="card mb-4">
//               <div className="card-body">
//                 {/* Customer ID row */}
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <span>Customer ID</span>
//                   </div>
//                   <div className="col-sm-9">
//                     <span className="text-muted">{user.username}</span>
//                   </div>
//                 </div>
//                 <hr />
                
//                 {/* Full Name */}
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <span>Full Name</span>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         className="form-control"
//                       />
//                     ) : (
//                       <span className="text-muted">{user.firstName} {user.lastName}</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

//                 {/* Email */}
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <span>Email</span>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="form-control"
//                       />
//                     ) : (
//                       <span className="text-muted">{user.email}</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

//                 {/* Phone */}
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <span>Phone</span>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleChange}
//                         className="form-control"
//                       />
//                     ) : (
//                       <span className="text-muted">{user.mobile}</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

              
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="row">
//               <div className="col-md-6">
//                 {isEditing ? (
//                   <>
//                     <button className="btn btn-success w-100" onClick={handleSave}>
//                       Save Changes
//                     </button>
//                     <button className="btn btn-secondary w-100 mt-2" onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button className="btn btn-danger w-100" onClick={handleDelete}>
//                     Delete Account
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfilePage;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import NavigationBar from "../components/Navbar";
// import "./styles/ProfilePage.css";
// import defaultProfilePic from "../components/imgs/customer.png"; // Default profile image

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/profile", {
//           withCredentials: true, // Ensure cookies (session) are sent with request
//         });
//         setUser(response.data);
//         setFormData(response.data); // Initialize form data with user data
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         navigate("/login"); // Redirect to login if session expired
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   const handleLogout = () => {
//     axios.post("https://agrihub-backend-xu19.onrender.com/api/users/logout", {}, { withCredentials: true })
//       .then(() => {
//         localStorage.removeItem("user");
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout failed:", error));
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setFormData(user); // Revert changes if cancel is clicked
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put("https://agrihub-backend-xu19.onrender.com/api/users/update", formData, {
//         withCredentials: true,
//       });
//       setUser(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <section style={{ backgroundColor: "#eee", padding: "2rem 0" }}>
//       <NavigationBar />
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-4">
//             <div className="card mb-4">
//               <div className="card-body text-center">
//                 <img
//                   src={user.profilePhoto || defaultProfilePic}
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: "150px", height: "150px", objectFit: "cover" }}
//                 />
//                 <p className="text-muted mb-1">{user.firstName} {user.lastName}</p>
//                 <p className="text-muted mb-4">{user.location || "No location provided"}</p>
//                 {!isEditing && (
//                   <button className="btn btn-primary" onClick={handleEditClick}>
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-8">
//             <div className="card mb-4">
//               <div className="card-body">
//                 {[
//                   { label: "Customer ID", name: "username", type: "text", disabled: true },
//                   { label: "First Name", name: "firstName", type: "text" },
//                   { label: "Last Name", name: "lastName", type: "text" },
//                   { label: "Email", name: "email", type: "email" },
//                   { label: "Phone", name: "mobile", type: "text" },
//                 ].map(({ label, name, type, disabled }) => (
//                   <div key={name} className="row mb-2">
//                     <div className="col-sm-3">
//                       <span>{label}</span>
//                     </div>
//                     <div className="col-sm-9">
//                       {isEditing && !disabled ? (
//                         <input
//                           type={type}
//                           name={name}
//                           value={formData[name]}
//                           onChange={handleChange}
//                           className="form-control"
//                         />
//                       ) : (
//                         <span className="text-muted">{user[name]}</span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="row">
//               <div className="col-md-6">
//                 {isEditing ? (
//                   <>
//                     <button className="btn btn-success w-100" onClick={handleSave}>
//                       Save Changes
//                     </button>
//                     <button className="btn btn-secondary w-100 mt-2" onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button className="btn btn-danger w-100" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
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
        const response = await axios.get("https://agrihub-backend-xu19.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    axios
      .post("https://agrihub-backend-xu19.onrender.com/api/users/logout", {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => console.error("Logout failed:", error));
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
      const response = await axios.put("https://agrihub-backend-xu19.onrender.com/api/users/update", formData, {
        withCredentials: true,
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
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
        "https://agrihub-backend-xu19.onrender.com/api/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );
      alert("Password changed successfully!");
      handlePasswordChangeClose();
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Error changing password. Please check your current password.");
    }
  };

  // Theme configuration
  const theme = createTheme({
    palette: {
      primary: { main: "#4CAF50" }, // Green for AgriHub theme
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

  if (!user) return null;

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