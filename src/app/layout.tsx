// Minimal root layout — actual layout is in [locale]/layout.tsx
// Required by Next.js App Router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
