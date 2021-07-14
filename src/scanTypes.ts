export type metaLine = {
  line: string;
  markup: Record<number, string>;
};

export type sylMap = Record<number, quantity>;
export type generalRecord = Record<number, string>;

export type meter = "hexameter" | "pentameter" | "elegaic";

export type setting = {
  meter: meter;
};

export type strictQuant = "long" | "short";
export type vowel = "a" | "e" | "i" | "o" | "u" | "A" | "E" | "I" | "O" | "U";
export type quantity = "undefined" | "long" | "short" | "break";

export type scannedLineType = {
  line: string;
  raws: string[];
  full: string[][];
};
