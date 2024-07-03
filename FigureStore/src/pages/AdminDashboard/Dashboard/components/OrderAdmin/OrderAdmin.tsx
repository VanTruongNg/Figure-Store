import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "../../../../../common/redux";
import {
  getOrders,
  postUpdateOrderStatus,
} from "../../../../../store/redux-thunk/OrderThunk";
import { formatPrice } from "../../../../../utils";
import { toast } from "react-toastify";

const OrderAdmin = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orderAdmin);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(postUpdateOrderStatus({ id, status })).unwrap();
      toast.success("Thay đổi trạng thái đơn hàng thành công!");
    } catch (error: any) {
      toast.warn("Thay đổi trạng thái đơn hàng thất bại");
    }
  };

  const formatAddress = (addressDetail: any) => {
    if (!addressDetail) return "";
    const { address, district, province } = addressDetail;
    return `${address}, ${district}, ${province}`;
  };

  const CollapsibleTableRow = ({ order }: any) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.orderDate}</TableCell>
          <TableCell>
            <FormControl fullWidth>
              <InputLabel id={`status-label-${order.id}`}>Status</InputLabel>
              <Select
                labelId={`status-label-${order.id}`}
                id={`status-select-${order.id}`}
                value={order.status}
                label="Status"
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <MenuItem value="PENDING">Chờ xác nhận</MenuItem>
                <MenuItem value="SHIPPED">Đang vận chuyển</MenuItem>
                <MenuItem value="DELIVERED">Đã giao hàng</MenuItem>
                <MenuItem value="CANCELED">Huỷ đơn hàng</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
          <TableCell>{formatPrice(order.amount)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  User Details
                </Typography>
                <Typography>
                  Name: {order.user.firstname} {order.user.lastname}
                </Typography>
                <Typography>Phone: {order.user.phonenumber}</Typography>
                <Typography>
                  Address: {formatAddress(order.user.address)}
                </Typography>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom component="div">
                    Order Products
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Image</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.orderProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            <img
                              src={`http://localhost:8080/images/${product.image}`}
                              alt={product.productName}
                              width="50"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Box
        mt={7}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 1000 }}>
          <Grid item xs={12}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" mb={3}>
                Orders
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>ID</TableCell>
                      <TableCell>Order Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <CollapsibleTableRow key={order.id} order={order} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderAdmin;
