import React, { FC, useState } from "react";
import "../index.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import AboutSection from "./AboutSection";
import ScanArea from "./ScanArea";
import InputOptionsBar from "./INPUTS/InputOptionsBar";
import Header from "./Header";
import { defaultSettings } from "latin-scanner";
import { CamController } from "./INPUTS/camera/CamController";

const App: FC = () => {
  //the "Text" state of the app; the users input.
  //kept at top level so it can be consistent across mobile and webapp components.
  let [cameraModalOpen, setCameraModalOpen] = useState(false);

  let [text, setText] = useState("");
  let [settings, setSettings] = useState(defaultSettings);

  let cam = cameraModalOpen ? (
    <CamController text={text} setText={setText} setOpen={setCameraModalOpen} />
  ) : (
    <div className="camPlaceholder"></div>
  );

  return (
    <HashRouter>
      <div className="app">
        <Header />
        {cam}

        <Switch>
          <Route exact path="/about">
            <AboutSection />
          </Route>
          <Route path="">
            <InputOptionsBar
              text={text}
              setText={setText}
              setCameraOpen={setCameraModalOpen}
            />
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
