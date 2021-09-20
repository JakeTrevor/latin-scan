import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { CloseButton } from "./CloseButton";
import { misc } from "../../ICONS/ICONS";
import type { stringSetter } from "src/projectTypes";
import { file } from "@babel/types";
import handleFile from "../FileHandler";

interface processPictureModalProps {
  close: CallableFunction;
  text: string;
  setText: stringSetter;
  setModal: stringSetter;
  picture: File;
}

export let ProcessPictureModal: FC<processPictureModalProps> = ({
  close,
  text,
  setText,
  setModal,
  picture,
}) => {
  let previewRef = useRef<HTMLImageElement>(null);
  let [newText, setNewText] = useState("loading text...");
  let [progress, setProgress] = useState("..");
  let [loaded, setLoaded] = useState(true);
  //setup preview
  let reader = new FileReader();
  reader.readAsDataURL(picture);
  reader.onload = (event) => {
    let img = previewRef.current;
    if (img) {
      img.src = event.target?.result as string;
    }
  };

  //read data from file
  async function load() {
    let derivedText = await handleFile(picture);
    setLoaded(false);
    setNewText(derivedText);
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="modal">
      <div className="buttonBar">
        <CloseButton close={close} />
        <button className="inputOption" onClick={() => setModal("takePicture")}>
          {misc["Retake"]}
        </button>
        <button
          className="inputOption"
          disabled={loaded}
          onClick={() => {
            setText(newText);
            close();
          }}
        >
          {misc["Tick"]}
        </button>
      </div>
      <div className="pictureBox">
        <img className="preview" ref={previewRef} />
        <textarea
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
          className="preview Text"
        />
      </div>
      <div className="progressBarBox">{progress}</div>
    </div>
  );
};
