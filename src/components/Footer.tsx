import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const paymentMethods = [
    "Pix", "Dinheiro", "Visa", "Mastercard", "Elo", "Hiper", "American Express"
  ];

  return (
    <footer className="bg-zinc-950 border-t border-yellow-500/20 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Logo + Description + Social */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="cursor-pointer block mb-4">
              <Image
                src="/logo-transparent.png"
                alt="Armazém Fifo Logo"
                width={180}
                height={90}
                className="object-contain hover:scale-105 transition-transform"
                priority
              />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              O seu armazém de produtos de qualidade na Cidade Jardins em Valparaíso de Goiás/GO, que oferece um preço muito baixo, variedade e atendimento rápido.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/armazem_fifo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/5561981617033" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contato */}
          <div>
            <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider mb-5">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/5561981617033" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  (61) 98161-7033
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/5561981617033?text=Olhei%20o%20site%20de%20voc%C3%AAs%20e%20tenho%20produtos%20para%20fornecer."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                  <span>🤝</span> Seja um Fornecedor
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5561981617033?text=Quero%20saber%20se%20h%C3%A1%20vagas%20de%20emprego%20neste%20momento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                  <span>👤</span> Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Links Úteis */}
          <div>
            <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider mb-5">Links Úteis</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Início</Link></li>
              <li><Link href="/#ofertas" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Ofertas do Dia</Link></li>
              <li><Link href="/#sobre" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Sobre a Empresa</Link></li>
              <li><Link href="/#localizacao" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Onde Estamos</Link></li>
              <li><Link href="/produtos" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Catálogo Completo</Link></li>
              <li><Link href="/links" className="text-zinc-400 hover:text-yellow-400 transition-colors text-sm">Link na Bio</Link></li>
            </ul>
          </div>

          {/* Column 4: Formas de Pagamento */}
          <div>
            <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider mb-5">Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Business Hours Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full px-6 py-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="text-zinc-300">
              <strong className="text-yellow-400">Seg a Sáb:</strong> 07h às 21h
              <span className="mx-2 text-zinc-600">|</span>
              <strong className="text-yellow-400">Domingos:</strong> 07h às 14h
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-zinc-600 text-xs">
            Armazém Fifo Ltda — CNPJ: 00.000.000/0000-00 — &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/termos-de-uso" className="text-zinc-500 hover:text-yellow-400 transition-colors">Termos de Uso</Link>
            <span className="text-zinc-800">|</span>
            <Link href="/politica-de-privacidade" className="text-zinc-500 hover:text-yellow-400 transition-colors">Política de Privacidade</Link>
          </div>
        </div>
      </div>

      {/* BeM Digital Signature */}
      <div className="border-t border-white/5 py-6 flex justify-center px-4">
        <a
          href="https://bemdigital.online"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-[#07111d] px-6 py-4 sm:py-3 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-2xl shadow-blue-500/5">
            <Image
              src="/bem-digital-logo.svg"
              alt="BeM Digital"
              width={120}
              height={30}
              className="h-7 sm:h-8 w-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center sm:items-start leading-tight">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-zinc-500 font-bold mb-1 sm:mb-0">Projeto digital desenvolvido por</span>
              <span className="text-xs sm:text-sm font-black text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">BeM Digital Online</span>
            </div>
          </div>
        </a>
      </div>
    </footer>
  );
}
