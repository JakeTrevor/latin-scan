import "../index.css.proxy.js";
import React, {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import {ScannedLine} from "./ScannedLine.js";
import {ScanParagraph} from "../scan.js";
import {find, getLetter} from "../utils.js";
export let ScanModule = ({inputDisplayed, settings}) => {
  let [text, setText] = useState("");
  let lines = ScanParagraph(text, settings);
  let other = inputDisplayed === "in" ? "out" : "in";
  return /* @__PURE__ */ React.createElement("div", {
    className: "scanModule"
  }, /* @__PURE__ */ React.createElement(AutoHeightTextarea, {
    className: "inputArea " + inputDisplayed,
    value: text,
    setValue: setText,
    placeholder: "Enter latin here..."
  }), /* @__PURE__ */ React.createElement("div", {
    className: "outputArea " + other
  }, lines.map((each, i) => {
    return /* @__PURE__ */ React.createElement(ScannedLine, {
      key: i,
      line: each
    });
  })));
};
function AutoHeightTextarea({
  className,
  value,
  setValue,
  placeholder
}) {
  const textareaRef = useRef(null);
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);
  return /* @__PURE__ */ React.createElement("textarea", {
    className,
    ref: textareaRef,
    value,
    placeholder,
    onChange: (e) => {
      let text = e.target.value;
      if (/_[aeiouy]/.test(text.toLowerCase())) {
        let forcedSpondees = find(text.toLocaleLowerCase(), /_[aeiouy]/g);
        for (let each of forcedSpondees) {
          let replacement = getLetter("long", text.charAt(each + 1));
          text = text.substring(0, each) + replacement + text.substring(each + 2);
        }
      }
      if (/@[aeiouy]/.test(text.toLocaleLowerCase())) {
        let forcedDactyls = find(text.toLocaleLowerCase(), /@[aeiouy]/g);
        for (let each of forcedDactyls) {
          let replacement = getLetter("short", text.charAt(each + 1));
          text = text.substring(0, each) + replacement + text.substring(each + 2);
        }
      }
      setValue(text);
    }
  });
}
