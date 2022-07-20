import * as trpc from '@trpc/server';
import { Context } from '@/server/createContext';

import { workRouter } from './works';

export const appRouter = trpc
  .router<Context>()
  .merge("work.", workRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
