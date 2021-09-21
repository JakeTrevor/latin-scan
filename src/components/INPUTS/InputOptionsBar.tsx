import React, { useEffect, useState } from "react";
import type { FC } from "react";
import CameraInput from "./camera/CameraInput";
import { FileInput } from "./file/FileInput";
import WriteInput from "./WriteInput";
import type { booleanSetter, fileSetter, stringSetter } from "src/projectTypes";

interface inputBarProps {
  text: string;
  setText: stringSetter;
  setCameraOpen: booleanSetter;
  setFile: CallableFunction;
}

const InputOptionsBar: FC<inputBarProps> = ({
  text,
  setText,
  setCameraOpen,
  setFile,
}) => {
  const [camera, setCamera] = useState(<div />);

  async function detectCamera() {
    return await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (stream.getVideoTracks().length > 0) {
          setCamera(<CameraInput setCameraOpen={setCameraOpen} />);
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
