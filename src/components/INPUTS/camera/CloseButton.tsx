import React from "react";
import type { FC } from "react";
import { misc } from "../../ICONS/ICONS";
import Tooltip from "../../ICONS/Tooltip";

export let CloseButton: FC<{ close: CallableFunction }> = ({ close }) => {
  return (
    <button onClick={() => close()} className="inputOption">
      {misc["Close"]}
    </button>
  );
};
