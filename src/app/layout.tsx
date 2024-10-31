import localFont from "next/font/local";
import "./globals.css";

const msSansSerif = localFont({
  src: "./fonts/Ms-Sans-Serif.ttf",
  display: 'swap',
  variable: "--font-ms-sans-serif"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${msSansSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
