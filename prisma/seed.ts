import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      username: 'Alice',
      password: 'password',
      email: 'alice@prisma.io',
      created_at: new Date(),
      tweets: {
        create: [
          {
            tweet_text: 'Hello World',
            created_at: new Date(),
          },
        ],
      },
    },
  });

  console.log({ alice });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
