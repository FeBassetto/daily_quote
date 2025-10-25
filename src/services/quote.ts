import type { QuoteResponse } from "@models/quote";
import { api } from "@services/axios";

export const quoteAPI = {
  getDailyQuote: async (token: string): Promise<string> => {
    const response = await api.get<QuoteResponse[]>(
      "/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia",
      {
        headers: {
          token: token,
        },
        timeout: 15000,
      },
    );

    return response.data[0].quoteoftheday;
  },
};
