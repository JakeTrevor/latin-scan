import React from "react";
import { useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { scanLine } from "../scan";
import type { setting } from "../scanTypes";
export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");
  let options: setting = { meter: "hex" };
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      {lines.map((each) => {
        return <ScannedLine line={scanLine(each, options)} />;
      })}
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
