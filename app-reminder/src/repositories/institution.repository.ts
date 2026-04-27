import { supabase } from "../db/supabase.client";


export async function getInstitutionById(id: number) {
  const { data, error } = await supabase
    .from("Institucion")
    .select("nombre")
    .eq("id_institucion", id)
    .single();

  if (error) return null;

  return data?.nombre;
}