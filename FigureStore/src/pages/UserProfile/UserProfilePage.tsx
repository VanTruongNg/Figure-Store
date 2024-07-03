import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import {
  patchChangePassword,
  patchProfileImage,
  patchUserProfile,
} from "../../store/redux-thunk/UserThunk";
import { toast } from "react-toastify";
import { logoutUser } from "../../store/redux-thunk/AuthThunk";
import AddressTable from "./components/UserAddress";

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: "auto",
}));

const UserProfilePage = () => {
  const userInfo = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const imgUrl = useAppSelector((state) => state.user.profileImage);
  const firstNameUpdated = useAppSelector((state) => state.user.firstName);
  const lastNameUpdated = useAppSelector((state) => state.user.lastName);
  const phoneNumberUpdated = useAppSelector((state) => state.user.phoneNumber);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (firstNameUpdated !== null) setFirstName(firstNameUpdated);
    if (lastNameUpdated !== null) setLastName(lastNameUpdated);
    if (phoneNumberUpdated !== null) setPhoneNumber(phoneNumberUpdated);
  }, [firstNameUpdated, lastNameUpdated, phoneNumberUpdated]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  const handleProfileImageUpload = () => {
    if (profileImageFile) {
      const formData = new FormData();
      formData.append("image", profileImageFile);
      dispatch(patchProfileImage(formData));
    }
    toast.success("Cập nhật ảnh đại diện thành công!");
  };

  const handleProfileUpdate = () => {
    dispatch(patchUserProfile({ firstName, lastName, phoneNumber })).then(
      () => {
        toast.success("Cập nhật thông tin người dùng thành công!");
      }
    );
  };

  const handleChangePassword = () => {
    dispatch(patchChangePassword({ oldPassword, newPassword, confirmPassword }))
      .unwrap()
      .then(() => {
        toast.success(
          "Thay đổi mật khẩu thành công, Bạn cần đăng nhập lại. Sẽ đăng xuất sau 3 giây"
        );
        setTimeout(() => {
          dispatch(logoutUser());
        }, 3000);
      });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                {imgUrl ? (
                  <ProfileImage
                    src={`http://localhost:8080/images/${imgUrl}`}
                    alt="Profile Image"
                  />
                ) : (
                  <ProfileImage
                    src={`http://localhost:8080/images/${userInfo?.profileImage}`}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={{ marginTop: "16px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileImageUpload}
                  sx={{ mt: 2 }}
                >
                  Update Profile Image
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Update Profile Details
                </Typography>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileUpdate}
                >
                  Update Profile
                </Button>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Change Password
                </Typography>
                <TextField
                  label="Old Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Container>
        <Box sx={{ my: 4 }}>
          <AddressTable defaultAddress={userInfo?.defaultAddress} />
        </Box>
      </Container>
    </Container>
  );
};

export default UserProfilePage;
