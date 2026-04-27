import { getPendingNotifications, markAsSent } from "../repositories/notification.repository";
import { getTokensByUser } from "../repositories/device.repository";
import { getRecommendations } from "../repositories/recommendation.repository";
import { getInstitutionById } from "../repositories/institution.repository";
import { getSpecialtyById } from "../repositories/specialty.repository";
import { sendWhatsApp } from "./whatsapp.service";
import { sendPush } from "./push.service";

function hoursDiff(date: Date) {
  const now = new Date();
  return (date.getTime() - now.getTime()) / (1000 * 60 * 60);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long"
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatRemainingTime(date: Date) {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} minuto(s)`;
  if (minutes === 0) return `${hours} hora(s)`;

  return `${hours} hora(s) y ${minutes} minuto(s)`;
}

export async function processReminders() {
  const citas = await getPendingNotifications();

  for (const cita of citas) {
    if (!cita.fecha_cita) continue;

    const fecha = new Date(cita.fecha_cita);
    const diff = hoursDiff(fecha);

    let type: "24h" | "1h" | null = null;

    if (diff <= 24 && diff > 1 && !cita.recordatorio_24h_enviado) {
      type = "24h";
    }

    if (diff <= 1 && diff > 0 && !cita.recordatorio_1h_enviado) {
      type = "1h";
    }

    if (!type) continue;

    // 🔹 traer datos correctamente
    const institucionNombre = await getInstitutionById(cita.id_institucion);
    const especialidadNombre = await getSpecialtyById(cita.id_especialidad);

    const tokens = await getTokensByUser(cita.id_usuario);

    const recs = await getRecommendations(
      cita.id_institucion,
      cita.id_especialidad,
      cita.codigo
    );

    const recomendacionesTexto = recs
      .map(r => `- ${r.recomendaciones}`)
      .join("\n");

    const tiempoRestante = formatRemainingTime(fecha);

    // 🔥 MENSAJE LIMPIO (sin espacios raros)
    const mensaje =
`Medix - Recordatorio de cita

Estimado usuario,

Tiene una cita programada con la siguiente información:

Fecha: ${formatDate(fecha)}
Hora: ${formatTime(fecha)}
Institución: ${institucionNombre || "No registrada"}
Especialidad: ${especialidadNombre || "No registrada"}

Tiempo restante: ${tiempoRestante}

Recomendaciones:
${recomendacionesTexto || "- Sin recomendaciones"}

Por favor, preséntese con anticipación.
Puede gestionar sus citas desde la plataforma Medix.`;

    if (cita.telefono) {
      await sendWhatsApp(cita.telefono, mensaje);
    }

    await sendPush(tokens, mensaje);

    await markAsSent(cita.id, type);

    console.log(`✔ Notificación enviada (${type}) → ${cita.id}`);
  }
}