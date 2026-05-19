CREATE TABLE IF NOT EXISTS "recurso_guardado" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"chat_id" text,
	"message_id" text,
	"contenido" text NOT NULL,
	"materia" text NOT NULL,
	"etiqueta" text,
	"titulo" text,
	"descripcion" text,
	"url" text,
	"creado_en" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "recursos_guardados";--> statement-breakpoint
ALTER TABLE "Chat" ADD COLUMN "materia" varchar(50);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recurso_guardado" ADD CONSTRAINT "recurso_guardado_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
