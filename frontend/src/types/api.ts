// Define API response types

export interface User {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

export interface ApiResponse<T = unknown> {
  EC: number; // Error Code
  EM: string; // Error Message
  data?: T;
}

export interface LoginResponse extends ApiResponse {
  accessToken?: string;
  user?: {
    email: string;
    name: string;
    _id: string;
  };
}

export interface RegisterResponse extends ApiResponse {
  user?: User;
}

export interface UsersResponse extends ApiResponse {
  data?: User[];
}