import type { vowel, quantity, strictQuant, setting } from "./scanTypes";

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
  twoCons: /[aeiouy]\s*([b-df-hj-np-tvwxz]\s*[b-df-hj-np-tvwxz])|[xz]}/g,
  ellisionFirstChar:
    /([aeiouy]m\s+[aeiouy])|([aeiouy]\s+h[aeiouy])|([aeiouy]m\s+h[aeiouy])/g,
  ellisionLastChar: /[aeiouy]\s+[aeiouy]/g,
  punc: /[,.?!;:]/g,
  ellisionMark: /([aeiouy])|([aeiouy]m)|(h[aeiouy])/gi, //todo think harder
};

//object that contains the alternate character set for the vowels
export const alts = {
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

//*busywork functons
/** helper function that just returns the alternate version of the letter required.
 *
 * @param {quantity} quantity - the quantity of the vowel
 * @param {string} letter - the letter itself.
 * @returns {string}
 */
export function getLetter(quantity: quantity, letter: vowel): string {
  if (
    quantity === "undefined" ||
    quantity === "break" ||
    !/[aeiouy]/.test(letter.toLowerCase())
  ) {
    return letter;
  } else {
    let reduced: strictQuant = quantity;
    return alts[letter][reduced];
  }
}

/** matches substrings within the string using the regex.
 * returns an array of the positions of the matches
 * why is this not built in?
 * @param {string} string
 * @param {RegExp} regex
 * @returns {number[]}
 */
export function find(string: string, regex: RegExp): number[] {
  let posArray: number[] = [];
  let item: RegExpExecArray | null;
  while ((item = regex.exec(string)) !== null) {
    posArray.push(item.index);
  }
  return posArray;
}

/** returns a list of matches and their correspoding positions.
 * @param {String} string
 * @param {RegExp} regex
 */
export function mapFind(string: string, regex: RegExp): Record<number, string> {
  let dict: Record<number, string> = {};
  let item: RegExpExecArray | null;
  while ((item = regex.exec(string)) !== null) {
    dict[item.index] = item[0];
  }
  return dict;
}

/** function that sums an array
 * takes an array, returns the sum.
 * @param {number[]} arr
 */
export function sum(arr: number[]): number {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}

export function nBitCombos(nBits: number): string[] {
  let boundary = 2 ** nBits;
  let curNum: string;
  let output: string[] = [];
  for (let i = 0; i < boundary; i++) {
    curNum = i.toString(2);
    while (curNum.length < nBits) curNum = "0" + curNum;
    output.push(curNum);
  }
  return output;
}

export function nBitCombosManual(nBits: number): string[] {
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
