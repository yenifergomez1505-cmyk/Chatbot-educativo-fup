/// <reference types="vitest/globals" />
import {
  generateUUID,
  sanitizeText,
  getDocumentTimestampByIndex,
  cn,
} from "@/lib/utils";

test("generateUUID genera un ID con formato correcto", () => {
  const uuid = generateUUID();
  const formatoUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  expect(uuid).toMatch(formatoUUID);
});

test("generateUUID genera IDs únicos cada vez", () => {
  const uuid1 = generateUUID();
  const uuid2 = generateUUID();
  expect(uuid1).not.toBe(uuid2);
});

test("sanitizeText elimina la etiqueta has_function_call", () => {
  const texto = "Hola <has_function_call> mundo";
  const resultado = sanitizeText(texto);
  expect(resultado).toBe("Hola  mundo");
});

test("sanitizeText no modifica texto normal", () => {
  const texto = "Hola mundo sin etiquetas";
  const resultado = sanitizeText(texto);
  expect(resultado).toBe("Hola mundo sin etiquetas");
});

test("getDocumentTimestampByIndex retorna fecha actual si no hay documentos", () => {
  const antes = new Date();
  const resultado = getDocumentTimestampByIndex([], 0);
  const despues = new Date();

  expect(resultado.getTime()).toBeGreaterThanOrEqual(antes.getTime());
  expect(resultado.getTime()).toBeLessThanOrEqual(despues.getTime());
});
test("getDocumentTimestampByIndex retorna la fecha del documento correcto", () => {
  const fecha = new Date("2024-01-15");
  const documentos = [
    {
      id: "1",
      createdAt: fecha,
      title: "Doc 1",
      kind: "text",
      content: "",
      userId: "u1",
    },
    {
      id: "2",
      createdAt: new Date("2024-02-20"),
      title: "Doc 2",
      kind: "text",
      content: "",
      userId: "u1",
    },
  ] as any;

  const resultado = getDocumentTimestampByIndex(documentos, 0);
  expect(resultado).toBe(fecha);
});

test("cn combina clases CSS correctamente", () => {
  const resultado = cn("clase1", "clase2");
  expect(resultado).toBe("clase1 clase2");
});

test("cn elimina clases duplicadas de Tailwind", () => {
  const resultado = cn("p-4", "p-8");
  expect(resultado).toBe("p-8");
});