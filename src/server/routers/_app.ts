/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter';
import { postRouter } from './post';
import superjson from 'superjson';
import { dogFactsRouter } from './dogFacts';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  /**
   * Merge `postRouter` under `post.`
   */
  .merge('post.', postRouter)
  .merge('dogFacts.', dogFactsRouter);

export type AppRouter = typeof appRouter;
