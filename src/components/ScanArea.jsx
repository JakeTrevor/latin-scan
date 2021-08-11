import React from "react";
import { PresetOptions } from "../SCAN/utils";
import { scanParagraph } from "../SCAN/scan";
import AutoHeightTextarea from "./AutoHeightTextArea";
import OutputArea from "./OutputArea";

export default function ScanArea({ text, setText }) {
  let scanned = scanParagraph(text, PresetOptions);
  return (
    <div>
      <AutoHeightTextarea
        value={text}
        setValue={setText}
        placeholder="Enter Latin here..."
      />
      <OutputArea toRender={scanned} />
    </div>
  );
}
