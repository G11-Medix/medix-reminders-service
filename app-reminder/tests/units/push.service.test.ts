import { sendPush } from "../../src/services/push.service";

jest.mock("../../src/integrations/firebase.client", () => ({
  messaging: {
    send: jest.fn(),
  },
}));

describe("sendPush", () => {
  it("debe enviar push notifications", async () => {
    const { messaging } = require("../../src/integrations/firebase.client");

    await sendPush(["token1", "token2"], "mensaje");

    expect(messaging.send).toHaveBeenCalledTimes(2);
  });
});