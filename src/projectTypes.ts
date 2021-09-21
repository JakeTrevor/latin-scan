import type { scanSettingsObject } from "latin-scanner/build/src/types";

export type stringSetter = React.Dispatch<React.SetStateAction<string>>;
export type numberSetter = React.Dispatch<React.SetStateAction<number>>;
export type booleanSetter = React.Dispatch<React.SetStateAction<boolean>>;
export type fileSetter = React.Dispatch<React.SetStateAction<File>>;
export type settingsSetter = React.Dispatch<
  React.SetStateAction<scanSettingsObject>
>;
