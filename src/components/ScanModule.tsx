import "../index.css";
import React, { useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { scanLine } from "../scan";
import { PresetOptions } from "../utils";

export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");

  return (
    <div className="scanModule">
      <textarea
        className="inputArea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter latin here..."
      />
      <div className="outputArea">
        {lines.map((each) => {
          return <ScannedLine line={scanLine(each, PresetOptions)} />;
        })}
      </div>
    </div>
  );
};
