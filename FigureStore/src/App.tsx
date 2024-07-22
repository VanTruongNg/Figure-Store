import { ToastContainer } from "react-toastify";
import {
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  HomePage,
  CollectionsPage,
  Dashboard,
  UserProfilePage,
  OrderAdmin,
} from "./pages";
import {
  BottomHeader,
  FloatingButton,
  Footer,
  FooterBottom,
  Header,
} from "./components/Layout";
import { useAppDispatch, useAppSelector } from "./common/redux";
import { useEffect } from "react";
import { getProducts } from "./store/redux-thunk";
import { getCategory } from "./store/redux-thunk/ProductThunk";
import CartPage from "./pages/Cart/CartPage";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import PrivateRoute from "./routes/PrivateRoute";
import Cube from "./pages/AccessDenied";
import { getUserCart } from "./store/redux-thunk/CartThunk";
import UserRoute from "./routes/UserRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderPage from "./pages/Order/OrderPage";
import ProductAdmin from "./pages/AdminDashboard/Dashboard/components/ProductsAdmin/ProductAdmin";
import CategoryAdmin from "./pages/AdminDashboard/Dashboard/components/CategoriesAdmin/CategoriesAdmin";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <BottomHeader />
      <FloatingButton />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:category" element={<CollectionsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <UserProfilePage />
            </UserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckoutPage />
            </UserRoute>
          }
        />
        <Route
          path="/order"
          element={
            <UserRoute>
              <OrderPage />
            </UserRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard/products" element={<ProductAdmin />} />
        <Route path="/dashboard/orders" element={<OrderAdmin />} />
        <Route path="/dashboard/categories" element={<CategoryAdmin />} />
      </Route>

      <Route path="/access-denied" element={<Cube />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const getData = async () => {
      await Promise.all([dispatch(getProducts()), dispatch(getCategory())]);
    };

    getData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserCart());
  }, [isLoggedIn]);

  return (
    <div className="font-bodyFont main-content">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
