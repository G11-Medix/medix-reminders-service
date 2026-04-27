import twilio from "twilio";
import { config } from "../core/config";

export const twilioClient = twilio(
  config.twilioSid,
  config.twilioToken
);