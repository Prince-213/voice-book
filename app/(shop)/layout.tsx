import localFont from "next/font/local";
import "../globals.css";
import Header from "../_shared/Header";
import Cart from "../_shared/Cart";

export const riceMedium = localFont({
  src: "../fonts/BeatriceDisplayTRIAL-Medium-BF64829e8d3123e.otf",
  variable: "--font-med-sans",
  weight: "100 900"
});
export const riceSemiBold = localFont({
  src: "../fonts/BeatriceDisplayTRIAL-Semibold-BF64829e8cd8b7f.otf",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const riceBold = localFont({
  src: "../fonts/BeatriceDisplayTRIAL-Bold-BF64829e8d7b173.otf",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const riceRegular = localFont({
  src: "../fonts/BeatriceDeckTRIAL-Regular-BF64829e8e41476.otf",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
        className={`${riceRegular.className} antialiased w-full min-h-screen bg-[url(/asset/back.png)] pt-[50px] pb-10 bg-white bg-blend-multiply `}
      >
        <Cart />
        <Header />
        {children}
      </body>
    </html>
  );
}
