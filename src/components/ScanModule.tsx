import "../index.css";
import React, { useEffect, useRef, useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { scanLine, ScanParagraph } from "../scan";
import { PresetOptions } from "../utils";

export let ScanModule = ({ inputDisplayed }) => {
  let [text, setText] = useState("");
  let lines = ScanParagraph(text, PresetOptions);

  let other = inputDisplayed === "in" ? "out" : "in";

  return (
    <div className="scanModule">
      <div className={"inputArea " + inputDisplayed}>
        <AutoHeightTextarea
          value={text}
          setValue={setText}
          placeholder="Enter latin here..."
        />
      </div>
      <div className={"outputArea " + other}>
        {lines.map((each, i) => {
          return <ScannedLine key={i} line={each} />;
        })}
      </div>
    </div>
  );
};

interface textareaProps {
  value: string;
  setValue: Function;
  placeholder: string;
}

//component that should be an auto-sizing text area (hopefully)
function AutoHeightTextarea({ value, setValue, placeholder }: textareaProps) {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      className="input-box"
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
