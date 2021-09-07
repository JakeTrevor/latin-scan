import React from "react";
import CameraInput from "./CameraInput";
import FileInput from "./FileInput";
import WriteInput from "./WriteInput";

export default function InputOptionsBar({}) {
  return (
    <div className="inputOptionsBar">
      <WriteInput />
      <FileInput />
      <CameraInput />
    </div>
  );
}
