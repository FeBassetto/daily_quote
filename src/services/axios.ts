import { showErrorToast } from "@utils/errorHandler";
import axios from "axios";
import * as Keychain from "react-native-keychain";

const TOKEN_SERVICE = "auth_token";

export const api = axios.create({
  baseURL: "https://n8n.jrmendonca.com.br/webhook",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      showErrorToast(
        "Sua sessão foi encerrada. Por favor, faça login novamente.",
        "Sessão expirada",
      );

      await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
    }

    return Promise.reject(error);
  },
);
