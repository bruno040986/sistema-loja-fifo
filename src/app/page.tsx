import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Footer } from "@/components/Footer";

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
      <CartDrawer />

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
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="py-16">
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

          {/* WhatsApp Support Button */}
          <div className="mt-12 flex justify-center px-4">
            <a 
              href="https://wa.me/5561981617033?text=Ol%C3%A1%21%20Tenho%20d%C3%BAvidas%20e%20gostaria%20de%20atendimento." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 text-white font-bold py-4 px-8 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all flex items-center gap-3 shadow-lg group w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 group-hover:scale-110 transition-transform"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Tire suas dúvidas aqui!
            </a>
          </div>
        </section>

        {/* Sobre Nós Section */}
        <section className="bg-zinc-950 border-t border-yellow-500/10 py-20 px-4 sm:px-6 lg:px-8">
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
                    <h4 className="text-yellow-400 font-bold text-lg mb-2">{val.title}</h4>
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
      </main>

      <Footer />
    </div>
  );
}
