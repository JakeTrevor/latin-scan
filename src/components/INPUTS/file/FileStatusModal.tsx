import React from "react";
import type { FC } from "react";
import { CloseButton } from "../camera/CloseButton";
import { misc } from "../../ICONS/ICONS";

interface fileStatusModalProps {}

export let FileStatusModal: FC<fileStatusModalProps> = () => {
  return (
    <div className="modal">
      <div className="buttonBar">
        <CloseButton close={() => {}} />
        <button className="inputOption" onClick={() => {}}>
          {misc["Tick"]}
        </button>
      </div>
    </div>
  );
};
