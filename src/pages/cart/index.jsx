import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../components/cart/card";
import { CartContext } from "../../context/cartContext";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, total } = useContext(CartContext);
  const [tot, setTot] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState('')
  const [error, setError] = useState('')

  const { setIsLoading } = useContext(LoadingContext)

  const handleCoupon = async (e) => {
    e.preventDefault()

    setError('')

    if (!cart.length === 0) return

    if (!coupon) {
      setError({ coupon: 'Please enter a coupon code' })
      return
    }



    setIsLoading(true)
    await axios.post(`coupon/code`, {
      code: coupon
    }).then
      ((res) => {
        // setDiscount(res.data.discount)
        const coupon = res?.data?.coupon

        setDiscount(coupon?.discount)

      })
      .catch(err => {
        setError({ coupon: err?.response?.data?.message || err.message })
        setDiscount(0)
      }).finally(() => setIsLoading(false))
  }

  const handleCheckout = () => {

    if (cart.length === 0) return

    navigate('/checkout', {
      state: {
        coupon: coupon
      }
    })
  }


  useEffect(() => {
    let subTotal = total
    let delivery = 0

    let tot = subTotal + delivery

    setTot(tot - (tot * discount) / 100);

  }, [total, discount]);

  return (
    <div className="bg-slate-50 min-h-screen w-full py-5">
      <h1 className="text-center pb-5 font-semibold tracking-wider text-3xl">
        My Cart
      </h1>


      {
        cart.map((item, index) => {
          return (
            <CartCard
              key={index}
              product={item}
            />
          )
        })
      }

      {
        cart.length === 0 ? (
          // beautifull No items in cart text
          <div className="flex justify-center">
            <div className="w-11/12 bg-white shadow py-5 w-100 items-center ml-[-10px] text-center">
              <p>
                No items in cart
              </p>
            </div>
          </div>

        ) : null
      }
      <div className="flex  justify-center">
        <div className="w-11/12 bg-white shadow py-5 w-100 grid grid-cols-2 md:grid-cols-6 gap-4 items-center ml-[-10px]">
          <div className="hidden md:block" />
          <div className="p-4 px-6 text-center whitespace-nowrap border">
            <div className="text-base flex justify-between">
              <p className="text-center font-semibold">Discount</p>
              <p className=" ">{formatCurrencyPKR((total * discount) / 100)}</p>
            </div>
          </div>
          <div className="p-4 px-6 text-center whitespace-nowrap border">
            <div className="text-base flex justify-between">
              <p className="text-center font-semibold">Delivery</p>
              <p className=" ">{formatCurrencyPKR(0)}</p>
            </div>
          </div>
          <div className="p-4 px-6 text-center whitespace-nowrap border">
            <div className="text-base flex justify-between">
              <p className="text-center font-semibold">Subtotal</p>
              <p className=" ">{formatCurrencyPKR(total)}</p>
            </div>
          </div>
          <div className="p-4 px-6 text-center whitespace-nowrap border">
            <div className="text-base flex justify-between">
              <p className="text-center font-semibold">Total</p>
              <p className=" ">{formatCurrencyPKR(tot)}</p>
            </div>
          </div>

          {/* <td className="p-4 px-6 text-center whitespace-nowrap">
              <button className="px-4 py-1 text-red-600 bg-red-100">
                Clear All
              </button>
            </td> */}
        </div>
      </div>

      <div className="flex  justify-center">
        <div className="w-11/12 bg-white shadow py-5 w-100 grid grid-cols-1 md:grid-cols-7 gap-4 items-center ml-[-10px]">
          <div />
          <form onSubmit={handleCoupon} className="col-span-4 text-center">
            <div className="flex items-center justify-center">
              <input
                type="text"
                style={{ border: "1px solid #c2bfbc" }}
                id="search"
                className="shadow block w-5/12 md:w-8/12 p-3  text-sm "
                placeholder="Please Enter Promo Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button

                className="px-6 py-3 text-sm text-white bg-slate-900 hover:bg-slate-600"
                disabled={!coupon || cart.length === 0}
              >
                Apply Discount
              </button>
            </div>
            {error?.coupon && <p className="text-red-500 text-sm">{error.coupon}</p>}
          </form>
          <div className="col-span-2 text-center">
            <button
              className="
            px-6
            py-3
            text-sm text-white
            bg-slate-900
            hover:bg-slate-600
          "
              disabled={cart.length === 0}
              onClick={() => handleCheckout()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
