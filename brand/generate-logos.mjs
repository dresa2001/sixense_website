/**
 * Sixense logo asset generator
 * Outputs 9 PNG files (3 configs × 3 backgrounds) to brand/png/
 * Also saves SVG sources to brand/svg/
 *
 * Usage: node brand/generate-logos.mjs
 */

import sharp from 'sharp';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const SVG_DIR = path.join(__dir, 'svg');
const PNG_DIR = path.join(__dir, 'png');
fs.mkdirSync(SVG_DIR, { recursive: true });
fs.mkdirSync(PNG_DIR, { recursive: true });

// Brand colours
const GOLD  = '#F4C542';
const DARK  = '#1A1A18';   // wordmark on light bg
const LIGHT = '#F5F3EE';   // wordmark on dark bg
const WHITE = '#FFFFFF';
const BLACK = '#000000';

// ---------------------------------------------------------------------------
// Font loader — downloads Plus Jakarta Sans Bold 700 from Google Fonts as TTF
// and returns a CSS @font-face string for embedding in SVG.
// Falls back gracefully to system fonts if the download fails.
// ---------------------------------------------------------------------------
function httpGet(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) { reject(new Error('Too many redirects')); return; }
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        // Old IE UA triggers TTF/EOT responses from Google Fonts
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
        'Accept': '*/*',
      },
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        resolve(httpGet(res.headers.location, maxRedirects - 1));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end',  () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function loadFontFaceCSS() {
  try {
    // Fetch the CSS stylesheet — old UA should give us TTF or WOFF (not WOFF2)
    const cssUrl = 'https://fonts.googleapis.com/css?family=Plus+Jakarta+Sans:700&display=swap';
    const css = (await httpGet(cssUrl)).toString('utf-8');

    // Extract the first font src URL
    const m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
    if (!m) throw new Error('No font URL found in CSS response');

    const fontUrl = m[1];
    const ext = fontUrl.includes('.woff2') ? 'woff2'
               : fontUrl.includes('.woff') ? 'woff'
               : 'truetype';
    const mime = ext === 'woff2' ? 'font/woff2'
               : ext === 'woff'  ? 'font/woff'
               : 'font/truetype';

    console.log(`  Downloading font (${ext}) from Google Fonts…`);
    const fontBuf = await httpGet(fontUrl);
    const b64 = fontBuf.toString('base64');

    return `@font-face{font-family:'Plus Jakarta Sans';font-weight:700;font-style:normal;src:url('data:${mime};base64,${b64}') format('${ext}');}`;
  } catch (e) {
    console.warn(`  Font download failed (${e.message}) — using system font fallback.`);
    return '';
  }
}

// ---------------------------------------------------------------------------
// Mark geometry — exact copy of Logo.astro
// ---------------------------------------------------------------------------
const MARK_PATHS = `
  <polygon points="100,18 122,31 122,57 100,70 78,57 78,31"   stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <polygon points="126,62 148,75 148,101 126,114 104,101 104,75" stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <polygon points="74,62 96,75 96,101 74,114 52,101 52,75"    stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <circle  cx="100" cy="88" r="4" fill="${GOLD}"/>
  <line x1="100" y1="84"  x2="100" y2="70"  stroke="${GOLD}" stroke-width="1.5"/>
  <line x1="100" y1="88"  x2="116" y2="96"  stroke="${GOLD}" stroke-width="1.5"/>
  <line x1="100" y1="88"  x2="84"  y2="96"  stroke="${GOLD}" stroke-width="1.5"/>
`;

// ---------------------------------------------------------------------------
// SVG builders
// ---------------------------------------------------------------------------
function defs(fontFaceCSS) {
  return fontFaceCSS
    ? `<defs><style>${fontFaceCSS}</style></defs>`
    : '';
}

function bgRect(color, w, h) {
  return color ? `<rect width="${w}" height="${h}" fill="${color}"/>` : '';
}

// 1. Mark only — 480 × 480
function svgMark(bgColor, fontFaceCSS) {
  const W = 480, H = 480;
  // 390 × 398 nested SVG (100:102 aspect), centred with ~45px margin
  const MX = 45, MY = 41, MW = 390, MH = 398;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${defs(fontFaceCSS)}
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
</svg>`;
}

// 2. Lockup — mark + wordmark — 600 × 140
//
// Gold-dot position (at 46 px font size):
//   's' advance ≈ 0.58 em = 26.7 px; then letter-spacing 0.01 em = 0.46 px → 27.2 px
//   'ı' advance ≈ 0.28 em = 12.9 px; centre of 'ı' from text origin ≈ 27.2 + 6.5 = 33.7 px
//   Dot top  = (baseline − ascent) + 0.04 em ≈ (TB − 38) + 1.84 = TB − 36.2
//   Dot cy   = TB − 36.2 + r  where r = (0.22 em)/2 = 5.06 ≈ 5
//   Dot cy   ≈ TB − 31
function svgLockup(bgColor, textColor, fontFaceCSS) {
  const W = 600, H = 140;
  const MX = 30, MY = 19, MW = 100, MH = 102;
  const TX = MX + MW + 20;       // 150
  const FS = 46;
  const TB = MY + 76;            // ≈ 95 — baseline visually centred against mark
  const DCX = TX + 34;           // centre of gold dot (horizontal)
  const DCY = TB - 31;           // centre of gold dot (vertical)
  const DR  = 5;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${defs(fontFaceCSS)}
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
  <text
    x="${TX}" y="${TB}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="700" font-size="${FS}" letter-spacing="0.46"
    fill="${textColor}">s&#x131;xense</text>
  <circle cx="${DCX}" cy="${DCY}" r="${DR}" fill="${GOLD}"/>
</svg>`;
}

// 3. Full — mark + wordmark + tagline — 600 × 176
function svgFull(bgColor, textColor, fontFaceCSS) {
  const W = 600, H = 176;
  const MX = 30, MY = 37, MW = 100, MH = 102;
  const TX = MX + MW + 20;       // 150
  const FS = 46;
  // Shift wordmark up slightly so the word+tagline group centres on the mark
  const TB  = MY + 68;           // ≈ 105 wordmark baseline
  const DCX = TX + 34;
  const DCY = TB - 31;
  const DR  = 5;
  const TFS = 15;                // tagline font size
  const TY  = TB + 22;          // tagline baseline

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${defs(fontFaceCSS)}
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
  <text
    x="${TX}" y="${TB}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="700" font-size="${FS}" letter-spacing="0.46"
    fill="${textColor}">s&#x131;xense</text>
  <circle cx="${DCX}" cy="${DCY}" r="${DR}" fill="${GOLD}"/>
  <text
    x="${TX}" y="${TY}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="400" font-size="${TFS}" letter-spacing="1.5"
    fill="${textColor}" opacity="0.65">connected thinking</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Loading Plus Jakarta Sans Bold from Google Fonts…');
  const fontFaceCSS = await loadFontFaceCSS();
  console.log(fontFaceCSS ? '  Font loaded successfully.\n' : '  Using system font fallback.\n');

  const variants = [
    { name: 'transparent', bgColor: null,  textColor: DARK  },
    { name: 'white',       bgColor: WHITE, textColor: DARK  },
    { name: 'black',       bgColor: BLACK, textColor: LIGHT },
  ];

  const configs = [
    { name: 'mark',   build: (v) => svgMark  (v.bgColor,              fontFaceCSS) },
    { name: 'lockup', build: (v) => svgLockup(v.bgColor, v.textColor, fontFaceCSS) },
    { name: 'full',   build: (v) => svgFull  (v.bgColor, v.textColor, fontFaceCSS) },
  ];

  const errors = [];

  for (const variant of variants) {
    for (const cfg of configs) {
      const slug = `sixense-${cfg.name}-${variant.name}`;
      const svgStr = cfg.build(variant);
      const svgPath = path.join(SVG_DIR, `${slug}.svg`);
      const pngPath = path.join(PNG_DIR, `${slug}.png`);

      fs.writeFileSync(svgPath, svgStr, 'utf-8');

      try {
        await sharp(Buffer.from(svgStr), { density: 150 })
          .png({ compressionLevel: 9 })
          .toFile(pngPath);
        console.log(`  ✓  ${slug}.png`);
      } catch (e) {
        console.error(`  ✗  ${slug}: ${e.message}`);
        errors.push(slug);
      }
    }
  }

  console.log(`
Done.
  SVG source files → brand/svg/  (${configs.length * variants.length} files)
  PNG exports      → brand/png/  (${configs.length * variants.length - errors.length} files)${
    errors.length ? `\n  Failed: ${errors.join(', ')}` : ''
  }
`);
}

main().catch(err => { console.error(err); process.exit(1); });
