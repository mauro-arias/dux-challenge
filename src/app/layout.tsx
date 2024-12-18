import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeflex/primeflex.css";
import ReactQueryClientProvider from "@/client/providers/tanstack-provider";
import "primeicons/primeicons.css";
import TopMenu from "@/components/TopMenu/TopMenu";
import SideBar from "@/components/SideBar/SideBar";
import AppContextProvider from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dux Challenge",
  description: "Users CRUD App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider>
      <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ReactQueryClientProvider>
            <AppContextProvider>
              <TopMenu />
              <div className="grid">
                {/* Main Content */}
                <div className="flex col-12 mainContainer">
                  <SideBar />
                  <main className="col p-0 mainContent">
                    <div className="p-4">{children}</div>
                  </main>
                </div>
              </div>
            </AppContextProvider>
          </ReactQueryClientProvider>
        </body>
      </html>
    </PrimeReactProvider>
  );
}
