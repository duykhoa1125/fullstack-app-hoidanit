import axios from "./axios.customize";

// Định nghĩa kiểu cho hàm tạo user
const createUserApi = (name: string, email: string, password: string) => {
  const URL = "/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL, data);
};

export { createUserApi };
