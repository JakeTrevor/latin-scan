import React from "react";
import type { FC } from "react";
import CameraInput from "./CameraInput";
import FileInput from "./FileInput";
import WriteInput from "./WriteInput";
import type { stringSetter } from "src/projectTypes";

interface inputBarProps {
  text: string;
  setText: stringSetter;
}

const InputOptionsBar: FC<inputBarProps> = ({ text, setText }) => {
  return (
    <div className="inputOptionsBar">
      <WriteInput />
      <FileInput text={text} setText={setText} />
      <CameraInput />
    </div>
  );
};

export default InputOptionsBar;
