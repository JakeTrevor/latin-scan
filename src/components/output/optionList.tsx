import React from "react";
import type { booleanSetter, numberSetter } from "../../projectTypes";
import type {
  scanNature,
  scannedLineObject,
} from "latin-scanner/build/src/types";
import Option from "./Option";

//todo refactor
export function optionList(
  scannedLine: scannedLineObject,
  setOption: numberSetter,
  setOpen: booleanSetter
) {
  let temp: any[] = [];
  let output = scannedLine.output;
  let id = 0;

  function addOptionToList(
    id: number,
    text: string,
    scanType: scanNature,
    warnings: string
  ) {
    temp.push(
      <Option
        id={id}
        nature={scanType}
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
