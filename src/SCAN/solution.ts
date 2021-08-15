import type { scannedLineType } from "./scanTypes";

function extractUniqueArray(arr: any[]): any[] {
  let output: any[] = [];
  for (let each of arr) {
    if (!output.includes(each)) {
      output.push(each);
    }
  }
  return output;
}

export default class solution {
  scan: scannedLineType;

  constructor(scan: scannedLineType) {
    this.scan = scan;
  }

  getAllRaws() {
    let output: string[] = [];
    for (let each of this.scan.output) {
      output.push(each.raw);
    }
    return output;
  }
  getAllFullScans() {
    let output: string[] = [];
    for (let each of this.scan.output) {
      output.concat(each.full);
    }
    return output;
  }

  validateLine(line: string) {
    return line === this.scan.line;
  }

  checkRawsContain(expectedRaws: string[]) {
    let outputtedRaws = this.getAllRaws();
    let outputContainsInput = expectedRaws.every((element) => {
      outputtedRaws.includes(element);
    });
    return outputContainsInput;
  }

  checkRawsAre(expectedRaws: string[]) {
    expectedRaws = extractUniqueArray(expectedRaws);
    let outputtedRaws = this.getAllRaws;
    return (
      this.checkRawsContain(expectedRaws) &&
      expectedRaws.length === outputtedRaws.length
    );
  }

  checkSolutionsContain(expectedSolutions: string[]) {
    let outputtedSolutions = this.getAllFullScans();
    let outputContainsInput = expectedSolutions.every((element) => {
      outputtedSolutions.includes(element);
    });
    return outputContainsInput;
  }

  checkSolutionsAre(expectedSolutions: string[]) {
    expectedSolutions = extractUniqueArray(expectedSolutions);
    let outputtedSolutions = this.getAllFullScans();
    return (
      this.checkRawsContain(expectedSolutions) &&
      expectedSolutions.length === outputtedSolutions.length
    );
  }
}
