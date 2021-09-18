import React, { FC, useEffect, useRef, useState } from "react";
import type { booleanSetter } from "src/projectTypes";
import { misc } from "../ICONS/ICONS";

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
      <h1>
        I'm still working on this feature - this is here for testing purposes.
      </h1>
      <video ref={videoRef} />
      <button
        onClick={() => {
          setOpen(false);
        }}
        className="inputOption"
      >
        {misc.Camera}
      </button>
    </div>
  );
};

export default CameraModal;
