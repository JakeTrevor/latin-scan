import "../index.css";
import React from "react";
import { useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { scanLine } from "../scan";
import type { setting } from "../scanTypes";
import { PresetOptions } from "../utils";

export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");

  return (
    <div className="scanMachine">
      <textarea
        className="inputArea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="outputArea">
        {lines.map((each) => {
          return <ScannedLine line={scanLine(each, PresetOptions)} />;
        })}
      </div>
    </div>
  );
};

function tester(line: string) {
  return {
    line: line,
    raws: [line + " raw 1", line + " raw 2"],
    full: [[line + " full1.1", line + " full1.2"], [line + " full2.1"]],
  };
}
