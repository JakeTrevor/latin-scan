import React, { FC, useState } from "react";
import "index.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PresetOptions } from "../SCAN/utils";
import AboutSection from "./AboutSection";
import ScanArea from "./ScanArea";
import InputOptionsBar from "./INPUTS/InputOptionsBar";
import Header from "./Header";

const App: FC = () => {
  //the "Text" state of the app; the users input.
  //kept at top level so it can be consistent across mobile and webapp components.
  let [text, setText] = useState("");
  let [settings, setSettings] = useState(PresetOptions);

  return (
    <HashRouter>
      <div className="app">
        <Header />

        <Switch>
          <Route exact path="/about">
            <AboutSection />
          </Route>
          <Route path="">
            <InputOptionsBar />
            <ScanArea
              text={text}
              setText={setText}
              settings={settings}
              setSettings={setSettings}
            />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
