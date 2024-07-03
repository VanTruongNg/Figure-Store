// components/AddressTable.tsx
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../common/redux";
import {
  deleteAddress,
  getUserAddress,
  patchSetDefaultAddress,
  postAddUserAddress,
  putUpdateAddress,
} from "../../../store/redux-thunk/UserThunk";

interface AddressTableProps {
  defaultAddress: UserAddress;
}

const AddressTable = ({ defaultAddress }: AddressTableProps) => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.user.address);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const defaultAddressUpdated = useAppSelector(
    (state) => state.user.defaultAddress
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<UserAddress>({
    id: "",
    address: "",
    district: "",
    province: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserAddress());
    }
  }, [dispatch]);

  const handleCreate = () => {
    const { id, ...newAddress } = currentAddress;
    dispatch(postAddUserAddress(newAddress)).then(() => {
      toast.success("Thêm mới địa chỉ thành công");
      setCurrentAddress({ id: "", address: "", district: "", province: "" });
      setModalOpen(false);
    });
  };

  const handleUpdate = () => {
    dispatch(putUpdateAddress(currentAddress)).then(() => {
      toast.success("Cập nhật địa chỉ thành công");
      setModalOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    if (defaultAddressUpdated?.id === id) {
      toast.error("Không thể xoá địa chỉ mặc định");
      return;
    }

    // Xoá địa chỉ nếu không phải là địa chỉ mặc định
    dispatch(deleteAddress(id)).then(() => {
      toast.success("Xoá địa chỉ thành công");
    });
  };

  const handleSetDefault = (addressId: any) => {
    dispatch(patchSetDefaultAddress(addressId)).then(() => {
      toast.success("Địa chỉ mặc định đã được thay đổi");
    });
  };

  const openModal = (address: UserAddress | null) => {
    if (address) {
      setCurrentAddress(address);
      setEditMode(true);
    } else {
      setCurrentAddress({ id: "", address: "", district: "", province: "" });
      setEditMode(false);
    }
    setModalOpen(true);
  };

  const currentDefaultAddress: any = defaultAddressUpdated
    ? defaultAddressUpdated
    : defaultAddress;

  const sortedAddresses = [...addresses].sort((a, b) =>
    a.id === currentDefaultAddress?.id
      ? -1
      : b.id === currentDefaultAddress?.id
      ? 1
      : 0
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Address Management
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal(null)}
          >
            Add Address
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Quận</TableCell>
                <TableCell>Tỉnh</TableCell>
                <TableCell>Địa chỉ mặc định</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAddresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.district}</TableCell>
                  <TableCell>{address.province}</TableCell>
                  <TableCell>
                    {currentDefaultAddress?.id === address.id ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openModal(address)}
                      sx={{ mr: 2 }}
                    >
                      Edit
                    </Button>
                    {currentDefaultAddress?.id !== address.id && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSetDefault(address.id)}
                        sx={{ mr: 2 }}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{editMode ? "Edit Address" : "Add Address"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Address"
            variant="outlined"
            value={currentAddress.address}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, address: e.target.value })
            }
            sx={{ mb: 2, width: "100%" }}
          />
          <TextField
            label="District"
            variant="outlined"
            value={currentAddress.district}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, district: e.target.value })
            }
            sx={{ mb: 2, width: "100%" }}
          />
          <TextField
            label="Province"
            variant="outlined"
            value={currentAddress.province}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, province: e.target.value })
            }
            sx={{ mb: 2, width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={editMode ? handleUpdate : handleCreate}
            color="primary"
          >
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddressTable;
