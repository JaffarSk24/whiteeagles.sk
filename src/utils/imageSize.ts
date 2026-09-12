import fs from 'fs';
import path from 'path';

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Reads the pixel size out of a WebP header.
 *
 * An <img> without width and height leaves the browser no way to reserve the
 * space before the file arrives, so everything below it jumps down the moment
 * it does - the layout shift that Core Web Vitals measures and that makes a
 * reader lose the line they were on. The size is known at build time; nothing
 * has to be measured in the browser.
 *
 * All three WebP flavours are handled, because the articles use whichever one
 * the converter happened to produce: VP8 (lossy), VP8L (lossless) and VP8X
 * (extended, which is what a file with an alpha channel or metadata becomes).
 */
function parseWebp(buffer: Buffer): ImageSize | null {
  if (buffer.length < 30) return null;
  if (buffer.toString('ascii', 0, 4) !== 'RIFF') return null;
  if (buffer.toString('ascii', 8, 12) !== 'WEBP') return null;

  const format = buffer.toString('ascii', 12, 16);

  // Lossy: the 14-bit dimensions sit right after the 3-byte sync code.
  if (format === 'VP8 ') {
    if (buffer[23] !== 0x9d || buffer[24] !== 0x01 || buffer[25] !== 0x2a) return null;
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  // Lossless: one signature byte, then two 14-bit fields packed back to back,
  // each holding the dimension minus one.
  if (format === 'VP8L') {
    if (buffer[20] !== 0x2f) return null;
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  // Extended: the canvas size is stored as two 24-bit little-endian fields,
  // again minus one, after the flag byte and three reserved bytes.
  if (format === 'VP8X') {
    const width = buffer[24] | (buffer[25] << 8) | (buffer[26] << 16);
    const height = buffer[27] | (buffer[28] << 8) | (buffer[29] << 16);
    return { width: width + 1, height: height + 1 };
  }

  return null;
}

/**
 * Size of an image served from `public/`, addressed the way the markdown
 * addresses it: `/assets/blog/name.webp`. Returns null for anything remote,
 * missing or not a WebP, and the caller then emits the image without
 * dimensions rather than guessing at them.
 */
export function getPublicImageSize(src: string): ImageSize | null {
  if (!src || /^https?:\/\//i.test(src) || src.startsWith('data:')) return null;

  const clean = src.split('?')[0].split('#')[0];
  if (!clean.startsWith('/') || !clean.toLowerCase().endsWith('.webp')) return null;

  // Refuse to walk out of public/ even if an article ever carries `..`.
  const publicDir = path.join(process.cwd(), 'public');
  const fullPath = path.join(publicDir, clean);
  if (!fullPath.startsWith(publicDir)) return null;

  try {
    if (!fs.existsSync(fullPath)) return null;
    const fd = fs.openSync(fullPath, 'r');
    try {
      const header = Buffer.alloc(32);
      fs.readSync(fd, header, 0, 32, 0);
      return parseWebp(header);
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return null;
  }
}
