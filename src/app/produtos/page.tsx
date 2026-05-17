import { ProductCard, StoreItem } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { prisma } from '@/lib/prisma';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

import { ProductCatalog } from '@/components/ProductCatalog';

export const dynamic = 'force-dynamic';

export default async function ProdutosCatalogPage() {
  // Fetch ALL active products and flatten their batches into StoreItems
  const dbProducts = await prisma.product.findMany({
    where: {
      active: true,
      category: { active: true },
    },
    include: {
      category: true,
      batches: {
        where: { active: true, stock: { gt: 0 } },
        orderBy: { expirationDate: 'asc' },
      }
    },
  });

  // Flatten batches into StoreItems
  const items: StoreItem[] = [];
  dbProducts.forEach(p => {
    p.batches.forEach(b => {
      items.push({
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

  // Sort all items globally by nearest expiration
  items.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full py-10 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/" className="text-zinc-500 hover:text-yellow-400 mb-4 inline-block transition-colors">
            ← Voltar para a Página Inicial
          </Link>
          <h1 className="text-4xl font-black text-white flex items-center gap-3">
            <span className="w-2 h-10 bg-yellow-400 rounded-full"></span>
            Catálogo Completo
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            Explore todos os nossos produtos próximos do vencimento e comece a economizar hoje mesmo.
          </p>
        </div>

        <ProductCatalog items={items} />

      </main>

      <Footer />
    </div>
  );
}
