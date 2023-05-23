import React, { useContext } from "react";
import "./home.scss";
import NewArrival from "./NewArrival";
import Sunglasses from "./Sunglasses";
import TopBrands from "./TopBrands";
import Crousal from "./Crousal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";
import { Link } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import config from "../bot/config.js";
import MessageParser from "../bot/MessageParser";
import ActionProvider from "../bot/ActionProvider";

export default function Home() {

  const [collection, setCollection] = useState([])
  const { setIsLoading } = useContext(LoadingContext)
  const [showChatbot, setShowChatbot] = React.useState(false);

  useEffect(() => {

    const getCollections = async () => {
      setIsLoading(true)
      await axios.get("/collection/home-display")
        .then(res => {
          setCollection(res?.data?.collections)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))

    }

    getCollections();

  }, [])

  return (
    <div className="">
      <Crousal />

      {
        collection.map((item, index) => {

          return item?.products?.length > 0 ? (

            <div key={index}>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-xl my-5 mx-2">{item.name}</p>
              </div>
              <NewArrival
                products={item?.products || []}
              />
              <div className="flex justify-center mb-10">
                <Link
                  to={`/collections/${item?._id}`}
                  type="button"
                  className="inline-block rounded bg-[#b91c1c] px-6 pt-2.5 pb-2 text-base font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_#332d2d] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] "

                >
                  Explore collection
                </Link>
              </div>
            </div>
          ) : null
        })}
      <div className={`fixed right-0 shadow-2xl ${showChatbot ? "bottom-0" : "bottom-[-450px]"}`} >
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="h-[50px] absolute top-0 left-0 right-0 z-10 " />
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>

    </div>
  );
}
