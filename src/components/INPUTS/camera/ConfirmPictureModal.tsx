import React, { FC, useRef } from "react";
import type { stringSetter } from "src/projectTypes";
import { misc } from "../../ICONS/ICONS";
import { CloseButton } from "./CloseButton";

interface confirmPictureModalProps {
  picture: File;
  close: CallableFunction;
  setModal: stringSetter;
}

export let ConfirmPictureModal: FC<confirmPictureModalProps> = ({
  picture,
  close,
  setModal,
}) => {
  let previewRef = useRef<HTMLImageElement>(null);
  let reader = new FileReader();
  reader.readAsDataURL(picture);
  reader.onload = (event) => {
    let img = previewRef.current;
    if (img) {
      img.src = event.target?.result as string;
    }
  };

  return (
    <div className="modal">
      <div className="buttonBar">
        <CloseButton close={close} />
        <button className="inputOption" onClick={() => setModal("takePicture")}>
          {misc["Retake"]}
        </button>
        <button
          className="inputOption"
          onClick={() => setModal("processPicture")}
        >
          {misc["Tick"]}
        </button>
      </div>
      <img className="preview" ref={previewRef} />
    </div>
  );
};
