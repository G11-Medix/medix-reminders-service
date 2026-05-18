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

describe("Integración endpoint process-reminders", () => {
  it("debe ejecutar flujo completo del endpoint", async () => {
    const response = await request(app)
      .post("/api/process-reminders")
      .set("x-api-key", "123456");

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });
});