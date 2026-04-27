import { supabase } from "../db/supabase.client";

export async function getSpecialtyById(id: number) {
  const { data, error } = await supabase
    .from("Especialidad")
    .select("nombre")
    .eq("id_especialidad", id)
    .single();

  if (error) return null;

  return data?.nombre;
}