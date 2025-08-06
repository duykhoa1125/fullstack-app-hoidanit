import "@ant-design/v5-patch-for-react-19"; //tương thích react 19
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { loginApi } from "../util/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth-context";

type FieldType = {
  email?: string;
  password?: string;
};

// Đổi tên component sang PascalCase đúng chuẩn React
const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    try {
      const res = await loginApi(email!, password!);
      console.log("Login API response:", res);

      if (Number(res?.EC) === 0) {
        localStorage.setItem("access_token", res?.accessToken || "");
        notification.success({
          message: "login Successful",
          description: "You have successfully logined.",
        });
        setAuth({
          isAuthenticated: true,
          user: {
            email: res?.user?.email ?? "",
            name: res?.user?.name ?? "",
          },
        });
        
        // login thanh cong ve trang chu
        navigate("/");
      } else {
        notification.error({
          message: "Login Failed",
          description: res?.EM ?? "error during login. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Login Failed",
        description: "Network error or server is down. Please try again.",
      });
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
