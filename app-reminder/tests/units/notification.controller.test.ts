import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/services/notification.service", () => ({
  processReminders: jest.fn(),
}));

jest.mock("../../src/core/config", () => ({
  config: {
    apiKey: "123456",
  },
}));

describe("POST /api/process-reminders", () => {
  it("debe retornar 401 si api key es inválida", async () => {
    const response = await request(app)
      .post("/api/process-reminders")
      .set("x-api-key", "incorrecta");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Unauthorized",
    });
  });

  it("debe procesar recordatorios", async () => {
    const response = await request(app)
      .post("/api/process-reminders")
      .set("x-api-key", "123456");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
    });
  });
});