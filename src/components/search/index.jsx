import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import { WishlistContext } from "../../context/wishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AuthContext } from "../../context/authContext";

export default function SearchCard({
  product,
}) {

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigate()

  return (
    <div className="flex justify-center relative bg-white p-5 rounded shadow">
      {/* heart icon from react icons  */}
      <div className="absolute top-[5px] left-[5px]">
        <button
          className=""
          onClick={() => {
            if (!isLoggedIn) {
              navigation("/login")
              return
            }
            toggleWishlist(product?._id)
          }}
        >
          {wishlist.includes(product?._id) ? (
            <AiFillHeart className="text-red-500 text-2xl " />
          ) : (
            <AiOutlineHeart className="text-2xl" />
          )}
        </button>
      </div>

      <Link to={"/product/" + product?._id}>
        <div className="block max-w-sm rounded-lg bg-white">
          <a href="#!" data-te-ripple-init data-te-ripple-color="light">
            <img
              className="object-contain w-12/12 sm:w-full"
              src={import.meta.env.VITE_SERVER_URL + product?.image}
              alt=""
            />
          </a>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 text-center capitalize">
              {product?.title?.substring(0, 15)}
            </h5>
            <p className="mb-2 text-base text-neutral-600 text-center">
              {formatCurrencyPKR(product?.price)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
