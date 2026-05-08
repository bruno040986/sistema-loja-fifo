const { PrismaClient } = require('@prisma/client');
const sqlite = require('better-sqlite3');
const path = require('path');

const prisma = new PrismaClient();
const db = sqlite(path.join(__dirname, 'prisma/dev.db'));

async function main() {
  console.log('Iniciando migração de dados...');

  // 1. Migrar Categorias
  const categories = db.prepare('SELECT * FROM Category').all();
  console.log(`Encontradas ${categories.length} categorias.`);
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        active: cat.active === 1,
        createdAt: new Date(cat.createdAt),
        updatedAt: new Date(cat.updatedAt),
      },
    });
  }

  // 2. Migrar Produtos
  const products = db.prepare('SELECT * FROM Product').all();
  console.log(`Encontrados ${products.length} produtos.`);
  for (const prod of products) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: {},
      create: {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        imageUrl: prod.imageUrl,
        active: prod.active === 1,
        categoryId: prod.categoryId,
        createdAt: new Date(prod.createdAt),
        updatedAt: new Date(prod.updatedAt),
      },
    });
  }

  // 3. Migrar Lotes (ProductBatch)
  const batches = db.prepare('SELECT * FROM ProductBatch').all();
  console.log(`Encontrados ${batches.length} lotes.`);
  for (const batch of batches) {
    await prisma.productBatch.upsert({
      where: { id: batch.id },
      update: {},
      create: {
        id: batch.id,
        productId: batch.productId,
        expirationDate: new Date(batch.expirationDate),
        price: batch.price,
        bulkPrice: batch.bulkPrice,
        bulkQuantity: batch.bulkQuantity,
        stock: batch.stock,
        active: batch.active === 1,
        isFeatured: batch.isFeatured === 1,
        createdAt: new Date(batch.createdAt),
        updatedAt: new Date(batch.updatedAt),
      },
    });
  }

  console.log('Migração concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante a migração:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    db.close();
  });
