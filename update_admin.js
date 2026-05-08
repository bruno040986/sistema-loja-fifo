const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const newEmail = 'admin@armazemfifo.com.br';
  const newPassword = 'fifo@123';
  
  console.log(`Alterando credenciais para: ${newEmail}`);
  
  const hash = await bcrypt.hash(newPassword, 10);
  
  // Remove admins antigos para evitar confusão
  await prisma.user.deleteMany({
    where: { role: 'ADMIN' }
  });
  
  // Cria o novo admin
  const user = await prisma.user.create({
    data: {
      name: 'Admin Armazém Fifo',
      email: newEmail,
      password: hash,
      role: 'ADMIN'
    }
  });
  
  console.log('Credenciais atualizadas com sucesso na Supabase!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
