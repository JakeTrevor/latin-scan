import "../index.css.proxy.js";
import React from "../../_snowpack/pkg/react.js";
import {useState} from "../../_snowpack/pkg/react.js";
import {ScannedLine} from "./ScannedLine.js";
import {scanLine} from "../scan.js";
import {PresetOptions} from "../utils.js";
export let ScanModule = () => {
  let [text, setText] = useState("");
  let lines = text.split("\n");
  return /* @__PURE__ */ React.createElement("div", {
    className: "scanMachine"
  }, /* @__PURE__ */ React.createElement("textarea", {
    className: "inputArea",
    value: text,
    onChange: (e) => setText(e.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "outputArea"
  }, lines.map((each) => {
    return /* @__PURE__ */ React.createElement(ScannedLine, {
      line: scanLine(each, PresetOptions)
    });
  })));
};
function tester(line) {
  return {
    line,
    raws: [line + " raw 1", line + " raw 2"],
    full: [[line + " full1.1", line + " full1.2"], [line + " full2.1"]]
  };
}
