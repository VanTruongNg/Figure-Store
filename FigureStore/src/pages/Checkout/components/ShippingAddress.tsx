// src/components/Checkout/ShippingAddress.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../common/redux";
import { getUserAddress } from "../../../store/redux-thunk/UserThunk";
import { toast } from "react-toastify";

const ShippingAddress = ({
  handleNext,
  handleBack,
  setShippingAddress,
}: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addresses = useAppSelector((state) => state.user.address);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    dispatch(getUserAddress());
  }, [dispatch]);

  const handleAddressChange = (event: any) => {
    setSelectedAddress(event.target.value);
  };

  const handleNextStep = () => {
    if (!selectedAddress) {
      toast.warning("Chọn địa chỉ hoặc thêm địa chỉ mới!");
      return;
    }
    const address = addresses.find((addr) => addr.id === selectedAddress);
    setShippingAddress(address);
    handleNext();
  };

  const handleAddNewAddress = () => {
    navigate("/profile");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shipping Address
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Select Address</InputLabel>
        <Select value={selectedAddress} onChange={handleAddressChange}>
          <MenuItem value="" disabled>
            Select an address
          </MenuItem>
          {addresses.map((address) => (
            <MenuItem key={address.id} value={address.id}>
              {`${address.address}, ${address.district}, ${address.province}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
          sx={{ mr: 2 }}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddNewAddress}
        >
          Add New Address
        </Button>
      </Box>
    </Box>
  );
};

export default ShippingAddress;
