import React, { useState } from "react";
import "../index.css";
import Tooltip from "./Tooltip";

import DownArrow from "./ICONS/DownArrow.svg";
import Hexagon from "./ICONS/hexagon.svg";
import Pentagon from "./ICONS/pentagon.svg";
import Warning from "./ICONS/warning.svg";
import Checkmark from "./ICONS/checkmark.svg";
import Input from "./ICONS/Input.svg";
//helper functions
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

function getStatus(scannedLine) {
  // returning --> [status(warn, hexOK, pentOK), message]
  let meter = scannedLine.meter;
  let status = "warn";
  let solutions = [];
  for (let each of scannedLine.output) {
    solutions = solutions.concat(each.full);
  }
  console.log(solutions);
  console.log(solutions.length);
  if (solutions.length > 0) {
    status = meter + "OK";
    console.log(status);
  }
  let statusMessage = scannedLine.errors[0] || "Scanned as " + meter;
  return [status, statusMessage];
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
  let [status, statusMessage] = getStatus(scannedLine);
  return (
    <div>
      <Selection
        toggleOpen={toggleOpen}
        status={status}
        statusMessage={statusMessage}
      >
        {textArray[optionSelected]}
      </Selection>
      {open && <div className="lineList">{options}</div>}
    </div>
  );
}

let iconDictionary = {
  warn: <Warning className="icon" />,
  HexameterOK: <Hexagon className="icon" />,
  PentameterOK: <Pentagon className="icon" />,
};

function Selection({ toggleOpen, status, statusMessage, children }) {
  return (
    <div onClick={toggleOpen} className="scanSelection">
      <DownArrow className="icon" />
      <div className="outputText">{children}</div>
      <Tooltip tooltip={statusMessage}>{iconDictionary[status]}</Tooltip>
    </div>
  );
}

let typeIconDictionary = {
  "Full Scan": (
    <Tooltip tooltip="This is a full Scan">
      <Checkmark className="icon" />
    </Tooltip>
  ),
  Quantities: (
    <Tooltip tooltip="This line contains only certain quantities.">[Q]</Tooltip>
  ),
  Input: (
    <Tooltip tooltip="This line is your input.">
      <Input className="icon" />
    </Tooltip>
  ),
};

function Option({ id, type, warnings, setOptionSelected, setOpen, children }) {
  function handleClick() {
    setOptionSelected(id);
    setOpen(false);
  }
  let typeElement = typeIconDictionary[type];
  let warningElement = warnings ? (
    <Tooltip tooltip={warnings}>
      <Warning className="icon" />;
    </Tooltip>
  ) : (
    <div className="icon"></div>
  );

  return (
    <li key={id} onClick={handleClick} className="scanSelection">
      {typeElement}
      <div className="outputText">{children}</div>
      {warningElement}
    </li>
  );
}
