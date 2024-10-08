import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Bg1 from"@/components/Bg1";
import BackgroundContainer from "@/components/Bg2";
import NavbarDemo from "@/components/Navbarc";
import { Providers } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blue bus",
  description: "bus booking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BackgroundContainer>
            <Providers>
        {children}
        </Providers>
        </BackgroundContainer>
        </ThemeProvider>
        </body>
    </html>
  );
}
