import { Router } from "express";
import { processReminders } from "../services/notification.service";
import { config } from "../core/config";

const router = Router();

router.post("/process-reminders", async (req, res) => {

  if (req.headers["x-api-key"] !== config.apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await processReminders();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error procesando recordatorios" });
  }
});

export default router;