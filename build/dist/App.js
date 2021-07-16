import "./index.css.proxy.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {ScanModule} from "./components/ScanModule.js";
import {Toolbar} from "./components/Toolbar.js";
import {PresetOptions} from "./utils.js";
export default function App() {
  const [mode, setMode] = useState("in");
  function switchMode() {
    setMode(mode === "in" ? "out" : "in");
  }
  const [settings, setSettings] = useState(PresetOptions);
  console.log(settings);
  return /* @__PURE__ */ React.createElement("div", {
    className: "app"
  }, /* @__PURE__ */ React.createElement(Toolbar, {
    settings,
    setSettings,
    switchMode
  }), /* @__PURE__ */ React.createElement(ScanModule, {
    settings,
    inputDisplayed: mode
  }));
}
