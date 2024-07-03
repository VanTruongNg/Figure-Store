import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../common/redux";
import { formatPrice } from "../../../utils";
import { useEffect } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
  marginBottom: theme.spacing(2),
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ReviewOrder = ({
  handleBack,
  handlePlaceOrder,
  shippingAddress,
  paymentInfo,
  setShippingFee,
}: any) => {
  const cart = useAppSelector((state) => state.cart.cart);

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shippingFee = totalAmount < 1000000 ? 30000 : 0;

  let finalAmount = totalAmount;
  let paymentLabel = "Tiền cần thanh toán";
  if (paymentInfo.method === "Ship COD") {
    finalAmount += shippingFee;
  } else if (paymentInfo.method === "Chuyển trước 50%") {
    finalAmount /= 2;
    paymentLabel = `Tiền cần thanh toán (Chuyển trước ${formatPrice(
      finalAmount
    )} - Số tiền còn lại khi nhận hàng)`;
  } 

  useEffect(() => {
    setShippingFee(shippingFee);
  }, [shippingFee, setShippingFee]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Review Order
      </Typography>
      <SectionPaper>
        <Typography variant="h6" gutterBottom>
          Địa chỉ giao hàng
        </Typography>
        <Typography>{`${shippingAddress.address}, ${shippingAddress.district}, ${shippingAddress.province}`}</Typography>
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>
          Thông tin thanh toán
        </Typography>
        <Typography>Phương thức thanh toán: {paymentInfo.method}</Typography>
        {paymentInfo.method === "Chuyển toàn bộ" ||
        paymentInfo.method === "Chuyển trước 50%" ? (
          <>
            <Typography>Tên tài khoản: {paymentInfo.accountName}</Typography>
            <Typography>Số tài khoản: {paymentInfo.accountNumber}</Typography>
            <Typography>Tên ngân hàng: {paymentInfo.bankName}</Typography>
          </>
        ) : null}
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>
          Sản phẩm
        </Typography>
        <Grid container spacing={2}>
          {cart.map((item) => (
            <Grid item key={item.product.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardMedia
                  component="img"
                  alt={item.product.name}
                  sx={{
                    width: "auto",
                    height: 100,
                    objectFit: "cover",
                    marginRight: 2,
                  }}
                  image={
                    item.product.images.length > 0
                      ? `http://localhost:8080/images/${item.product.images[0].url}`
                      : "https://via.placeholder.com/150"
                  }
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6" noWrap>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatPrice(item.product.price)} VND x Số lượng:{" "}
                    {item.quantity}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </SectionPaper>

      <SectionPaper>
        <Typography variant="h6" gutterBottom>
          {paymentLabel}
        </Typography>
        <Typography variant="h5">{formatPrice(finalAmount)} VND</Typography>
      </SectionPaper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
          Quay lại
        </Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrder;
