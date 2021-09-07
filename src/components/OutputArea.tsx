import React from "react";
import type { FC } from "react";
import type { scannedLineType } from "../projectTypes";
import Line from "./Line";

interface outputAreaProps {
  toRender: scannedLineType[];
}

const OutputArea: FC<outputAreaProps> = ({ toRender }) => {
  return (
    <div className="outputArea">
      <ul>
        {toRender.map((each, i) => {
          return <Line scannedLine={each} id={i} />;
        })}
      </ul>
    </div>
  );
};

export default OutputArea;
