import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/checkout/Breadcrumbs";
import Checkout from "./checkout";
import Details from "./details";
import Payment from "./payment";
import { LoadingContext } from "../../context/loadingContext";
import { CartContext } from "../../context/cartContext";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);


const steps = [
  {
    title: "Cart",
    action: () => {
      navigate("/cart");
    },
  },
  {
    title: "Information",
    step: "information",
    action: () => {
      setStep("information");
    },
  },
  {
    title: "Shipping",
    step: "shipping",
    action: () => {
      setStep("shipping");
    },
    dependent: ["information"],
  },
  {
    title: "Payment",
    step: "payment",
    action: () => {
      setStep("payment");
    },
    dependent: ["information", "shipping"],
  },
];

export default function CheckoutI() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoading } = useContext(LoadingContext)
  const { total, cart, clearCart } = useContext(CartContext)
  const { user, isLoggedIn, Logout } = useContext(AuthContext)

  const [step, setStep] = React.useState("information");
  const [tot, setTot] = useState(0)
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState({});
  const [coupon, setCoupon] = useState(location?.state?.coupon || "");
  const [shipping, setShipping] = useState()
  const [payment, setPayment] = useState()
  const [clientSecret, setClientSecret] = useState("");
  const [pay, setPay] = useState(false)
  const [data, setData] = useState({
    userId: user?.id || "",
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    contactMail: '',
    note: '',
    extraInfo: '',
    saveInfo: false,
  })

  const handleCoupon = async (e) => {
    e.preventDefault();

    setError({});
    if (!coupon) {
      setError({ coupon: "Please enter a coupon code" });
      return;
    }

    setIsLoading(true);
    await axios
      .post(`coupon/code`, {
        code: coupon,
      })
      .then((res) => {
        // setDiscount(res.data.discount)
        const coupon = res?.data?.coupon;

        setDiscount(coupon?.discount);
      })
      .catch((err) => {
        setError({ coupon: err?.response?.data?.message || err.message });
        setDiscount(0);
      })
      .finally(() => setIsLoading(false));
  };

  const confirmOrder = async (data) => {

    setIsLoading(true);

    await axios.post(`order/add-order`, data)
      .then((res) => {
        const order = res?.data.order;

        if (order.paymentInfo) {
          setClientSecret(order.paymentInfo.clientSecret)
          setPay(true)
          return
        }

        navigate(isLoggedIn ? "/orders" : '/');
        clearCart()
      }
      )
      .catch((err) => {
        setError({ api: err?.response?.data?.message || err.message });
      }
      ).finally(() => setIsLoading(false));

  }

  useEffect(() => {

    const getUser = async () => {

      if (!isLoggedIn) return

      setIsLoading(true)

      await axios.get('/user/get-user-info')
        .then(res => {
          const user = res.data.user

          setData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            country: user.country,
            city: user.city,
            address: user.address,
            phone: user.phone,
            avatar: user.avatar
          })

        }
        )
        .catch(err => setErrors({ api: err?.response?.data?.message }))

      setIsLoading(false)

    }

    getUser()
  }, [])

  useEffect(() => {

    if (isLoggedIn) {
      setData({
        ...data,
        email: user?.email,
      })
    }

    const getCoupon = async () => {
      if (!coupon) return

      setIsLoading(true);
      await axios
        .post(`coupon/code`, {
          code: coupon,
        })
        .then((res) => {
          // setDiscount(res.data.discount)
          const coupon = res?.data?.coupon;

          setDiscount(coupon?.discount);
        })
        .catch((err) => {
          setError({ coupon: err?.response?.data?.message || err.message });
          setDiscount(0);
        })
        .finally(() => setIsLoading(false));
    }

    const getUserData = async () => {

      if (!isLoggedIn) return

      setIsLoading(true);
      await axios
        .get(`user/get-user-info`)
        .then((res) => {
          const user = res?.data;

          console.log(user)
        })
        .catch((err) => {
          setError({ api: err?.response?.data?.message || err.message });
          setDiscount(0);
        })
        .finally(() => setIsLoading(false));
    }



    getCoupon()
    getUserData()

  }, [])

  useEffect(() => {

    if (step === 'information') setDiscount(0)

  }, [step])

  useEffect(() => {

    let t = total - (discount * total / 100)

    if (shipping) t += shipping

    setTot(t)

  }, [discount, total, shipping])

  useEffect(() => {

    if (cart.length === 0) navigate('/')

  }, [])


  return (
    <section className="text-gray-600 body-font relative bg-slate-50 min-h-screen">
      <div className="container  flex flex-wrap flex-col-reverse lg:flex-row mx-auto py-5">
        <div className="w-full lg:w-6/12 rounded-lg overflow-hidden mx-auto p-3">
          <BreadCrumb steps={steps} currentStep={step} />
          {
            error?.api && <span className="block sm:inline text-red-900">{error?.api}</span>
          }
          {step === "information" && <Checkout setStep={setStep} coupon={coupon} data={data} setData={setData} />}
          {step === "shipping" && <Details setStep={setStep} data={data} shipping={shipping} setShipping={setShipping} />}
          {step === "payment" && <Payment setStep={setStep} data={data} payment={payment} setPayment={setPayment} coupon={coupon} discount={discount} cart={cart} shipping={shipping} total={tot} confirmOrder={confirmOrder} setPay={setPay} clientSecret={clientSecret} />}
        </div>
        <div className="w-full lg:w-4/12 lg:mr-auto md:mt-0 p-3">
          <div className=" bg-white border-gray-100 border rounded-md shadow p-5">
            {
              cart.map((prod, index) => {
                return (
                  <div className="flex flex-row justify-between">
                    <div>
                      <img
                        className="w-12 h-16 rounded-md border-gray-400 object-contain"
                        src={import.meta.env.VITE_SERVER_URL + prod?.image}
                      />
                    </div>
                    <span className="font-semibold pt-3 capitalize">{prod?.title}</span>
                    <div className="flex flex-col ">
                      {/* <span>Rs 1000.00</span> */}
                      <span className="text-green-500">{formatCurrencyPKR(prod?.price * prod?.quantity)}</span>
                    </div>
                  </div>
                )
              })
            }

            <hr className="mt-4 shadow" />

            <div className="text-gray-600 text-sm mt-6 flex flex-row justify-between">
              <span>Subtotal</span>
              <span>{formatCurrencyPKR(total)}</span>
            </div>
            <div className="text-gray-600 text-sm my-5 flex flex-row justify-between">
              <span>Discount</span>
              <span>{discount <= 0 ? "----" : formatCurrencyPKR((discount * total) / 100)}</span>
            </div>
            <div className="text-gray-600 text-sm my-5 flex flex-row justify-between">
              <span>Shipping</span>
              {
                shipping ?
                  <span>{shipping <= 0 ? "----" : formatCurrencyPKR(shipping)}</span> :
                  <span>----</span>
              }
            </div>
            <hr className="shadow" />

            <div className="my-3 flex flex-row justify-between">
              <div>
                <input
                  className="border border-gray-100 shadow p-3  text-sm rounded-md"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}

                />
              </div>
              <div>
                <button
                  onClick={handleCoupon}
                  className="bg-slate-900 text-sm text-white p-2 mt-1 rounded-md px-4">
                  Apply
                </button>
              </div>
            </div>
            {error?.coupon && (
              <div className="text-red-500 text-sm">{error?.coupon}</div>
            )}
            <hr className="shadow" />

            <div className="text-gray-600 text-sm my-5 font-semibold flex flex-row justify-between">
              <span>Total</span>
              <span>{formatCurrencyPKR(tot)}</span>
            </div>
          </div>
        </div>
        {/* <div className="hidden lg:block lg:w-1/12"></div> */}
      </div>
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            theme: 'stripe',
          }}
          stripe={stripePromise}
        >
          <CheckoutForm
            setStep={setStep}
            data={data}
            clientSecret={clientSecret}
            pay={pay}
            handleClose={() => { setPay(false) }}
            clearCart={clearCart}

          />
        </Elements>
      )
      }
    </section >
  );
}
