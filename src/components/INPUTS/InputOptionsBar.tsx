import React, { useEffect, useState } from "react";
import type { FC } from "react";
import CameraInput from "./camera/CameraInput";
import { FileInput } from "./file/FileInput";
import WriteInput from "./WriteInput";
import type { booleanSetter, fileSetter, stringSetter } from "src/projectTypes";
import CamMobile from "./camera/CamMobile";

interface inputBarProps {
  setText: stringSetter;
  setCameraOpen: booleanSetter;
  setFile: CallableFunction;
}

const InputOptionsBar: FC<inputBarProps> = ({
  setText,
  setCameraOpen,
  setFile,
}) => {
  const [camera, setCamera] = useState(<div />); //at first assume no camera

  async function detectCamera() {
    let isMobile = /Mobi|Android/i.test(navigator.userAgent); //dont display for mobile.

    let camElement = <CameraInput setCameraOpen={setCameraOpen} />;
    if (!isMobile) {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (stream.getVideoTracks().length > 0) {
            setCamera(camElement);
          }
        });
    }
  }

  useEffect(() => {
    detectCamera();
  });

  return (
    <div className="inputOptionsBar">
      <WriteInput />
      <FileInput setText={setText} setFile={setFile} />
      {camera}
    </div>
  );
};

export default InputOptionsBar;
