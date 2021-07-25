import "../index.css";
import React, { useEffect, useRef, useState } from "react";
import { ScannedLine } from "./ScannedLine";
import { scanLine, ScanParagraph } from "../scan";
import { find, getLetter, PresetOptions } from "../utils";
import type { vowel } from "src/scanTypes";

export let ScanModule = ({ inputDisplayed, settings }) => {
  let [text, setText] = useState("");
  let lines = ScanParagraph(text, settings);

  let other = inputDisplayed === "in" ? "out" : "in";

  return (
    <div className="scanModule">
      <AutoHeightTextarea
        className={"inputArea " + inputDisplayed}
        value={text}
        setValue={setText}
        placeholder="Enter latin here..."
      />
      <div className={"outputArea " + other}>
        {lines.map((each, i) => {
          return <ScannedLine key={i} line={each} />;
        })}
      </div>
    </div>
  );
};

interface textareaProps {
  className: string;
  value: string;
  setValue: Function;
  placeholder: string;
}

//component that should be an auto-sizing text area (hopefully)
function AutoHeightTextarea({
  className,
  value,
  setValue,
  placeholder,
}: textareaProps) {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      autoFocus
      className={className}
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        let text = e.target.value;
        if (/_[aeiouy]/.test(text.toLowerCase())) {
          //test for _ followed by vowel in the text; this should be converted to a forced spondee
          let forcedSpondees = find(text.toLocaleLowerCase(), /_[aeiouy]/g);
          for (let each of forcedSpondees) {
            let replacement = getLetter("long", text.charAt(each + 1) as vowel);
            text =
              text.substring(0, each) + replacement + text.substring(each + 2);
          }
        }
        if (/@[aeiouy]/.test(text.toLocaleLowerCase())) {
          //test for @ followed by vowel; should be converted to forced dactyl.
          let forcedDactyls = find(text.toLocaleLowerCase(), /@[aeiouy]/g);
          for (let each of forcedDactyls) {
            let replacement = getLetter(
              "short",
              text.charAt(each + 1) as vowel
            );
            text =
              text.substring(0, each) + replacement + text.substring(each + 2);
          }
        }
        setValue(text);
      }}
    />
  );
}
