import React, { FC, useEffect, useRef, useState } from "react";
import type { booleanSetter, fileSetter, stringSetter } from "src/projectTypes";
import { misc } from "../../ICONS/ICONS";
import { CloseButton } from "./CloseButton";

interface cameraModalProps {
  setPicture: fileSetter;
  close: CallableFunction;
  next: CallableFunction;
}

export let TakePictureModal: FC<cameraModalProps> = ({
  setPicture,
  close,
  next,
}) => {
  let videoRef = useRef<HTMLVideoElement>(null);
  let photoRef = useRef<HTMLCanvasElement>(null);

  //load video into camera modal.
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

  //take photo oon buttonPress
  function takePhoto() {
    let video = videoRef.current;
    let photo = photoRef.current;

    if (photo && video) {
      let width = 1000;
      let height = width / (16 / 9);

      photo.width = width;
      photo.height = height;

      let context = photo.getContext("2d");
      context?.drawImage(video, 0, 0, width, height);

      //draw the blob to a photo
      photo.toBlob(
        (blob) => {
          if (blob) {
            let photoFile: File = new File([blob], "image.png");
            setPicture(photoFile);
          }
        },
        "image/png",
        1
      );
    }
    next();
  }

  return (
    <div className="modal">
      <div className="buttonBar">
        <CloseButton close={close} />
        <button
          onClick={() => {
            takePhoto();
          }}
          className="inputOption"
        >
          {misc.Camera}
        </button>
      </div>
      <video ref={videoRef} />
      <canvas ref={photoRef} />
    </div>
  );
};
