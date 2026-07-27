export type Consulta = {
  id: string;
  pregunta: string;
  materia: string;
  respondida: boolean;
  respuestaDocente: string | null;
  creadoEn: string;
};

export type Tema = {
  id: string;
  materia: string;
  nombre: string;
  contenido: string;
  activo: boolean;
  creadoEn: string;
};

export type TemaFormValues = {
  materia: string;
  nombre: string;
  contenido: string;
  activo: boolean;
};

export type FiltroEstadoConsulta = "pendientes" | "respondidas" | "todas";

export const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
  "sin-materia": "Sin materia",
};

export const MATERIAS_CONOCIMIENTO = [
  "poo",
  "estructura-de-datos",
  "ingenieria-de-software",
] as const;
