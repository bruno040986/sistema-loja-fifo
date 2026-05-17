import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const FeaturedCarousel = dynamic(() => import("@/components/FeaturedCarousel").then(mod => ({ default: mod.FeaturedCarousel })), {
  loading: () => (
    <div className="w-full overflow-hidden pb-8">
      <div className="flex gap-4 sm:gap-6 px-6 lg:px-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[min(300px,85vw)] sm:w-[320px] shrink-0 bg-zinc-900 rounded-2xl border border-zinc-800 h-[460px] animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

// Revalidate this page every 60 seconds or make it dynamic
export const revalidate = 60;

import Link from 'next/link';

export default async function Home() {
  // Fetch active featured products and flatten their batches into StoreItems
  const dbProducts = await prisma.product.findMany({
    where: {
      active: true,
      category: { active: true },
      batches: {
        some: {
          isFeatured: true,
          active: true,
          stock: { gt: 0 }
        }
      }
    },
    include: {
      category: true,
      batches: {
        where: { isFeatured: true, active: true, stock: { gt: 0 } },
        orderBy: { expirationDate: 'asc' },
      }
    },
  });

  // Flatten batches into StoreItems
  const featuredItems: any[] = [];
  dbProducts.forEach(p => {
    p.batches.forEach(b => {
      featuredItems.push({
        id: b.id,
        productId: p.id,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        price: b.price,
        bulkPrice: b.bulkPrice,
        bulkQuantity: b.bulkQuantity,
        stock: b.stock,
        expirationDate: b.expirationDate.toISOString(),
        category: { name: p.category.name }
      });
    });
  });

  // Sort all featured items globally by nearest expiration
  featuredItems.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-yellow-500/20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-black to-black"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Produtos perto do vencimento,<br className="hidden sm:block" />
              <span className="text-yellow-400">preços inacreditáveis.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg sm:text-xl text-zinc-400 mx-auto">
              Combata o desperdício de alimentos e economize muito. Aproveite nossas ofertas com o selo <strong className="text-yellow-400">Leve Mais, Pague Menos</strong>!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5561981617033?text=Vi%20o%20site%20de%20voc%C3%AAs%20e%20tenho%20algumas%20d%C3%BAvidas."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-7 rounded-full transition-all shadow-lg shadow-green-900/30 text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar no WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=-16.05599236570781,-47.97649928895526"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 px-7 rounded-full transition-all shadow-lg shadow-yellow-900/30 text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Como Chegar
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section id="ofertas" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
                Ofertas do Dia
              </h2>
              <p className="text-zinc-400 mt-2">Destaques com os melhores descontos</p>
            </div>
            <Link href="/produtos" className="hidden sm:flex text-yellow-400 hover:text-yellow-300 font-bold items-center gap-1 group bg-yellow-400/10 px-4 py-2 rounded-full transition-colors border border-yellow-500/20 hover:border-yellow-500/50">
              Ver Catálogo Completo
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

          <FeaturedCarousel items={featuredItems} />

          <div className="mt-8 flex justify-center sm:hidden px-4">
            <Link href="/produtos" className="w-full bg-zinc-900 border border-zinc-800 text-yellow-400 text-center font-bold py-4 rounded-xl hover:bg-zinc-800 transition-colors">
              Ver Catálogo Completo
            </Link>
          </div>

        </section>

        {/* Social Channels Section */}
        <section className="py-16 bg-zinc-950 border-t border-yellow-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex justify-center items-center gap-2">
              <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
              Nossos Canais Oficiais
            </h2>
            <p className="text-zinc-400 mb-10">Confira novidades, promoções e ofertas exclusivas</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/armazem_fifo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-4 px-8 rounded-full hover:opacity-90 transition-all shadow-lg text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                Instagram Oficial
              </a>
              <a
                href="https://wa.me/5561981617033?text=Quero%20participar%20do%20grupo%20de%20ofertas!"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Grupo de Ofertas
              </a>
            </div>
          </div>
        </section>

        {/* Sobre Nós Section */}
        <section id="sobre" className="bg-zinc-950 border-t border-yellow-500/10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
                  Sobre Nós
                </h2>
                <div className="space-y-4 text-zinc-400 text-lg leading-relaxed text-justify">
                  <p>
                    Bem-vindo ao Armazém Fifo! Nascido no coração do bairro Cidade Jardins, em Valparaíso de Goiás, nós somos muito mais do que um mini mercadinho de bairro: somos uma escolha inteligente para o seu bolso e para o planeta.
                  </p>
                  <p>
                    Nossa especialidade é oferecer produtos de qualidade — desde alimentos até itens de higiene e limpeza — que estão com a data de validade mais próxima. O que isso significa na prática? Significa que você tem acesso aos produtos que já conhece e precisa, mas pagando <strong className="text-yellow-400">muito menos por eles</strong>.
                  </p>
                  <p>
                    Nós acreditamos que o consumo inteligente é a melhor forma de combater o desperdício. Trabalhamos como uma ponte: de um lado, ajudamos fornecedores a dar um destino útil a produtos que seriam injustamente descartados; do outro, garantimos que a nossa comunidade tenha uma alternativa econômica, acessível e de qualidade para as compras do dia a dia.
                  </p>
                  <p>
                    E para tornar a sua rotina ainda mais prática, agora você pode garantir suas ofertas sem sair de casa! Navegue pelo nosso site, adicione os produtos no carrinho, envie seu pedido direto para o nosso WhatsApp e nós deixamos tudo separadinho. Depois, é só passar aqui no Armazém Fifo e retirar. Rápido, fácil e econômico.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-yellow-400 mb-3">Nossa Missão</h3>
                    <p className="text-zinc-400 leading-relaxed text-justify">
                      Democratizar o acesso a produtos de qualidade com preços super acessíveis para os moradores de Valparaíso de Goiás, combatendo ativamente o desperdício e gerando economia real tanto para as famílias da nossa vizinhança quanto para os nossos parceiros fornecedores.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-yellow-400 mb-3">Nossa Visão</h3>
                    <p className="text-zinc-400 leading-relaxed text-justify">
                      Ser o comércio de bairro referência em consumo consciente e inteligente em Valparaíso de Goiás, provando todos os dias que é perfeitamente possível unir economia doméstica, conveniência local e responsabilidade contra o desperdício.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex justify-center items-center gap-3">
                Nossos Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Economia Inteligente", desc: "Acreditamos no preço justo de verdade, aquele que faz a diferença no orçamento da sua família no final do mês." },
                  { title: "Combate ao Desperdício", desc: "Damos um destino útil e digno aos produtos, evitando o descarte desnecessário e protegendo o meio ambiente." },
                  { title: "Foco na Comunidade", desc: "Somos comércio de vizinhança. Nosso compromisso é com o atendimento rápido, próximo e acolhedor para quem vive no Cidade Jardins." },
                  { title: "Transparência Total", desc: "Jogamos limpo. Temos clareza absoluta sobre as datas de vencimento e a qualidade de tudo o que colocamos em nossas prateleiras." },
                  { title: "Parcerias de Valor", desc: "Construímos uma relação ganha-ganha com nossos fornecedores, transformando o que seria perda total em uma nova oportunidade de negócio." },
                  { title: "Praticidade", desc: "Valorizamos o seu tempo. Com nosso sistema de pedido online e retirada rápida, facilitamos o seu dia a dia." }
                ].map((val, idx) => (
                  <div key={idx} className="bg-black border border-zinc-800 p-6 rounded-2xl hover:border-yellow-500/50 transition-colors">
                    <h3 className="text-yellow-400 font-bold text-lg mb-2">{val.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed text-justify">{val.desc}</p>
                  </div>
                ))}
              </div>

              {/* WhatsApp Partnership Buttons */}
              <div className="mt-16 pt-10 border-t border-zinc-900 flex flex-col sm:flex-row justify-center items-center gap-6">
                <a 
                  href="https://wa.me/5561981617033?text=Olhei%20o%20site%20de%20voc%C3%AAs%20e%20tenho%20produtos%20para%20fornecer." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-yellow-400 text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20 text-center"
                >
                  Seja um Fornecedor
                </a>
                <a 
                  href="https://wa.me/5561981617033?text=Quero%20saber%20se%20h%C3%A1%20vagas%20de%20emprego%20neste%20momento." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-transparent border border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-full hover:bg-yellow-400/10 transition-colors text-center"
                >
                  Trabalhe Conosco
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Onde Estamos Section */}
        <section id="localizacao" className="bg-black border-t border-yellow-500/10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
                  Onde Estamos
                </h2>
                <p className="text-zinc-400 text-lg mb-8">
                  Visite o Armazém Fifo no coração do bairro Cidade Jardins, em Valparaíso de Goiás.
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div>
                      <h3 className="text-yellow-400 font-bold mb-2">Endereço Completo:</h3>
                      <p className="text-zinc-300 leading-relaxed">
                        Quadra Central 12 Área Especial 04 Loja 2B<br />
                        Residencial Viver Bem, Cidade Jardins<br />
                        Valparaíso de Goiás/GO<br />
                        CEP: 72.878-404
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-16.05599236570781,-47.97649928895526"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-yellow-500/20 text-base w-full sm:w-auto justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                  Traçar Rota
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl h-[350px] sm:h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=-16.05599236570781,-47.97649928895526&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Armazém Fifo"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
