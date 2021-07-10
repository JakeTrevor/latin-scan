export let PresetOptions = {meter: "hex"};
export default {
  vowels: /[aeiouy]/g,
  diphthongs: /(ae)|(au)|(ei)|(oe)|(oi)|(ui)/g,
  maybeDiphthong: /(eu)/g,
  doubleVowel: /[aeiouy][aeiouy]/g,
  silent1: /(\sia)|(\sio)|(\siu)/g,
  silent2: /(qu)/g,
  twoCons: /[aeiouy]\s*([b-df-hj-np-tvwxz]\s*[b-df-hj-np-tvwxz])|[xz]}/g,
  ellisionFirstChar: /([aeiouy]m\s+[aeiouy])|([aeiouy]\s+h[aeiouy])|([aeiouy]m\s+h[aeiouy])/g,
  ellisionLastChar: /[aeiouy]\s+[aeiouy]/g,
  punc: /[,.?!;:]/g,
  ellisionMark: /([aeiouy])|([aeiouy]m)|(h[aeiouy])/gi
};
export const alts = {
  a: {
    long: "ā",
    short: "ă"
  },
  A: {long: "Ā", short: "Ă"},
  e: {
    long: "ē",
    short: "ĕ"
  },
  E: {long: "Ē", short: "Ĕ"},
  i: {
    long: "ī",
    short: "ĭ"
  },
  I: {long: "Ī", short: "Ĭ"},
  o: {
    long: "ō",
    short: "ŏ"
  },
  O: {long: "Ō", short: "Ŏ"},
  u: {
    long: "ū",
    short: "ŭ"
  },
  U: {long: "Ū", short: "Ŭ"},
  y: {
    long: "ȳ",
    short: "y̌"
  },
  Y: {long: "Ȳ", short: "Y̌"}
};
export function getLetter(quantity, letter) {
  if (quantity === "undefined" || quantity === "break") {
    return letter;
  } else {
    let reduced = quantity;
    return alts[letter][reduced];
  }
}
export function find(string, regex) {
  let posArray = [];
  let item;
  while ((item = regex.exec(string)) !== null) {
    posArray.push(item.index);
  }
  return posArray;
}
export function mapFind(string, regex) {
  let dict = {};
  let item;
  while ((item = regex.exec(string)) !== null) {
    dict[item.index] = item[0];
  }
  return dict;
}
export function sum(arr) {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
}
export function nBitCombos(nBits) {
  let boundary = 2 ** nBits;
  let curNum;
  let output = [];
  for (let i = 0; i < boundary; i++) {
    curNum = i.toString(2);
    while (curNum.length < nBits)
      curNum = "0" + curNum;
    output.push(curNum);
  }
  return output;
}
export function nBitCombosManual(nBits) {
  let work = Array(nBits).fill(0);
  let output = [work.join("")];
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
