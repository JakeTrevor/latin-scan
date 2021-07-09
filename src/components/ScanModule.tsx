import React from "react";
import { useState } from "react";
import type { scannedLine } from "src/utils";
import { ScannedLine } from "./ScannedLine";

export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      {lines.map((each) => {
        return <ScannedLine line={tester(each)} />;
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
