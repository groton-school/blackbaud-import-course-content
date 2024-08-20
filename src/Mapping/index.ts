import _Mapping from './Mapping.js';
import _apply from './apply.js';
import _fromFile from './fromFile.js';
import _isMapping from './isMapping.js';

type Mapping = _Mapping;

namespace Mapping {
  export const fromFile = _fromFile;
  export const isMapping = _isMapping;
  export const apply = _apply;
}

export default Mapping;
