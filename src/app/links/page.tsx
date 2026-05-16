import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Armazém Fifo — Links",
  description: "Todos os links do Armazém Fifo em um só lugar.",
};

export default function LinksPage() {
  const links = [
    {
      label: "Faça seu Pedido",
      href: "/produtos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
      ),
      primary: true,
    },
    {
      label: "Grupo de Ofertas VIP",
      href: "https://wa.me/5561981617033?text=Quero%20participar%20do%20grupo%20de%20ofertas!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"/><line x1="7" x2="7.01" y1="7" y2="7"/></svg>
      ),
      external: true,
    },
    {
      label: "Falar com Atendente",
      href: "https://wa.me/5561981617033?text=Ol%C3%A1%21%20Preciso%20de%20atendimento.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
      external: true,
      green: true,
    },
    {
      label: "Como Chegar",
      href: "https://www.google.com/maps/dir/?api=1&destination=-16.05599236570781,-47.97649928895526",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
      external: true,
    },
    {
      label: "Siga nosso Instagram",
      href: "https://instagram.com/armazem_fifo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      ),
      external: true,
    },
    {
      label: "Siga nosso TikTok",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
      ),
      external: true,
    },
    {
      label: "Site Oficial",
      href: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500 via-black to-black pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo-transparent.png"
          alt="Armazém Fifo"
          width={160}
          height={80}
          className="object-contain mb-4"
          priority
        />

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-black text-white text-center tracking-tight">ARMAZÉM FIFO</h1>
        <p className="text-zinc-400 text-sm text-center mt-1 mb-10">
          Preço baixo, variedade e atendimento rápido.
        </p>

        {/* Link Buttons */}
        <div className="w-full space-y-3.5">
          {links.map((link, idx) => {
            const isExternal = link.external;
            const Tag = isExternal ? "a" : "a";
            const baseClasses = "w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-base shadow-lg";

            let colorClasses: string;
            if (link.primary) {
              colorClasses = "bg-yellow-400 hover:bg-yellow-500 text-black shadow-yellow-500/20";
            } else if (link.green) {
              colorClasses = "bg-green-600 hover:bg-green-700 text-white shadow-green-900/20";
            } else {
              colorClasses = "bg-zinc-900 border border-zinc-800 text-white hover:border-yellow-500/50 hover:text-yellow-400";
            }

            return (
              <a
                key={idx}
                href={isExternal ? link.href : link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`${baseClasses} ${colorClasses}`}
              >
                {link.icon}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-10">
          <a href="https://instagram.com/armazem_fifo" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/5561981617033" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-yellow-500/50" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        </div>

        {/* Business Hours Badge */}
        <div className="mt-8 inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full px-5 py-2.5 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="text-zinc-300 text-xs sm:text-sm">
            <strong className="text-yellow-400">Seg a Sáb:</strong> 07 às 21h
            <span className="mx-1.5 text-zinc-600">|</span>
            <strong className="text-yellow-400">Dom:</strong> 07 às 14h
          </span>
        </div>
      </main>
    </div>
  );
}
