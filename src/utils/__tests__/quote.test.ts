import { formatDate, generateQuoteId } from "../quote";

describe("Quote Utils", () => {
  describe("generateQuoteId", () => {
    it("should generate unique IDs with correct format", () => {
      const id1 = generateQuoteId();
      const id2 = generateQuoteId();

      expect(id1).toMatch(/^quote-\d+-0\.\d+$/);
      expect(id2).toMatch(/^quote-\d+-0\.\d+$/);
      expect(id1).not.toBe(id2);
    });

    it("should include timestamp in ID", () => {
      const beforeTimestamp = Date.now();
      const id = generateQuoteId();
      const afterTimestamp = Date.now();

      const timestampPart = id.split("-")[1];
      const timestamp = Number.parseInt(timestampPart, 10);

      expect(timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
      expect(timestamp).toBeLessThanOrEqual(afterTimestamp);
    });

    it("should include random component in ID", () => {
      const id = generateQuoteId();
      const parts = id.split("-");

      expect(parts).toHaveLength(3);
      expect(parts[0]).toBe("quote");
      expect(parts[2]).toMatch(/^0\.\d+$/);
    });
  });

  describe("formatDate", () => {
    it("should return formatted date in pt-BR locale", () => {
      const formatted = formatDate();

      expect(formatted).toContain("de");
      expect(formatted).toContain(",");
      expect(formatted.split(" ")).toHaveLength(6);
    });

    it("should include weekday, month, day and year", () => {
      const formatted = formatDate();
      const date = new Date();

      const year = date.getFullYear().toString();
      expect(formatted).toContain(year);
      expect(formatted).toContain("de");
    });

    it("should return consistent format for same date", () => {
      const format1 = formatDate();
      const format2 = formatDate();

      expect(format1).toBe(format2);
    });
  });
});
