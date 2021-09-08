import React, { FC, useState } from "react";
import "../index.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PresetOptions } from "../SCAN/utils";
import AboutSection from "./AboutSection";
import ScanArea from "./ScanArea";
import InputOptionsBar from "./INPUTS/InputOptionsBar";
import Header from "./Header";
import CameraModal from "./CameraModal";

const App: FC = () => {
  //the "Text" state of the app; the users input.
  //kept at top level so it can be consistent across mobile and webapp components.
  let [cameraModalOpen, setCameraModalOpen] = useState(false);
  let [text, setText] = useState("");
  let [settings, setSettings] = useState(PresetOptions);

  return (
    <HashRouter>
      <div className="app">
        <Header />
        <CameraModal open={cameraModalOpen} setOpen={setCameraModalOpen} />
        <Switch>
          <Route exact path="/about">
            <AboutSection />
          </Route>
          <Route path="">
            <InputOptionsBar text={text} setText={setText} />
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
