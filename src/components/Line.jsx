import React, { useState, useEffect } from "react";
import "../index.css";
import Tooltip from "./Tooltip";
import { CSSTransition } from "react-transition-group";
import ICONS from "./ICONS/ICONS";
import { TYPES } from "@babel/types";
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
      addOptionToList(id, full, "Full Scan", null);
      ++id;
    }
    addOptionToList(id, raw.raw, "Quantities", null);
    ++id;
  }
  addOptionToList(id, scannedLine.line, "Input", null);
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
export function Line({ scannedLine }) {
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
  return (
    <li>
      <Selection
        toggleOpen={toggleOpen}
        status={scannedLine.status}
        statusMessage={scannedLine.statusMessage}
      >
        {textArray[optionSelected]}
      </Selection>
      <CSSTransition in={open} timeout={500} classNames="bounder">
        <div>
          <CSSTransition
            in={open}
            unmountOnExit
            timeout={500}
            classNames={"lineList"}
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

let typeIconDictionary = {
  "Full Scan": <Tooltip tooltip="This is a full Scan">{ICONS.Tick}</Tooltip>,
  Quantities: (
    <Tooltip tooltip="This line contains only certain quantities.">
      {ICONS.Bar}
    </Tooltip>
  ),
  Input: <Tooltip tooltip="This line is your input.">{ICONS.Input}</Tooltip>,
};

function Option({ id, type, warnings, setOptionSelected, setOpen, children }) {
  function handleClick() {
    setOptionSelected(id);
    setOpen(false);
  }
  let typeElement = typeIconDictionary[type];
  let warningElement = warnings ? (
    <Tooltip tooltip={warnings}>{ICONS.Warning}</Tooltip>
  ) : (
    <div className="icon"></div>
  );

  return (
    <li key={id} onClick={handleClick} className={"scanSelection " + type}>
      {typeElement}
      <div className="outputText ">{children}</div>
      {warningElement}
    </li>
  );
}
