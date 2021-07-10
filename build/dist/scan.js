import expressions, {
  find,
  getLetter,
  mapFind,
  nBitCombos,
  sum
} from "./utils.js";
export let ScanParagraph = (text, settings) => {
  let lines = text.split("\n");
  let done = [];
  for (let line of lines) {
    done.push(scanLine(line, settings));
  }
  return done;
};
export let scanLine = (line, settings) => {
  let output = {line, raws: [], full: []};
  let meta = undress(line);
  let raws = preScan(meta.line);
  let dressedRaws = [];
  for (let each of raws) {
    dressedRaws.push(postScan(meta, each));
  }
  output.raws = dressedRaws;
  let toDress = [];
  switch (settings.meter) {
    case "hex":
      for (let each of raws) {
        let quantityScans = hexScan(each);
        let pos = Object.keys(each).map((elt) => {
          return parseInt(elt);
        });
        let scans = quantityScans.map((elt) => {
          return marryUp(elt, pos);
        });
        toDress.push(scans);
      }
  }
  let done = toDress.map((rawGroup) => {
    return rawGroup.map((raw) => {
      return postScan(meta, raw);
    });
  });
  output.full = done;
  return output;
};
export let undress = (line) => {
  let markup = mapFind(line, expressions["punc"]);
  line = line.replace(expressions["punc"], "");
  return {line, markup};
};
export let preScan = (line) => {
  let quants = {};
  line = line.toLowerCase();
  line = line.replace(expressions["silent1"], " @y");
  line = line.replace(expressions["silent2"], "q@");
  let positions = find(line, expressions["vowels"]);
  let elide1 = find(line, expressions["ellisionFirstChar"]);
  let elide2 = find(line, expressions["ellisionLastChar"]);
  elide2 = elide2.map((x) => positions[positions.indexOf(x) + 1]);
  let longByPos = find(line, expressions["twoCons"]);
  let diphs = find(line, expressions["diphthongs"]);
  let diphs2 = diphs.map((x) => x + 1);
  let maybeDiphs = find(line, expressions["maybeDiphthong"]);
  let adjacents = find(line, expressions["doubleVowel"]);
  adjacents = adjacents.filter((pos) => !(diphs.includes(pos) || maybeDiphs.includes(pos)));
  let spondees = [];
  spondees = spondees.concat(longByPos);
  spondees = spondees.concat(diphs);
  let dactyls = [];
  dactyls = dactyls.concat(adjacents);
  let fakes = [];
  fakes = fakes.concat(diphs2);
  fakes = fakes.concat(elide1);
  fakes = fakes.concat(elide2);
  positions = positions.filter((x) => !fakes.includes(x));
  spondees = spondees.filter((x) => !fakes.includes(x));
  dactyls = dactyls.filter((x) => !fakes.includes(x));
  for (let position of positions) {
    quants[position] = "undefined";
  }
  for (let each of spondees) {
    quants[each] = "long";
  }
  for (let each of dactyls) {
    quants[each] = "short";
  }
  let outputArr;
  if (maybeDiphs.length !== 0) {
    let combos = nBitCombos(maybeDiphs.length);
    outputArr = Array(combos.length).fill(quants);
    for (let i = 0; i < combos.length; i++) {
      for (let j = 0; j < maybeDiphs.length; j++) {
        if (combos[i][j] === "0") {
          outputArr[i][maybeDiphs[j]] = "long";
        } else {
          outputArr[i][maybeDiphs[j]] = "short";
          outputArr[i][maybeDiphs[j] + 1] = "undefined";
        }
      }
    }
  } else {
    outputArr = [quants];
  }
  return outputArr;
};
export let postScan = (meta, markings) => {
  let line = Array.from(meta.line);
  let punctuation = meta.markup;
  let breaks = [];
  let positions = Object.keys(markings).map((el) => {
    return parseInt(el);
  });
  for (let each of positions) {
    if (markings[each] === "break") {
      breaks.push(each);
    } else {
      line.splice(each, 1, getLetter(markings[each], line[each]));
    }
  }
  positions = Object.keys(punctuation).map((el) => {
    return parseInt(el);
  });
  let pointer = 0;
  for (let each of positions) {
    if (pointer === breaks.length) {
      break;
    } else if (breaks[pointer] > each) {
      pointer++;
    }
    for (let i = pointer; i < breaks.length; i++) {
      breaks[i]++;
    }
  }
  for (let i = 0; i < breaks.length; i++) {
    breaks[i] += i;
    if (breaks[i] in punctuation) {
      breaks[i]++;
    }
  }
  line = insertPunctuation(line, punctuation);
  for (let each of breaks) {
    line.splice(each, 0, "|");
  }
  return line.join("");
};
export let hexScan = (map) => {
  function generateHexCombos(dactyls2) {
    let combos = [];
    let temp = [0, 0, 0, 0];
    if (dactyls2 === 0) {
      combos.push(Array.from(temp));
    }
    while (sum(temp) < 4) {
      temp[0]++;
      for (let count = 0; count < 3; count++) {
        if (temp[count] > 1) {
          temp[count] = 0;
          temp[count + 1]++;
        }
      }
      if (sum(temp) === dactyls2) {
        combos.push(Array.from(temp));
      }
    }
    return combos;
  }
  let quantValues = Object.values(map);
  let meters = [];
  let vowels = quantValues.length;
  let dactyls = vowels - 13;
  if (dactyls > 4) {
    console.log("too long!");
    return meters;
  } else if (dactyls < 0) {
    console.log("too short!");
    return meters;
  }
  meters = arrToQuantity(generateHexCombos(dactyls));
  let clone = meters.map((each) => {
    return each.filter((elt) => {
      return elt !== "break";
    });
  });
  let curQuant;
  for (let vowelCounter = 0; vowelCounter < vowels; vowelCounter++) {
    curQuant = quantValues[vowelCounter];
    if (curQuant !== "undefined") {
      for (let meterCounter = 0; meterCounter < meters.length; meterCounter++) {
        if (clone[meterCounter][vowelCounter] === "undefined") {
        } else if (clone[meterCounter][vowelCounter] !== curQuant) {
          clone.splice(meterCounter, 1);
          meters.splice(meterCounter, 1);
          meterCounter--;
        }
      }
    }
  }
  return meters;
};
export function arrToQuantity(arr) {
  let output = [];
  for (let each of arr) {
    let temp = each.map((el) => {
      return el === 0 ? ["long", "long", "break"] : ["long", "short", "short", "break"];
    });
    temp.push([
      "long",
      "short",
      "short",
      "break",
      "long",
      "undefined"
    ]);
    let temp2 = temp.reduce((acc, val) => {
      return acc.concat(val);
    });
    output.push(temp2);
  }
  return output;
}
export function marryUp(quants, positions) {
  let output = {};
  let breaks = 0;
  for (let i = 0; i < quants.length; i++) {
    let curQuant = quants[i];
    let curPos;
    if (curQuant === "break") {
      breaks++;
      curPos = positions[i - breaks] + 1;
    } else {
      curPos = positions[i - breaks];
    }
    output[curPos] = curQuant;
  }
  return output;
}
export let insertPunctuation = (line, markup) => {
  let positions = Object.keys(markup).map((el) => parseInt(el));
  for (let each of positions) {
    line.splice(each, 0, markup[each]);
  }
  return line;
};
