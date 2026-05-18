jest.mock("../../src/db/supabase.client", () => ({
  supabase: {
    rpc: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          id_cita: 10,
          id_institucion: 1,
          id_especialidad: 1,
          id_usuario: "5",
          telefono: "+573001112233",
          fecha_cita: new Date().toISOString(),
          numero_documento: "123",
          tipo_documento: "CC",
          type: "24h",
        },
      ],
      error: null,
    }),
  },
}));

jest.mock("../../src/repositories/institution.repository", () => ({
  getInstitutionById: jest.fn().mockResolvedValue("Hospital"),
}));

jest.mock("../../src/repositories/specialty.repository", () => ({
  getSpecialtyById: jest.fn().mockResolvedValue("Odontología"),
}));

jest.mock("../../src/repositories/device.repository", () => ({
  getTokensByUser: jest.fn().mockResolvedValue(["token1"]),
}));

jest.mock("../../src/repositories/recommendation.repository", () => ({
  getRecommendations: jest.fn().mockResolvedValue([
    { recomendaciones: "No comer antes de la cita" },
  ]),
}));

jest.mock("../../src/services/whatsapp.service", () => ({
  sendWhatsApp: jest.fn(),
}));

jest.mock("../../src/services/push.service", () => ({
  sendPush: jest.fn(),
}));

jest.mock("../../src/repositories/notification.repository", () => ({
  markAsSent: jest.fn(),
}));


describe("Integración completa notification.service", () => {
  it("debe ejecutar todo el flujo", async () => {


    const { processReminders } = require("../../src/services/notification.service");

    const { sendWhatsApp } = require("../../src/services/whatsapp.service");
    const { sendPush } = require("../../src/services/push.service");
    const { markAsSent } = require("../../src/repositories/notification.repository");

    await processReminders();

    expect(sendWhatsApp).toHaveBeenCalled();
    expect(sendPush).toHaveBeenCalled();
    expect(markAsSent).toHaveBeenCalled();
  });
});