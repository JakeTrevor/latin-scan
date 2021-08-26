import React from "react";
import { PresetOptions } from "../SCAN/utils";
import { scanParagraph } from "../SCAN/scan";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import OptionsBar from "./OptionsBar";

import "../index.css";

export default function ScanArea({ text, setText, settings, setSettings }) {
  let scanned = scanParagraph(text, settings);
  return (
    <div className="ScanArea">
      <OptionsBar settings={settings} setSettings={setSettings} />
      <div className="IOArea">
        <InputArea
          value={text}
          setValue={setText}
          placeholder="Enter Latin here..."
        />
        <OutputArea toRender={scanned} />
      </div>
    </div>
  );
}
