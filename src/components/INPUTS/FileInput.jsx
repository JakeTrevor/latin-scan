import React, { useState } from "react";
import ICONS from "../ICONS/ICONS";

export default function FileInput({}) {
  let [selected, setSelected] = useState("");
  function toggle() {
    setSelected(selected === "" ? "selected" : "");
  }
  return (
    <button onClick={toggle} className={"inputOption " + selected}>
      {ICONS.TextFileInput}
    </button>
  );
}
