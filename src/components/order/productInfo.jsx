import React from "react";
import Extra from "./extra";

export default function ProductInfo({ cart = [] }) {
  return (
    <div>
      {cart.map((det) => {



        return (
          <div>
            <div className="py-3 flex flex-row justify-between flex-wrap">
              <div className="flex flex-row">
                <img src={import.meta.env.VITE_SERVER_URL + det.image} className="w-16 h-20 rounded-sm object-contain" />
                <div className="flex items-center  justify-between ml-4">
                  <span className="text-xs font-semibold uppercase ">
                    {det.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-row mt-2 justify-center">
                <div className="flex flex-col justify-center mr-16 ">
                  <span className="uppercase text-xs font-medium text-gray-500">
                    Price
                  </span>

                  <span className="uppercase text-xs font-medium text-gray-500">
                    Quantity
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="uppercase text-xs font-medium text-gray-600">
                    Rs {det.price}
                  </span>

                  <span className="uppercase text-xs font-medium text-gray-600">
                    {det.quantity}
                  </span>
                </div>
              </div>
            </div>
            {
              det?.extra &&
              <Extra
                data={det.extra}
              />
            }
            <hr />
          </div>
        );
      })}
    </div>
  );
}
