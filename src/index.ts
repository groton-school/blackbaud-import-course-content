import Blackbaud from './Blackbaud/index.js';
import Content from './Content/index.js';
import Mapping from './Mapping/index.js';
import options from './options.json';
import cli from '@battis/qui-cli';
import puppeteer from 'puppeteer';

const args = cli.init({
  env: { root: process.cwd() },
  args: {
    options
  }
});

const {
  values: {
    course: courseUrl = process.env.COURSE_URL,
    content: contentPath,
    mappings: mappingPath,
    username,
    password
  }
} = args;

if (!courseUrl) {
  throw new Error('Missing Course URL');
}
const groupId = courseUrl.match(/#academicclass\/(\d+)\//)![1];
const content = Content.fromFile(contentPath);
const mappings = Mapping.fromFile(mappingPath);

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null
});
const page = (await browser.pages())[0];
await page.goto(courseUrl);

if (username) {
  await page.locator('#Username').fill(username);
  await page.locator('#nextBtn').click();
}
if (password) {
  await page.locator('input[name="passwd"]').fill(password);
  await page.locator('input[type="submit"]').click();
}

for (const mapping of mappings) {
  const filtered = Content.filter(content, mapping);

  if (mapping.topic) {
    await page
      .locator('#topics-btn')
      .setTimeout(5 * 60 * 1000)
      .click();
    const groups = Content.group(
      filtered,
      mapping,
      (m: Mapping) => m.topic!.title
    );
    for (const group of groups) {
      await Blackbaud.Topic.create({ page, group, groupId, mapping });
    }
  }

  if (mapping.assignment) {
    await page
      .locator('#assignments-btn')
      .setTimeout(5 * 60 * 1000)
      .click();
    for (const item of filtered) {
      await Blackbaud.Assignment.create({ page, item, mapping });
    }
  }
}
