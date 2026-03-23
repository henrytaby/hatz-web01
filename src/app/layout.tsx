import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Henry Taby | Software Developer - Fotógrafo",
    template: "%s | Henry Taby",
  },
  description: "Portafolio de Henry Taby, Software Developer & Fotógrafo.",
  // ... omite metadata exhaustiva para ahorrar lineas ...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "bg-background text-foreground antialiased",
        poppins.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans selection:bg-red-600 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-5 pb-5">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
