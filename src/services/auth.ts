import type { LoginRequest, LoginResponse } from "@models/auth";
import { api } from "@services/axios";

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/testeReact/autenticar", credentials);
    return response.data;
  },
};
