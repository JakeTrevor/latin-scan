import "./index.css";
import React from "react";
import { ScanModule } from "./components/ScanModule";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <ScanModule />
    </div>
  );
}
