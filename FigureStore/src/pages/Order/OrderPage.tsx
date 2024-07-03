// src/components/OrderPage.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import { getOrderByUser } from "../../store/redux-thunk/OrderThunk";
import { formatDate, formatPrice } from "../../utils";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const orders = useAppSelector((state) => state.order.order);

  useEffect(() => {
    dispatch(getOrderByUser());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      toast.success(message);
    }
  }, [location]);

  const mapStatusToText = (status: any) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      default:
        return status;
    }
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
          <TableCell>{formatDate(order.orderDate)}</TableCell>
          <TableCell>{mapStatusToText(order.status)}</TableCell>
          <TableCell>{formatPrice(order.amount)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom component="div">
                    Đơn hàng
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Giá sản phẩm</TableCell>
                        <TableCell>Hình ảnh</TableCell>
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
    <Container>
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
                      <TableCell>Order ID</TableCell>
                      <TableCell>Ngày đặt hàng</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Tổng giá tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <CollapsibleTableRow key={order.id} order={order} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderPage;
