import React from "react";
import { Line } from "./Line";

export default function OutputArea({ toRender }) {
  return (
    <div>
      <ul>
        {toRender.map((each) => {
          return <Line scannedLine={each} />;
        })}
      </ul>
    </div>
  );
}
