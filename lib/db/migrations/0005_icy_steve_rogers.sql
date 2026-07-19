CREATE TABLE IF NOT EXISTS "tema_conocimiento" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"materia" text NOT NULL,
	"nombre" text NOT NULL,
	"contenido" text NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"creado_por" uuid NOT NULL,
	"creado_en" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tema_conocimiento" ADD CONSTRAINT "tema_conocimiento_creado_por_User_id_fk" FOREIGN KEY ("creado_por") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
