import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { AiOutlinePicture } from "react-icons/ai";
import TryGlasses from "../../assets/glasses1.png";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./index.scss";
import avatar1 from "../../assets/avatar/avatar1.jpg";
import avatar2 from "../../assets/avatar/avatar2.jpg";
import avatar3 from "../../assets/avatar/avatar3.jpg";
import avatar4 from "../../assets/avatar/avatar4.jpg";
import avatar5 from "../../assets/avatar/avatar5.jpg";
import avatar6 from "../../assets/avatar/avatar6.jpg";
import avatar7 from "../../assets/avatar/avatar7.jpg";
import avatar8 from "../../assets/avatar/avatar8.jpg";

export default function Picture({ tryOnPNG }) {

  const avatars = [
    avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8
  ]

  const imgRef = useRef();
  const glassesRef = useRef();
  const [image, setImage] = useState(avatar1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="flex items-center justify-center flex-col">
      {image && (

        <Draggable
          // print x and y coordinates
          onDrag={(e, ui) => {
            // console.log(ui.x, ui.y);
          }}
          // set the position of the glasses
          onStop={(e, ui) => {
            setPosition({ x: ui.x, y: ui.y });
          }}
        >
          <img
            ref={glassesRef}
            src={tryOnPNG ? import.meta.env.VITE_SERVER_URL + tryOnPNG : TryGlasses}
            alt="uploaded"
            className="z-10 absolute"

          // style={{ transform: `rotate(${rotate}deg)` }}
          />
        </Draggable>
      )
      }
      {image ? (
        <>
          <img
            ref={imgRef}
            className="w-full h-[500px] object-contain"
            src={image}
            alt="uploaded"
            style={{
              pointerEvents: "none",
            }}
          />
          <div className="absolute bottom-[80px] flex flex-warp ">
            {
              avatars.map((avatar, index) => {
                return (
                  <img
                    key={index}
                    src={avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-contain border-2 border-gray-400 cursor-pointer bg-gray-400"
                    onClick={() => {
                      setImage(avatar);
                    }}
                  />
                )
              }
              )
            }
          </div>
        </>

      ) : null}
      {
        image && (
          <div className="max-w-xs flex flex-col rounded-md shadow-sm z-100 absolute top-0 right-0">
            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-t-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onClick={() => {
                if (glassesRef.current) {

                  glassesRef.current.style.transform = `translate(${position?.x}px, ${position.y}px) rotate(${rotate - 5}deg)`;
                  setRotate((prev) => prev - 5);
                }
              }}
            >
              <BiRotateLeft />
            </button>
            <button
              type="button"
              className="-mt-px py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onClick={() => {
                if (glassesRef.current) {
                  glassesRef.current.style.transform = `translate(${position?.x}px, ${position.y}px) rotate(${rotate + 5}deg)`;
                  setRotate((prev) => prev + 5);
                }
              }}
            >
              <BiRotateRight />
            </button>
            <button
              type="button"
              className="-mt-px py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onClick={() => {
                const glass = glassesRef.current;
                const size = glass.style.width.match(/(\d+)px/);
                const sizePx = size ? parseInt(size[1]) : 100;
                glass.style.width = `${sizePx + 10}px`;
              }}
            >
              <AiOutlinePlus />
            </button>
            <button
              type="button"
              className="-mt-px py-3 px-4 inline-flex justify-center items-center gap-2 rounded-b-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onClick={() => {
                const glass = glassesRef.current;
                const size = glass.style.width.match(/(\d+)px/);
                const sizePx = size ? parseInt(size[1]) : 100;
                glass.style.width = `${sizePx - 10}px`;
              }}
            >
              <AiOutlineMinus />
            </button>
          </div>
        )
      }
    </div >
  );
}
