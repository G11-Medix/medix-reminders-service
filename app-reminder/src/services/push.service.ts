import { messaging } from "../integrations/firebase.client";

export async function sendPush(tokens: string[], message: string) {
  for (const token of tokens) {
    try {
      await messaging.send({
        token,
        notification: {
          title: "Recordatorio de cita",
          body: message,
        },
      });
    } catch (err) {
      console.log("Token inválido:", token);
    }
  }
}