import "./index.css";
import React, { useState } from "react";
import { ScanModule } from "./components/ScanModule";
import { Toolbar } from "./components/Toolbar";
import { PresetOptions } from "./utils";

export default function App() {
  const [mode, setMode] = useState("in");
  function switchMode() {
    setMode(mode === "in" ? "out" : "in");
  }

  const [settings, setSettings] = useState(PresetOptions);

  return (
    <div className="app">
      <Toolbar
        settings={settings}
        setSettings={setSettings}
        switchMode={switchMode}
      />
      <ScanModule settings={settings} inputDisplayed={mode} />
    </div>
  );
}
