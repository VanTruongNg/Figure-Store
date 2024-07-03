import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../common/redux";
import { MdSwitchAccount } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useState } from "react";
import { LoginModal, RegisterModal } from "../../pages/AuthPage/components";

const FloatingButton = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleOpenLoginModal = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div>
      <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
        <div
          onClick={handleOpenLoginModal}
          className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer"
        >
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">
            {isLoggedIn ? "Profile" : "Login"}
          </p>
        </div>
        <Link to="/cart">
          <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
            <div className="flex justify-center items-center">
              <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
              <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-xs font-semibold font-titleFont">Buy Now</p>
            {cart.length > 0 && (
              <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cart.length}
              </p>
            )}
          </div>
        </Link>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onOpenRegisterModal={handleOpenRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default FloatingButton;
