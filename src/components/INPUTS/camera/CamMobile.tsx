import React from "react";
import type { FC } from "react";
import { misc } from "../../ICONS/ICONS";

interface camMobileProps {
  setFile: CallableFunction;
}

const CamMobile: FC<camMobileProps> = ({ setFile }) => {
  let hasCamera: boolean;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.target.files;
    if (files) {
      let file = files[0];
      setFile(file);
    }
  }

  return (
    <div>
      <input
        type="file"
        name="image"
        accept="image/*"
        capture="environment"
        onInput={handleInput}
      >
        {misc.Camera}
      </input>
    </div>
  );
};

export default CamMobile;
