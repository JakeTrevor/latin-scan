import React, { useState } from "react";
import { PresetOptions } from "../SCAN/utils";
import AboutSection from "./AboutSection";
import ScanArea from "./ScanArea";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

import "../index.css";

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

  return (
    <HashRouter>
      <div className="app">
        <div className="header">
          <Link to="/about">
            <h1 className="headerItem">About</h1>
          </Link>
          <Link to="/">
            <h1 className="headerItem">Latin Scan</h1>
          </Link>
          <Link to="/">
            <h1 className="headerItem"></h1>
          </Link>
        </div>
        <Switch>
          <Route exact path="/about">
            <AboutSection />
          </Route>
          <Route path="">
            <ScanArea text={text} setText={setText} />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}
