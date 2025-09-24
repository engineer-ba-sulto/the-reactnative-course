import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  // baseURL is optional when client shares the same origin as API
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});
