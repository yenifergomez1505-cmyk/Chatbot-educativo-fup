export interface Usuario {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export interface Estadisticas {
  totalConsultas: number;
  consultasPorMateria: { materia: string; total: number }[];
  consultasSinResponder: number;
  pendientes: {
    id: string;
    pregunta: string;
    materia: string;
    creadoEn: string;
  }[];
}

export interface ConsultaAdmin {
  id: string;
  pregunta: string;
  materia: string;
  respondida: boolean;
  respuestaDocente: string | null;
  creadoEn: string;
}

export interface NuevoUsuario {
  email: string;
  password: string;
  name: string;
  role: string;
}

export type TabAdmin = "usuarios" | "estadisticas" | "consultas" | "materias";

export const MATERIA_LABELS_ADMIN: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

export const TABS_ADMIN = [
  { id: "usuarios", label: "Usuarios" },
  { id: "estadisticas", label: "Estadísticas" },
  { id: "consultas", label: "Conocimiento" },
  { id: "materias", label: "Materias" },
] as const;
