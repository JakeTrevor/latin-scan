import React, { useState } from "react";
import ICONS from "../ICONS/ICONS";

export default function FileInput({}) {
  let [selected, setSelected] = useState("");
  function toggle() {
    setSelected(selected === "" ? "selected" : "");
  }

  function onChange(e) {
    let files = e.target.files;
    console.log(files);
    
  }

  return (
    <label onClick={toggle} className={"inputOption " + selected}>
      <input type="file" onChange={onChange} />
      {ICONS.TextFileInput}
    </label>
  );
}
