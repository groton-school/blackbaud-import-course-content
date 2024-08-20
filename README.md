# @groton/blackbaud-import-course-content

Import arbitrary content into a Blackbaud course site

## Objective

We were presented with an LTI integration that amounted to a spreadsheet of launch URLs and titles. Rather than manual copying-and-pasting to create the content, it seemed more efficient to script the Blackbaud UI to create the multitude of Learning Tool materials.

## Install

```sh
git clone https://github.com/groton-school/blackbaud-import-course-content.git
cd blackbaud-import-course-content
npm install
```

## Usage

Get configuration options:

```sh
tsx src/index.ts --help
```

Example invokation:

```sh
tsx src/index.ts -i "var/content.json" -m "var/mapping.json"
```

Extra-fancy invocation, using 1Password to pass in crednetials:

```sh
tsx src/index.ts -i "var/content.json" -m "var/mapping.json" -u $(op item get <credential name> --fields username) -p $(op item get <credential name> --fields password --reveal)
```

### Caution

At present, scripting the Blackbaud UI is a bit of a mess. For example, when creating topics with Learning Tool placements in their materials, the tool can create the topic, but then waits for human interaction to drag over a Learning Tool widget and then choose the proper provider. When the last Learning Tool placement is complete, the tool then waits for human interaction to navigate back to the Topics page to start again.

## Configuration

The basic assumption is that you have a JSON file of content that is decently well-organized, perhaps as a former spreadsheet. Essentially, it's an array of objects, and all the objects have relatively consistent property names.

Formally, the content of the JSON file is assumed-hoped to be a `Record<string,string>[]` (an array of objects with string keys and string values).

The mapping then maps that content on to the Blackbaud course content information. [Two mappings have been sketched out so far:](./src/Mapping/Mapping.ts) Assignments and Topics.

The mappings JSON file is assumed-hoped to be a `Mapping[]`, or an array of mappings.

### Mapping `filter`

All mappings _may_ include a `filter` property. A filter is a list of properties from the content JSON objects and acceptable regex matches for those properties. These filters are inclusive only, but all filters must be matched to be included in the mapping.

For example:

```json
{
  "filter": {
    "title": ["A", "B"],
    "chapter": ".+"
  }
}
```

The filter above would match all of the objects in the content which have a title field with the value of either `A` or `B` **and** that have a non-empty chapter property.

### Mapping text templates

Within the mapping properties, values may include placeholders representing properties of the content objects. For example `"{{title}} / {{chapter}}"` would have the `{{title}` and `{{chapter}` placeholders replaced by the `title` and `chapter` property values of the content object.

Placeholders for non-existent properties will be exposed (e.g. a placeholder for `{{foo})` and an object without a `foo` property will result in the end value containing the `{{foo}` placeholder.

### Topics

A mapping may also have a `topic` property, which _must_ contain the following properties:

- `title` - a text value to used as the title of the topic

If templated values are included in the `title` property, items will be grouped by those values, such that all content items that share identical values to those templated properties will be placed on the same topic. For example:

```json
{
  "title": "{{book}} / {{chapter}}"
}
```

A topic will be created for each chapter of each book, and all the items that match that `book` and `chapter` property value will be inserted as materials in the order listed in the content JSON.

A topic mapping _may_ also contain the following properties:

- `description` - a text value to be used as the topic description
- `materials` - an array of materials to be placed in the topic.

#### Topic Materials

A topic material _must_ have the following properties:

- `type` - a text value for one of the content widgets available in the topic editor sidebar (currently only `Learning Tool` is defined)

A `Learning Tool` material _must_ have the following properties:

- `provider` - a text value exactly matching the provider name in the Blackbaud LMS instance
- `title` - a text value to use as the title of LTI placement

A `Learning Tool` material _may_ have the following properties:

- `description` - a text value for the LTI placement description
- `launchUrl` - a text value for the launch URL of the LTI placement (not required for non-domain LTI placements)

### Assignments

Assignments have been defined, but are not operational.

A mapping may also have an `assignment` property. The assignment property must have the following properties:

- `title` - a text value to use as the title of the assignment

An assignment property _may_ also have the following properties:

- `description` - a text value to use as the description of the assignment
- `maxPoints` - a numeric value (may be stored as text) to use as the max points value for the assignment
- `learngingTool` - a learning tool description for the assignment, which must either be a single text value exactly matching the provider name in the Blackbaud LMS instance or an object with a `name` property holding that provider name and a `launchUrl` property holding the launch URL for the LTI placement.
