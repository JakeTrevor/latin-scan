import React from "react";
import type { FC } from "react";
import Tooltip from "../ICONS/Tooltip";
import { misc, meterAndStatusIcons } from "../ICONS/ICONS";
import type { meter, scanStatus } from "latin-scanner/build/src/types";

interface SelectionProps {
  toggleOpen: CallableFunction;
  status: scanStatus;
  statusMessage: string;
  meter: meter;
}

//todo add some color to status
const Selection: FC<SelectionProps> = ({
  toggleOpen,
  status,
  statusMessage,
  meter,
  children,
}) => {
  return (
    <div onClick={() => toggleOpen()} className={"scanSelection " + status}>
      {misc.DownArrow}
      <div className="outputText">{children}</div>
      <Tooltip tooltip={statusMessage}>
        {meterAndStatusIcons[meter][status]}
      </Tooltip>
    </div>
  );
};

export default Selection;
