import React from "react";
import type { FC } from "react";
import type { setting, settingsSetter, stringSetter } from "../projectTypes";

import { scanParagraph } from "../SCAN/scan";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import SettingsBar from "./SettingsBar";

interface scanAreaProps {
  text: string;
  setText: stringSetter;
  settings: setting;
  setSettings: settingsSetter;
}

const ScanArea: FC<scanAreaProps> = ({
  text,
  setText,
  settings,
  setSettings,
}) => {
  let scanned = scanParagraph(text, settings);
  return (
    <div className="ScanArea">
      <SettingsBar settings={settings} setSettings={setSettings} />
      <div className="IOArea">
        <InputArea
          value={text}
          setValue={setText}
          placeholder="Enter Latin here..."
        />
        <OutputArea toRender={scanned} />
      </div>
    </div>
  );
};

export default ScanArea;
