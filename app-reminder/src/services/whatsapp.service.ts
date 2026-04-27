import { twilioClient } from "../integrations/twilio.client";
import { config } from "../core/config";

export async function sendWhatsApp(phone: string, message: string) {
  await twilioClient.messages.create({
    from: config.twilioWhatsapp,
    to: `whatsapp:${phone}`,
    body: message,
  });
}