import "../index.css";
import React from "react";
import { useEffect, useState } from "react";
import type { scannedLineType } from "../scanTypes";

export let ScannedLine = (props: { line: scannedLineType }) => {
  let line: scannedLineType = props.line;
  let options = compileResults(line);

  //setup some state
  let [selection, setSelection] = useState(options.length > 1 ? 0 : 2);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    //function simply sets the
    setOpen(!open);
  };

  //handler for a "selection out of range" bug
  useEffect(() => {
    if (selection >= options.length) {
      setSelection(0);
    }
  });

  //main component below
  return (
    <div className="line">
      <div className="lineSelection" onClick={toggleOpen}>
        {options[selection]}
      </div>

      {open && ( //options for line displayed here:
        <ul>
          {options
            .map((elt, i) => (
              <li
                onClick={() => {
                  setSelection(i);
                  toggleOpen();
                }}
              >
                {elt}
              </li>
            ))
            .reverse()}
        </ul>
      )}
    </div>
  );
};

let compileResults = (input: scannedLineType) => {
  let options = [];
  let str = "";
  let element;
  for (let i = 0; i < input.raws.length; i++) {
    for (let j = 0; j < input.full[i].length; j++) {
      str = input.full[i][j];
      element = (
        <div className="option fullScan">
          <text className="info" data-tooltip="This line is a Full scan">
            [S]
          </text>
          <text>{str}</text>
        </div>
      );
      options.push(element);
    }
    str = input.raws[i];
    element = (
      <div className="option naturalQ">
        <text
          className="info"
          data-tooltip="This line only includes the natural quantities detected"
        >
          [NQ]
        </text>
        <text>{str}</text>
      </div>
    );
    options.push(element);
  }
  str = input.line;
  element = (
    <div className="option plainText">
      <text className="info" data-tooltip="This is your input">
        [i]
      </text>
      <text>{str}</text>
    </div>
  );
  options.push(element);
  return options;
};
