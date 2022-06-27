import * as trpc from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/db/client';

// ROTAS PARA CRIAR
// - um find que inclua as letras do nome - Search Bar
// - um update
export const workRouter = trpc.router()
  .query('getAll', {
    async resolve() {
      const works = await prisma.project.findMany();

      return works;
    }
  })
  .query("getById", {
    input: z.object({ id: z.string().cuid({ message: "Invalid ID" })}),
    async resolve({ input }) {
      const work = await prisma.project.findUnique({
        where: {
          id: input.id
        }
      })
    }
  })
  .mutation('create', {
    input: z.object({
      name: z.string().min(5, { message: "Must be 5 or more characters long" }),
      description: z.string().min(5, { message: "Must be 5 or more characters long" }),
      repository: z.string().url({ message: "Invalid url" }),
      deploy: z.string().url({ message: "Invalid url" }),
      thumbnail: z.string().url({ message: "Invalid url" }).optional(),
      tags: z.array(z.string()),
    }),
    async resolve({ input }) {
      const project = await prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          repository: input.repository,
          deploy: input.deploy,
          thumbnail: input.thumbnail,
          tags: {
            connectOrCreate: input.tags.map((tag) => {
              return {
                create: { name: tag },
                where: { name: tag }
              }
            })
          }
        }
      })
    }
  })
  .mutation("delete", {
    input: z.object({ id: z.string().cuid({ message: "Invalid ID" })}),
    async resolve({ input }) {
      const work = await prisma.project.delete({
        where: {
          id: input.id
        }
      })
    }
  });

