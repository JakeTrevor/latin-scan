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

  let [selection, setSelection] = useState(options.length > 1 ? 0 : 2);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    //function simply sets the
    setOpen(!open);
  };
  return (
    <div className="line">
      <text className="lineSelection" onClick={toggleOpen}>
        {options[selection]}
      </text>
      {open && (
        <ul>
          {options.map((elt, i) => (
            <li
              className="lineOther"
              onClick={() => {
                setSelection(i);
                toggleOpen();
              }}
            >
              {elt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
