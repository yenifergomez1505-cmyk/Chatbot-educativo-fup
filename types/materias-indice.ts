export type TemaIndice = {
  titulo: string;
  descripcion: string;
  ejemplo: string;
};

export type MateriaIndice = {
  id: string;
  nombre: string;
  emoji: string;
  temas: TemaIndice[];
};

export const MATERIAS_INDICE: MateriaIndice[] = [
  {
    id: "poo",
    nombre: "Programación Orientada a Objetos",
    emoji: "🧩",
    temas: [
      {
        titulo: "Clases y Objetos",
        descripcion:
          "Definición de clases, atributos, métodos e instanciación de objetos.",
        ejemplo: "class Persona { String nombre; void saludar() { } }",
      },
      {
        titulo: "Herencia",
        descripcion:
          "Crear nuevas clases basadas en clases existentes reutilizando comportamiento.",
        ejemplo: "class Estudiante extends Persona { int codigo; }",
      },
      {
        titulo: "Encapsulamiento",
        descripcion:
          "Ocultar detalles internos de una clase usando modificadores de acceso.",
        ejemplo:
          "private String nombre;\npublic String getNombre() { return nombre; }",
      },
      {
        titulo: "Polimorfismo",
        descripcion:
          "Capacidad de un objeto de tomar múltiples formas según el contexto.",
        ejemplo: "Persona p = new Estudiante();\np.saludar();",
      },
      {
        titulo: "Abstracción",
        descripcion:
          "Representar características esenciales sin incluir detalles de implementación.",
        ejemplo: "abstract class Figura { abstract double area(); }",
      },
      {
        titulo: "Interfaces",
        descripcion:
          "Contrato que define métodos que una clase debe implementar obligatoriamente.",
        ejemplo: "interface Volador { void volar(); }",
      },
    ],
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    emoji: "🌲",
    temas: [
      {
        titulo: "Arreglos",
        descripcion:
          "Colección de elementos del mismo tipo en posiciones de memoria contiguas.",
        ejemplo: "int[] numeros = {1, 2, 3, 4, 5};",
      },
      {
        titulo: "Listas Enlazadas",
        descripcion:
          "Estructura donde cada nodo guarda el dato y un puntero al siguiente nodo.",
        ejemplo: "class Nodo { int dato; Nodo siguiente; }",
      },
      {
        titulo: "Pilas (Stack)",
        descripcion:
          "Estructura LIFO — el último elemento en entrar es el primero en salir.",
        ejemplo: "Stack<Integer> pila = new Stack<>();\npila.push(1);",
      },
      {
        titulo: "Colas (Queue)",
        descripcion:
          "Estructura FIFO — el primer elemento en entrar es el primero en salir.",
        ejemplo: "Queue<Integer> cola = new LinkedList<>();\ncola.add(1);",
      },
      {
        titulo: "Árboles Binarios",
        descripcion:
          "Estructura jerárquica donde cada nodo tiene máximo dos hijos.",
        ejemplo: "class Nodo { int dato; Nodo izq, der; }",
      },
      {
        titulo: "Grafos",
        descripcion:
          "Conjunto de nodos conectados por aristas, dirigido o no dirigido.",
        ejemplo: "Map<Integer, List<Integer>> grafo = new HashMap<>();",
      },
      {
        titulo: "Algoritmos de Ordenamiento",
        descripcion:
          "Bubble Sort, Selection Sort, Merge Sort, Quick Sort y sus complejidades.",
        ejemplo: "Arrays.sort(numeros); // O(n log n)",
      },
    ],
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    emoji: "⚙️",
    temas: [
      {
        titulo: "Ciclos de Vida del Software",
        descripcion:
          "Modelos que describen las fases: cascada, espiral, iterativo.",
        ejemplo:
          "Planificación → Análisis → Diseño → Implementación → Pruebas → Mantenimiento",
      },
      {
        titulo: "Metodologías Ágiles",
        descripcion:
          "Scrum, Kanban, XP — enfoques iterativos e incrementales de desarrollo.",
        ejemplo: "Sprint → Daily Standup → Sprint Review → Retrospectiva",
      },
      {
        titulo: "Requerimientos",
        descripcion:
          "Funcionales (qué hace el sistema) y No funcionales (cómo lo hace).",
        ejemplo: "RF01: El sistema debe permitir el registro de usuarios.",
      },
      {
        titulo: "Diagramas UML",
        descripcion:
          "Casos de uso, clases, secuencia, actividad y componentes del sistema.",
        ejemplo: "Actor → [Caso de Uso] ← Sistema",
      },
      {
        titulo: "Diseño de Software",
        descripcion:
          "Patrones de diseño, arquitectura en capas, MVC y microservicios.",
        ejemplo: "Modelo ↔ Controlador ↔ Vista",
      },
      {
        titulo: "Pruebas de Software",
        descripcion:
          "Unitarias, de integración, de sistema y de aceptación del usuario.",
        ejemplo: "@Test\nvoid testSuma() { assertEquals(4, calc.suma(2, 2)); }",
      },
    ],
  },
];
