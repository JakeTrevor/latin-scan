import React, { FC, useEffect, useRef, useState } from "react";
import type { booleanSetter } from "src/projectTypes";
import ICONS from "./ICONS/ICONS";

interface cameraModalProps{
  open: boolean;
  setOpen: booleanSetter;
}

const CameraModal: FC<cameraModalProps = ({open, setOpen}) => {
  let videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("hello");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
        }
      });
  });

  return (
    open && (
      <div className="camera modal">
        <video ref={videoRef} />
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="inputOption"
        >
          {ICONS.Camera}
        </button>
      </div>
    )
  );
};

export default CameraModal;
