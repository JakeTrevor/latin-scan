import React, { useState } from "react";
import "../index.css";
import { About } from "./about";

export let Toolbar = ({ settings, setSettings, switchMode }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  let toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };

  function changeMeter() {
    setSettings({
      ...settings,
      meter: settings.meter === "hexameter" ? "pentameter" : "hexameter",
    });
  }

  return (
    <nav className="toolbar">
      <button className="toolbarButton" onClick={toggleAbout}>
        about
      </button>
      {aboutOpen && <About />}
      <SettingsButton meter={settings.meter} changeMeter={changeMeter} />

      <p>LatinScan</p>
      <div></div>
      <button className="toolbarButton go" onClick={switchMode}>
        go!
      </button>
    </nav>
  );
};

//<button className="toolbarButton">settings</button>

function SettingsButton({ meter, changeMeter }) {
  return (
    <div>
      <label htmlFor="meter">Currently Scanning:</label>
      <button name="meter" className="toolbarButton" onClick={changeMeter}>
        {meter}
      </button>
    </div>
  );
}
