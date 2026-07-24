import api from "@/api/axios";

import type { RequestDTO } from "@/types/request";
import type { ResponseDTO } from "@/types/response";

import type { AuthData, LoginData, RegisterData } from "@/types/auth";

import type { User } from "@/types/user";

const authService = {
  async login(request: RequestDTO<LoginData>): Promise<ResponseDTO<AuthData>> {
    const response = await api.post<ResponseDTO<AuthData>>(
      "/auth/login",
      request.data,
    );

    return response.data;
  },

  async register(
    request: RequestDTO<RegisterData>,
  ): Promise<ResponseDTO<AuthData>> {
    const response = await api.post<ResponseDTO<AuthData>>(
      "/auth/register",
      request.data,
    );

    return response.data;
  },

  async me(): Promise<ResponseDTO<User>> {
    const response = await api.get<ResponseDTO<User>>("/auth/me");

    return response.data;
  },

  async logout(): Promise<ResponseDTO<null>> {
    const response = await api.post<ResponseDTO<null>>("/auth/logout");

    return response.data;
  },
};

export default authService;
