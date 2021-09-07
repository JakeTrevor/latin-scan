import React, { FC, useState } from "react";
import ICONS from "../ICONS/ICONS";

const FileInput: FC = () => {
  let [selected, setSelected] = useState("");
  function toggle() {
    setSelected(selected === "" ? "selected" : "");
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.target.files;
    console.log(files);
  }

  return (
    <label onClick={toggle} className={"inputOption " + selected}>
      <input type="file" onChange={onChange} />
      {ICONS.TextFileInput}
    </label>
  );
};

export default FileInput;
