export type EjemploMateria = {
  etiqueta: string;
  codigo: string;
};

export type Materia = {
  id: string;
  nombre: string;
  subtitulo: string;
  ejemplos: EjemploMateria[];
};

export const TODAS_MATERIAS: Materia[] = [
  {
    id: "poo",
    nombre: "POO",
    subtitulo: "Clases · Herencia · Polimorfismo",
    ejemplos: [
      {
        etiqueta: "Herencia",
        codigo: "class Estudiante extends Persona {\n  int codigo;\n}",
      },
      {
        etiqueta: "Encapsulamiento",
        codigo:
          "private String nombre;\npublic String getNombre() {\n  return nombre;\n}",
      },
      {
        etiqueta: "Polimorfismo",
        codigo: "Persona p = new Estudiante();\np.saludar();",
      },
    ],
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    subtitulo: "Listas · Árboles · Grafos · Sorting",
    ejemplos: [
      {
        etiqueta: "Lista enlazada",
        codigo: "class Nodo {\n  int dato;\n  Nodo siguiente;\n}",
      },
      {
        etiqueta: "Pila (Stack)",
        codigo:
          "Stack<Integer> pila = new Stack<>();\npila.push(1);\npila.pop();",
      },
      {
        etiqueta: "Árbol binario",
        codigo: "class Nodo {\n  int dato;\n  Nodo izq, der;\n}",
      },
    ],
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    subtitulo: "Ciclos de vida · Requerimientos · Diseño",
    ejemplos: [
      {
        etiqueta: "Requerimiento funcional",
        codigo: "RF01: El sistema debe permitir\nel registro de usuarios.",
      },
      {
        etiqueta: "Ciclo de vida",
        codigo: "Análisis → Diseño →\nImplementación → Pruebas",
      },
      {
        etiqueta: "Caso de uso",
        codigo: "Actor → [Registrarse]\nActor → [Iniciar sesión]",
      },
    ],
  },
];

export const PREGUNTA_INICIAL: Record<string, string> = {
  poo: "Explícame qué es la programación orientada a objetos",
  "estructura-de-datos": "Explícame qué es una lista enlazada",
  "ingenieria-de-software": "¿Qué es la ingeniería de software?",
};
