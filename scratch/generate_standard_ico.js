const fs = require('fs');

const width = 32;
const height = 32;

// RGBA pixel grid: grid[y][x] = [r, g, b, a]
const grid = Array.from({ length: height }, () => 
  Array.from({ length: width }, () => [0, 0, 0, 0])
);

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  grid[y][x] = [r, g, b, a];
}

// Draw squircle background
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let inBounds = true;
    const r = 7;
    if (x < r && y < r) inBounds = Math.hypot(x - r, y - r) <= r;
    else if (x >= width - r && y < r) inBounds = Math.hypot(x - (width - r - 1), y - r) <= r;
    else if (x < r && y >= height - r) inBounds = Math.hypot(x - r, y - (height - r - 1)) <= r;
    else if (x >= width - r && y >= height - r) inBounds = Math.hypot(x - (width - r - 1), y - (height - r - 1)) <= r;

    if (inBounds) {
      const isBorder = (x <= 1 || x >= width - 2 || y <= 1 || y >= height - 2);
      if (isBorder) {
        const t = (x + y) / (width + height);
        const br = Math.round(129 * (1 - t) + 203 * t);
        const bg = Math.round(140 * (1 - t) + 172 * t);
        const bb = Math.round(248 * (1 - t) + 249 * t);
        setPixel(x, y, br, bg, bb, 255);
      } else {
        const t = (x + y) / (width + height);
        const gr = Math.round(14 * (1 - t) + 3 * t);
        const gg = Math.round(19 * (1 - t) + 6 * t);
        const gb = Math.round(53 * (1 - t) + 22 * t);
        setPixel(x, y, gr, gg, gb, 255);
      }
    }
  }
}

// Draw C glyph
const cBitmap = [
  " 111 ",
  "1   1",
  "1    ",
  "1    ",
  "1    ",
  "1   1",
  " 111 "
];
for (let row = 0; row < cBitmap.length; row++) {
  for (let col = 0; col < cBitmap[row].length; col++) {
    if (cBitmap[row][col] === '1') {
      setPixel(8 + col, 12 + row, 56, 189, 248, 255); // Cyan
    }
  }
}

// Draw R glyph
const rBitmap = [
  "1111 ",
  "1   1",
  "1   1",
  "1111 ",
  "1  1 ",
  "1   1",
  "1   1"
];
for (let row = 0; row < rBitmap.length; row++) {
  for (let col = 0; col < rBitmap[row].length; col++) {
    if (rBitmap[row][col] === '1') {
      setPixel(18 + col, 12 + row, 203, 172, 249, 255); // Violet
    }
  }
}

// Draw green dot
for (let dy = -1; dy <= 1; dy++) {
  for (let dx = -1; dx <= 1; dx++) {
    if (Math.hypot(dx, dy) <= 1.5) {
      setPixel(25 + dx, 5 + dy, 52, 211, 153, 255); // Emerald
    }
  }
}

// Standard BMP ICO structure
const imageSize = 40 + (width * height * 4) + (width * height / 8);
const totalFileSize = 6 + 16 + imageSize;
const ico = Buffer.alloc(totalFileSize);

// ICONDIR
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // icon
ico.writeUInt16LE(1, 4); // count = 1

// ICONDIRENTRY
ico.writeUInt8(width, 6);
ico.writeUInt8(height, 7);
ico.writeUInt8(0, 8); // color count
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // planes
ico.writeUInt16LE(32, 12); // bpp
ico.writeUInt32LE(imageSize, 14); // image size
ico.writeUInt32LE(22, 18); // offset

// BITMAPINFOHEADER
let offset = 22;
ico.writeUInt32LE(40, offset); // header size
ico.writeInt32LE(width, offset + 4);
ico.writeInt32LE(height * 2, offset + 8); // ICO height is 2x
ico.writeUInt16LE(1, offset + 12); // planes
ico.writeUInt16LE(32, offset + 14); // bpp
ico.writeUInt32LE(0, offset + 16); // BI_RGB
ico.writeUInt32LE(width * height * 4 + width * height / 8, offset + 20); // biSizeImage
ico.writeInt32LE(0, offset + 24);
ico.writeInt32LE(0, offset + 28);
ico.writeUInt32LE(0, offset + 32);
ico.writeUInt32LE(0, offset + 36);
offset += 40;

// Pixel data (bottom-up BGRA)
for (let y = height - 1; y >= 0; y--) {
  for (let x = 0; x < width; x++) {
    const [r, g, b, a] = grid[y][x];
    ico.writeUInt8(b, offset);
    ico.writeUInt8(g, offset + 1);
    ico.writeUInt8(r, offset + 2);
    ico.writeUInt8(a, offset + 3);
    offset += 4;
  }
}

// AND mask (bottom-up 1-bit, all 0 for 32-bit alpha)
for (let y = height - 1; y >= 0; y--) {
  for (let b = 0; b < 4; b++) {
    ico.writeUInt8(0, offset++);
  }
}

fs.writeFileSync('d:/Chitrarth/portfolio/public/favicon.ico', ico);

// Also remove app/favicon.ico if it exists so Next.js doesn't override with its loader
if (fs.existsSync('d:/Chitrarth/portfolio/app/favicon.ico')) {
  fs.unlinkSync('d:/Chitrarth/portfolio/app/favicon.ico');
}

console.log("Canonical BMP ICO generated at public/favicon.ico! File size:", ico.length);
