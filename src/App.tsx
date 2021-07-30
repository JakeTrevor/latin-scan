import "./index.css";
import React, { useState } from "react";
import { ScanModule } from "./components/ScanModule";
import { Toolbar } from "./components/Toolbar";
import { PresetOptions } from "./utils";
import { ScanModuleMobile } from "./components/ScanModuleMobile";
import { useWindowSize } from "./components/useWindowSize";

export default function App() {
  //some state to handle which component should be rendred on small screens (mobile devices)
  const [mode, setMode] = useState("input");
  function switchMode() {
    setMode(mode === "input" ? "output" : "input");
  }
  let size = useWindowSize();

  const [settings, setSettings] = useState(PresetOptions);

  console.log(settings);
  return (
    <div className="app">
      <Toolbar
        settings={settings}
        setSettings={setSettings}
        switchMode={switchMode}
      />
      {size.width <= 750 ? (
        <ScanModuleMobile settings={settings} mode={mode} />
      ) : (
        <ScanModule settings={settings} />
      )}
    </div>
  );
}
