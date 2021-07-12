import React, { useState } from "react";
import "../index.css";
import { About } from "./about";

export let Toolbar = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  let toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };

  return (
    <nav className="toolbar">
      <button className="toolbarButton" onClick={toggleAbout}>
        about
      </button>
      {aboutOpen && <About />}
      <text>LatinScan</text>
      <p></p>
    </nav>
  );
};

//<button className="toolbarButton">settings</button>
