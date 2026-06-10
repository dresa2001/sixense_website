/**
 * Sixense logo asset generator
 * Outputs 9 PNG files (3 configs × 3 backgrounds) to brand/png/
 * Also saves SVG sources to brand/svg/
 *
 * Usage: node brand/generate-logos.mjs
 */

import sharp from 'sharp';
import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir  = path.dirname(fileURLToPath(import.meta.url));
const ROOT   = path.join(__dir, '..');
const SVG_DIR = path.join(__dir, 'svg');
const PNG_DIR = path.join(__dir, 'png');
fs.mkdirSync(SVG_DIR, { recursive: true });
fs.mkdirSync(PNG_DIR, { recursive: true });

// Brand colours
const GOLD  = '#F4C542';
const DARK  = '#1A1A18';
const LIGHT = '#F5F3EE';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

// ---------------------------------------------------------------------------
// Font loading — reads the local @fontsource/plus-jakarta-sans WOFF files.
// No network request needed; exact same typeface as the website.
// ---------------------------------------------------------------------------
const FONTSOURCE = path.join(ROOT, 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files');

function fontFaceCSS(weight) {
  const woff = fs.readFileSync(path.join(FONTSOURCE, `plus-jakarta-sans-latin-${weight}-normal.woff`));
  const b64  = woff.toString('base64');
  return `@font-face{font-family:'Plus Jakarta Sans';font-weight:${weight};font-style:normal;src:url('data:font/woff;base64,${b64}') format('woff');}`;
}

// ---------------------------------------------------------------------------
// Font metrics — derive exact dot position from the parsed glyph data.
//
// Horizontal: DCX offset = s.advance + letter-spacing + (ı.advance / 2)
//
// Vertical replicates CSS `top:0.04em` on a `display:inline-block; line-height:1` element.
//   CSS line box model for line-height = font-size (leading = 0):
//     half_leading   = (FS − (A + D)) / 2          [negative when A+D > FS]
//     elem_top→BL    = A + half_leading             [distance from element top to baseline]
//     dot_top        = elem_top + 0.04·FS
//     dot_cy         = dot_top + dotR
//   → dot_cy offset from baseline = −elem_top→BL + 0.04·FS + dotR
// ---------------------------------------------------------------------------
function getDotMetrics(FS) {
  const buf  = fs.readFileSync(path.join(FONTSOURCE, 'plus-jakarta-sans-latin-700-normal.woff'));
  const font = opentype.parse(buf.buffer);
  const scale = FS / font.unitsPerEm;
  const LS   = 0.01 * FS;   // letter-spacing: 0.01em

  const sAdv = font.charToGlyph('s').advanceWidth * scale;
  const iAdv = font.charToGlyph('ı').advanceWidth * scale; // dotless i U+0131
  const A    = font.tables.os2.sTypoAscender  * scale;
  const D    = Math.abs(font.tables.os2.sTypoDescender) * scale;
  const dotR = (0.22 * FS) / 2;

  const elemTopToBL = A + (FS - A - D) / 2;   // = (FS + A - D) / 2

  const dotOffsetX = sAdv + LS + iAdv / 2 - 1.9;                 // from text origin (-1.9 corrects render vs metric gap)
  const dotOffsetY = -elemTopToBL + 0.04 * FS + dotR;            // from baseline (negative = above)

  return { dotOffsetX, dotOffsetY, dotR };
}

// ---------------------------------------------------------------------------
// Mark geometry — exact copy from Logo.astro
// ---------------------------------------------------------------------------
const MARK_PATHS = `
  <polygon points="100,18 122,31 122,57 100,70 78,57 78,31"      stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <polygon points="126,62 148,75 148,101 126,114 104,101 104,75"  stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <polygon points="74,62 96,75 96,101 74,114 52,101 52,75"        stroke="${GOLD}" stroke-width="3"   fill="none" stroke-linejoin="round"/>
  <circle  cx="100" cy="88" r="4" fill="${GOLD}"/>
  <line x1="100" y1="84" x2="100" y2="70" stroke="${GOLD}" stroke-width="1.5"/>
  <line x1="100" y1="88" x2="116" y2="96" stroke="${GOLD}" stroke-width="1.5"/>
  <line x1="100" y1="88" x2="84"  y2="96" stroke="${GOLD}" stroke-width="1.5"/>
`;

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------
function defs(...cssParts) {
  const css = cssParts.filter(Boolean).join('\n');
  return css ? `<defs><style>${css}</style></defs>` : '';
}

function bgRect(color, w, h) {
  return color ? `<rect width="${w}" height="${h}" fill="${color}"/>` : '';
}

// ---------------------------------------------------------------------------
// Compute dot metrics once for the wordmark font size
// ---------------------------------------------------------------------------
const FS  = 46;   // wordmark font size (px)
const { dotOffsetX, dotOffsetY, dotR } = getDotMetrics(FS);

// ---------------------------------------------------------------------------
// SVG builders
// ---------------------------------------------------------------------------

// 1. Mark only — 480 × 480
function svgMark(bgColor) {
  const W = 480, H = 480, MW = 390, MH = 398;
  const MX = (W - MW) / 2, MY = (H - MH) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
</svg>`;
}

// 2. Lockup — mark + wordmark — 600 × 140
function svgLockup(bgColor, textColor, ff700) {
  const W = 600, H = 140;
  const MX = 30, MW = 100, MH = 102, MY = (H - MH) / 2;  // mark centred
  const TX = MX + MW + 20;                                  // text x = 150
  const TB = MY + MH * 0.62;                                // baseline ≈ mark centre + slight upward
  const DCX = +(TX + dotOffsetX).toFixed(1);
  const DCY = +(TB + dotOffsetY).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${defs(ff700)}
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
  <text x="${TX}" y="${TB.toFixed(1)}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="700" font-size="${FS}" letter-spacing="${(0.01 * FS).toFixed(2)}"
    fill="${textColor}">s&#x131;xense</text>
  <circle cx="${DCX}" cy="${DCY}" r="${dotR.toFixed(1)}" fill="${GOLD}"/>
</svg>`;
}

// 3. Full — mark + wordmark + tagline — 600 × 176
//
// Vertical centering: text group (cap-height of wordmark → baseline of tagline) is
// centred against the mark's vertical midpoint.
//   cap_height ≈ 34 px at FS=46   (from font.tables.os2.sCapHeight)
//   text group spans: (TB - cap_h)  →  (TY + ~4 px descender)
//   group height = cap_h + tagline_gap + tag_descender ≈ 34 + 22 + 4 = 60 px
//   group centre = TB - cap_h + 30 = TB - 4
//   mark centre  = MY + MH/2
//   → TB = mark_centre + 4
function svgFull(bgColor, textColor, ff700, ff400) {
  const W = 600, H = 176;
  const MX = 30, MW = 100, MH = 102, MY = (H - MH) / 2;  // mark centred = y 37
  const TX = MX + MW + 20;
  const TFS = 15;            // tagline font size
  const CAP_H = 34;          // approximate cap height at FS=46 (from font metrics)
  const TAG_GAP = 22;        // gap between wordmark baseline and tagline baseline
  const TAG_DESC = 4;        // approximate tagline descender allowance
  // Centre the text group (wordmark cap → tagline bottom) against the mark
  const markCY = MY + MH / 2;                    // 37 + 51 = 88
  const groupH = CAP_H + TAG_GAP + TAG_DESC;      // 60
  const TB = markCY + 4;                           // = 92  (group centre = TB - 4 = 88 ✓)
  const TY = TB + TAG_GAP;                         // tagline baseline = 114
  const DCX = +(TX + dotOffsetX).toFixed(1);
  const DCY = +(TB + dotOffsetY).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${defs(ff700, ff400)}
  ${bgRect(bgColor, W, H)}
  <svg x="${MX}" y="${MY}" width="${MW}" height="${MH}" viewBox="50 15 100 102">
    ${MARK_PATHS}
  </svg>
  <text x="${TX}" y="${TB}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="700" font-size="${FS}" letter-spacing="${(0.01 * FS).toFixed(2)}"
    fill="${textColor}">s&#x131;xense</text>
  <circle cx="${DCX}" cy="${DCY}" r="${dotR.toFixed(1)}" fill="${GOLD}"/>
  <text x="${TX}" y="${TY}"
    font-family="'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"
    font-weight="400" font-size="${TFS}" letter-spacing="1.5"
    fill="${textColor}" opacity="0.65">connected thinking</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Loading fonts from @fontsource/plus-jakarta-sans…');
  const ff700 = fontFaceCSS(700);
  const ff400 = fontFaceCSS(400);
  console.log(`  Loaded. Dot position: x offset +${dotOffsetX.toFixed(1)} px, y offset ${dotOffsetY.toFixed(1)} px from baseline.\n`);

  const variants = [
    { name: 'transparent', bgColor: null,  textColor: DARK  },
    { name: 'white',       bgColor: WHITE, textColor: DARK  },
    { name: 'black',       bgColor: BLACK, textColor: LIGHT },
  ];

  const configs = [
    { name: 'mark',   build: (v) => svgMark  (v.bgColor) },
    { name: 'lockup', build: (v) => svgLockup(v.bgColor, v.textColor, ff700) },
    { name: 'full',   build: (v) => svgFull  (v.bgColor, v.textColor, ff700, ff400) },
  ];

  const errors = [];

  for (const variant of variants) {
    for (const cfg of configs) {
      const slug    = `sixense-${cfg.name}-${variant.name}`;
      const svgStr  = cfg.build(variant);
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
