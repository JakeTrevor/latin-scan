import React, { FC, useRef, useState } from "react";
import type { stringSetter } from "src/projectTypes";
import { misc } from "../../ICONS/ICONS";
import handleFile from "../FileHandler";

interface fileInputProps {
  setText: stringSetter;
  setFile: CallableFunction;
}

export let FileInput: FC<fileInputProps> = ({ setText, setFile }) => {
  let inputRef = useRef<HTMLInputElement>(null);
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
        if (file.type.startsWith("image")) {
          setFile(file);
        } else {
          let derivedText = await handleFile(file, (m: any) => {
            console.log(m);
          });
          setText(derivedText);
        }
      }
    } catch {}
  }

  return (
    <label onClick={clear} className="inputOption">
      <input ref={inputRef} onInput={handleInput} type="file" />
      {misc.TextFileInput}
    </label>
  );
};
