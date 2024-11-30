import localFont from "next/font/local";
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
