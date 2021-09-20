//input a file
import { createWorker } from "tesseract.js";

//proces file, and return text within.
async function handleFile(file: File): Promise<string> {
  let fileExtension = getExtension(file);
  if (supportedTypes.includes(fileExtension)) {
    let text: Promise<string> = await HANDLERS[fileExtension](file);
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
async function handlePlainText(file: File): Promise<string> {
  let text = file.text();
  return await text;
}

async function handleDocxFile(file: Blob): Promise<string> {
  return await "hello";
}

async function hanleImage(file: File) {
  let worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("lat");
  await worker.initialize("lat");

  const {
    data: { text },
  } = await worker.recognize(file);

  await worker.terminate();
  return text;
}
export default handleFile;
