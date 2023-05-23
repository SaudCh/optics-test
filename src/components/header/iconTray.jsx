import React from "react";
import { GrCart } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { BiMicrophone, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { WishlistContext } from "../../context/wishlistContext";
import { IoEarthSharp } from "react-icons/io5";

export default function IconTray({ className }) {
  const navigate = useNavigate();
  const { isLoggedIn, Logout } = useContext(AuthContext);
  const { clearWishlist } = useContext(WishlistContext)

  const handeLogout = () => {
    Logout();
    clearWishlist()
    navigate("/");
  };

  return (
    <div className={className}>
      <div className="ml-5 md:cursor-pointer group py-5">
        {" "}
        <IoEarthSharp />{" "}
        <div className="relative" style={{ zIndex: 10 }}>
          <div className="absolute top-[17px] right-[-5px] hidden group-hover:block hover:block">
            <div className="py-3 ">
              <div className="w-4 h-4 right-3 absolute mt-1 bg-white rotate-45" />
            </div>
            <div className="bg-white px-3.5 pt-3.5 w-[200px]">

              <>
                <div className="pb-3.5">
                  <div
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    English
                  </div>
                </div>
                <div className="pb-3.5">
                  <div
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    German
                  </div>
                </div>
                <div className="pb-3.5">
                  <div
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Arabic
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <button className="ml-5 py-5" onClick={() => navigate("/search")}>
        {" "}
        <BiSearch />{" "}
      </button>
      <button className="ml-5 py-5" onClick={() => navigate("/cart")}>
        {" "}
        <GrCart />{" "}
      </button>
      <div
        className="ml-5 md:cursor-pointer group py-5"
      // onClick={() => navigate(isLoggedIn ? "/account" : "/login")}
      >
        {" "}
        <FiUser />{" "}
        <div className="relative" style={{ zIndex: 10 }}>
          <div className="absolute top-[17px] right-[-5px] hidden group-hover:block hover:block">
            <div className="py-3 ">
              <div className="w-4 h-4 right-3 absolute mt-1 bg-white rotate-45" />
            </div>
            <div className="bg-white px-3.5 pt-3.5 w-[200px]">
              {isLoggedIn ? (
                <>
                  <div className="pb-3.5">
                    <Link
                      to="/wishlist"
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Wishlist
                    </Link>
                  </div>
                  <div className="pb-3.5">
                    <Link
                      to="/orders"
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Orders
                    </Link>
                  </div>
                  <div className="pb-3.5">
                    <Link
                      to={"/account"}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Account
                    </Link>
                  </div>
                  <div className="pb-3.5" type="button" onClick={handeLogout}>
                    <h1 className="text-sm text-gray-600 hover:text-blue-600">
                      Logout
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="pb-3.5">
                    <Link
                      to="/login"
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="pb-3.5">
                    <Link
                      to="/register"
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Signup
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
