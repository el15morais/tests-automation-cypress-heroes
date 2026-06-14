import { defineConfig } from 'cypress';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function createHero() {
  const hero = {
    name: 'Test Hero',
    price: 1,
    saves: 1,
    fans: 1,
    powers: {
      connect: [{ id: 1 }],
    },
  };

  const createdHero = await client.hero.create({ data: hero });

  await client.hero.update({
    where: { id: createdHero.id },
    data: { name: `${createdHero.name} ${createdHero.id}` },
  });

  return client.hero.findUniqueOrThrow({
    where: { id: createdHero.id },
    include: {
      powers: true,
      avatar: { select: { id: true } },
    },
  });
}

async function deleteHero(id) {
  await client.avatarImage.deleteMany({ where: { heroId: id } });
  return client.hero.deleteMany({ where: { id } });
}

export default defineConfig({
  projectId: 'nd8nd1',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        createHero,
        deleteHero,
      });
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
