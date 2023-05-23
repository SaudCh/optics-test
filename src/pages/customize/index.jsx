import React, { useContext, useEffect, useState } from "react";
import PDModal from "../../components/customize";
import ProductDetails from "./productDetails";
import Table from "./table";
import { LoadingContext } from "../../context/loadingContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrencyPKR } from "../../utils/currencyFormatter";
import { CartContext } from "../../context/cartContext";
import pdimg from '../../assets/pd.svg'
import { cylinder, power } from "./data";


export default function Customize() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate()

  const { id } = useParams();
  const [data, setData] = useState({});
  const [twoPd, setTwoPd] = useState(false)
  const [lens, setLens] = useState({
    lensType: [],
    lensThickness: [],
    lensTypeAdv: []
  })
  const [parameter, setParameter] = useState({
    right: {
      power: "",
      cylinder: "",
      axis: "",
      pd: "",
    },
    left: {
      power: "",
      cylinder: "",
      axis: "",
      pd: "",
    },
  })

  const [lensType, setLensType] = useState({})
  const [lensThickness, setLensThickness] = useState({})
  const [lensTypeAdv, setLensTypeAdv] = useState({})
  const { addToCart } = useContext(CartContext)

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await axios.get(`/product/${id}`).then((res) => {
        setData(res.data.product);
      })
        .catch(err => console.log(err))


      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {

    const getData = async () => {
      setIsLoading(true);

      await axios.get('/lens').then((res) => {
        const data = res.data

        setLens({
          ...lens,
          ...data
        })

      })
        .catch(err => console.log(err))


      setIsLoading(false);
    };

    getData();

  }, [id]);

  const handleAddCart = () => {

    const product = data

    const total = product?.price + (lensThickness?.price || 0) + (lensTypeAdv?.price || 0)

    const pData = {
      title: product?.title,
      image: product?.image,
      price: total,
      sp: true,
      extra: {
        lensType,
        lensThickness,
        lensTypeAdv,
        parameter
      },
      quantity: 1

    }

    addToCart(pData)

    navigate('/cart')

  }

  return (
    <div className="grand_parent bg-slate-50">
      <PDModal
        open={modal}
        handleClose={() => {
          setModal(false);
        }}
        setPd={(value) => {
          setParameter({
            ...parameter,
            right: {
              ...parameter.right,
              pd: value,
            }
          })
        }}
      />
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col-reverse md:flex-row">
          <div className="p-5 md:p-12 md:w-1/2 lg:w-2/3 w-full">
            <div className="items-start ">
              <div className="shadow mb-5 p-5 rounded border border-gray-300 bg-white w-100">
                <h1 className="font-semibold mb-3 ">Parametre</h1>

                <div className="flex flex-wrap flex-row md:flex-col justify-evenly">
                  <div className="flex flex-col md:flex-row justify-around items-center text-center">
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6"></h1>
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">
                      Power
                    </h1>
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">
                      Cylinder
                    </h1>
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">
                      Axis
                    </h1>
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">PD</h1>
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6"></h1>
                  </div>
                  <div className="flex flex-col md:flex-row justify-around items-center text-center">
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">
                      Right
                    </h1>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6">

                      <select data-te-select-init
                        onChange={(e) => {
                          setParameter({ ...parameter, right: { ...parameter.right, power: e.target.value } })
                        }}
                      >
                        <option value="">Power</option>
                        {
                          power.map((item, index) => (
                            <option value={item?.value}>{item?.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6"
                      onChange={(e) => {
                        setParameter({ ...parameter, right: { ...parameter.right, cylinder: e.target.value } })
                      }}
                    >
                      <select data-te-select-init>
                        <option value="">Cylinder</option>
                        {
                          cylinder.map((item, index) => (
                            <option value={item?.value}>{item?.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6"
                      onChange={(e) => {
                        setParameter({ ...parameter, right: { ...parameter.right, axis: e.target.value } })
                      }}
                    >
                      <select data-te-select-init>
                        <option value="0">Axis</option>
                        {/* array from 0 to 180 */}
                        {
                          Array.from(Array(181).keys()).map((item, index) => (
                            <option value={item}>{item}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6"
                      onChange={(e) => {
                        setParameter({ ...parameter, right: { ...parameter.right, pd: e.target.value } })
                      }}
                    >
                      <select data-te-select-init>
                        <option value="">PD</option>
                        {
                          Array.from(Array(31).keys()).map((item, index) => (
                            <option value={item + 42}>{item + 42}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="flex items-center mb-3 basis-1/6">
                      <input
                        id="twopd"
                        type="checkbox"
                        value=""
                        className=""
                        onChange={(e) => {

                          setParameter({ ...parameter, left: { ...parameter.left, pd: '' } })

                          setTwoPd(!twoPd)
                        }}
                      />
                      <label
                        for="twopd"
                        className="ml-2 text-sm w-full text-gray-800 "
                      >
                        Have Two PDs
                      </label>
                    </div>
                    {/* <h1 className="mb-3 text-sm text-gray-800">Left</h1> */}
                  </div>
                  <div className="flex flex-col md:flex-row justify-around items-center text-center">
                    <h1 className="mb-3 text-sm text-gray-800 basis-1/6">
                      Left
                    </h1>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6">
                      <select data-te-select-init
                        onChange={(e) => {
                          setParameter({ ...parameter, left: { ...parameter.left, power: e.target.value } })
                        }}
                      >
                        <option value="0">Power</option>
                        {
                          power.map((item, index) => (
                            <option value={item?.value}>{item?.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6"
                      onChange={(e) => {
                        setParameter({ ...parameter, left: { ...parameter.left, cylinder: e.target.value } })
                      }}
                    >
                      <select data-te-select-init>
                        <option value="0">Cylinder</option>
                        {
                          cylinder.map((item, index) => (
                            <option value={item?.value}>{item?.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3 text-sm text-gray-800 basis-1/6"
                      onChange={(e) => {
                        setParameter({ ...parameter, left: { ...parameter.left, axis: e.target.value } })
                      }}
                    >
                      <select data-te-select-init>
                        <option value="">Axis</option>
                        {
                          Array.from(Array(181).keys()).map((item, index) => (
                            <option value={item}>{item}</option>
                          ))
                        }
                      </select>
                    </div>
                    {
                      twoPd ? (
                        <div className="mb-3 text-sm text-gray-800 basis-1/6">
                          <select data-te-select-init
                            onChange={(e) => {
                              setParameter({ ...parameter, left: { ...parameter.left, pd: e.target.value } })
                            }}

                          >
                            <option value="0">PD</option>
                            {
                              Array.from(Array(31).keys()).map((item, index) => (
                                <option value={item + 42}>{item + 42}</option>
                              ))
                            }
                          </select>
                        </div>
                      ) : (
                        <div className="mb-3 text-sm text-gray-800 basis-1/6" />
                      )
                    }
                    <div className="flex items-center mb-3 basis-1/6"></div>
                    {/* <h1 className="mb-3 text-sm text-gray-800">Left</h1> */}
                  </div>
                </div>
              </div>

              <div className="shadow mb-5 p-5 border border-gray-300  rounded grid grid-cols-1 md:grid-cols-2 bg-white">
                <div className="grid grid-cols-1">
                  <Table parameter={parameter} />
                </div>
                <div className="shadow  rounded mx-4">
                  <h1 className="text-center w-100 bg-gray-100 mb-2">PD</h1>
                  <div className="flex justify-center">
                    <img src={pdimg} className="w-[50px] " alt="" />
                  </div>
                  <div className="flex justify-evenly">
                    {parameter?.left?.pd && <span className="text-sm text-gray-900">{parameter?.left?.pd}</span>}
                    <span className="text-sm text-gray-900">{parameter?.right?.pd}</span>
                  </div>
                </div>
              </div>

              <div className="shadow mb-5 p-3 rounded border border-gray-300 bg-white flex justify-around">
                <button
                  className="  bg-gray-900 text-white shadow   p-2 border  rounded"
                  style={{ maxHeight: "40px" }}
                  onClick={() => setModal(true)}
                >
                  Measure PD online
                </button>
                <button
                  className="  bg-gray-900 text-white shadow   p-2 border  rounded"
                  style={{ maxHeight: "40px" }}
                >
                  Measure by Ruler
                </button>
              </div>

              <div className="shadow mb-5 p-3 rounded border border-gray-300 bg-white">
                <h1 className="w-100 bg-black text-white font-semibold text-sm text-center">
                  Lense Type
                </h1>

                {
                  lens.lensType.map((item, index) => (
                    <div className="  mt-4 ">
                      <div className="flex">
                        <input
                          id={item?.name}
                          type="radio"
                          name="lenseType"
                          onChange={
                            () => {
                              setLensType(item)
                            }
                          }
                        />
                        <label
                          for={item?.name}
                          className="ml-2 text-sm w-full text-gray-800 "
                        >
                          {item?.name}
                        </label>
                      </div>
                      <span className="text-xs text-gray-400 ml-5">{item?.description}</span>
                    </div>
                  ))
                }
              </div>

              <div className="shadow mb-5 p-3 rounded border border-gray-300 bg-white">
                <h1 className="w-100 bg-black text-white font-semibold text-sm text-center">
                  Thickness
                </h1>

                {
                  lens.lensThickness.map((item, index) => (
                    <div
                      className="  mt-4 "
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="flex">
                        <input
                          id="default-checkbox"
                          type="radio"
                          value=""
                          name="thickness"
                          onChange={
                            () => {
                              setLensThickness(item)
                            }
                          }
                        />
                        <div>
                          <label
                            for="default-checkbox"
                            className="ml-2 text-sm w-full text-gray-800 "
                          >
                            {item?.name}
                          </label>
                          <p className="text-xs text-gray-400 ml-2">{item?.description}</p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-sm text-gray-800">{formatCurrencyPKR(item?.price)}</h1>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="shadow p-3 rounded border border-gray-300 bg-white">
                <h1 className="w-100 bg-black text-white font-semibold text-sm text-center">
                  Advanced Lense Type
                </h1>

                {
                  lens.lensTypeAdv.map((item, index) => (
                    <div
                      className="  mt-4 "
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="flex">
                        <input
                          id="default-checkbox"
                          type="radio"
                          value=""
                          name="typeadv"
                          onChange={
                            () => {
                              setLensTypeAdv(item)
                            }
                          }
                        />
                        <div>
                          <label
                            for="default-checkbox"
                            className="ml-2 text-sm w-full text-gray-800 "

                          >
                            {item?.name}
                          </label>
                          <p className="text-xs text-gray-400 ml-2">{item?.description}</p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-sm text-gray-800">{formatCurrencyPKR(item?.price)}</h1>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
          <ProductDetails
            product={data}
            lensThickness={lensThickness}
            lensType={lensType}
            lensTypeAdv={lensTypeAdv}
            handleAddCart={handleAddCart}
          />
        </div>
      </div>
    </div>
  );
}
