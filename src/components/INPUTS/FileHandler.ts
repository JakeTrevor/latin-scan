//input a file
import { createWorker } from "tesseract.js";

//proces file, and return text within.
async function handleFile(
  file: File,
  logger: CallableFunction
): Promise<string> {
  let fileExtension = getExtension(file);
  if (supportedTypes.includes(fileExtension)) {
    let text: Promise<string> = await HANDLERS[fileExtension](file, logger);
    return text;
  } else {
    alert("This file format isnt supported (yet)");
    return "";
  }
}

function getExtension(file: File): string {
  let fileType = file.name.split(".").at(-1); //get file extension
  return fileType || "";
}

let HANDLERS: Record<string, CallableFunction> = {
  txt: handlePlainText,
  bmp: hanleImage,
  jpg: hanleImage,
  png: hanleImage,
  pbm: hanleImage,
};
let supportedTypes = Object.keys(HANDLERS);

//* file handlers below:
async function handlePlainText(
  file: File,
  _logger: any //just catches the logger
): Promise<string> {
  let text = file.text();
  return await text;
}

async function hanleImage(file: File, logger: any) {
  let worker = createWorker({
    logger: logger,
  });
  await worker.load();
  await worker.loadLanguage("lat");
  await worker.initialize("lat");

  let {
    data: { text },
  } = await worker.recognize(file);

  await worker.terminate();
  //normalise the line to remove accents.
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return text;
}
export default handleFile;
