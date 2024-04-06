import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weights: ["300", "400", "600"],
  styles: ["normal"],
  display: "swap",
});

export const metadata = {
  title: "Camisetei Store",
  description: "A loja de camisetas mais legal da internet!",
};

const menuItems = [
  { href: '/', text: 'Home' },
  { href: '#maincontent', text: 'Principal' },
  { href: '/about', text: 'Sobre nós' },
  { href: '/contact', text: 'Contato' },
];

export default function RootLayout({ children, modal }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " flex flex-col min-w-full min-h-svh bg-slate-50"}>
        <Navbar menuItems={menuItems} />
        <main id="maincontent" className="mx-auto flex flex-1 w-full">
          {modal}
          {children}
        </main>
        <Footer companyName="Camisetei Store" companyUrl="/" />
      </body>
    </html>
  );
}
