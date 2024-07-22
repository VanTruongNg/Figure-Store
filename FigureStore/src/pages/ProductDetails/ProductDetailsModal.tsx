import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import {
  postAddToCart,
  putUpdateQantity,
} from "../../store/redux-thunk/CartThunk";
import { formatPrice } from "../../utils";

const ProductDetailsModal = ({ open, onClose, item }: any) => {
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const dispatch = useAppDispatch();
  const cartId = useAppSelector((state) => state.cart.cartId);
  const products = useAppSelector((state) => state.cart.cart);

  if (!item || !open) return null;

  const splitDescription = (description: string) => {
    const index = description.indexOf("Series:");
    if (index !== -1) {
      const characterPart = description.substring(0, index).trim();
      const seriesPart = description.substring(index).trim();
      return { characterPart, seriesPart };
    }
    return { characterPart: description, seriesPart: "" };
  };

  const { characterPart, seriesPart } = splitDescription(item.description);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
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
    } else {
      const productToAdd = {
        cartId: cartId,
        product: item,
        quantity: 1,
      };
      dispatch(postAddToCart(productToAdd));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-1/2 flex flex-col items-center">
          <div className="mb-4">
            <img
              src={`http://localhost:8080/images/${selectedImage.url}`}
              alt="Selected"
              className="w-80 h-80 object-contain border"
            />
          </div>
          <div className="flex flex-wrap justify-center">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8080/images/${image.url}`}
                alt={`Product ${index}`}
                className={`w-16 h-16 object-contain cursor-pointer mb-2 mx-1 border ${
                  selectedImage === image ? "border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 pl-6">
          <div className="flex justify-between items-center pb-3">
            <h2 className="text-2xl font-bold">{item.name}</h2>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Mô tả:</p>
            <p>{characterPart}</p>
            {seriesPart && <p>{seriesPart}</p>}
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Danh mục:</p>
            <p>{item.category[0]?.name || "Unknown Category"}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Brand:</p>
            <p>{item.brand || "Unknown Brand"}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold">Giá:</p>
            <p className="text-xl font-bold">{formatPrice(item.price)} VND</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-6 py-2 px-4 bg-primeColor text-white rounded-md shadow-md hover:bg-primeColor-dark focus:outline-none focus:ring-2 focus:ring-primeColor-light focus:ring-opacity-75 transform hover:scale-105 transition-transform duration-300 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
