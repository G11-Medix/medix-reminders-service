import { supabase } from "../db/supabase.client";

export async function getPendingNotifications() {
  const now = new Date();

  const { data, error } = await supabase
    .from("notificaciones_citas")
    .select("*")
    .or(
      `recordatorio_24h_enviado.eq.false,recordatorio_1h_enviado.eq.false`
    );

  if (error) throw error;

  return data;
}

export async function markAsSent(id: number, type: "24h" | "1h") {
  const field =
    type === "24h"
      ? { recordatorio_24h_enviado: true }
      : { recordatorio_1h_enviado: true };

  await supabase
    .from("notificaciones_citas")
    .update(field)
    .eq("id", id);
}