const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('senha_provisoria_123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@armazemfifo.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@armazemfifo.com', password: hash, role: 'ADMIN' }
  });
  console.log('Admin criado com sucesso:', user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
