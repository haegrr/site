#!/usr/bin/env node

import puppeteer from 'puppeteer';
import mime from 'mime';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

async function encodeDataURI (path) {
  const data = await readFile(path, 'base64');
  const mediaType = mime.getType(path) || 'application/octet-stream';
  return `data:${mediaType};base64,${data}`;
}

async function renderResume (path, theme) {
  const resume = JSON.parse(await readFile(path));
  if (resume.basics.picture) {
    const picturePath = resolve(dirname(path), resume.basics.picture);
    resume.basics.picture = await encodeDataURI(picturePath);
  }
  return (await import(`jsonresume-theme-${theme}`)).render(resume);
}

async function printToPDF (html, path, opts = {}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle2' });
  await page.pdf({ path, ...opts });
  await browser.close();
}

async function main (input, output) {
  try {
    console.time(output);
    const html = await renderResume(input, 'rocketspacer');
    await printToPDF(html, output, {
      format: 'Letter',
      margin: {
        top: '1cm',
      }
    });
    console.timeEnd(output);
  } catch (e) {
    console.error(e);
  }
}

process.on('unhandledRejection', e => { throw e; });
main(process.argv[2], process.argv[3]);
