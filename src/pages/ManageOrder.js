// import React, { useEffect, useState } from "react";
// import { Table, Tag, Button, message } from "antd";
// import axios from "axios";
// // import Sidebar from "../components/Sidebar";
// // import "./styles/ManageOrder.css";

// const ManageOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all orders (Admin only)
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/all-orders", { withCredentials: true });
//         setOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         message.error("Failed to fetch orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Handle Order Status Update
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await axios.put(`https://agrihub-backend.onrender.com/api/orders/${orderId}`, { status }, { withCredentials: true });
//       message.success("Order status updated.");
//       setOrders(orders.map(order => (order.orderId === orderId ? { ...order, status } : order)));
//     } catch (error) {
//       console.error("Error updating order:", error);
//       message.error("Failed to update order.");
//     }
//   };

//   // Define table columns
//   const columns = [
//     { title: "Order ID", dataIndex: "orderId", key: "orderId" },
//     { title: "Customer", dataIndex: "customerName", key: "customerName" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Address", dataIndex: "address", key: "address" },
//     { title: "Crop", dataIndex: "crop", key: "crop" },
//     {
//       title: "Total Amount",
//       dataIndex: "totalAmount",
//       key: "totalAmount",
//       render: (amount) => `₹${amount.toFixed(2)}`,
//     },
//     {
//       title: "Payment",
//       dataIndex: "paymentMethod",
//       key: "paymentMethod",
//       render: (method) => <Tag color={method === "Pay Later" ? "red" : "green"}>{method}</Tag>,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status, record) => (
//         <select value={status} onChange={(e) => updateOrderStatus(record.orderId, e.target.value)}>
//           <option value="Pending">Pending</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       ),
//     },
//   ];

//   return (
//     <div className="manage-order-page">
//       {/* <Sidebar /> */}
//       <div className="order-content">
//         <h2>Manage Orders</h2>
//         <Table dataSource={orders} columns={columns} rowKey="orderId" loading={loading} />
//       </div>
//     </div>
//   );
// };

// export default ManageOrder;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { 
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  MenuItem, Select, Typography, CircularProgress 
} from "@mui/material";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://agrihub-backend.onrender.com/api/orders/list");
      setOrders(res.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const handleEditStatus = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`https://agrihub-backend.onrender.com/api/orders/update/${selectedOrder._id}`, {
        status: updatedStatus,
      }, { withCredentials: true });

      setOpen(false);
      fetchOrders(); // Refresh orders after updating
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const columns = [
    { field: "orderId", headerName: "Order ID", flex: 2 },
    { field: "user", headerName: "User", flex: 2, valueGetter: (params) => params.row?.user?.name || "Guest" },
    { field: "paymentStatus", headerName: "Payment", flex: 1, valueGetter: (params) => params.row?.paymentStatus || "N/A" },
    { field: "totalAmount", headerName: "Total Amount", flex: 1, valueGetter: (params) => `₹${params.row?.totalAmount || 0}` },
    { 
      field: "status", 
      headerName: "Order Status", 
      flex: 1, 
      renderCell: (params) => (
        <Box 
          sx={{
            padding: "4px 8px", 
            borderRadius: "6px", 
            bgcolor: params.value === "Delivered" ? "green" : params.value === "Shipped" ? "orange" : "red",
            color: "white", 
            fontWeight: "bold"
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleEditStatus(params.row)}>
          Update Status
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid 
            rows={orders} 
            columns={columns} 
            getRowId={(row) => row._id}
            disableSelectionOnClick 
            pageSize={10} 
            autoPageSize 
          />
        </Box>
      )}

      {/* Order Status Update Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography>
            Change status for <b>Order #{selectedOrder?.orderId}</b>
          </Typography>
          <Select
            fullWidth
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateStatus}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageOrders;
