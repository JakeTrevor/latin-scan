import React, {useState} from "../../_snowpack/pkg/react.js";
import "../index.css.proxy.js";
import {About} from "./about.js";
export let Toolbar = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  let toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };
  return /* @__PURE__ */ React.createElement("nav", {
    className: "toolbar"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "toolbarButton",
    onClick: toggleAbout
  }, "about"), aboutOpen && /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement("p", null, "LatinScan"), /* @__PURE__ */ React.createElement("p", null));
};
