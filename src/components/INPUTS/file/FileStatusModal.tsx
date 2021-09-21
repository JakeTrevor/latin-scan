import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { CloseButton } from "../camera/CloseButton";
import { misc } from "../../ICONS/ICONS";
import handleFile from "../FileHandler";
import type { stringSetter } from "src/projectTypes";

interface fileStatusModalProps {
  picture: File;
  close: CallableFunction;
  setText: stringSetter;
}

export let FileStatusModal: FC<fileStatusModalProps> = ({
  picture,
  close,
  setText,
}) => {
  let previewRef = useRef<HTMLImageElement>(null);
  let [newText, setNewText] = useState("loading text...");
  let [progress, setProgress] = useState({ status: "Setting up", progress: 0 });
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
    let derivedText = await handleFile(picture, logger);
    setLoaded(false);
    setNewText(derivedText);
    setProgress({ ...progress, status: "done!" });
  }
  useEffect(() => {
    load();
  }, []);

  //logger function for fileHandler
  function logger(message: any) {
    let progress = Math.floor(message.progress * 100);
    let progressStatus = {
      status: message.status,
      progress: progress || 0,
    };
    setProgress(progressStatus);
  }

  return (
    <div className="modal">
      <div className="buttonBar">
        <CloseButton close={close} />
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
          disabled={loaded}
          className="preview Text"
        />
      </div>
      <div className="progressBarBox">
        <div className="status">{progress.status}</div>
        <div className="progressBorder">
          <div
            className="progressBar"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
