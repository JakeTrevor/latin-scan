import "../index.css.proxy.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
export let ScannedLine = (props) => {
  let line = props.line;
  let options = compileResults(line);
  let [selection, setSelection] = useState(options.length > 1 ? 0 : 2);
  let [open, setOpen] = useState(false);
  let toggleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (selection >= options.length) {
      setSelection(0);
    }
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "line"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "lineSelection",
    onClick: toggleOpen
  }, options[selection]), open && /* @__PURE__ */ React.createElement("ul", null, options.map((elt, i) => /* @__PURE__ */ React.createElement("li", {
    onClick: () => {
      setSelection(i);
      toggleOpen();
    }
  }, elt)).reverse()));
};
let compileResults = (input) => {
  let options = [];
  let str = "";
  let element;
  for (let i = 0; i < input.raws.length; i++) {
    for (let j = 0; j < input.full[i].length; j++) {
      str = input.full[i][j];
      element = /* @__PURE__ */ React.createElement("div", {
        className: "option fullScan"
      }, /* @__PURE__ */ React.createElement("text", {
        className: "info",
        "data-tooltip": "This line is a Full scan"
      }, "[S]"), /* @__PURE__ */ React.createElement("text", null, str));
      options.push(element);
    }
    str = input.raws[i];
    element = /* @__PURE__ */ React.createElement("div", {
      className: "option naturalQ"
    }, /* @__PURE__ */ React.createElement("text", {
      className: "info",
      "data-tooltip": "This line is incomplete; only the quantities that could be determined are displayed"
    }, "[Q]"), /* @__PURE__ */ React.createElement("text", null, str));
    options.push(element);
  }
  str = input.line;
  element = /* @__PURE__ */ React.createElement("div", {
    className: "option plainText"
  }, /* @__PURE__ */ React.createElement("text", {
    className: "info",
    "data-tooltip": "This is your input"
  }, "[i]"), /* @__PURE__ */ React.createElement("text", null, str));
  options.push(element);
  return options;
};
