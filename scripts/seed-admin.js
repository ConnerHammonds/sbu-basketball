const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const plain = process.env.ADMIN_PASSWORD || 'password';
  const hash = bcrypt.hashSync(plain, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hash, role: 'admin', name: 'Admin' },
    create: { email, password: hash, role: 'admin', name: 'Admin' }
  });

  console.log(`Admin user ensured: ${email}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
