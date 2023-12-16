import DatauriParser from "datauri/parser";

const parser = new DatauriParser();

export const bufferToDataURI = (fileFormat: string, buffer: Buffer) =>
  parser.format(fileFormat, buffer);
