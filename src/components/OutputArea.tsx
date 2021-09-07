import React from "react";
import { Line } from "./Line";
import "../index.css";

export default function OutputArea({ toRender }) {
  return (
    <div className="outputArea">
      <ul>
        {toRender.map((each, i) => {
          return <Line scannedLine={each} id={i} />;
        })}
      </ul>
    </div>
  );
}
