import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import { Link, useNavigate } from "react-router-dom";
import Flex from "./Flex";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { motion } from "framer-motion";
import { FaCaretDown, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { authAction, cartAction, homeAction } from "../../store/redux-slices";
import { logoutUser } from "../../store/redux-thunk/AuthThunk";
import { toast } from "react-toastify";
import { LoginModal, RegisterModal } from "../../pages/AuthPage/components"; // Adjust import path as needed
import { formatPrice } from "../../utils";

const BottomHeader = () => {
  const products = useAppSelector((state) => state.home.products);
  const cartItem = useAppSelector((state) => state.cart.cart);
  const [show, setShow] = useState<boolean>(false);
  const categories = useAppSelector((state) => state.home.categories);
  const [showUser, setShowUser] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false); // State for Login Modal
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false); // State for Register Modal
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); // Check login status

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleCategoryClick = (categoryName: any) => {
    dispatch(homeAction.clearCheckedCategories());
    const categoryToToggle = categories.find(
      (cate) => cate.name === categoryName
    );
    if (categoryToToggle) {
      dispatch(homeAction.toggleCategory(categoryToToggle));
    }
    navigate(`/collections/${categoryName.toLowerCase().split(" ").join("-")}`);
    setShow(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        toast.warning("Tài khoản đã được đăng xuất");
        dispatch(cartAction.clearCart());
        dispatch(authAction.clearUser());
      })
      .catch((error: any) => {
        console.error("Logout error:", error);
      });
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenModal = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Shop by Category dropdown */}
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                  >
                    {category.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item: any) => (
                    <div
                      key={item.id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img
                        className="w-24"
                        src={`http://localhost:8080/images/${item.images[0].url}`}
                        alt={item.name}
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-xs">
                          {item.description.length > 100
                            ? `${item.des.slice(0, 100)}...`
                            : item.description}
                        </p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            {formatPrice(item.price)} VND
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* User actions */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                <li
                  onClick={handleOpenModal}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                >
                  {isLoggedIn ? "Profile" : "Login / Sign Up"}
                </li>
                {isLoggedIn && (
                  <>
                    <li
                      onClick={() => {
                        handleLogout();
                        setShowUser(false);
                      }}
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    >
                      Logout
                    </li>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      <Link to="/order" className="text-gray-400">
                        Your Orders
                      </Link>
                    </li>
                  </>
                )}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {cartItem.length > 0 ? cartItem.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onOpenRegisterModal={handleOpenRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleOpenLoginModal}
      />
    </div>
  );
};

export default BottomHeader;
