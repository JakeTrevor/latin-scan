import type { vowel, quantity, setting } from "./scanTypes";

export let PresetOptions: setting = {
  meter: "Hexameter",
  firstMeter: "Hexameter",
};

//regex expressions for constants to do with latin lanaguge
export default {
  vowels: /[aeiouy]/g,
  diphthongs: /(ae)|(au)|(ei)|(oe)|(oi)|(ui)/g,
  maybeDiphthong: /(eu)/g,
  doubleVowel: /[aeiouy][aeiouy]/g,
  spondeeVowels: /[āēīōūȳ]/g,
  dactylVowels: /[ăĕĭŏŭy̌]/g,
  silent1: /(\sia)|(\sio)|(\siu)/g,
  silent2: /(qu)/g,
  twoConsonants: /[aeiouy]\s*([b-df-hj-np-tvwxz]\s*[b-df-hj-np-tvwxz])|[xz]}/g,
  ellisionOnFirstChar:
    /([aeiouy]m\s+[aeiouy])|([aeiouy]\s+h[aeiouy])|([aeiouy]m\s+h[aeiouy])/g,
  ellisionOnLastChar: /[aeiouy]\s+[aeiouy]/g,
  punctuation: /[,.?!;:]/g,
};

//object that contains the alternate character set for the vowels
export const vowelsWithMarkings = {
  a: {
    long: "ā",
    short: "ă",
  },
  A: { long: "Ā", short: "Ă" },
  e: {
    long: "ē",
    short: "ĕ",
  },
  E: { long: "Ē", short: "Ĕ" },
  i: {
    long: "ī",
    short: "ĭ",
  },
  I: { long: "Ī", short: "Ĭ" },
  o: {
    long: "ō",
    short: "ŏ",
  },
  O: { long: "Ō", short: "Ŏ" },
  u: {
    long: "ū",
    short: "ŭ",
  },
  U: { long: "Ū", short: "Ŭ" },
  y: {
    long: "ȳ",
    short: "y̌",
  },
  Y: { long: "Ȳ", short: "Y̌" },
};

//*busywork functions
export function getLetterWithMarking(
  quantity: quantity,
  letter: vowel
): string {
  if (
    quantity === "undefined" ||
    quantity === "break" ||
    !/[aeiouy]/.test(letter.toLowerCase())
  ) {
    return letter;
  } else {
    return vowelsWithMarkings[letter][quantity];
  }
}

export function findAllMatches(string: string, regex: RegExp): number[] {
  regex.test(""); //"clear" the regex, since .test() followed by .exec() will return second instance.
  let posArray: number[] = [];
  let objectReturnedByRegex: RegExpExecArray | null;
  while ((objectReturnedByRegex = regex.exec(string)) !== null) {
    posArray.push(objectReturnedByRegex.index);
  }
  return posArray;
}

export function sum(arr: number[]): number {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}

export function nBitCombos(nBits: number): string[] {
  let work = Array(nBits).fill(0);
  let output: string[] = [work.join("")];
  while (sum(work) < nBits) {
    work[nBits - 1] += 1;
    for (let i = nBits; i > 0; i--) {
      if (work[i] > 1) {
        work[i] = 0;
        work[i - 1]++;
      }
    }
    output.push(work.join(""));
  }
  return output.sort();
}
