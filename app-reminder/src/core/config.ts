import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,

  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_KEY!,

  twilioSid: process.env.TWILIO_SID!,
  twilioToken: process.env.TWILIO_AUTH_TOKEN!,
  twilioWhatsapp: process.env.TWILIO_WHATSAPP!,

  apiKey: process.env.API_KEY!,
  jwtSecret: process.env.JWT_SECRET!,
  magicLinkBaseUrl: process.env.MAGIC_LINK_BASE_URL!
};