import _Content from './Content.js';
import _filter from './filter.js';
import _fromFile from './fromFile.js';
import _group from './group.js';
import _isContent from './isContent.js';

export type Content = _Content;

namespace Content {
  export const fromFile = _fromFile;
  export const isContent = _isContent;
  export const filter = _filter;
  export const group = _group;
}

export default Content;
