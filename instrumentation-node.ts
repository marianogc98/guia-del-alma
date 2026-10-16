/**
 * Aplica las migraciones pendientes de la carpeta drizzle/
 * (generadas con `npm run db:generate`).
 */
import path from "path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { getDb } from "./app/lib/db";

if (process.env.DATABASE_URL) {
  await migrate(getDb(), {
    migrationsFolder: path.join(process.cwd(), "drizzle"),
  });
  console.log("[db] Migraciones aplicadas");
}
