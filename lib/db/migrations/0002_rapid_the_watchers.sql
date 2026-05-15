CREATE TABLE IF NOT EXISTS "calificaciones_respuesta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"message_id" text NOT NULL,
	"util" boolean NOT NULL,
	"materia" text NOT NULL,
	"creado_en" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultas_sin_respuesta" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"pregunta" text NOT NULL,
	"materia" text NOT NULL,
	"respondida" boolean DEFAULT false NOT NULL,
	"respuesta_docente" text,
	"respondido_en" timestamp,
	"creado_en" timestamp DEFAULT now() NOT NULL
);
