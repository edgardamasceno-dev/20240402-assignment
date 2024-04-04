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

export default function RootLayout({ children, modal }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " flex flex-col min-w-full min-h-screen bg-slate-50"}>
        <Navbar menuItems={menuItems} />
        <main className="max-w-[960px] mx-auto flex-1">
          {modal}
          {children}
        </main>
        <Footer companyName="Camisetei Store" companyUrl="/" />
      </body>
    </html>
  );
}
