import { getSpecialtyById } from "../../../src/repositories/specialty.repository";

const singleMock = jest.fn();

jest.mock("../../../src/db/supabase.client", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: singleMock,
        })),
      })),
    })),
  },
}));

describe("Specialty Repository", () => {
  it("debe retornar el nombre de la especialidad", async () => {
    singleMock.mockResolvedValue({
      data: { nombre: "Cardiología" },
      error: null,
    });

    const result = await getSpecialtyById(2);

    expect(result).toBe("Cardiología");
  });

  it("debe retornar null si hay error", async () => {
    singleMock.mockResolvedValue({
      data: null,
      error: new Error("DB error"),
    });

    const result = await getSpecialtyById(2);

    expect(result).toBeNull();
  });
});