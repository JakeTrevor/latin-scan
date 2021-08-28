export type setting = {
  meter: meter;
  firstMeter: meter;
};

export type scannedLineType = {
  meter: meter;
  line: string;
  output: rawType[];
  errors: string[];
};

export type rawType = {
  raw: string;
  full: string[];
  errors: string[];
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
