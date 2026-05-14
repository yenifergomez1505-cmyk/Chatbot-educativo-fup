"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Ocurrió un error. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <>
        <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
          Enlace inválido
        </h1>
        <p className="mb-5 text-center text-[11px] text-edubot-medium">
          Este enlace no es válido o ya expiró.
        </p>
        <Link
          href="/forgot-password"
          className="block w-full rounded-lg bg-edubot-primary py-2.5 text-center text-[13px] font-medium text-white hover:opacity-90"
        >
          Solicitar nuevo enlace
        </Link>
      </>
    );
  }

  if (success) {
    return (
      <>
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-edubot-primary bg-edubot-bg text-xl">
          ✅
        </div>
        <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
          ¡Contraseña actualizada!
        </h1>
        <p className="mb-5 text-center text-[11px] text-edubot-medium">
          Tu contraseña fue restablecida. Serás redirigido al inicio de sesión en 3 segundos.
        </p>
        <Link
          href="/login"
          className="block w-full rounded-lg bg-edubot-primary py-2.5 text-center text-[13px] font-medium text-white hover:opacity-90"
        >
          Ir al inicio de sesión
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
        Nueva contraseña
      </h1>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Ingresa tu nueva contraseña para restablecer el acceso.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="password" className="mb-1 block text-[11px] font-medium text-edubot-primary">
            Nueva contraseña
          </label>
          <input
            id="password" type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1 block text-[11px] font-medium text-edubot-primary">
            Confirmar contraseña
          </label>
          <input
            id="confirm" type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
          />
        </div>

        {error && (
          <p className="text-center text-[11px] text-red-600">{error}</p>
        )}

        <button
          type="submit" disabled={loading}
          className="w-full rounded-lg bg-edubot-primary py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar nueva contraseña"}
        </button>

        <p className="mt-1 text-center text-[11px]">
          <Link href="/login" className="font-medium text-edubot-primary underline-offset-2 hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </form>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}