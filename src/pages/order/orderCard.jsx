import React from "react";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import { useNavigate } from "react-router-dom";

function EditCard({ order }) {

    const navigation = useNavigate()

    const { cart } = order

    return (
        <div
            onClick={() => navigation("/order/" + order._id)}
        >
            <p className="uppercase font-semibold text-xl ">#{order.orderId}</p>
            <div div className="py-3 flex flex-row justify-between flex-wrap" >
                <div className="flex flex-row relative">
                    <div className="flex flex-row relative">
                        {cart.length > 1 && <div className="shadow-white shadow-lg z-0 w-16 h-20  bg-white flex items-center ">
                            <img
                                src={import.meta.env.VITE_SERVER_URL + (cart.length == 2 ? cart[0]?.image : cart[1]?.image)}
                                className=" rounded-sm absolute left-[20px] border rotate-[-20deg] w-16 h-20 object-contain"
                            />
                        </div>}
                        {cart.length >= 1 && cart.length != 2 ? <div
                            className=" shadow-white shadow-lg border-white border z-10 w-16 h-20  bg-white flex items-center "
                        >
                            <img
                                src={import.meta.env.VITE_SERVER_URL + cart[0]?.image}
                                className="rounded-sm border bg-white object-contain w-16 h-20"
                            />
                        </div>
                            :
                            <div className="h-20 w-5" />

                        }
                        {cart.length > 1 && <div className="shadow-white shadow-lg z-0 w-16 h-20  bg-white flex items-center justify-center ">
                            <img
                                src={import.meta.env.VITE_SERVER_URL + (cart.length == 2 ? cart[1]?.image : cart[2]?.image)}
                                className=" rounded-sm absolute right-[20px] rotate-[20deg] object-contain w-16 h-20 border bg-white "
                            />
                        </div>}
                    </div>
                    <div className="flex flex-col justify-center ml-4">
                        {
                            cart.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-between">
                                        <span className="text-xs font-semibold capitalize ">{item.title} x {item.quantity}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-row mt-2 justify-center">
                    <div className="flex flex-col justify-between mr-16 ">
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Total
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Status
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Payment
                        </span>
                    </div>

                    <div className="flex flex-col justify-between">
                        <span className="uppercase text-xs font-medium text-gray-600">
                            {formatCurrencyPKR(order.total)}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-600">
                            {order.status}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-600">{order.payment}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCard;
