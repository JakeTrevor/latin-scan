import React, { ReactElement } from "react";
import type { FC } from "react";
import type { booleanSetter, numberSetter } from "src/projectTypes";
import Tooltip from "../ICONS/Tooltip";
import { misc, scanNatureIcons } from "../ICONS/ICONS";
import type { scanNature } from "latin-scanner/build/src/types";

interface optionProps {
  id: number;
  nature: scanNature;
  warning: string;
  setOptionSelected: numberSetter;
  setOpen: booleanSetter;
}

const Option: FC<optionProps> = ({
  id,
  nature,
  warning,
  setOptionSelected,
  setOpen,
  children,
}) => {
  function handleClick() {
    setOptionSelected(id);
    setOpen(false);
  }
  let typeElement = scanNatureIcons[nature];
  console.log(warning, warning.length);
  let warningElement =
    warning.length > 0 ? (
      <Tooltip tooltip={warning}>{misc.Warning}</Tooltip>
    ) : (
      <div className="icon"></div>
    );

  return (
    <li key={id} onClick={handleClick} className={"scanSelection " + nature}>
      {typeElement}
      <div className="outputText ">{children}</div>
      {warningElement}
    </li>
  );
};

export default Option;
