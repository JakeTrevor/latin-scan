import React, { useState, useEffect } from "react";
import "../index.css";
import Tooltip from "./Tooltip";
import { CSSTransition } from "react-transition-group";
import ICONS from "./ICONS/ICONS";
import { Option } from "./Option";
//helper functions

//todo: this could be its own component, have it return a UL.
function makeOptionArray(scannedLine, setOption, setOpen) {
  let temp = [];
  let output = scannedLine.output;
  let id = 0;

  function addOptionToList(id, text, type, warnings) {
    temp.push(
      <Option
        id={id}
        type={type}
        warnings={warnings}
        setOptionSelected={setOption}
        setOpen={setOpen}
      >
        {text}
      </Option>
    );
  }

  for (let raw of output) {
    let fullScans = raw.full;
    for (let full of fullScans) {
      addOptionToList(id, full, "Full Scan", []);
      ++id;
    }
    addOptionToList(id, raw.raw, "Quantities", raw.error);
    ++id;
  }
  addOptionToList(id, scannedLine.line, "Input", []);
  ++id;
  temp = temp.reverse();
  return temp;
}

function flattenScannedLine(scannedLine) {
  let temp = [];
  let output = scannedLine.output;
  for (let each of output) {
    temp = temp.concat(each.full);
    temp.push(each.raw);
  }
  temp.push(scannedLine.line);
  return temp;
}

//components
export function Line({ scannedLine, id }) {
  let [optionSelected, setOptionSelected] = useState(0);
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  let options = makeOptionArray(scannedLine, setOptionSelected, setOpen);
  let textArray = flattenScannedLine(scannedLine);

  useEffect(() => {
    if (optionSelected >= textArray.length) {
      setOptionSelected(0);
    }
  });
  const [height, setHeight] = useState(0);
  function calcHeight(el) {
    let height = el.offsetHeight;
    setHeight(height);
  }

  return (
    <li key={id}>
      <Selection
        toggleOpen={toggleOpen}
        status={scannedLine.status}
        statusMessage={scannedLine.statusMessage}
      >
        {textArray[optionSelected]}
      </Selection>
      <CSSTransition in={open} timeout={500} classNames="lineBounder">
        <div className="lineBounder" style={{ height: height }}>
          <CSSTransition
            in={open}
            unmountOnExit
            timeout={500}
            classNames={"lineList"}
            onEnter={calcHeight}
            onExit={() => setHeight(0)}
          >
            <ul className="lineList">{options}</ul>
          </CSSTransition>
        </div>
      </CSSTransition>
    </li>
  );
}

function Selection({ toggleOpen, status, statusMessage, children }) {
  return (
    <div onClick={toggleOpen} className="scanSelection">
      {ICONS.DownArrow}
      <div className="outputText">{children}</div>
      <Tooltip tooltip={statusMessage}>{ICONS[status]}</Tooltip>
    </div>
  );
}
