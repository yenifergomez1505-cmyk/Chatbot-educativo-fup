import { useCallback, useState } from "react";
import { toast } from "sonner";
import { fetchEstadisticas } from "@/lib/api/admin";
import type { Estadisticas } from "@/types/admin";

export function useAdminEstadisticas() {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEstadisticas();
      setEstadisticas(data);
    } catch {
      toast.error("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  }, []);

  return { estadisticas, loading, cargar };
}
