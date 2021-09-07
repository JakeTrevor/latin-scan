import React, { useState } from "react";
import ICONS from "../ICONS/ICONS";

export default function CameraInput() {
  let [selected, setSelected] = useState("");
  function toggle() {
    setSelected(selected === "" ? "selected" : "");
  }
  return (
    <button onClick={toggle} className={"inputOption " + selected}>
      {ICONS.Camera}
    </button>
  );
}
