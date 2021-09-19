import React from "react";
import type { ReactElement } from "react";
import DownArrow from "./DownArrow.svg";
import Hexagon from "./Hexagon.svg";
import HexPlus from "./HexPlus.svg";
import HexWarn from "./HexWarn.svg";
import Pentagon from "./Pentagon.svg";
import PentPlus from "./PentPlus.svg";
import PentWarn from "./PentWarn.svg";
import Warning from "./Warning.svg";
import Tick from "./Tick.svg";
import Input from "./Input.svg";
import Bar from "./Bar.svg";
import Camera from "./Camera.svg";
import Keyboard from "./Keyboard.svg";
import TextFileInput from "./TextFileInput.svg";
import type {
  meter,
  scanNature,
  scanStatus,
} from "latin-scanner/build/src/types";
import Tooltip from "./Tooltip";

//put all the icons imports in one place, keeps things clean.
export let misc: Record<string, ReactElement> = {
  DownArrow: <DownArrow className="icon" />,
  Camera: <Camera className="icon" />,
  Keyboard: <Keyboard className="icon" />,
  TextFileInput: <TextFileInput className="icon" />,
  Warning: <Warning className="icon" />,
};

export let scanNatureIcons: Record<scanNature, ReactElement> = {
  "Full Scan": (
    <Tooltip tooltip="This is a full Scan">
      <Tick className="icon" />
    </Tooltip>
  ),
  Quantities: (
    <Tooltip tooltip="This line contains only certain quantities.">
      <Bar className="icon" />
    </Tooltip>
  ),
  Input: (
    <Tooltip tooltip="This line is your input.">
      <Input className="icon" />
    </Tooltip>
  ),
};

export let meterAndStatusIcons: Record<
  meter,
  Record<scanStatus, ReactElement>
> = {
  Hexameter: {
    OK: <Hexagon className="icon" />,
    Plus: <HexPlus className="icon" />,
    Warning: <HexWarn className="icon" />,
  },
  Pentameter: {
    OK: <Pentagon className="icon" />,
    Plus: <PentPlus className="icon" />,
    Warning: <PentWarn className="icon" />,
  },
};
