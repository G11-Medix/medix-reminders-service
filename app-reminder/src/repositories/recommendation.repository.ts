import { supabase } from "../db/supabase.client";

export async function getRecommendations(
  institucion_id: number,
  especialidad_id: number,
  codigo?: string
) {
  let query = supabase
    .from("recomendaciones_institucion")
    .select("*")
    .eq("institucion_id", institucion_id)
    .eq("especialidad_id", especialidad_id)
    .eq("activa", true);

  if (codigo) {
    query = query.eq("codigo", codigo);
  }

  const { data } = await query;

  return data || [];
}