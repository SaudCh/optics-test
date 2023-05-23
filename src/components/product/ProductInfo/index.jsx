import { useContext, useState } from "react";
import { formatCurrencyPKR } from "../../../utils/currencyFormatter";
// import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";

import ContinueModal from "./ContinueModal";
// import { WishlistContext } from "../../../context/WishlistContext";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
// import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import d2 from "../Images/dimensionTwo.svg";
import d1 from "../Images/dimensionOne.svg";
import d3 from "../Images/dimensionThree.svg";
import dsize from "../Images/glassSize.svg";
import TryOnModal from "../tryOn";
import { CartContext } from "../../../context/cartContext";
const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);

  const { addToCart } = useContext(CartContext);
  // const { addToWishlist, inWishlist, removeFromWishlist } =
  //   useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold capitalize">
        {product.title}
      </h1>
      <button
        className="flex items-center gap-2 bg-slate-900 bg:text-slate-500 text-white p-1 px-2 rounded"
        onClick={() => setModal(true)}
      >
        Tryon <BsFillCameraVideoFill />
      </button>
      <TryOnModal
        open={modal}
        handleClose={() => setModal(false)}
        tryOnJSON={product?.tryOnSvg}
        tryOnPNG={product?.tryOnPng}
        snapchat={product?.snapchat}
      />
      {true > 0 ? (
        <div className="text-sm text-green-500">In Stock</div>
      ) : (
        <div className="text-red-500">Out of Stock</div>
      )}

      <div>
        {product?.discount ? (
          <p className="font-medium">
            <span className="line-through">
              {formatCurrencyPKR(product.price)}
            </span>
            <span className="ml-2 text-lg text-green-600">
              {formatCurrencyPKR(
                product.price - (product.price * product.discount) / 100
              )}
            </span>
          </p>
        ) : (
          <p className="font-medium">{formatCurrencyPKR(product.price)}</p>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex">
          <button
            className="bg-gray-100 px-2 hover:bg-gray-200"
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          >
            <AiOutlineMinus className="h-4 w-4" />
          </button>
          <input
            type="text"
            className="border-1 w-10 border-gray-100 p-2 text-center"
            value={quantity}
            min={1}
            onChange={(e) =>
              e.target.value > 1
                ? setQuantity(parseInt(e.target.value))
                : setQuantity(0)
            }
            onBlur={(e) => {
              if (e.target.value <= 0) {
                setQuantity(1);
              }
            }}
          />
          <button
            className="bg-gray-100 px-2 hover:bg-gray-200"
            onClick={() => quantity < 5 && setQuantity((prev) => prev + 1)}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button
          className="flex-1 bg-slate-900 p-2 text-white hover:bg-slate-500"
          onClick={() => {
            addToCart({ title: product?.title, image: product?.image, _id: product?._id, price: product?.price, extra: {}, quantity });
            setIsContinueModalOpen(true);
          }}
        >
          Add to Cart
        </button>
        <Link
          className="flex-1 border border-slate-900 p-2 text-slate-900 transition hover:opacity-80 text-center"
          to={"/products/c/" + product._id}
        >
          Customize
        </Link>

        <ContinueModal
          isOpen={isContinueModalOpen}
          onClose={() => setIsContinueModalOpen(false)}
          product={product}
        />
      </div>
      <div>
        <button
          className="btn bg-green-600 text-slate-100 px-2 rounded 
      "
        >
          {product?.pCollection?.name}
        </button>
      </div>
      <div className="grid mt-5 grid-cols-2 gap-20 d-flex justify-between">
        <div>
          <div
            className="my-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h1 className="font-semibold  ">Shape </h1>
            <p>
              {product?.shape}
            </p>
          </div>

          <div
            className="my-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h1 className="font-semibold ">Frame Color </h1>
            <p className="">
              {product?.colors}
            </p>
          </div>

          <div
            className="my-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h1 className="font-semibold ">Delivery Time </h1>
            <p>6-12 Days</p>
          </div>
        </div>

        <div>
          <div
            className="my-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h1 className="font-semibold ">Temple Color </h1>
            <p>
              {product?.templeColor}
            </p>
          </div>

          <div
            className="my-2"

            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h1 className="font-semibold ">Frame Material</h1>
            <p>
              {product?.frameMaterial}
            </p>
          </div>
        </div>
      </div>

      <div className="row w-100   ">
        <div
          className="p-3"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3 className="text-sm my-3">Glasses Size :</h3>
          <div>
            {" "}
            <img src={dsize} />
            <p className="text-xs text-slate-500 text-center">
              {
                product?.glassWidth
              } mm</p>
          </div>
        </div>

        <div
          className="p-3"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 className="text-sm my-3">Dimensions</h3>{" "}
          </div>

          <div className="">
            <img src={d1} />
            <p className="text-xs text-slate-500 text-center">{product?.noseSize} mm</p>
          </div>

          <div className="">
            <img className="" src={d2} />
            <p className="text-xs text-slate-500 text-center">{product?.sideSize} mm</p>
          </div>

          <div>
            <div className="">
              <img src={d3} />
              <div className="flex justify-between">
                <p className="text-xs text-slate-500 text-center">{product.lenseHeight} mm</p>
                <p className="text-xs text-slate-500 text-center">{product.lenseSize} mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-slate-900">Description:</div>
      <div className="text-slate-500 mt-0">{product.description}</div>
    </div>
  );
};

export default ProductInfo;
