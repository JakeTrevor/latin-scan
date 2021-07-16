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
  let warnTip;
  let num = line.full.length;
  if (num === 0) {
    let warnTip2 = "There are no valid scans for this line.";
  } else {
  }
  let warn = /* @__PURE__ */ React.createElement("div", {
    className: "info",
    "data-tooltip": ""
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "line"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "lineSelection",
    onClick: toggleOpen
  }, options[selection], warn), open && /* @__PURE__ */ React.createElement("ul", {
    className: "line-alts " + open
  }, options.map((elt, i) => /* @__PURE__ */ React.createElement("li", {
    key: i,
    onClick: () => {
      setSelection(i);
      toggleOpen();
    }
  }, elt)).reverse()));
};
function Option({type, typeDisplay, ...props}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "option"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "info",
    "data-tooltip": type
  }, "[", typeDisplay, "]"), /* @__PURE__ */ React.createElement("p", {
    className: typeDisplay
  }, props.children));
}
let compileResults = (input) => {
  let options = [];
  let str = "";
  for (let i = 0; i < input.raws.length; i++) {
    for (let j = 0; j < input.full[i].length; j++) {
      str = input.full[i][j];
      options.push(/* @__PURE__ */ React.createElement(Option, {
        type: "This line is a Full scan",
        typeDisplay: "S"
      }, str));
    }
    str = input.raws[i];
    options.push(/* @__PURE__ */ React.createElement(Option, {
      type: "This line is incomplete; only the quantities that could be determined are displayed",
      typeDisplay: "Q"
    }, str));
  }
  str = input.line;
  options.push(/* @__PURE__ */ React.createElement(Option, {
    type: "This is your input",
    typeDisplay: "i"
  }, str));
  return options;
};
