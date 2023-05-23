import React, { useContext, useEffect, useState } from "react";
import ProductInfo from "../../components/order/productInfo";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";
import OrderModal from "./modal";

export default function OrderDetails() {
  const { setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("");

  const getTotal = (cart) => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }

    return total;
  };

  const getText = (status) => {
    switch (status) {
      case "cancelled":
        return "Are you sure you want to cancel this order?";
      case "delivered":
        return "Are you sure you want to mark this order as delivered?";
      case "returned":
        return "Are you sure you want to mark this order as returned?";
      case "completed":
        return "Are you sure you want to mark this order as completed?";
      default:
        return "Are you sure you want to cancel this order?";
    }
  };

  const getBtnColor = (status) => {
    switch (status) {
      case "cancelled":
        return "bg-red-600";
      case "delivered":
        return "bg-green-600";
      case "returned":
        return "bg-yellow-600";
      case "completed":
        return "bg-blue-600";
      default:
        return "bg-red-600";
    }
  }

  const getData = async () => {
    setIsLoading(true);
    await axios
      .get(`/order/id/${id}`)
      .then((res) => {
        setData(res.data.order);
        setCart(res.data.order.cart);
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e.message);
      });
    setIsLoading(false);
  };

  const updateStatus = async (status) => {

    setIsLoading(true);

    await axios.patch(`/order/status`, {
      id: id,
      status
    }).then(res => {
      setStatus("")
      getData()

    }).catch(err => console.log(err))

    setIsLoading(false);
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await axios
        .get(`/order/id/${id}`)
        .then((res) => {
          setData(res.data.order);
          setCart(res.data.order.cart);
        })
        .catch((e) => {
          console.log(e.message);
        });
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <div className=" flex p-6 bg-slate-50 min-h-screen">
      <div className="border w-full mx-auto md:basis-5/6 border-gray-200 shadow p-8 bg-white">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold uppercase">#{data.orderId}</span>
            <span className="my-3 bg-green-600 text-white uppercase text-sm font-semibold text-center py-2 rounded-md">
              {data.status}
            </span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              {data.createdAt}
            </span>
            <span className="my-3 text-xs font-semibold text-gray-500 uppercase">
              Payment Method : {data.payment}
            </span>
          </div>
        </div>
        <hr className="my-3" />
        <ProductInfo cart={cart} />
        <div className="flex flex-col justify-between mr-16 pt-3">
          <span className="uppercase text-xs font-semibold text-gray-900 ">
            User Details
          </span>
          <div className="ml-5 mb-5 flex flex-col">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-900 ">Name:</span>
              <span className="uppercase text-xs font-medium text-gray-600 ">
                {data?.userInfo?.firstname} {data?.userInfo?.lastname}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs uppercase font-semibold text-gray-900 ">Email:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.userInfo?.email}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs uppercase font-semibold text-gray-900 ">Phone:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.userInfo?.phone}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="uppercase text-xs font-semibold text-gray-900 ">Contact Mail:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.userInfo?.contactMail}
              </span>
            </div>

          </div>
          <span className="uppercase text-xs font-semibold text-gray-900 ">
            Address Details
          </span>

          <div className="ml-5">
            <div className="flex justify-between">
              <span className="uppercase text-xs font-semibold text-gray-900 ">Country:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.country}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="uppercase text-xs font-semibold text-gray-900 ">City:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.city}
              </span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="uppercase text-xs font-semibold text-gray-900 ">Address:</span>
              <span className="text-xs font-medium text-gray-600 ">
                {data?.address}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap mt-5" >
            <span className="uppercase text-xs font-semibold text-gray-900 ">Note:</span>
            <span className="text-xs font-medium text-gray-600 ">
              {data?.note}
            </span>
          </div>
          <div className="flex flex-wrap " >
            <span className="uppercase text-xs font-semibold text-gray-900 ">Extra Info:</span>
            <span className="text-xs font-medium text-gray-600 ">
              {data?.info}
            </span>
          </div>

        </div>
        <hr className="my-3" />
        <div className="flex flex-row justify-between">
          {
            data.status === "pending" ? (
              <div className="mr-3 ">
                <button
                  onClick={() => setStatus("cancelled")}
                  className="uppercase bg-gray-100 text-xs font-semibold py-3 px-6 my-2 ml-3 rounded-sm">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mr-3 " />
            )
          }

          <div className="flex flex-row mt-2 justify-center">
            <div className="flex flex-col justify-between mr-16 ">
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Sub Total
              </span>
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Shipping
              </span>
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Discount
              </span>
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Total
              </span>
            </div>

            <div className="flex flex-col justify-between">
              <span className="uppercase text-xs font-medium text-gray-600 ">
                Rs {getTotal(cart)}
              </span>
              <span className="uppercase text-xs font-medium text-gray-600 ">
                Rs 150
              </span>
              <span className="uppercase text-xs font-medium text-gray-600 ">
                Rs {data.discount}
              </span>
              <span className="uppercase text-xs font-medium text-gray-600 ">
                Rs {data.total}
              </span>
            </div>
          </div>

        </div>

      </div>
      <OrderModal
        open={!!status}
        handleClose={() => setStatus("")}
        handleUpdate={() => updateStatus(status)}
        btnClr={getBtnColor(status)}
        text={getText(status)}
      />
    </div>
  );
}
