import "./index.css.proxy.js";
import React from "../_snowpack/pkg/react.js";
import {ScanModule} from "./components/ScanModule.js";
import {Toolbar} from "./components/Toolbar.js";
export default function App() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "app"
  }, /* @__PURE__ */ React.createElement(Toolbar, null), /* @__PURE__ */ React.createElement(ScanModule, null));
}
