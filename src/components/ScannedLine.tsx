import "../index.css";
import * as React from "react";
import { useState } from "react";
import type { scannedLineType } from "../scanTypes";

export let ScannedLine = (props: { line: scannedLineType }) => {
  let line: scannedLineType = props.line;
  let options = [line.line];
  for (let i = 0; i < line.raws.length; i++) {
    options.push(line.raws[i]);
    for (let j = 0; j < line.full[i].length; j++) {
      options.push(line.full[i][j]);
    }
  }

  let [selection, setSelection] = useState(line.line);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    //function simply sets the
    setOpen(!open);
  };

  return (
    <div className="scannedLine">
      <text>{selection}</text>
      {options.map((elt) => (
        <text
          onClick={() => {
            setSelection(elt);
          }}
        >
          {elt}
        </text>
      ))}
    </div>
  );
};
