export default function apply(template: string, obj: Record<string, string>) {
  let result = template;
  for (const property in obj) {
    result = result.replace(`{{${property}}}`, obj[property]);
  }
  return result;
}
