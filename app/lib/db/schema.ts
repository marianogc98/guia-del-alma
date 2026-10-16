import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Órdenes de compra del ebook.
 * `amount` va en centavos y queda congelado al crear la orden.
 * `accessCode` se genera recién cuando el pago queda confirmado.
 */
export const orders = pgTable("orders", {
  uid: text("uid").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  status: text("status", { enum: ["pending", "paid"] })
    .notNull()
    .default("pending"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("ARS"),
  providerRef: text("provider_ref"),
  accessCode: text("access_code").unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export type Order = typeof orders.$inferSelect;
