import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

vi.mock("next-auth/jwt", () => ({
  getToken: vi.fn(),
}));

import { getToken } from "next-auth/jwt";

describe("Proxy security", () => {
  it("redirige invitados desde /admin", async () => {
    vi.mocked(getToken).mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/admin");

    const response = await proxy(request);

    expect(response.status).toBe(307);
  });

  it("permite administrador", async () => {
    vi.mocked(getToken).mockResolvedValue({
      role: "administrador",
      email: "admin@test.com",
      name: "Admin",
      id: "1",
    });

    const request = new NextRequest("http://localhost:3000/admin");

    const response = await proxy(request);

    expect(response.status).toBe(200);
  });

  it("bloquea docente en admin", async () => {
    vi.mocked(getToken).mockResolvedValue({
      role: "docente",
      email: "doc@test.com",
      name: "Docente",
      id: "2",
    });

    const request = new NextRequest("http://localhost:3000/admin");

    const response = await proxy(request);

    expect(response.status).toBe(307);
  });

  it("permite docente en /docente", async () => {
    vi.mocked(getToken).mockResolvedValue({
      role: "docente",
      email: "doc@test.com",
      name: "Docente",
      id: "2",
    });

    const request = new NextRequest("http://localhost:3000/docente");

    const response = await proxy(request);

    expect(response.status).toBe(200);
  });
});