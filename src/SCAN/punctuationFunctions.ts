import expressions from "./utils";

export let insertPunctuation = (
  line: string[],
  punctuation: Record<number, string>
): string[] => {
  let positions = Object.keys(punctuation).map((el) => parseInt(el));
  for (let each of positions) {
    line.splice(each, 0, punctuation[each]); //"0" ensures this is an inserting splice
  }
  return line;
};

export let removePunctuation = (
  line: string
): [Record<number, string>, string] => {
  let markup = matchAndMap(line, expressions["punctuation"]);
  line = line.replace(expressions["punctuation"], "");
  return [markup, line];
};

function matchAndMap(string: string, regex: RegExp): Record<number, string> {
  let dict: Record<number, string> = {};
  let item: RegExpExecArray | null;
  while ((item = regex.exec(string)) !== null) {
    dict[item.index] = item[0];
  }
  return dict;
}
