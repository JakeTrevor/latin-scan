import "../index.css.proxy.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {ScannedLine} from "./ScannedLine.js";
import {scanLine} from "../scan.js";
import {PresetOptions} from "../utils.js";
export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");
  return /* @__PURE__ */ React.createElement("div", {
    className: "scanModule"
  }, /* @__PURE__ */ React.createElement("textarea", {
    className: "inputArea",
    value: text,
    onChange: (e) => setText(e.target.value),
    placeholder: "Enter latin here..."
  }), /* @__PURE__ */ React.createElement("div", {
    className: "outputArea"
  }, lines.map((each) => {
    return /* @__PURE__ */ React.createElement(ScannedLine, {
      line: scanLine(each, PresetOptions)
    });
  })));
};
