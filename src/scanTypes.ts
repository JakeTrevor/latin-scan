export type metaLine = {
  line: string;
  markup: Record<number, string>;
};

export type setting = {
  meter: meter;
  first: meter;
};

export type scannedLineType = {
  line: string;
  output: rawType[];
  errors: string[];
};

export type rawType = {
  raw: string;
  full: string[];
  errors?: string[];
};

export type sylMap = Record<number, quantity>;
export type generalRecord = Record<number, string>;

export type meter = "Hexameter" | "Pentameter" | "Elegaic";
export type quantity = "undefined" | "long" | "short" | "break";
export type strictQuant = "long" | "short";

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
