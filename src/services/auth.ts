import type { LoginRequest, LoginResponse } from "../types/auth";
import { api } from "./axios";

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/testeReact/autenticar", credentials);
    return response.data;
  },
};
