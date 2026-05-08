import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-500/20 py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
        
        {/* Left Side: Logo & Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <Link href="/" className="cursor-pointer block mb-2">
            <Image 
              src="/logo-transparent.png" 
              alt="Armazém Fifo Logo" 
              width={220} 
              height={110} 
              className="object-contain hover:scale-105 transition-transform"
              priority
            />
          </Link>
          <div className="text-zinc-500 font-medium">
            <p>Armazém Fifo Ltda</p>
            <p>CNPJ: 00.000.000/0000-00</p>
            <p className="mt-4 text-xs text-zinc-600">&copy; {new Date().getFullYear()} Armazém Fifo. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Right Side: Social & Links */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-sm font-medium">
            <Link href="/politica-de-privacidade" className="text-zinc-500 hover:text-yellow-400 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-zinc-500 hover:text-yellow-400 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
