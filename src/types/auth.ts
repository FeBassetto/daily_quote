export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  return?: string;
  username?: string;
  password?: string;
}
