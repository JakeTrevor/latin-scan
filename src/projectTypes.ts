export type stringSetter = React.Dispatch<React.SetStateAction<string>>;
export type numberSetter = React.Dispatch<React.SetStateAction<number>>;
export type booleanSetter = React.Dispatch<React.SetStateAction<boolean>>;
export type settingsSetter = React.Dispatch<React.SetStateAction<setting>>;

export type scanType = "Full Scan" | "Quantities" | "Input";

export type setting = {
  meter: meter;
  firstMeter: meter;
};

export type scannedLineType = {
  status: string;
  statusMessage: string;
  meter: meter;
  line: string;
  output: rawType[];
};

export type rawType = {
  raw: string;
  full: string[];
  error: string;
};

export type syllableMap = Record<number, quantity>;

export type meter = "Hexameter" | "Pentameter" | "Elegaic";
export type quantity = "undefined" | "long" | "short" | "break";

export type vowel =
  | "a"
  | "e"
  | "i"
  | "o"
  | "u"
  | "y"
  | "A"
  | "E"
  | "I"
  | "O"
  | "U"
  | "Y";
