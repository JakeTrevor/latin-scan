import "./index.css";
import React, { useState } from "react";
import { ScanModule } from "./components/ScanModule";
import { Toolbar } from "./components/Toolbar";
import { PresetOptions } from "./utils";
import { ScanModuleMobile } from "./components/ScanModuleMobile";
import { useWindowSize } from "./components/useWindowSize";

export default function App() {
  //the "Text" state of the app; the users input.
  //kept at top level so it can be consistent across mobile and webapp components.
  let [text, setText] = useState("");

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
        <ScanModuleMobile
          settings={settings}
          mode={mode}
          text={text}
          setText={setText}
        />
      ) : (
        <ScanModule settings={settings} text={text} setText={setText} />
      )}
    </div>
  );
}
