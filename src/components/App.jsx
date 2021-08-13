import React, { useState } from "react";
import { PresetOptions } from "../SCAN/utils";
import ScanArea from "./ScanArea";
import useWindowSize from "./useWindowSize";

export default function App() {
  //the "Text" state of the app; the users input.
  //kept at top level so it can be consistent across mobile and webapp components.
  let [text, setText] = useState("");
  let [settings, setSettings] = useState(PresetOptions);

  //some state to handle which component should be rendred on small screens (mobile devices)
  const [mode, setMode] = useState("input");
  function switchMode() {
    setMode(mode === "input" ? "output" : "input");
  }
  let size = useWindowSize();

  return (
    <div className="app">
      <h1>Latin Scan</h1>
      <ScanArea text={text} setText={setText} />
    </div>
  );
}
