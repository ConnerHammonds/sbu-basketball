const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in database:', users.length);
  users.forEach(u => {
    console.log(`- ${u.email} (${u.role})`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
