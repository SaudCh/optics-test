import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { AiOutlinePicture } from "react-icons/ai";
import TryGlasses from "../../assets/glasses1.png";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./index.scss";

export default function Picture({ tryOnPNG }) {

  const imgRef = useRef();
  const inputRef = useRef();
  const glassesRef = useRef();
  const [image, setImage] = useState();
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: -110 });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

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
            className="absolute top-0 left-0 "

          // style={{ transform: `rotate(${rotate}deg)` }}
          />
        </Draggable>
      )
      }
      {image ? (
        <>
          <img
            ref={imgRef}
            className="w-full h-[420px] object-contain"
            src={image}
            alt="uploaded"
            style={{
              pointerEvents: "none",
            }}
          />
          {/* change button  */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              onClick={() => inputRef.current.click()}
            >
              <AiOutlinePicture size={20} />
              <span>Change</span>
            </button>
          </div>
        </>

      ) : (
        <div onClick={() => inputRef.current.click()} className="flex flex-col justify-center items-center h-[500px]">
          <AiOutlinePicture size={100} className="text-slate-500 text-center" />
          <p className="text-center">Click to add image</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
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
