import "../index.css";
import React, { useEffect, useState } from "react";
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

  let warnTip;
  let num = line.full.length;
  if (num === 0) {
    let warnTip = "There are no valid scans for this line.";
    //eventually, this will look up erros
  } else {
  }

  let warn = <div className="info" data-tooltip=""></div>;

  //main component below
  return (
    <div className="line">
      <div className="lineSelection" onClick={toggleOpen}>
        {options[selection]}
        {warn}
      </div>
      {open && (
        <ul className={"line-alts " + open}>
          {options
            .map((elt, i) => (
              <li
                key={i}
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

function Option({ type, typeDisplay, ...props }) {
  return (
    <div className="option">
      <p className="info" data-tooltip={type}>
        [{typeDisplay}]
      </p>
      <p className={typeDisplay}>{props.children}</p>
    </div>
  );
}

let compileResults = (input: scannedLineType) => {
  let options = [];
  let str = "";
  for (let i = 0; i < input.raws.length; i++) {
    for (let j = 0; j < input.full[i].length; j++) {
      str = input.full[i][j];
      options.push(
        <Option type="This line is a Full scan" typeDisplay="S">
          {str}
        </Option>
      );
    }
    str = input.raws[i];
    options.push(
      <Option
        type="This line is incomplete; only the quantities that could be determined are displayed"
        typeDisplay="Q"
      >
        {str}
      </Option>
    );
  }
  str = input.line;
  options.push(
    <Option type="This is your input" typeDisplay="i">
      {str}
    </Option>
  );
  return options;
};
