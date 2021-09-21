import React, { FC, ReactElement, useState } from "react";
import type { booleanSetter, stringSetter } from "src/projectTypes";
import { ConfirmPictureModal } from "./ConfirmPictureModal";
import { ProcessPictureModal } from "./ProcessPictureModal";
import { TakePictureModal } from "./TakePicutreModal";

//functional component that will controll camera components.
interface CamControllerProps {
  text: string;
  setText: stringSetter;
  setOpen: booleanSetter;
}

export let CamController: FC<CamControllerProps> = ({
  text,
  setText,
  setOpen,
}) => {
  let close = () => {
    setOpen(false);
  };

  let [currentModal, setCurrentModal] = useState("takePicture");
  let [pic, setPic] = useState<File>(
    new File([""], "foo.png", { type: "image/png" }) //a blank png
  );

  let modals: Record<string, ReactElement> = {
    takePicture: (
      <TakePictureModal
        setPicture={setPic}
        close={close}
        next={() => {
          setCurrentModal("confirmPicture");
        }}
      />
    ),
    confirmPicture: (
      <ConfirmPictureModal
        picture={pic}
        close={close}
        setModal={setCurrentModal}
      />
    ),
    processPicture: (
      <ProcessPictureModal
        close={close}
        text={text}
        setText={setText}
        setModal={setCurrentModal}
        picture={pic}
      />
    ),
  };

  return modals[currentModal];
};
