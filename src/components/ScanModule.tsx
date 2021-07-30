import "../index.css";
import React, { useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { ScanParagraph } from "../scan";
import { AutoHeightTextarea } from "./AutoHeightTextArea";

export let ScanModule = ({ settings }) => {
  let [text, setText] = useState("");
  let lines = ScanParagraph(text, settings);

  return (
    <div className="scanModule">
      <AutoHeightTextarea
        className="inputArea"
        value={text}
        setValue={setText}
        placeholder="Enter latin here..."
      />
      <div className="outputArea">
        {lines.map((each, i) => {
          return <ScannedLine key={i} line={each} />;
        })}
      </div>
    </div>
  );
};
