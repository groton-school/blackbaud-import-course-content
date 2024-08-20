import Mapping from './Mapping.js';
import isMapping from './isMapping.js';
import fs from 'fs';

export default function fromFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const mappings = JSON.parse(fs.readFileSync(filePath).toString());
    if (
      Array.isArray(mappings) &&
      mappings.reduce((valid, mapping) => valid && isMapping(mapping), true)
    ) {
      return mappings as Mapping[];
    }
    throw new Error(`Mapping file ${filePath} does not contain valid mappings`);
  }
  throw new Error(`Mapping file ${filePath} not found`);
}
