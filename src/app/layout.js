import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Camisetei Store",
  description: "A loja de camisetas mais legal da internet!",
};

const menuItems = [
  { href: '/', text: 'Início' },
  { href: '#about', text: 'Sobre nós' },
  { href: '#contact', text: 'Contato' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " flex flex-col min-w-full min-h-screen bg-slate-50"}>
        <Navbar menuItems={menuItems} />
        {children}
        <div className="flex-1"></div>
        <Footer companyName="Camisetei Store" companyUrl="/" />
      </body>
    </html>
  );
}
