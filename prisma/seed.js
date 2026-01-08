const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Starting seed script ===');
  
  // Create admin user
  console.log('Creating admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = 'admin123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { 
      role: 'admin',\n      name: 'Admin',
      password: adminPasswordHash,
    },
    create: {
      email: adminEmail,
      name: 'Admin',
      password: adminPasswordHash,
      role: 'admin',
    },
  });
  
  // Create or update Account record with password
  await prisma.account.upsert({
    where: {
      providerId_accountId: {
        providerId: 'credential',
        accountId: adminEmail,
      },
    },
    update: {
      password: adminPasswordHash,
    },
    create: {
      userId: user.id,
      accountId: adminEmail,
      providerId: 'credential',
      password: adminPasswordHash,
    },
  });
  
  console.log('✓ Admin user created!');
  
  // Create sections
  const sections = [
    { id: 'A1', name: 'Section A1', totalSeats: 128, priceTier: 'premium' },
    { id: 'A2', name: 'Section A2', totalSeats: 128, priceTier: 'premium' },
    { id: 'A3', name: 'Section A3', totalSeats: 128, priceTier: 'premium' },
    { id: 'B1', name: 'Section B1', totalSeats: 128, priceTier: 'standard' },
    { id: 'B2', name: 'Section B2', totalSeats: 128, priceTier: 'standard' },
    { id: 'C1', name: 'Section C1', totalSeats: 128, priceTier: 'standard' },
    { id: 'C2', name: 'Section C2', totalSeats: 128, priceTier: 'standard' },
    { id: 'D1', name: 'Section D1', totalSeats: 128, priceTier: 'standard' },
    { id: 'D2', name: 'Section D2', totalSeats: 128, priceTier: 'standard' },
    { id: 'D3', name: 'Section D3', totalSeats: 128, priceTier: 'standard' },
  ];

  console.log('Creating sections...');
  for (const section of sections) {
    await prisma.section.upsert({
      where: { id: section.id },
      update: section,
      create: section,
    });
  }

  // Create seats for each section
  console.log('Creating seats...');
  for (const section of sections) {
    const isVertical = ['B1', 'B2', 'C1', 'C2'].includes(section.id);
    const rows = isVertical ? 16 : 8;
    const seatsPerRow = isVertical ? 8 : 16;

    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        await prisma.seat.upsert({
          where: {
            sectionId_rowNumber_seatNumber: {
              sectionId: section.id,
              rowNumber: row,
              seatNumber: seat,
            }
          },
          update: {},
          create: {
            sectionId: section.id,
            rowNumber: row,
            seatNumber: seat,
            status: 'available',
          },
        });
      }
    }
    console.log(`✓ Created seats for ${section.id}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
