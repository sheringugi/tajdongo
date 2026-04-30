import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4002/graphql', token: 'f2c2dcb9567367f62d6471f8405dc6a635b1bb27', queries,  });
export default client;
  