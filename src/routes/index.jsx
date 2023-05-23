import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import EditAccount from "../pages/account/edit";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Collections from "../pages/collections";
import Customize from "../pages/customize";
import Glasses from "../pages/glasses";
import Orders from "../pages/order";
import OrderDetails from "../pages/order/details";
import Product from "../pages/product";
import Search from "../pages/search";
import WishList from "../pages/wishlist";
import AuthRoute from "./authRoute";

import Loading from "./loading";
import ProtectedRoute from "./protectedRoute";
import GoogleSuccess from "../pages/auth/googleSuccess";
import Receipt from "../pages/order/receipt";

const Layout = lazy(() => import("./layout"));

const Login = lazy(() => import("../pages/auth/login"));
const Register = lazy(() => import("../pages/auth/register"));
const ForgotPassword = lazy(() => import("../pages/auth/forgetPassword"));
const ResetPassword = lazy(() => import("../pages/auth/resetPassword"));

const Home = lazy(() => import("../pages/home"));

export default function AppRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/product/:id"
              element={<Product />}
            />
            <Route
              path="/products/c/:id"
              element={<Customize />}
            />

            <Route
              path="/collections/:id"
              element={<Collections />}
            />

            <Route
              path="/glasses/:id"
              element={<Glasses />}
            />

            <Route
              path="/login"
              element={<AuthRoute component={<Login />} />}
            />
            <Route
              path="/google/:status"
              element={<AuthRoute component={<GoogleSuccess />} />}
            />
            <Route
              path="register"
              element={<AuthRoute component={<Register />} />}
            />
            <Route
              path="forget-password"
              element={<AuthRoute component={<ForgotPassword />} />}
            />
            <Route
              path="reset-password/:token"
              element={<AuthRoute component={<ResetPassword />} />}
            />
            <Route
              path="orders"
              element={<ProtectedRoute component={<Orders />} />}
            />
            <Route
              path="order/:id"
              element={<ProtectedRoute component={<OrderDetails />} />}
            />
            <Route
              path="receipt/:id"
              element={<ProtectedRoute component={<Receipt />} />}
            />
            <Route
              path="/account"
              element={<ProtectedRoute component={<EditAccount />} />}
            />
            <Route
              path="/wishlist"
              element={<ProtectedRoute component={<WishList />} />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
