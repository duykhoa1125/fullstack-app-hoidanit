import axios from "./axios.customize";
import type { LoginResponse, RegisterResponse, User } from "../types/api";

// Định nghĩa kiểu cho hàm tạo user
const createUserApi = (name: string, email: string, password: string): Promise<RegisterResponse> => {
  const URL = "/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL, data);
};

const loginApi = (email: string, password: string): Promise<LoginResponse> => {
  const URL = "/v1/api/login";
  const data = { email, password };
  return axios.post(URL, data);
}

const getUserApi = (): Promise<User[]> => {
  const URL = "/v1/api/user"
  return axios.get(URL)
}

export { createUserApi, loginApi, getUserApi };
