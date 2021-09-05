import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../index.css";

export default function About({ title, children }) {
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  const [height, setHeight] = useState(0);
  function calcHeight(el) {
    let height = el.offsetHeight;
    setHeight(height);
  }

  return (
    <div className="aboutBox">
      <h1 className="aboutTitle" onClick={toggleOpen}>
        {title}
      </h1>
      <div className="aboutBounder" style={{ height: height }}>
        <CSSTransition
          in={open}
          unmountOnExit
          timeout={500}
          classNames="aboutContent"
          onEnter={calcHeight}
          onExit={() => setHeight(0)}
        >
          <div className="aboutContent">{children}</div>
        </CSSTransition>
      </div>
    </div>
  );
}
