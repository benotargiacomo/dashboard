import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/db/client';
import { createRouter } from '@/server/createRouter';

export const workRouter = createRouter()
  .query('getAll', {
    async resolve() {
      const works = await prisma.project.findMany({
        include: {
          tags: {
            select: {
              name: true,
            }
          }
        },
      });

      return works;
    }
  })
  .query('getById', {
    input: z.object({
      id: z.string().cuid({ message: "Invalid ID" })
    }),
    async resolve({ input }) {
      const work = await prisma.project.findUnique({
        where: {
          id: input.id
        },
        include: {
          tags: {
            select: {
              name: true,
            }
          }
        },
      })

      if (!work) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      
      return work;
    }
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      repository: z.string(),
      deploy: z.string(),
      tags: z.array(z.string()),
    }),
    async resolve({ input }) {
      const project = await prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          repository: input.repository,
          deploy: input.deploy,
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

      return project.id;
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid({ message: "Invalid ID" }),
      data: z.object({
        name: z.string(),
        description: z.string(),
        repository: z.string(),
        deploy: z.string(),
        tags: z.array(z.string()),
      })
    }),
    async resolve({ input }) {
      const updated = await prisma.project.update({
        where: {
          id: input.id
        },
        data: {
          name: input.data.name, 
          description: input.data.description,
          repository: input.data.repository,
          deploy: input.data.deploy,
          tags: {
            connectOrCreate: input.data.tags?.map((tag) => {
              return {
                create: { name: tag },
                where: { name: tag }
              }
            })
          }
        }
      })

      return updated;
    }
  })
  .mutation('delete', {
    input: z.object({ id: z.string().cuid({ message: "Invalid ID" })}),
    async resolve({ input }) {
      const work = await prisma.project.delete({
        where: {
          id: input.id
        }
      })

      return work;
    }
  });

