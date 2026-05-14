"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
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

  if (sent) {
    return (
      <>
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-edubot-bg border border-edubot-primary text-xl">
          📧
        </div>
        <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
          Correo enviado
        </h1>
        <p className="mb-5 text-center text-[11px] text-edubot-medium">
          Revisa tu bandeja de entrada y sigue el enlace para restablecer tu
          contraseña.
        </p>
        <Link
          className="block w-full rounded-lg bg-edubot-primary py-2.5 text-center text-[13px] font-medium text-white hover:opacity-90"
          href="/login"
        >
          Volver al inicio de sesión
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
        Recuperar contraseña
      </h1>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu
        contraseña.
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <input
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jperez@fup.edu.co"
            required
            type="email"
            value={email}
          />
        </div>

        {error && (
          <p className="text-center text-[11px] text-red-600">{error}</p>
        )}

        <button
          className="w-full rounded-lg bg-edubot-primary py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>

        <p className="mt-1 text-center text-[11px]">
          <Link
            className="font-medium text-edubot-primary underline-offset-2 hover:underline"
            href="/login"
          >
            Volver al inicio de sesión
          </Link>
        </p>
      </form>
    </>
  );
}
