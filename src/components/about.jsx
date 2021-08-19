import React, { useState } from "react";
import "../index.css";

export default function About({ title, children }) {
  let [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <div>
      <h1 onClick={toggleOpen}>{title}</h1>
      {open && <p>{children}</p>}
    </div>
  );
}
