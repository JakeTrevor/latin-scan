import React, {useState} from "../../_snowpack/pkg/react.js";
import "../index.css.proxy.js";
import {About} from "./about.js";
export let Toolbar = ({settings, setSettings, switchMode}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  let toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };
  function changeMeter() {
    setSettings({
      ...settings,
      meter: settings.meter === "hexameter" ? "pentameter" : "hexameter"
    });
  }
  return /* @__PURE__ */ React.createElement("nav", {
    className: "toolbar"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "toolbarButton",
    onClick: toggleAbout
  }, "about"), aboutOpen && /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(SettingsButton, {
    settings,
    setSettings
  }), /* @__PURE__ */ React.createElement("p", null, "LatinScan"), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("button", {
    className: "toolbarButton go",
    onClick: switchMode
  }, "go!"));
};
function SettingsButton({settings, setSettings}) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  function toggleFirst() {
    setSettings({
      ...settings,
      first: settings.first === "Hexameter" ? "Pentameter" : "Hexameter"
    });
  }
  let meters = ["Hexameter", "Pentameter", "Elegaic"];
  return /* @__PURE__ */ React.createElement("div", {
    className: "meterButton"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "toolbarButton",
    onClick: toggleOpen
  }, settings.meter), open && /* @__PURE__ */ React.createElement("div", {
    className: "meterOptions"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "options-box"
  }, meters.map((each) => {
    return /* @__PURE__ */ React.createElement("p", {
      key: each,
      className: "toolbarButton",
      onClick: () => {
        setSettings({
          ...settings,
          meter: each
        });
        toggleOpen();
      }
    }, each);
  }))), settings.meter === "Elegaic" && /* @__PURE__ */ React.createElement("button", {
    className: "toolbarButton",
    onClick: toggleFirst
  }, settings.first, " 1st"));
}
