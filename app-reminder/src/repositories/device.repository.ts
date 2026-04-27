import { supabase } from "../db/supabase.client";

export async function getTokensByUser(id_usuario: string) {
  const { data } = await supabase
    .from("dispositivos_usuario")
    .select("token_dispositivo")
    .eq("id_usuario", id_usuario);

  return data?.map(d => d.token_dispositivo) || [];
}