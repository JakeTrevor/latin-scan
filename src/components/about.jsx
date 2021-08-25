import React, { useState } from "react";
import "../index.css";

export default function About({ title, children }) {
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <div className="aboutBox">
      <h1 className="aboutTitle" onClick={toggleOpen}>
        {title}
      </h1>
      {open && <div className="aboutContent">{children}</div>}
    </div>
  );
}
