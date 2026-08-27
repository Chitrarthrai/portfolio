const fs = require('fs');
const zlib = require('zlib');

// Create a 32x32 PNG with dark squircle, purple border, "CR" and green dot
const width = 32;
const height = 32;

// RGBA buffer (each row has 1 filter byte + width * 4 bytes)
const rowSize = 1 + width * 4;
const rawData = Buffer.alloc(rowSize * height);

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const offset = y * rowSize + 1 + x * 4;
  rawData[offset] = r;
  rawData[offset + 1] = g;
  rawData[offset + 2] = b;
  rawData[offset + 3] = a;
}

// Draw background squircle
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // Corner distance for rounded rect (radius = 7)
    let inBounds = true;
    const r = 7;
    if (x < r && y < r) {
      inBounds = Math.hypot(x - r, y - r) <= r;
    } else if (x >= width - r && y < r) {
      inBounds = Math.hypot(x - (width - r - 1), y - r) <= r;
    } else if (x < r && y >= height - r) {
      inBounds = Math.hypot(x - r, y - (height - r - 1)) <= r;
    } else if (x >= width - r && y >= height - r) {
      inBounds = Math.hypot(x - (width - r - 1), y - (height - r - 1)) <= r;
    }

    if (inBounds) {
      // Border check (1px border)
      const isBorder = (x <= 1 || x >= width - 2 || y <= 1 || y >= height - 2);
      if (isBorder) {
        // Gradient border: cyan to purple
        const t = (x + y) / (width + height);
        const br = Math.round(129 * (1 - t) + 203 * t);
        const bg = Math.round(140 * (1 - t) + 172 * t);
        const bb = Math.round(248 * (1 - t) + 249 * t);
        setPixel(x, y, br, bg, bb, 255);
      } else {
        // Dark background gradient #0e1335 to #030616
        const t = (x + y) / (width + height);
        const gr = Math.round(14 * (1 - t) + 3 * t);
        const gg = Math.round(19 * (1 - t) + 6 * t);
        const gb = Math.round(53 * (1 - t) + 22 * t);
        setPixel(x, y, gr, gg, gb, 255);
      }
    } else {
      setPixel(x, y, 0, 0, 0, 0); // Transparent
    }
  }
}

// Helper: draw simple bitmap font for C and R
// C glyph (5x7)
const cBitmap = [
  " 111 ",
  "1   1",
  "1    ",
  "1    ",
  "1    ",
  "1   1",
  " 111 "
];
// R glyph (5x7)
const rBitmap = [
  "1111 ",
  "1   1",
  "1   1",
  "1111 ",
  "1  1 ",
  "1   1",
  "1   1"
];

// Draw C at x=8, y=12
for (let row = 0; row < cBitmap.length; row++) {
  for (let col = 0; col < cBitmap[row].length; col++) {
    if (cBitmap[row][col] === '1') {
      setPixel(8 + col, 12 + row, 56, 189, 248, 255); // Cyan
    }
  }
}

// Draw R at x=18, y=12
for (let row = 0; row < rBitmap.length; row++) {
  for (let col = 0; col < rBitmap[row].length; col++) {
    if (rBitmap[row][col] === '1') {
      setPixel(18 + col, 12 + row, 203, 172, 249, 255); // Purple
    }
  }
}

// Draw green beacon dot at (26, 5)
for (let dy = -1; dy <= 1; dy++) {
  for (let dx = -1; dx <= 1; dx++) {
    if (Math.hypot(dx, dy) <= 1.5) {
      setPixel(25 + dx, 5 + dy, 52, 211, 153, 255); // Emerald green
    }
  }
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (-(crc & 1) & 0xEDB88320);
    }
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// 1. IHDR
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 6; // color type RGBA
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace
const ihdrChunk = makeChunk('IHDR', ihdrData);

// 2. IDAT
const compressed = zlib.deflateSync(rawData);
const idatChunk = makeChunk('IDAT', compressed);

// 3. IEND
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const pngBuffer = Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);

// Save PNG as public/favicon.png and app/icon.png
fs.writeFileSync('d:/Chitrarth/portfolio/public/favicon.png', pngBuffer);
fs.writeFileSync('d:/Chitrarth/portfolio/app/icon.png', pngBuffer);
fs.writeFileSync('d:/Chitrarth/portfolio/public/apple-icon.png', pngBuffer);
fs.writeFileSync('d:/Chitrarth/portfolio/app/apple-icon.png', pngBuffer);

// Now construct ICO containing this PNG
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // icon type
icoHeader.writeUInt16LE(1, 4); // 1 image

const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(width === 256 ? 0 : width, 0);
icoEntry.writeUInt8(height === 256 ? 0 : height, 1);
icoEntry.writeUInt8(0, 2); // color count
icoEntry.writeUInt8(0, 3); // reserved
icoEntry.writeUInt16LE(1, 4); // planes
icoEntry.writeUInt16LE(32, 6); // bpp
icoEntry.writeUInt32LE(pngBuffer.length, 8); // size
icoEntry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

const icoBuffer = Buffer.concat([icoHeader, icoEntry, pngBuffer]);
fs.writeFileSync('d:/Chitrarth/portfolio/public/favicon.ico', icoBuffer);
fs.writeFileSync('d:/Chitrarth/portfolio/app/favicon.ico', icoBuffer);

console.log("Successfully generated favicon.ico, icon.png, and favicon.png!");
