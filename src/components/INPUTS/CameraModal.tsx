import React, { FC, useEffect, useRef, useState } from "react";
import type { booleanSetter } from "src/projectTypes";
import { misc } from "../ICONS/ICONS";

interface cameraModalProps {
  setOpen: booleanSetter;
}
const CameraModal: FC<cameraModalProps> = ({ setOpen }) => {
  let [pic, setPic] = useState<boolean>(false);

  let videoRef = useRef<HTMLVideoElement>(null);
  let photoRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      });
  });
  function takePhoto() {
    let video = videoRef.current;
    let photo = photoRef.current;

    if (photo && video) {
      let width = 414;
      let height = width / (16 / 9);

      photo.width = width;
      photo.height = height;

      let context = photo.getContext("2d");
      context?.drawImage(video, 0, 0, width, height);
      setPic(true);
    }
  }

  return (
    <div className="camera modal">
      <button
        onClick={() => {
          takePhoto();
        }}
        className="inputOption"
      >
        {misc.Camera}
      </button>
      <video ref={videoRef} />
      <canvas ref={photoRef} />
    </div>
  );
};

export default CameraModal;
