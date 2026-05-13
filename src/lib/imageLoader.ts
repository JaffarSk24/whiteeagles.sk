// Custom image loader for Next.js static export
// Since we deploy to a static host (Hetzner via SCP), we use a passthrough loader
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For local images in /public, just return the src as-is
  // The browser will handle them directly
  return `${src}?w=${width}&q=${quality || 75}`;
}
