import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../../common/redux";
import { postRegister } from "../../../store/redux-thunk/AuthThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    dispatch(
      postRegister({ email, password, firstName, lastName, phoneNumber })
    )
      .unwrap()
      .then(() => {
        onClose(); // Đóng RegisterModal khi đăng ký thành công
        toast.success("Đăng ký thành công");
        navigate("/");
      })
      .catch((error: any) => {
        console.error("Registration failed:", error);
        toast.error("Đăng ký thất bại");
      });
  };

  const handleCloseModal = () => {
    onClose();
    onSwitchToLogin();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Register</h2>
          <MdClose
            className="text-2xl cursor-pointer"
            onClick={handleCloseModal}
          />
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <button className="w-full bg-primeColor text-white py-2 rounded-md">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Đã có tài khoản?{" "}
            <button
              className="text-primeColor underline"
              onClick={handleCloseModal}
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
