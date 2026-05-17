import { sendWhatsApp } from "../../src/services/whatsapp.service";

jest.mock("../../src/integrations/twilio.client", () => ({
  twilioClient: {
    messages: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../../src/core/config", () => ({
  config: {
    twilioWhatsapp: "whatsapp:+14155238886",
  },
}));

describe("sendWhatsApp", () => {
  it("debe enviar mensaje whatsapp", async () => {
    const { twilioClient } = require("../../src/integrations/twilio.client");

    await sendWhatsApp("+573001112233", "hola");

    expect(twilioClient.messages.create).toHaveBeenCalledWith({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+573001112233",
      body: "hola",
    });
  });
});