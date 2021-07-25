import "../index.css";
import React, { useEffect, useState } from "react";
import type { rawType, scannedLineType } from "../scanTypes";
import { CSSTransition } from "react-transition-group";

export let ScannedLine = ({ line }) => {
  let options = compileResults(line);

  //setup some state
  let [selection, setSelection] = useState(options.length > 1 ? 0 : 2);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    //function simply sets the
    setOpen(!open);
  };

  const [height, setHeight] = useState(null);
  function calcHeight(el) {
    let height = el.offsetHeight;
    setHeight(height);
  }

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
      <div className="options-box" style={{ height: height }}>
        <CSSTransition
          in={open}
          unmountOnExit
          timeout={200}
          classNames="line-options"
          onEnter={calcHeight}
          onExit={() => {
            setHeight(0);
          }}
        >
          <div>
            <ul className="line-alts">
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
          </div>
        </CSSTransition>
      </div>
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
  for (let i = 0; i < input.output.length; i++) {
    for (let j = 0; j < input.output[i].full.length; j++) {
      str = input.output[i].full[j];
      options.push(
        <Option type="This line is a Full scan" typeDisplay="S">
          {str}
        </Option>
      );
    }
    str = input.output[i].raw;
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
