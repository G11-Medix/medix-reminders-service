import { processReminders } from "../../src/services/notification.service";

jest.mock("../../src/db/supabase.client", () => ({
  supabase: {
    rpc: jest.fn(),
  },
}));

jest.mock("../../src/repositories/institution.repository", () => ({
  getInstitutionById: jest.fn().mockResolvedValue("Hospital"),
}));

jest.mock("../../src/repositories/specialty.repository", () => ({
  getSpecialtyById: jest.fn().mockResolvedValue("Cardiología"),
}));

jest.mock("../../src/repositories/device.repository", () => ({
  getTokensByUser: jest.fn().mockResolvedValue(["token1"]),
}));

jest.mock("../../src/repositories/recommendation.repository", () => ({
  getRecommendations: jest.fn().mockResolvedValue([
    { recomendaciones: "Llegar temprano" },
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

describe("processReminders", () => {
  it("debe procesar recordatorios pendientes", async () => {
    const { supabase } = require("../../src/db/supabase.client");

    supabase.rpc.mockResolvedValue({
      data: [
        {
          id: 1,
          id_cita: 100,
          id_institucion: 1,
          id_especialidad: 2,
          id_usuario: "10",
          telefono: "+573001112233",
          fecha_cita: new Date().toISOString(),
          numero_documento: "123",
          tipo_documento: "CC",
          type: "24h",
        },
      ],
      error: null,
    });

    await processReminders();

    const {
      sendWhatsApp,
    } = require("../../src/services/whatsapp.service");

    expect(sendWhatsApp).toHaveBeenCalled();
  });

  it("no debe fallar si no hay citas", async () => {
    const { supabase } = require("../../src/db/supabase.client");

    supabase.rpc.mockResolvedValue({
      data: [],
      error: null,
    });

    await expect(processReminders()).resolves.not.toThrow();
  });
});