import React, { FC, useEffect, useRef, useState } from "react";
import type { booleanSetter } from "src/projectTypes";
import ICONS from "../ICONS/ICONS";

interface cameraModalProps {
  setOpen: booleanSetter;
}
const CameraModal: FC<cameraModalProps> = ({ setOpen }) => {
  let videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
    <div className="camera modal">
      <video ref={videoRef} />
      <button
        onClick={() => {
          setOpen(false);
        }}
        className="inputOption"
      >
        {ICONS.Camera}
      </button>
    </div>
  );
};

export default CameraModal;
