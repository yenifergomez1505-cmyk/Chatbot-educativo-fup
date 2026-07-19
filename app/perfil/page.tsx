"use client";

import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DatosBasicos } from "@/components/perfil/DatosBasicos";
import { FormularioContrasena } from "@/components/perfil/FormularioContrasena";
import { FotoPerfil } from "@/components/perfil/FotoPerfil";
import { usePerfil } from "@/hooks/usePerfil";

export default function PerfilPage() {
  const router = useRouter();
  const {
    perfil,
    form,
    preview,
    loading,
    saving,
    fileInputRef,
    actualizarCampo,
    handleFotoChange,
    handleGuardar,
  } = usePerfil();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground text-sm">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <button
          className="text-primary-foreground hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")}
          type="button"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <h1 className="text-primary-foreground font-semibold text-lg">
          Mi Perfil
        </h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6 overflow-y-auto flex-1">
        <FotoPerfil
          fileInputRef={fileInputRef}
          nombre={perfil.name}
          onFotoChange={handleFotoChange}
          preview={preview}
          rol={perfil.role}
        />

        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <DatosBasicos
            correo={perfil.email}
            nombre={form.name}
            onNombreChange={(v) => actualizarCampo("name", v)}
          />

          <FormularioContrasena
            confirmPassword={form.confirmPassword}
            currentPassword={form.currentPassword}
            onConfirmPasswordChange={(v) =>
              actualizarCampo("confirmPassword", v)
            }
            onCurrentPasswordChange={(v) =>
              actualizarCampo("currentPassword", v)
            }
            onPasswordChange={(v) => actualizarCampo("password", v)}
            password={form.password}
          />
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={saving}
          onClick={handleGuardar}
          type="button"
        >
          <SaveIcon className="size-4" />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
