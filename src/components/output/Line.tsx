import React, { FC, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Selection from "./Selection";
import type { scannedLineObject } from "latin-scanner/build/src/types";
import { optionList } from "./optionList";

interface lineProps {
  scannedLine: scannedLineObject;
  id: number;
}
//todo consider lifting up optionSelected state.
let Line: FC<lineProps> = ({ scannedLine, id }) => {
  //state for component
  let [optionSelected, setOptionSelected] = useState(0);
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  let textArray = scannedLine.flat.reverse();

  //corrects for selection out of bounds issues.
  useEffect(() => {
    if (optionSelected >= textArray.length) {
      setOptionSelected(0);
    }
  });

  const [height, setHeight] = useState(0);
  function calcHeight(el: HTMLElement) {
    let height = el.offsetHeight;
    setHeight(height);
  }

  return (
    <li key={id}>
      <Selection
        toggleOpen={toggleOpen}
        status={scannedLine.status}
        statusMessage={scannedLine.statusMessage}
        meter={scannedLine.meter}
      >
        {textArray[optionSelected]}
      </Selection>

      <CSSTransition in={open} timeout={500} classNames="lineBounder">
        <div className="lineBounder" style={{ height: height }}>
          <CSSTransition
            in={open}
            unmountOnExit
            timeout={500}
            classNames={"lineList"}
            onEnter={calcHeight}
            onExit={() => setHeight(0)}
          >
            <ul className="lineList">
              {optionList(scannedLine, setOptionSelected, setOpen)}
            </ul>
          </CSSTransition>
        </div>
      </CSSTransition>
    </li>
  );
};

export default Line;
