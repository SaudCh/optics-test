import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUserAlt, FaSnapchatGhost } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import user1 from "../../assets/user1.jpg";
import { JEELIZVTOWIDGET } from "jeelizvtowidget";
import Virtual from "../tryon/virtual";
import Avatar from "../tryon/Avatar";
import Picture from "../tryon/picture";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function TryOnModal({
  open,
  handleClose,
  tryOnJSON,
  tryOnPNG,
  snapchat
}) {
  const windowDimensions = useWindowDimensions();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowDimensions.width > 600 ? 600 : windowDimensions.width - 20,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    borderRadius: 2,
  };

  const [step, setStep] = useState("virtual");
  const [active, setActive] = useState(false);

  const TryOn = () => {
    const mirrortryOnContainer = document.querySelector(".try__on__overlay");
    mirrortryOnContainer.classList.add("active_tryon_mirror");
    document.body.classList.add("noscroll");

    JEELIZVTOWIDGET.start({
      searchImageMask: `src/assets/loading.png`,
      searchImageColor: 0xeeeeee,
      callbackReady: function () {
        JEELIZVTOWIDGET.load_modelStandalone(
          import.meta.env.VITE_SERVER_URL + tryOnJSON
        );
      },
      onError: function (errorLabel) {
        alert("An error happened. errorLabel =" + errorLabel);
        switch (errorLabel) {
          case "WEBCAM_UNAVAILABLE":
            break;
          case "NOFILE":
            break;
          case "WRONGFILEFORMAT":
            break;
          case "INVALID_SKU":
            break;
          case "FALLBACK_UNAVAILABLE":
            break;
          case "PLACEHOLDER_NULL_WIDTH":
          case "PLACEHOLDER_NULL_HEIGHT":
            break;
          case "FATAL":
          default:
            break;
        }
      },
    });
  };

  const handleStep = (step) => {
    setStep(step);

    if (step === "virtual") {
      setActive(true);
      TryOn();
    } else {
      const mirrortryOnContainer = document.querySelector(".try__on__overlay");
      mirrortryOnContainer.classList.remove("active_tryon_mirror");
      JEELIZVTOWIDGET.pause();
      setActive(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (active) JEELIZVTOWIDGET?.pause();
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="items-center">
          <div className=" h-[500px] overflow-hidden">
            {
              (
                step !== "avatar" &&
                step !== "picture" &&
                step !== "snapchat" &&
                !active
              ) && (
                <div className="h-[500px] flex justify-center items-center">
                  <p>
                    Choose the type of try on you want to do. You can try on
                  </p>
                </div>
              )
            }
            {step === "avatar" && <Avatar tryOnPNG={tryOnPNG} />}
            {step === "picture" && <Picture tryOnPNG={tryOnPNG} />}

            <div className={`try__on__overlay ${active && " active_tryon_mirror"}`}>
              <div className="content try_on_container">
                <div id="JeelizVTOWidget">
                  <canvas id="JeelizVTOWidgetCanvas"></canvas>
                </div>
              </div>
            </div>

            {/* <div className="try__on__overlay">
              <div className="content try_on_container">
                <div id="JeelizVTOWidget">
                  <canvas id="JeelizVTOWidgetCanvas"></canvas>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex justify-evenly">
            <div
              className="border p-2"
              type="button"
              onClick={() => setStep("picture")}
            >
              <AiFillPicture size={30} className="text-slate-900" />
            </div>
            <div
              className="border p-2"
              type="button"
              onClick={() => handleStep("virtual")}
            >
              <BsCameraVideoFill size={30} className="text-slate-900" />
            </div>
            <div
              className="border p-2"
              type="button"
              onClick={() => setStep("avatar")}
            >
              <FaUserAlt size={30} className="text-slate-900" />
            </div>
            {snapchat && <div
              className="border p-2"
              type="button"
            >
              <a href={snapchat} target={'_blank'}>
                <FaSnapchatGhost size={30} className="text-slate-900" />
              </a>
            </div>}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
