import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
} from "@mui/material";

const PaymentInfo = ({ handleNext, handleBack, setPaymentInfo }: any) => {
  const [paymentMethod, setPaymentMethod] = useState("Ship COD");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const handleNextStep = () => {
    const paymentData = {
      method: paymentMethod,
      accountName:
        paymentMethod === "Chuyển toàn bộ" ||
        paymentMethod === "Chuyển trước 50%"
          ? accountName
          : null,
      accountNumber:
        paymentMethod === "Chuyển toàn bộ" ||
        paymentMethod === "Chuyển trước 50%"
          ? accountNumber
          : null,
      bankName:
        paymentMethod === "Chuyển toàn bộ" ||
        paymentMethod === "Chuyển trước 50%"
          ? bankName
          : null,
    };
    setPaymentInfo(paymentData);
    handleNext();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Information
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="Ship COD"
            control={<Radio />}
            label="Ship COD"
          />
          <FormControlLabel
            value="Chuyển toàn bộ"
            control={<Radio />}
            label="Chuyển toàn bộ"
          />
          <FormControlLabel
            value="Chuyển trước 50%"
            control={<Radio />}
            label="Chuyển trước 50%"
          />
        </RadioGroup>
      </FormControl>
      {paymentMethod === "Chuyển toàn bộ" ||
      paymentMethod === "Chuyển trước 50%" ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên tài khoản"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số tài khoản"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên ngân hàng"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
      ) : null}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextStep}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentInfo;
