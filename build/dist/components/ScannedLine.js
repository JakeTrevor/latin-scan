import "../index.css.proxy.js";
import * as React from "../../_snowpack/pkg/react.js";
import {useState} from "../../_snowpack/pkg/react.js";
export let ScannedLine = (props) => {
  let line = props.line;
  let options = [line.line];
  for (let i = 0; i < line.raws.length; i++) {
    options.push(line.raws[i]);
    for (let j = 0; j < line.full[i].length; j++) {
      options.push(line.full[i][j]);
    }
  }
  let [selection, setSelection] = useState(line.line);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    setOpen(!open);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "scannedLine"
  }, /* @__PURE__ */ React.createElement("text", null, selection), options.map((elt) => /* @__PURE__ */ React.createElement("text", {
    onClick: () => {
      setSelection(elt);
    }
  }, elt)));
};
