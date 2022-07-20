import { createRouter } from '@/server/createRouter';

import { workRouter } from './works';

export const appRouter = createRouter()
  .merge("work.", workRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
