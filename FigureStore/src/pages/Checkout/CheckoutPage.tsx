import React, { useState, useEffect } from "react";
import { Box, Container, Stepper, Step, StepLabel } from "@mui/material";
import ReviewCart from "./components/ReviewCart";
import ShippingAddress from "./components/ShippingAddress";
import PaymentInfo from "./components/PaymentInfo";
import ReviewOrder from "./components/ReviewOrder";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import {
  postAddProductToOrder,
  postCreateOrder,
} from "../../store/redux-thunk/OrderThunk";
import { deleteRemoveProduct } from "../../store/redux-thunk/CartThunk";
import { orderAction } from "../../store/redux-slices";
import { useNavigate } from "react-router-dom";

interface Address {
  address: string;
  district: string;
  province: string;
}

interface Payment {
  method: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

const steps = [
  "Review Cart",
  "Shipping Address",
  "Payment Information",
  "Review and Confirm",
];

const CheckoutPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<Payment | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(0);
  console.log(shippingFee);
  const orderId = useAppSelector((state) => state.order.orderId);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId && activeStep === 3) {
      handleAddProductsToOrder();
    }
  }, [orderId, activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = async () => {
    const orderAmount =
      cart.cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) + shippingFee;
    try {
      await dispatch(postCreateOrder({ amount: orderAmount }));
    } catch (error: any) {
      console.log("Lỗi khi tạo đơn hàng: ", error);
    }
  };

  const handleAddProductsToOrder = async () => {
    try {
      await Promise.all(
        cart.cart.map((item) => {
          dispatch(
            postAddProductToOrder({ orderId: orderId!, cartItems: item })
          );
        })
      );
      await Promise.all(
        cart.cart.map(async (item) => {
          dispatch(deleteRemoveProduct({ cartId: cart.cartId, item }));
        })
      );

      dispatch(orderAction.clearOrderId());
      navigate("/order?message=Đặt hàng thành công!");
    } catch (error: any) {
      console.log("Lỗi khi thêm sản phẩm vào đơn hàng: ", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <ReviewCart handleNext={handleNext} />}
        {activeStep === 1 && (
          <ShippingAddress
            handleNext={handleNext}
            handleBack={handleBack}
            setShippingAddress={setShippingAddress}
          />
        )}
        {activeStep === 2 && (
          <PaymentInfo
            handleNext={handleNext}
            handleBack={handleBack}
            setPaymentInfo={setPaymentInfo}
          />
        )}
        {activeStep === 3 && (
          <ReviewOrder
            handleBack={handleBack}
            handlePlaceOrder={handlePlaceOrder}
            shippingAddress={shippingAddress}
            paymentInfo={paymentInfo}
            setShippingFee={setShippingFee}
          />
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
