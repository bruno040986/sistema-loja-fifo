const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting migration: copy isFeatured from Product to ProductBatch...");
  
  // Find all products that are featured
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { batches: true }
  });
  
  console.log(`Found ${featuredProducts.length} featured products.`);
  
  // Set all their batches to isFeatured = true
  let totalBatchesUpdated = 0;
  for (const product of featuredProducts) {
    if (product.batches.length > 0) {
      const result = await prisma.productBatch.updateMany({
        where: { productId: product.id },
        data: { isFeatured: true }
      });
      totalBatchesUpdated += result.count;
    }
  }
  
  console.log(`Successfully migrated ${totalBatchesUpdated} batches to isFeatured = true.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
