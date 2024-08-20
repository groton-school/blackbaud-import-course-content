import Mapping from '../Mapping/index.js';
import Content from './Content.js';

export default function filter(content: Content, mapping: Mapping) {
  let filtered = [...content];
  if (mapping.filter) {
    for (const property in mapping.filter) {
      let criteria = mapping.filter[property];
      const pattern = Array.isArray(criteria)
        ? new RegExp(criteria.join('|'))
        : new RegExp(criteria);
      filtered = filtered.filter((elt) => pattern.test(elt[property]));
    }
  }
  return filtered;
}
