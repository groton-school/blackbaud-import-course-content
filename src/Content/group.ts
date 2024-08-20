import Mapping from '../Mapping/index.js';
import Content from './Content.js';

type MapGroupingTerm = (mapping: Mapping) => string;

export default function group(
  content: Content,
  mapping: Mapping,
  groupingTerm: MapGroupingTerm
) {
  let ungrouped = [...content];
  const group = /\{\{([^}]+)\}\}/g;
  const properties = Array.from(groupingTerm(mapping).matchAll(group)).map(
    (match) => match[1]
  );
  const groups = [];
  let model = ungrouped.shift();
  while (model && ungrouped.length > 0) {
    const group = [
      model,
      ...ungrouped.filter((elt) =>
        properties.reduce(
          (accept, property) => accept && elt[property] == model![property],
          true
        )
      )
    ];
    groups.push(group);
    ungrouped = ungrouped.filter((elt) => !group.includes(elt));
    model = ungrouped.shift();
  }
  if (model) {
    groups.push([model]);
  }
  return groups;
}
