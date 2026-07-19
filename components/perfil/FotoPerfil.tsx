import { CameraIcon } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";

export function FotoPerfil({
  preview,
  nombre,
  rol,
  fileInputRef,
  onFotoChange,
}: {
  preview: string | null;
  nombre: string;
  rol: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const iniciales = nombre
    ? nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {preview ? (
          <Image
            alt="Foto de perfil"
            className="size-24 rounded-full object-cover border-4 border-primary/20"
            height={96}
            src={preview}
            width={96}
          />
        ) : (
          <div className="size-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold border-4 border-primary/20">
            {iniciales}
          </div>
        )}
        <button
          className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <CameraIcon className="size-4" />
        </button>
      </div>

      <input
        accept="image/*"
        className="hidden"
        onChange={onFotoChange}
        ref={fileInputRef}
        type="file"
      />

      <button
        className="text-xs text-primary hover:underline"
        onClick={() => fileInputRef.current?.click()}
        type="button"
      >
        Cambiar foto de perfil
      </button>

      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize">
        {rol}
      </span>
    </div>
  );
}
