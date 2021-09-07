import React, { FC, useState, useEffect } from "react";
import type {
  booleanSetter,
  numberSetter,
  scannedLineType,
  scanType,
} from "../projectTypes";
import { CSSTransition } from "react-transition-group";
import Option from "./Option";
import Selection from "./Selection";
//helper functions

//todo: this could be its own component, have it return a UL.
function makeOptionArray(
  scannedLine: scannedLineType,
  setOption: numberSetter,
  setOpen: booleanSetter
) {
  let temp: any[] = [];
  let output = scannedLine.output;
  let id = 0;

  function addOptionToList(
    id: number,
    text: string,
    scanType: scanType,
    warnings: string
  ) {
    temp.push(
      <Option
        id={id}
        type={scanType}
        warning={warnings}
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
      addOptionToList(id, full, "Full Scan", "");
      ++id;
    }
    addOptionToList(id, raw.raw, "Quantities", raw.error);
    ++id;
  }
  addOptionToList(id, scannedLine.line, "Input", "");
  ++id;
  temp = temp.reverse();
  return temp;
}

//todo this should not be in this file
function flattenScannedLine(scannedLine: scannedLineType) {
  let temp: string[] = [];
  let output = scannedLine.output;
  for (let each of output) {
    temp = temp.concat(each.full);
    temp.push(each.raw);
  }
  temp.push(scannedLine.line);
  return temp;
}

//components

interface lineProps {
  scannedLine: scannedLineType;
  id: number;
}

let Line: FC<lineProps> = ({ scannedLine, id }) => {
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
  function calcHeight(el: HTMLElement) {
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
};

export default Line;
