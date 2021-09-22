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
  const [camera, setCamera] = useState(<div />);

  async function detectCamera() {
    //detect if we are on mobile.
    let isMobile = /Mobi|Android/i.test(navigator.userAgent);

    let camElement = isMobile ? (
      <CamMobile setFile={setFile} />
    ) : (
      <CameraInput setCameraOpen={setCameraOpen} />
    );

    return await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (stream.getVideoTracks().length > 0) {
          setCamera(camElement);
        }
      });
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
