CREATE TABLE "orders" (
	"uid" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'ARS' NOT NULL,
	"provider_ref" text,
	"access_code" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone,
	CONSTRAINT "orders_access_code_unique" UNIQUE("access_code")
);
