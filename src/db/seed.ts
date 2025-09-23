import "dotenv/config";
import { seed } from "drizzle-seed";
import { db } from ".";
import { users } from "./schemas/auth";

async function main() {
  await seed(db, { users }, { count: 10 });
  console.log("Seed completed");
  process.exit(0);
}
main();
