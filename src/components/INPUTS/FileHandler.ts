function handleFile(file: Blob): string {
  return "";
}

async function handlePlainText(file: Blob): Promise<string> {
  return await file.text();
}

async function handleDocxFile(file: Blob): Promise<string> {
  return await "hello";
}
export default handleFile;
