import React from "react";
import "../index.css";

export default function Tooltip({ tooltip, children }) {
  return (
    <div className="tooltip" data-tooltip={tooltip}>
      {children}
    </div>
  );
}
