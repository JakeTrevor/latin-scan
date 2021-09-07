import React from "react";
import "../index.css";

export default function SettingsBar({ settings, setSettings }) {
  function setMeter(meter) {
    let temp = { ...settings }; //this creates a deep copy. WHY IS THIS NOT THE DEFAULT!
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
}
