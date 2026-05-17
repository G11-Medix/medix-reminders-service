import { getTokensByUser } from "../../../src/repositories/device.repository";

const eqMock = jest.fn();

jest.mock("../../../src/db/supabase.client", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: eqMock,
      })),
    })),
  },
}));

describe("getTokensByUser", () => {
  it("debe retornar tokens", async () => {
    eqMock.mockResolvedValue({
      data: [
        { token_dispositivo: "token1" },
        { token_dispositivo: "token2" },
      ],
    });

    const result = await getTokensByUser("1");

    expect(result).toEqual(["token1", "token2"]);
  });
});