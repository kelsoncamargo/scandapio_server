import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  const encryptedPassword = await encryptPassword('kernellcontroll');

  await prisma.account.upsert({
    where: { email: 'suporte@kernellcontroll.com.br' },
    update: {},
    create: {
      fullName: 'Kernell Controll',
      phone: '99999999999',
      email: 'suporte@kernellcontroll.com.br',
      password: encryptedPassword,
      role: 'FULL',
    },
  });

  console.log('Create_default_user');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
