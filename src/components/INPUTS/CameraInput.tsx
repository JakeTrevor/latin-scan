import React, { FC, useState } from "react";
import ICONS from "../ICONS/ICONS";

const CameraInput: FC = () => {
  let [selected, setSelected] = useState("");
  function toggle() {
    setSelected(selected === "" ? "selected" : "");
  }
  return (
    <button onClick={toggle} className={"inputOption " + selected}>
      {ICONS.Camera}
    </button>
  );
};

export default CameraInput;
