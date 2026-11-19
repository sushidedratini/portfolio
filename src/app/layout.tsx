import localFont from "next/font/local";
// PDF text/annotation layer styles (Acrobat Reader). Loaded globally because react-pdf checks
// for them on first render, before the lazily-loaded reader's own CSS chunk would arrive.
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./globals.css";
import ParentProvider from "./ParentWrapper";

const msSansSerif = localFont({
  src: "./fonts/Ms-Sans-Serif.ttf"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={msSansSerif.className}
        suppressHydrationWarning={true}
      >
        <ParentProvider>
          {children}
        </ParentProvider>
      </body>
    </html>
  );
}
