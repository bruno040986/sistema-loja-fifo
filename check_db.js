const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({ include: { batches: true } });
  console.log(`Total Products: ${products.length}`);
  products.forEach(p => {
    console.log(`- ${p.name} (Active: ${p.active}), Batches: ${p.batches.length}`);
    p.batches.forEach(b => {
      console.log(`  - Batch: ${b.expirationDate.toISOString()}, Featured: ${b.isFeatured}, Active: ${b.active}, Stock: ${b.stock}`);
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
