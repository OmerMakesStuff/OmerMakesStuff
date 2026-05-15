import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const BANNER_WIDTH = 2560;
export const BANNER_HEIGHT = 640;

export const BG_COLOR = '#1740ea';
export const FILL_COLOR = '#ffffff';

export const SVG_URL =
  'https://raw.githubusercontent.com/OmerMakesStuff/logo/main/omer-makes-stuff/omer-makes-stuff.svg';
export const OUTPUT_FILE = path.join(__dirname, '../', 'banner.png');
