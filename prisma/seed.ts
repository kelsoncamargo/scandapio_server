import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.companyLicense.createMany({
    data: [
      {
        name: 'BASIC',
        description: 'Para pequenos negócios que estão começando.',
        maxUsers: 1,
        maxMenus: 1,
        maxItems: 20,
        priceMonthly: 0,
        canAccessOrders: false,
      },
      {
        name: 'PROFESSIONAL',
        description: 'Para negócios em crescimento com mais necessidades.',
        maxUsers: 5,
        maxMenus: 5,
        maxItems: 200,
        priceMonthly: 99.90,
        canAccessOrders: true,
      },
      {
        name: 'BUSINESS',
        description: 'Para grandes empresas com necessidades avançadas.',
        maxUsers: 15,
        maxMenus: 15,
        maxItems: 400,
        priceMonthly: 199.90,
        canAccessOrders: true,
      }
    ],
    skipDuplicates: true
  });
  console.log('✅ Seed concluído: licenças criadas com sucesso.');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
