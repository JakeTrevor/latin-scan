import React from "react";
import { PresetOptions } from "../SCAN/utils";
import { scanParagraph } from "../SCAN/scan";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import "../index.css";

export default function ScanArea({ text, setText }) {
  let scanned = scanParagraph(text, PresetOptions);
  return (
    <div className="ScanArea">
      <InputArea
        value={text}
        setValue={setText}
        placeholder="Enter Latin here..."
      />
      <OutputArea toRender={scanned} />
    </div>
  );
}
