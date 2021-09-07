import React from "react";
import type { FC } from "react";
import type { booleanSetter, numberSetter, scanType } from "src/projectTypes";
import Tooltip from "./Tooltip";
import ICONS from "./ICONS/ICONS";

interface optionProps {
  id: number;
  type: scanType;
  warning: string;
  setOptionSelected: numberSetter;
  setOpen: booleanSetter;
}

const Option: FC<optionProps> = ({
  id,
  type,
  warning,
  setOptionSelected,
  setOpen,
  children,
}) => {
  function handleClick() {
    setOptionSelected(id);
    setOpen(false);
  }
  let typeElement = typeIconDictionary[type];
  console.log(warning, warning.length);
  let warningElement =
    warning.length > 0 ? (
      <Tooltip tooltip={warning}>{ICONS.Warning}</Tooltip>
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
};

let typeIconDictionary: Record<scanType, any> = {
  "Full Scan": <Tooltip tooltip="This is a full Scan">{ICONS.Tick}</Tooltip>,
  Quantities: (
    <Tooltip tooltip="This line contains only certain quantities.">
      {ICONS.Bar}
    </Tooltip>
  ),
  Input: <Tooltip tooltip="This line is your input.">{ICONS.Input}</Tooltip>,
};

export default Option;
