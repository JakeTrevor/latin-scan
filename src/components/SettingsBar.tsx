import React from "react";
import type { FC } from "react";
import type { meter, setting, settingsSetter } from "../projectTypes";

interface settingsBarProps {
  settings: setting;
  setSettings: settingsSetter;
}

const SettingsBar: FC<settingsBarProps> = ({ settings, setSettings }) => {
  function setMeter(meter: meter) {
    let temp = { ...settings };
    temp.meter = meter;
    setSettings(temp);
  }

  function switchFirstMeter() {
    let temp = { ...settings };
    temp.firstMeter =
      temp.firstMeter === "Hexameter" ? "Pentameter" : "Hexameter";
    setSettings(temp);
  }

  return (
    <div className="optionsBox">
      <button
        className={`optionButton ${
          settings.meter === "Hexameter" ? "selectedMeter" : ""
        }`}
        onClick={() => setMeter("Hexameter")}
      >
        Hexameter
      </button>
      <button
        className={`optionButton ${
          settings.meter === "Pentameter" ? "selectedMeter" : ""
        }`}
        onClick={() => setMeter("Pentameter")}
      >
        Pentameter
      </button>
      <button
        className={`optionButton ${
          settings.meter === "Elegaic" ? "selectedMeter" : ""
        }`}
        onClick={() => setMeter("Elegaic")}
      >
        Elegaic
      </button>
      <button
        className={`optionButton ${
          settings.meter === "Elegaic" ? "selectedMeter" : ""
        }`}
        onClick={switchFirstMeter}
        disabled={settings.meter !== "Elegaic"}
      >
        {settings.firstMeter.substring(0, 3)}. 1st
      </button>
    </div>
  );
};

export default SettingsBar;
