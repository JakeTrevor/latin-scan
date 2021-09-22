import React from "react";
import type { FC } from "react";
import { misc } from "../../ICONS/ICONS";

interface camMobileProps {
  setFile: CallableFunction;
}

const CamMobile: FC<camMobileProps> = ({ setFile }) => {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.target.files;
    if (files) {
      let file = files[0];
      if (file) setFile(file);
    }
  }

  return (
    <label className="inputOption">
      <input
        type="file"
        name="image"
        accept="image/*"
        capture="camera"
        onInput={handleInput}
      />
      {misc.Camera}
    </label>
  );
};

export default CamMobile;
