export type Recurso = {
  id: string;
  contenido: string;
  materia: string;
  etiqueta: string | null;
  creadoEn: string;
  chatId: string;
};

export const MATERIA_LABELS_RECURSOS: Record<string, string> = {
  poo: "Programación Orientada a Objetos",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

export const MATERIA_COLORS_RECURSOS: Record<string, string> = {
  poo: "bg-blue-100 text-blue-700 border-blue-200",
  "estructura-de-datos": "bg-green-100 text-green-700 border-green-200",
  "ingenieria-de-software": "bg-purple-100 text-purple-700 border-purple-200",
};

export const FILTROS_MATERIA_RECURSOS = [
  "todas",
  "poo",
  "estructura-de-datos",
  "ingenieria-de-software",
] as const;
