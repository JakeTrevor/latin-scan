import React, { FC, useRef, useState } from "react";
import type { stringSetter } from "src/projectTypes";
import { misc } from "../ICONS/ICONS";

interface fileInputProps {
  text: string;
  setText: stringSetter;
}

const FileInput: FC<fileInputProps> = ({ text, setText }) => {
  let inputRef = useRef<HTMLInputElement>(null);
  let [selected, setSelected] = useState("");
  function clear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function addNewText(newContent: string) {
    let temp = text + newContent;
    setText(temp);
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      let files = e.target.files;
      if (files) {
        let file = files[0];
        if (file.name.endsWith(".txt")) {
          let text = await file.text();
          addNewText(text + "\n");
        } else {
          alert("This file format isnt supported (yet)");
        }
      }
    } catch {}
  }

  return (
    <label onClick={clear} className={"inputOption " + selected}>
      <input ref={inputRef} type="file" onInput={handleInput} />
      {misc.TextFileInput}
    </label>
  );
};

export default FileInput;
