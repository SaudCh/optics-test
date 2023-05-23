import React, { useEffect } from "react";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";

export default function ProductDetails({
  product,
  lensThickness,
  lensType,
  lensTypeAdv,
  handleAddCart,

}) {

  const [total, setTotal] = React.useState(0)

  useEffect(() => {
    setTotal(product?.price + (lensThickness?.price || 0) + (lensTypeAdv?.price || 0))
  }, [product, lensThickness, lensTypeAdv])


  return (
    <div className="p-5 md:p-12 md:w-1/2 lg:w-1/3 w-full  flex flex-col items-start">
      <div className="w-full">
        <div className="container  ">
          <div className="flex -mx-4">
            <div className="w-full mx-4">
              <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                  <img
                    className="absolute inset-0 h-full w-full object-contain"
                    src={import.meta.env.VITE_SERVER_URL + product?.image}
                    alt=""
                  />
                </div>

                <div
                  className="p-4 text-xs "
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h1 className="text-gray-700">Frame</h1>
                  <h1 className="text-green-700 font-semibold">{formatCurrencyPKR(product?.price)}</h1>
                </div>
                <hr />

                <div className="p-4 text-xs ">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1 className="text-gray-700">Thickness</h1>
                    <h1 className="text-green-700 font-semibold">{lensThickness?.price ? formatCurrencyPKR(lensThickness?.price) : "----"}</h1>
                  </div>

                  <div
                    className="mt-4"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1 className="text-gray-700">Advance Lens Type</h1>
                    <h1 className="text-green-700 font-semibold">{lensTypeAdv?.price ? formatCurrencyPKR(lensTypeAdv?.price) : '----'}</h1>
                  </div>
                </div>
                <hr />
                <div
                  className="p-4 text-xs "
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h1 className="text-gray-700">Total</h1>
                  <h1 className="text-green-700 font-semibold">{formatCurrencyPKR(total)}</h1>
                </div>
                <hr />
                <div
                  className="my-5 w-full center "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    type="button"
                    onClick={handleAddCart}
                    className="w-100  bg-gray-900 text-white shadow   p-2 border  rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
