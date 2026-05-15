import crypto from "crypto";
import jwt from "jsonwebtoken";

import { supabase } from "../db/supabase.client";

import { getInstitutionById } from "../repositories/institution.repository";
import { getSpecialtyById } from "../repositories/specialty.repository";
import { getRecommendations } from "../repositories/recommendation.repository";
import { getTokensByUser } from "../repositories/device.repository";

import { sendWhatsApp } from "./whatsapp.service";
import { sendPush } from "./push.service";

import { markAsSent } from "../repositories/notification.repository";
import { config } from "../core/config";

export async function processReminders() {
  const { data: citas, error } =
    await supabase.rpc("get_due_notifications");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  if (!citas?.length) {
    console.log("No hay recordatorios");
    return;
  }

  for (const cita of citas) {
    try {
      const fecha = new Date(cita.fecha_cita);

      const token = jwt.sign(
        {
        jti: crypto.randomUUID(),
        action: "cancel_cita",
        citaId: cita.id_cita,
        institutionId: cita.id_institucion,
        numeroDocumento: cita.numero_documento,
        tipoDocumento: cita.tipo_documento
        },
        config.jwtSecret,
        { expiresIn: "5m", issuer: "medix" }
      );

      const cancelLink =
        `${config.magicLinkBaseUrl}/magic/cancel-cita?token=${token}`;

      const [institucionNombre, especialidadNombre, tokens, recs] =
        await Promise.all([
          getInstitutionById(cita.id_institucion),
          getSpecialtyById(cita.id_especialidad),
          getTokensByUser(cita.id_usuario),
          getRecommendations(
            cita.id_institucion,
            cita.id_especialidad,
            cita.codigo
          )
        ]);

      const recomendacionesTexto =
        recs?.map(r => `- ${r.recomendaciones}`).join("\n") ||
        "- Sin recomendaciones";

      const mensaje =
`Medix - Recordatorio de cita

Fecha: ${fecha.toLocaleDateString("es-CO", { day: "numeric", month: "long" })}
Hora: ${fecha.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}

Institución: ${institucionNombre || "No registrada"}
Especialidad: ${especialidadNombre || "No registrada"}

Recomendaciones:
${recomendacionesTexto}

Cancelar cita:
${cancelLink}

Este enlace expira en 5 minutos.`;

      if (cita.telefono) {
        await sendWhatsApp(cita.telefono, mensaje);
      }
      /*
      if (tokens?.length) {
        await sendPush(tokens, mensaje);
      }
      */
      await markAsSent(cita.id, cita.type);

      console.log(`✔ Enviado ${cita.type} → cita ${cita.id}`);
    } catch (err) {
      console.error(`Error en cita ${cita.id}`, err);
    }
  }
}