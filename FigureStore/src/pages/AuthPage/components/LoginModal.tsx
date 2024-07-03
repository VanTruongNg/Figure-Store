import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../../common/redux";
import { postAuth } from "../../../store/redux-thunk/AuthThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserCart } from "../../../store/redux-thunk/CartThunk";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegisterModal: () => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onOpenRegisterModal,
}: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postAuth({ email, password }))
      .unwrap()
      .then((response: any) => {
        onClose();
        toast.success("Đăng nhập thành công");
        if (response.user.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error: any) => {
        console.error("Login failed:", error);
        toast.error("Đăng nhập thất bại");
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          <MdClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-primeColor text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-primeColor underline"
            onClick={onOpenRegisterModal}
          >
            Chưa có tài khoản? Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
