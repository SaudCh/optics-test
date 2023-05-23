import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import EditCard from "./EditCard";

export default function Account() {
  return (
    <div className=" p-6 bg-slate-50">
      <div className="w-60 h-screen  flex flex-col  justify-center items-center">
        <Link className="mb-3 text-sm uppercase text-gray-600 font-semibold ">
          All Orders
        </Link>
        <Link className="my-3 text-sm uppercase text-gray-600 font-semibold  ">
          Delivered
        </Link>
        <Link className="my-3 text-sm uppercase text-gray-600 font-semibold ">
          In Progress
        </Link>
        <Link className="my-3 text-sm uppercase text-gray-600 font-semibold ">
          Sent
        </Link>
        <Link className="mt-3 text-sm uppercase text-gray-600 font-bold">
          Returned
        </Link>
      </div>
      <div className="border border-gray-200 shadow p-8 w-full ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold">#SE28GFT134</span>
            <span className="my-3 bg-green-600 text-white uppercase text-sm font-semibold text-center py-2 rounded-md">
              Delivered
            </span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-xs font-semibold text-gray-400">
              03 March,2023
            </span>
            <span className="my-3 text-xs font-semibold text-gray-500">
              Cash on Delivered
            </span>
          </div>
        </div>
        <hr className="my-3" />
        <span className="my-3 text-sm text-gray-500">
          Tip: Tap a product if you'd like to make any changes
        </span>
        <hr className="my-3" />
        <EditCard />
        <hr className="my-3" />
        <EditCard />
        <hr className="my-3" />
        <EditCard />
        <hr className="my-3" />
        <div className="flex flex-row justify-between">
          <div className="mr-3 ">
            <button className="uppercase bg-blue-600 text-white text-xs font-medium py-3 px-6 ml-3 my-2 rounded-sm">
              Save
            </button>
            <button className="uppercase bg-gray-100 text-xs font-semibold py-3 px-6 my-2 ml-3 rounded-sm">
              Cancel
            </button>
            <button className="uppercase bg-gray-100 text-xs font-semibold py-3 px-6 my-2 ml-3 rounded-sm">
              Return all
            </button>
          </div>
          <div className="flex flex-row mt-2 justify-center">
            <div className="flex flex-col justify-between mr-16 ">
              <span className="uppercase text-xs font-medium text-gray-500">
                Taxes
              </span>
              <span className="uppercase text-xs font-medium text-gray-500">
                Shipping
              </span>
            </div>

            <div className="flex flex-col justify-between">
              <span className="uppercase text-xs font-medium text-gray-600">
                Rs 1000.00
              </span>
              <span className="uppercase text-xs font-medium text-gray-600">
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
