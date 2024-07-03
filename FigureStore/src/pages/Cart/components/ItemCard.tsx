import { useAppDispatch, useAppSelector } from "../../../common/redux";
import { ImCross } from "react-icons/im";
import { cartAction } from "../../../store/redux-slices";
import { formatPrice } from "../../../utils";
import { webLogo } from "../../../assets";
import { debounce } from "lodash";
import { useCallback } from "react";
import {
  deleteRemoveProduct,
  putUpdateQantity,
} from "../../../store/redux-thunk/CartThunk";
import { toast } from "react-toastify";

const ItemCard = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const cartId = useAppSelector((state) => state.cart.cartId);
  const itemRender = item.product ? item.product : item;

  const debouncedUpdateQuantity = useCallback(
    debounce((cartId, productId, quantity) => {
      dispatch(putUpdateQantity({ cartId, item: { id: productId }, quantity }));
    }, 1000),
    []
  );

  const handleIncreaseQuantity = () => {
    dispatch(cartAction.increaseQuantity({ id: item.id }));
    const newQuantity = item.quantity + 1;
    debouncedUpdateQuantity(cartId, item.id, newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(cartAction.decreaseQuantity({ id: item.id }));
      const newQuantity = item.quantity - 1;
      debouncedUpdateQuantity(cartId, item.id, newQuantity);
    }
  };

  const handleDeleteItem = () => {
    dispatch(deleteRemoveProduct({ cartId: cartId, item: item }));
    toast.warning("SAO BẠN LẠI NỠ XOÁ ĐI");
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDeleteItem}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img
          className="w-32 h-32"
          src={
            itemRender.images && itemRender.images.length > 0
              ? `http://localhost:8080/images/${itemRender.images[0].url}`
              : webLogo
          }
          alt="productImage"
        />
        <h1 className="font-titleFont font-semibold">{itemRender.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {formatPrice(itemRender.price)} VND
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={handleDecreaseQuantity}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={handleIncreaseQuantity}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{formatPrice(item.quantity * itemRender.price)} VND</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
