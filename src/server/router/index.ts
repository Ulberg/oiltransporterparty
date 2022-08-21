// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { smsRouter } from "./sms";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("sms.", smsRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
