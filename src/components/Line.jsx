import React, { useState } from "react";

export function Line({ scannedLine }) {
  let [optionSelected, setOptionSelected] = useState(0);
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  let options = makeOptionArray(scannedLine, setOptionSelected, setOpen);
  let textArray = flattenScannedLine(scannedLine);

  return (
    <div>
      <Selection toggleOpen={toggleOpen}>{textArray[optionSelected]}</Selection>
      {options}
    </div>
  );
}

//flatten the object into an ordered array
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

function makeOptionArray(scannedLine, setOption, setOpen) {
  let temp = [];
  let output = scannedLine.output;
  let id = 0;

  function addOptionToList(text) {
    temp.push(
      <Option id={id} setOptionSelected={setOption} setOpen={setOpen}>
        {text}
      </Option>
    );
    ++id;
  }

  for (let raw of output) {
    let fullScans = raw.full;
    for (let full of fullScans) {
      addOptionToList(full);
    }
    addOptionToList(raw.raw);
  }
  addOptionToList(scannedLine.line);
  temp = temp.reverse();
  return temp;
}

function Selection({ toggleOpen, children }) {
  return <div onClick={toggleOpen}>{children}</div>;
}

function Option({ id, setOptionSelected, setOpen, children }) {
  function handleClick() {
    setOptionSelected(id);
    setOpen(false);
  }
  return (
    <li key={id} onClick={handleClick}>
      {children}
    </li>
  );
}
