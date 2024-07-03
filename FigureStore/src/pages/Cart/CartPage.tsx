import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "../../assets";
import { Breadcrumbs } from "../Collections/components";
import ItemCard from "./components/ItemCard";
import { cartAction } from "../../store/redux-slices";
import { toast } from "react-toastify";
import { putUpdateQantity } from "../../store/redux-thunk/CartThunk";
import { formatPrice } from "../../utils";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.cart);
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(0);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const cartId = useAppSelector((state) => state.cart.cartId);

  useEffect(() => {
    let price = 0;
    products.forEach((item: any) => {
      if (item.product) {
        price += item.product.price * item.quantity;
      } else {
        price += item.price * item.quantity;
      }
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt < 500000) {
      setShippingCharge(30000);
    } else {
      setShippingCharge(0);
    }
  }, [totalAmt]);

  const handleResetQuantity = (item: any) => {
    if (isLoggedIn) {
      const existingProduct = products.find(
        (product) => product.product.id === item.product.id
      );
      const quantity = 1;
      dispatch(
        putUpdateQantity({
          cartId: cartId,
          item: existingProduct,
          quantity: quantity,
        })
      );
    } else {
      dispatch(cartAction.resetQuantity(item));
    }
  };

  const handleCheckOut = () => {
    if (!isLoggedIn) {
      toast.warn("Vui lòng đăng nhập trước khi thanh toán");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Sản phẩm</h2>
            <h2>Giá</h2>
            <h2>Số lượng</h2>
            <h2>Tổng giá trị</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <ItemCard item={item} />
                <button
                  onClick={() => handleResetQuantity(item)}
                  className="py-1 px-2 bg-blue-500 text-white text-sm font-semibold uppercase hover:bg-blue-700 duration-500 rounded-md ml-4"
                >
                  Reset Quantity
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(cartAction.clearCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">Voucher</p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">
                Tổng hoá đơn
              </h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Tổng giá trị
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(totalAmt)} VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(shippingCharge)} VND
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Giá cần thanh toán
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {formatPrice(totalAmt + shippingCharge)} VND
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCheckOut}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                >
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Giỏ hàng đang trống :((
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Giỏ hàng được sinh ra có mục đích nên hãy sử dụng nó nhé MUA GÌ ĐÓ
              ĐI MÀ XIN ĐẤY
            </p>
            <Link to="/collections">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Tiếp tục mua hàng
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;
