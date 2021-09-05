import React from "react";
import DownArrow from "./DownArrow.svg";
import Hexagon from "./Hexagon.svg";
import Pentagon from "./Pentagon.svg";
import Warning from "./Warning.svg";
import Tick from "./Tick.svg";
import Input from "./Input.svg";
import Bar from "./Bar.svg";

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
};

export default ICONS;
