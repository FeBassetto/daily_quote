import axios from "axios";

const QUOTE_API_URL =
  "https://n8n.jrmendonca.com.br/webhook/18a8a172-0c9e-4dc3-9cf0-fe2c389e27eb/frasedodia";

interface QuoteResponse {
  quoteoftheday: string;
}

export const quoteAPI = {
  getDailyQuote: async (token: string): Promise<string> => {
    const response = await axios.get<QuoteResponse[]>(QUOTE_API_URL, {
      headers: {
        token: token,
      },
    });
    return response.data[0].quoteoftheday;
  },
};
