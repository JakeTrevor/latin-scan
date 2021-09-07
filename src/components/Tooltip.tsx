import React from "react";
import type { FC } from "react";

interface tooltipProps {
  tooltip: string;
}

const Tooltip: FC<tooltipProps> = ({ tooltip, children }) => {
  return (
    <div className="tooltip" tooltip={tooltip}>
      {children}
    </div>
  );
};

export default Tooltip;
