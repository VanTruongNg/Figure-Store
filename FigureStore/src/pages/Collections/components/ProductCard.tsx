import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/redux";
import { cartAction } from "../../../store/redux-slices";
import Image from "../../../components/Layout/Image";
import { webLogo } from "../../../assets";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { formatPrice } from "../../../utils";
import {
  postAddToCart,
  putUpdateQantity,
} from "../../../store/redux-thunk/CartThunk";
import { toast } from "react-toastify";
import ProductDetailsModal from "../../ProductDetails/ProductDetailsModal";

const ProductCard = ({ item }: any) => {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const productName = item.name;
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const cartId = useAppSelector((state) => state.cart.cartId);
  const products = useAppSelector((state) => state.cart.cart);

  const nameString = (name: any) => {
    return String(name).toLowerCase().split(" ").join("-");
  };

  const handleProductsDetails = () => {
    setModalOpen(true);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const existingProduct = products.find(
        (product) => product.product.id === item.id
      );
      if (existingProduct) {
        const quantity = existingProduct.quantity + 1;
        dispatch(
          putUpdateQantity({
            cartId: cartId,
            item: existingProduct,
            quantity: quantity,
          })
        );
        toast.success("Số lượng sản phẩm đã được cập nhật");
      } else if (!existingProduct) {
        const productToAdd: any = {
          cartId: cartId,
          product: item,
          quantity: 1,
        };
        dispatch(postAddToCart(productToAdd));
        toast.success("Sốp cảm ơn nhiều nhen");
      } else {
        const productToAdd = {
          ...item,
          quantity: 1,
        };
        dispatch(cartAction.addToCart(productToAdd));
      }
    }
  };

  let imageSrc = webLogo;

  if (item.images && item.images.length > 0) {
    imageSrc = `http://localhost:8080/images/${item.images[0].url}`;
  }

  return (
    <div
      className="w-full relative group border border-gray-300 rounded-lg overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-80 relative overflow-hidden">
        <div onClick={handleProductsDetails}>
          <div className="relative w-full h-full">
            <Image
              className="w-full h-full object-cover transition-opacity duration-700"
              imgSrc={imageSrc}
              alt={item.name}
            />
            {item.images && item.images.length > 1 && (
              <Image
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
                imgSrc={`http://localhost:8080/images/${item.images[1].url}`}
                alt={item.name}
              />
            )}
          </div>
        </div>
        <div className="absolute w-full h-20 bg-white -bottom-20 group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Thêm vào giỏ hàng
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductsDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Chi tiết sản phẩm
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 flex-grow">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-primeColor font-bold overflow-hidden overflow-ellipsis max-w-full">
              {item.name}
            </h2>
            <p className="text-[#767676] text-[14px]">
              {formatPrice(item.price)} VND
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[#767676] text-[14px]">
              {item.category[0]?.name || "Unknown Category"}
            </p>
          </div>
        </div>
      </div>
      <ProductDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={item}
      />
    </div>
  );
};

export default ProductCard;
