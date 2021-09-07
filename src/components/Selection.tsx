import React from "react";
import type { FC } from "react";
import Tooltip from "./Tooltip";
import ICONS from "./ICONS/ICONS";

interface SelectionProps {
  toggleOpen: CallableFunction;
  status: string;
  statusMessage: string;
}

const Selection: FC<SelectionProps> = ({
  toggleOpen,
  status,
  statusMessage,
  children,
}) => {
  return (
    <div onClick={() => toggleOpen()} className="scanSelection">
      {ICONS.DownArrow}
      <div className="outputText">{children}</div>
      <Tooltip tooltip={statusMessage}>{ICONS[status]}</Tooltip>
    </div>
  );
};

export default Selection;
