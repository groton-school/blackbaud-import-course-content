import Mapping from './Mapping.js';

// FIXME Mapping.isMapping() is imprecise
export default function isMapping(obj: object): obj is Mapping {
  return typeof obj === 'object';
}
