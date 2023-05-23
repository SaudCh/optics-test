import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import EditCard from "./EditCard";
import axios from 'axios'
import OrderCard from "./orderCard";
import { LoadingContext } from "../../context/loadingContext";

export default function Orders() {
  const { setIsLoading } = useContext(LoadingContext)

  const [orders, setOrders] = useState([])
  const [filterOrders, setFilterOrders] = useState([])
  const [status, setStatus] = useState("")

  useEffect(() => {

    const getOrder = async () => {

      setIsLoading(true)

      await axios.get('/order/user')
        .then(res => {
          setFilterOrders(res.data.orders)
          setOrders(res.data.orders)
        })
        .catch(err => console.log(err))

      setIsLoading(false)
    }

    getOrder()

  }, [])

  useEffect(() => {

    if (status === "") {
      setOrders(filterOrders)
    } else {
      setOrders(filterOrders.filter(order => order.status === status))
    }

  }, [status])


  return (
    <>
      <div className="w-100 flex flex-wrap justify-evenly items-center pt-4 bg-slate-50">
        <button
          onClick={() => setStatus("")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold ">
          All Orders
        </button>
        <button
          onClick={() => setStatus("delivered")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold  ">
          Delivered
        </button>
        <button
          onClick={() => setStatus("pending")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold ">
          In Progress
        </button>
        <button
          onClick={() => setStatus("cancelled")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold ">
          Cancelled
        </button>
      </div>

      <div className=" min-h-screen md:flex p-6 pt-0 bg-slate-50">
        <div className="border border-gray-200 shadow p-8 w-full bg-white">

          {
            orders.map((order, index) => {
              return (
                <div key={index}>
                  <OrderCard order={order} />
                  <hr className="my-3" />
                </div>
              )
            })
          }

        </div>
      </div>

    </>
  );
}
