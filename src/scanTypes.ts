export type metaLine = {
  line: string;
  markup: Record<number, string>;
};

export type sylMap = Record<number, quantity>;

export type meter = "hex" | "pen" | "elegaic";

export type setting = {
  meter: meter;
};

export type strictQuant = "long" | "short";
export type vowel = "a" | "e" | "i" | "o" | "u" | "A" | "E" | "I" | "O" | "U";
export type quantity = "undefined" | "long" | "short" | "break";

export type scannedLine = {
  line: string;
  raws: string[];
  full: string[][];
};
