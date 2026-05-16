"use client";

import { motion } from "framer-motion";
import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MATERIAS = [
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
] as const;

type MateriaId = (typeof MATERIAS)[number]["id"];

export default function MateriasPage() {
  const router = useRouter();
  const [materiaActiva, setMateriaActiva] = useState<MateriaId>(MATERIAS[0].id);

  const materia = MATERIAS.find((m) => m.id === materiaActiva)!;

  const handlePreguntarTema = (titulo: string) => {
    const pregunta = `Explícame el tema "${titulo}" con ejemplos en código Java`;
    router.push(
      `/?query=${encodeURIComponent(pregunta)}&materia=${materiaActiva}`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header — igual al de recursos */}
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <button
          className="text-primary-foreground hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")}
          type="button"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <BookOpenIcon className="size-5 text-primary-foreground" />
        <h1 className="text-primary-foreground font-semibold text-lg">
          Índice Temático
        </h1>
        <span className="ml-auto text-primary-foreground/70 text-sm">
          {materia.temas.length} temas
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Tabs de materias */}
        <div className="flex items-center gap-2 flex-wrap">
          {MATERIAS.map((m) => (
            <button
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                materiaActiva === m.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              }`}
              key={m.id}
              onClick={() => setMateriaActiva(m.id)}
              type="button"
            >
              {m.emoji} {m.nombre}
            </button>
          ))}
        </div>

        {/* Grid de temas */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          initial={{ opacity: 0, y: 8 }}
          key={materiaActiva}
          transition={{ duration: 0.25 }}
        >
          {materia.temas.map((tema, i) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-4 space-y-2 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 8 }}
              key={tema.titulo}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              {/* Badge número */}
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                Tema {i + 1}
              </span>

              {/* Título */}
              <h3 className="font-semibold text-foreground text-sm">
                {tema.titulo}
              </h3>

              {/* Descripción */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tema.descripcion}
              </p>

              {/* Ejemplo de código */}
              <code className="block rounded-lg bg-input border border-border text-primary font-mono text-[11px] px-3 py-2 whitespace-pre-wrap break-words">
                {tema.ejemplo}
              </code>

              {/* Botón */}
              <button
                className="w-full rounded-lg bg-primary text-primary-foreground text-xs font-medium py-1.5 hover:opacity-90 active:scale-95 transition-all"
                onClick={() => handlePreguntarTema(tema.titulo)}
                type="button"
              >
                Preguntar al asistente →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
