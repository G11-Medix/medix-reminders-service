import { getInstitutionById } from "../../../src/repositories/institution.repository";

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

describe("Institution Repository", () => {
  it("debe retornar el nombre de la institución", async () => {
    singleMock.mockResolvedValue({
      data: { nombre: "Hospital San Jorge" },
      error: null,
    });

    const result = await getInstitutionById(1);

    expect(result).toBe("Hospital San Jorge");
  });

  it("debe retornar null si hay error", async () => {
    singleMock.mockResolvedValue({
      data: null,
      error: new Error("DB error"),
    });

    const result = await getInstitutionById(1);

    expect(result).toBeNull();
  });
});