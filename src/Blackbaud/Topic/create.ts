import Content from '../../Content/Content';
import Mapping from '../../Mapping/index.js';
import { Page } from 'puppeteer';

export default async function ({
  groupId,
  page,
  group,
  mapping
}: {
  groupId: string;
  page: Page;
  group: Content;
  mapping: Mapping;
}) {
  if (!mapping.topic) {
    throw new Error(`This mapping cannot be applied to create a topic`);
  }
  await page.locator('#add-topic-btn').click();
  await page
    .locator('#txtTitle')
    .fill(Mapping.apply(mapping.topic.title, group[0]));
  if (mapping.topic.description) {
    await page
      .locator('#fldDescription')
      .fill(Mapping.apply(mapping.topic.description, group[0]));
  }
  await page.locator('.btn-layout[data-layout="1"]').click();
  await page
    .locator(`.btn.group-section-check:not([data-contextvalue="${groupId}"])`)
    .click();
  await page.locator('#btnSaveEditTopic').click();

  for (const item of group) {
    for (const material of mapping.topic.materials || []) {
      switch (material.type) {
        case 'Learning Tool':
          /*
          // can't seem to script Blackbaud to drag and drop, manual intervention necessary
          const buttonBounds = await (
            await page
              .locator('.btn[data-title="Learning Tool"]')
              .waitHandle()
          ).boundingBox();
          const columnBounds = await (
            await page.locator('#column0_1').waitHandle()
          ).boundingBox();
          console.log(
            await page.mouse.drag(
              {
                x: buttonBounds!.x + 1,
                y: buttonBounds!.y + 1
              },
              {
                x: columnBounds!.x + 1,
                y: columnBounds!.y + 1
              }
            )
          ); */

          await page
            .locator('#ProviderId')
            .fill(Mapping.apply(material.provider, item));
          await page
            .locator('#ToolTitle')
            .fill(Mapping.apply(material.title, item));
          if (material.description) {
            await page
              .locator('#ToolDescription')
              .fill(Mapping.apply(material.description, item));
          }
          if (material.launchUrl) {
            await page
              .locator('#LaunchUrl')
              .fill(Mapping.apply(material.launchUrl, item));
          }
          await page.locator('.btn.save').click();
      }
    }
  }
}
