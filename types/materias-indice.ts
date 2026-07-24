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
