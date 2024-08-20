import Content from './Content.js';

// FIXME Content.isContent() is imprecise
export default function isContent(obj: object): obj is Content {
  return true;
}
