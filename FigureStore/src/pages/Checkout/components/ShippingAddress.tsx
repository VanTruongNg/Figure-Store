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
import {
  getUserAddress,
  patchSetDefaultAddress,
} from "../../../store/redux-thunk/UserThunk"; // Import thunk action
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

  const handleAddressChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const addressId = event.target.value as string;
    setSelectedAddress(addressId);
    handleSetDefault(addressId);
  };

  const handleSetDefault = (addressId: any) => {
    dispatch(patchSetDefaultAddress(addressId)).then(() => {
      dispatch(getUserAddress());
    });
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
