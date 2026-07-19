import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { actualizarPerfil, fetchPerfil } from "@/lib/api/perfil";
import type { FormPerfil, Perfil } from "@/types/perfil";
import { FORM_PERFIL_VACIO } from "@/types/perfil";

const PERFIL_VACIO: Perfil = { name: "", email: "", image: "", role: "" };

export function usePerfil() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VACIO);
  const [form, setForm] = useState<FormPerfil>(FORM_PERFIL_VACIO);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPerfil()
      .then((data) => {
        setPerfil(data);
        setForm((f) => ({ ...f, name: data.name ?? "" }));
        setPreview(data.image ?? null);
      })
      .catch(() => toast.error("Error al cargar el perfil"))
      .finally(() => setLoading(false));
  }, []);

  const actualizarCampo = <K extends keyof FormPerfil>(
    campo: K,
    valor: FormPerfil[K]
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
  };

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
      const datos: {
        name: string;
        image?: string;
        password?: string;
        currentPassword?: string;
      } = { name: form.name };

      if (preview && preview !== perfil.image) {
        datos.image = preview;
      }
      if (form.password) {
        datos.password = form.password;
        datos.currentPassword = form.currentPassword;
      }

      const resultado = await actualizarPerfil(datos);
      if (!resultado.ok) {
        toast.error(resultado.error ?? "Error al guardar");
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

  return {
    perfil,
    form,
    preview,
    loading,
    saving,
    fileInputRef,
    actualizarCampo,
    handleFotoChange,
    handleGuardar,
  };
}
