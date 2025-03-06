import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import TerrainIcon from "@mui/icons-material/Terrain";
import WaterIcon from "@mui/icons-material/Water";
import BugReportIcon from "@mui/icons-material/BugReport";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CropManagement = () => {
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#388E3C" },
      secondary: { main: "#4CAF50" },
      background: { default: "#f5f5f5", paper: "#fff" },
      text: { primary: "#212121", secondary: "#757575" },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: "8px", textTransform: "none" },
        },
      },
    },
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tools = [
    {
      title: "Crop Planning",
      desc: "Schedule planting and harvesting with a timeline tailored to crop types and seasons.",
      icon: <AgricultureIcon />,
      link: "/crop-planning", // Link to new page
    },
    {
      title: "Soil Health Tracker",
      desc: "Monitor soil moisture, nutrients, and pH to ensure optimal growing conditions.",
      icon: <TerrainIcon />,
    },
    {
      title: "Irrigation Scheduler",
      desc: "Plan watering based on weather forecasts and crop water needs to save resources.",
      icon: <WaterIcon />,
    },
    {
      title: "Pest & Disease Alerts",
      desc: "Get real-time notifications and prevention tips for pest and disease risks.",
      icon: <BugReportIcon />,
    },
    {
      title: "Yield Forecasting",
      desc: "Predict crop yields using data to plan resources and maximize profits.",
      icon: <TrendingUpIcon />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          {/* Back Button */}
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ mb: 4, color: "#388E3C", borderColor: "#388E3C" }}
          >
            Back to Home
          </Button>

          {/* Header */}
          <Box component={motion.section} initial="hidden" animate="visible" variants={fadeIn}>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "text.primary",
                mb: 6,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Crop Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mb: 8,
                fontSize: { xs: "1rem", md: "1.2rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Discover how AgriHub’s tools help you manage your crops effectively, from planning to harvest.
            </Typography>
          </Box>

          {/* Tools Grid */}
          <Grid container spacing={4}>
            {tools.map((tool, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ bgcolor: "#E8F5E9", textAlign: "center" }}>
                  <CardContent>
                    <IconButton sx={{ color: "#388E3C", fontSize: "3rem", mb: 2 }}>
                      {tool.icon}
                    </IconButton>
                    <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                      {tool.desc}
                    </Typography>
                    {tool.link && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(tool.link)}
                      >
                        Learn More
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CropManagement;