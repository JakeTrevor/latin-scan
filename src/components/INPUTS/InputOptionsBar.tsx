import React, { useEffect, useState } from "react";
import type { FC } from "react";
import CameraInput from "./CameraInput";
import FileInput from "./FileInput";
import WriteInput from "./WriteInput";
import type { booleanSetter, stringSetter } from "src/projectTypes";

interface inputBarProps {
  text: string;
  setText: stringSetter;
  setCameraOpen: booleanSetter;
}

const InputOptionsBar: FC<inputBarProps> = ({
  text,
  setText,
  setCameraOpen,
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
      <FileInput text={text} setText={setText} />
      {camera}
    </div>
  );
};

export default InputOptionsBar;
