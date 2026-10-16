import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

/** Conexión perezosa: no se abre en build ni si falta DATABASE_URL hasta que se usa. */
const globalForDb = globalThis as unknown as { db?: DB };

export function getDb(): DB {
  if (globalForDb.db) return globalForDb.db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no configurada");
  const db = drizzle(postgres(url, { max: 5 }), { schema });
  globalForDb.db = db;
  return db;
}
