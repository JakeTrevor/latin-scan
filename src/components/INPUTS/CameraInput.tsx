import React from "react";
import type { FC } from "react";
import type { booleanSetter } from "src/projectTypes";
import { misc } from "../ICONS/ICONS";

interface cameraInputProps {
  setCameraOpen: booleanSetter;
}

const CameraInput: FC<cameraInputProps> = ({ setCameraOpen }) => {
  let hasCamera: boolean;

  return (
    <div>
      <button onClick={() => setCameraOpen(true)} className={"inputOption"}>
        {misc.Camera}
      </button>
    </div>
  );
};

export default CameraInput;
