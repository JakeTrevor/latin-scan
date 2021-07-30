import "../index.css";
import React, { useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { ScanParagraph } from "../scan";
import { AutoHeightTextarea } from "./AutoHeightTextArea";
import { CSSTransition } from "react-transition-group";

export let ScanModuleMobile = ({ mode, settings }) => {
  let [text, setText] = useState("");
  let lines = ScanParagraph(text, settings);

  return (
    <div className="scanModuleMobile">
      <CSSTransition
        in={mode === "input"}
        unmountOnExit
        timeout={500}
        classNames="input-container"
      >
        <div>
          <AutoHeightTextarea
            className={"inputArea"}
            value={text}
            setValue={setText}
            placeholder="Enter latin here..."
          />
        </div>
      </CSSTransition>
      <CSSTransition
        in={mode === "output"}
        timeout={500}
        classNames="output-container"
      >
        <div className="area">
          <div className="outputArea">
            {
              text !== ""
                ? lines.map((each, i) => {
                    return <ScannedLine key={i} line={each} />;
                  })
                : "please enter some text" //nice component here might be a good idea.
            }
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
