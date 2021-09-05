import React from "react";
import Tooltip from "./Tooltip";
import ICONS from "./ICONS/ICONS";

export function Option({
  id,
  type,
  warnings,
  setOptionSelected,
  setOpen,
  children,
}) {
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

let typeIconDictionary = {
  "Full Scan": <Tooltip tooltip="This is a full Scan">{ICONS.Tick}</Tooltip>,
  Quantities: (
    <Tooltip tooltip="This line contains only certain quantities.">
      {ICONS.Bar}
    </Tooltip>
  ),
  Input: <Tooltip tooltip="This line is your input.">{ICONS.Input}</Tooltip>,
};
