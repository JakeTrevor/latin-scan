import React from "react";
import DownArrow from "./DownArrow.svg";
import Hexagon from "./Hexagon.svg";
import Pentagon from "./Pentagon.svg";
import Warning from "./Warning.svg";
import Tick from "./Tick.svg";
import Input from "./Input.svg";
import Bar from "./Bar.svg";
import Camera from "./Camera.svg";
import Keyboard from "./Keyboard.svg";
import TextFileInput from "./TextFileInput.svg";

//put all the icons imports in one place, keeps things clean.
const ICONS = {
  DownArrow: <DownArrow className="icon" />,
  HexameterOK: <Hexagon className="icon" />,
  "Hexameter+": <Hexagon className="icon" />,
  PentameterOK: <Pentagon className="icon" />,
  "Pentameter+": <Pentagon className="icon" />,
  Warning: <Warning className="icon warning" />,
  Tick: <Tick className="icon" />,
  Input: <Input className="icon" />,
  Bar: <Bar className="icon" />,
  Camera: <Camera className="icon" />,
  Keyboard: <Keyboard className="icon" />,
  TextFileInput: <TextFileInput className="icon" />,
};

export default ICONS;
