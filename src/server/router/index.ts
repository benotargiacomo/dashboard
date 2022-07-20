import * as trpc from '@trpc/server';

import { workRouter } from './works';

export const appRouter = trpc
  .router()
  .merge("work.", workRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
