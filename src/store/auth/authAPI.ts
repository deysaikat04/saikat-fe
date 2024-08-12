import { AxiosResponse } from "axios";
import apiService from "../../utils/apiService";
import { clearStorage } from "../../utils/localStorage";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  email: string;
}

const signup = (name: string, email: string, password: string) => {
  return apiService.post(`/user/register`, {
    name,
    email,
    password,
  });
};

const loginWithPassword = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse, any>> => {
  return apiService.post(`/user/login`, {
    email,
    password,
  });
};

const logout = async () => {
  await clearStorage();
};

export const authAPI = { signup, logout, loginWithPassword };
