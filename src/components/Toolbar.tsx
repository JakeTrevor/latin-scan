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
      <SettingsButton settings={settings} setSettings={setSettings} />

      <p>LatinScan</p>
      <div></div>
      <div></div>
      <button className="toolbarButton go" onClick={switchMode}>
        go!
      </button>
    </nav>
  );
};

//<button className="toolbarButton">settings</button>

function SettingsButton({ settings, setSettings }) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  function toggleFirst() {
    setSettings({
      ...settings,
      first: settings.first === "Hexameter" ? "Pentameter" : "Hexameter",
    });
  }

  let meters = ["Hexameter", "Pentameter", "Elegaic"];
  return (
    <div className="meterButton">
      <p className="toolbarButton" onClick={toggleOpen}>
        {settings.meter}
      </p>
      {open && (
        <div className="meterOptions">
          <ul className="options-box">
            {meters.map((each) => {
              return (
                <p
                  key={each}
                  className="toolbarButton"
                  onClick={() => {
                    setSettings({
                      ...settings,
                      meter: each,
                    });
                    toggleOpen();
                  }}
                >
                  {each}
                </p>
              );
            })}
          </ul>
        </div>
      )}
      {settings.meter === "Elegaic" && (
        <button className="toolbarButton" onClick={toggleFirst}>
          {settings.first} 1st
        </button>
      )}
    </div>
  );
}
