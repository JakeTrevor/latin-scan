import React, { useState } from "react";

export function Line(scannedLine) {
  let userInput = scannedLine.line;
  let output = scannedLine.output;
  let topLevelErrors = scannedLine.errors;

  let [selection, setSelection] = useState(0);
  let [open, setOpen] = useState(false);

  return (
    <div>
      <selection />
    </div>
  );
}

function selection() {}

function Option(text, id) {
  let handleClick = () => {
    setSelection(id);
    setOpen(false);
  };
  return (
    <li key={id} onClick={handleClick}>
      {text}
    </li>
  );
}

function Type() {}

//flatten the object into an ordered array
function flattenScannedLine(scannedLine) {
  let temp = [];
  let output = scannedLine.output;
  for (let each of output) {
    temp.concat(each.full);
    temp.concat(each.raw);
  }
  temp.concat(scannedLine.Line);
}

//
function makeOptionArray(scannedLine) {}
