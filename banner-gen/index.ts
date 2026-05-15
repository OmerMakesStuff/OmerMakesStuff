import sharp from 'sharp';

import {
  BG_COLOR,
  BANNER_HEIGHT,
  BANNER_WIDTH,
  OUTPUT_FILE,
  SVG_URL,
  FILL_COLOR,
} from './constants';

const res = await fetch(SVG_URL);
if (!res.ok)
  throw new Error(`Failed to fetch logo SVG: ${res.status} ${res.statusText}`);
const svgText = await res.text();

const recoloredSvg = svgText.replace(
  /fill="currentColor"/g,
  `fill="${FILL_COLOR}"`,
);

const viewBoxMatch = recoloredSvg.match(/viewBox="([^"]+)"/);
if (!viewBoxMatch) throw new Error('Could not find viewBox in logo SVG');
const [, , vbWidth, vbHeight] = viewBoxMatch[1].split(' ').map(Number);
const aspectRatio = vbWidth / vbHeight;

const logoHeight = BANNER_HEIGHT,
  logoWidth = Math.round(logoHeight * aspectRatio);

const svgBuffer = Buffer.from(recoloredSvg);
const logoBuffer = await sharp(svgBuffer)
  .resize(logoWidth, logoHeight)
  .png()
  .toBuffer();
const logoLeft = Math.round((BANNER_WIDTH - logoWidth) / 2);

await sharp({
  create: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    channels: 3,
    background: BG_COLOR,
  },
})
  .composite([{ input: logoBuffer, left: logoLeft, top: 0 }])
  .removeAlpha()
  .png()
  .toFile(OUTPUT_FILE);

console.log(`Saved banner image to ${OUTPUT_FILE}.`);
