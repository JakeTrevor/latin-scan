import React from "react";
import { Line } from "./Line";
import "../index.css";

export default function OutputArea({ toRender }) {
  return (
    <div className="IOArea">
      <ul>
        {toRender.map((each) => {
          return <Line scannedLine={each} />;
        })}
      </ul>
    </div>
  );
}
