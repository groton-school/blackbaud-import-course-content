import isContent from './isContent';
import fs from 'fs';

export default function fromFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath).toString());
    if (isContent(content)) {
      return content;
    } else {
      throw new Error(
        `Content file ${filePath} does not contain valid content`
      );
    }
  }
  throw new Error(`Content file ${filePath} not found`);
}
