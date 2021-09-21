import React, { FC, useRef, useState } from "react";
import type { stringSetter } from "src/projectTypes";
import { misc } from "../../ICONS/ICONS";
import handleFile from "../FileHandler";

interface fileInputProps {
  text: string;
  setText: stringSetter;
}

export let FileInput: FC<fileInputProps> = ({ text, setText }) => {
  let inputRef = useRef<HTMLInputElement>(null);
  let [selected, setSelected] = useState("");
  function clear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      let files = e.target.files;
      if (files) {
        let file = files[0];
        let derivedText = await handleFile(file);
        setText(derivedText);
      }
    } catch {}
  }

  return (
    <label onClick={clear} className={"inputOption " + selected}>
      <input ref={inputRef} onInput={handleInput} type="file" />
      {misc.TextFileInput}
    </label>
  );
};
