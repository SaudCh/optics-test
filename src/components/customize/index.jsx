import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./index.scss";
import Draggable from "react-draggable";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function PDModal({ open, handleClose, setPd }) {
  const windowDimensions = useWindowDimensions();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowDimensions.width < 500 ? windowDimensions.width - 20 : 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };



  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [captured, setCaptured] = useState(false);
  const drag1Ref = useRef(null);
  const drag2Ref = useRef(null);

  const startVideo = () => {
    setStarted(true);
    setCaptured(false);
    const width = 360;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const photo = photoRef.current;

    video.style.display = "block";
    photo.style.display = "none";

    const constraints = {
      video: true,
      audio: false,
    };

    const handleSuccess = (stream) => {
      video.srcObject = stream;
    };

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);
  };

  const capturePic = () => {
    setCaptured(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const photo = photoRef.current;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL();

    photo.src = canvas.toDataURL("image/png");
    photo.style.display = "block";
    video.style.display = "none";
  };

  const reTake = () => {
    setCaptured(false);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const photo = photoRef.current;

    video.style.display = "block";
    photo.style.display = "none";
  };

  const stopCam = () => {
    setStarted(false);
    const video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    video.srcObject = null;
  };

  const handleCalculate = () => {
    const drag1 = drag1Ref.current;
    const drag2 = drag2Ref.current;
    // const ccSelect = ccSelectRef.current;

    const div1rect = drag1.getBoundingClientRect();
    const div2rect = drag2.getBoundingClientRect();
    // const div3rect = ccSelect.getBoundingClientRect();
    const div3rect = { width: 85.6 };

    const div1x = div1rect.left + div1rect.width / 2;
    const div1y = div1rect.top + div1rect.height / 2;

    const div2x = div2rect.left + div2rect.width / 2;
    const div2y = div2rect.top + div2rect.height / 2;

    const distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
    const distance = Math.sqrt(distanceSquared);
    const pd = ((distance * 85.6) / div3rect.width).toFixed(2);

    console.log(`Your PD is ${pd}mm`);

    setPd(pd);

    handleClose();


    // calculate distance between two divs

  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
        {captured && (
          <Draggable>
            <div ref={drag1Ref} id="drag-1" className="draggable">
              <div className="left__controll ">
                <span className="controll_btn btn_left" id="left"></span>
                <span className="controll_btn btn_right" id="right"></span>
                <div className="left-pupil"></div>
                <span className="controll_btn btn_up" id="up"></span>
                <span className="controll_btn btn_down" id="down"></span>
              </div>
            </div>
          </Draggable>
        )}
        {captured && (
          <Draggable>
            <div id="drag-2" ref={drag2Ref} className="draggable">
              <div className="right__controll">
                <span className="controll_btn btn_left" id="left"></span>
                <span className="controll_btn btn_right" id="right"></span>
                <div className="right-pupil"></div>

                <span className="controll_btn btn_up" id="up"></span>
                <span className="controll_btn btn_down" id="down"></span>
              </div>
            </div>
          </Draggable>
        )}
        <img ref={photoRef} className="h-full w-full" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {started ? (
          <Button onClick={stopCam}>Stop</Button>
        ) : (
          <Button onClick={startVideo}>Start</Button>
        )}

        {captured && started && <Button onClick={reTake}>Retake</Button>}
        {!captured && started && <Button onClick={capturePic}>Capture</Button>}
        {captured && <Button onClick={handleCalculate}>Calculate</Button>}
      </Box>
    </Modal>
  );
}
