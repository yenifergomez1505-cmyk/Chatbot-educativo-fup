"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CameraIcon, ArrowLeftIcon, SaveIcon } from "lucide-react";

export default function PerfilPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [perfil, setPerfil] = useState({
    name: "",
    email: "",
    image: "",
    role: "",
  });

  const [form, setForm] = useState({
    name: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/perfil")
      .then((r) => r.json())
      .then((data) => {
        setPerfil(data);
        setForm((f) => ({ ...f, name: data.name ?? "" }));
        setPreview(data.image ?? null);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error al cargar el perfil");
        setLoading(false);
      });
  }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen no puede superar 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGuardar = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (form.password && !form.currentPassword) {
      toast.error("Debes ingresar tu contraseña actual");
      return;
    }
    setSaving(true);
    try {
      const body: Record<string, string> = { name: form.name };
      if (preview && preview !== perfil.image) {
        body.image = preview;
      }
      if (form.password) {
        body.password = form.password;
        body.currentPassword = form.currentPassword;
      }
      const res = await fetch("/api/auth/perfil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Error al guardar");
        return;
      }
      toast.success("Perfil actualizado correctamente");
      setForm((f) => ({
        ...f,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
      setPerfil((p) => ({ ...p, name: form.name, image: preview ?? p.image }));
    } catch {
      toast.error("Error al guardar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground text-sm">Cargando perfil...</div>
      </div>
    );
  }

  const iniciales = perfil.name
    ? perfil.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-primary-foreground hover:opacity-80 transition-opacity"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <h1 className="text-primary-foreground font-semibold text-lg">
          Mi Perfil
        </h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {preview ? (
              <Image
                src={preview}
                alt="Foto de perfil"
                width={96}
                height={96}
                className="size-24 rounded-full object-cover border-4 border-primary/20"
              />
            ) : (
              <div className="size-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold border-4 border-primary/20">
                {iniciales}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
            >
              <CameraIcon className="size-4" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFotoChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-primary hover:underline"
          >
            Cambiar foto de perfil
          </button>

          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize">
            {perfil.role}
          </span>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="nombre"
              className="text-sm font-medium text-foreground"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="correo"
              className="text-sm font-medium text-foreground"
            >
              Correo institucional
            </label>
            <input
              id="correo"
              type="email"
              value={perfil.email}
              disabled
              className="w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              El correo no se puede cambiar.
            </p>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Cambiar contraseña
            </p>

            <div className="space-y-1.5">
              <label
                htmlFor="currentPassword"
                className="text-sm text-muted-foreground"
              >
                Contraseña actual
              </label>
              <input
                id="currentPassword"
                type="password"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, currentPassword: e.target.value }))
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm text-muted-foreground"
              >
                Nueva contraseña
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-muted-foreground"
              >
                Confirmar nueva contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGuardar}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <SaveIcon className="size-4" />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}