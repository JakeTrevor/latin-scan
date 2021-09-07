import React from "react";
import type { FC } from "react";
import CameraInput from "./CameraInput";
import FileInput from "./FileInput";
import WriteInput from "./WriteInput";

const InputOptionsBar: FC = () => {
  return (
    <div className="inputOptionsBar">
      <WriteInput />
      <FileInput />
      <CameraInput />
    </div>
  );
};
