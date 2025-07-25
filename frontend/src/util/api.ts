import axios from "./axios.customize";

// Định nghĩa kiểu cho hàm tạo user
const createUserApi = (name: string, email: string, password: string) => {
  const URL = "/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL, data);
};

const loginApi = (email: string, password: string) => {
  const URL = "/v1/api/login";
  const data = { email, password };
  return axios.post(URL, data);
}

const getUserApi = () => {
  const URL = "/v1/api/user"
  return axios.get(URL)
}

export { createUserApi, loginApi, getUserApi };
