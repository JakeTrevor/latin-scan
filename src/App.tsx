import React from "react";
import { ScanModule } from "./components/ScanModule";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  return (
    <div>
      <Toolbar />
      <ScanModule />
    </div>
  );
}
