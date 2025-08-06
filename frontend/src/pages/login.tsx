import "@ant-design/v5-patch-for-react-19"; //tương thích react 19
import type { FormProps } from "antd";
import { Button, Form, Input, notification, Card, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { loginApi } from "../util/api";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth-context";

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

// Đổi tên component sang PascalCase đúng chuẩn React
const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    setLoading(true);
    
    try {
      const res = await loginApi(email!, password!);
      console.log("Login API response:", res);

      if (Number(res?.EC) === 0) {
        localStorage.setItem("access_token", res?.accessToken || "");
        notification.success({
          message: "Login Successful",
          description: "Welcome back! You have successfully logged in.",
          placement: "topRight",
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
          description: res?.EM ?? "Error during login. Please try again.",
          placement: "topRight",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Login Failed",
        description: "Network error or server is down. Please try again.",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center">
      <Card className="auth-card" style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ 
            fontSize: '48px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 16
          }}>
            <LoginOutlined />
          </div>
          <Title level={2} style={{ margin: 0, color: '#333' }}>
            Welcome Back
          </Title>
          <Text type="secondary">
            Sign in to your account to continue
          </Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#999' }} />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#999' }} />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="btn-primary"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                height: 45,
                fontSize: 16
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '24px 0' }}>
          <Text type="secondary">New to our platform?</Text>
        </Divider>

        <div style={{ textAlign: 'center' }}>
          <Text>
            Don't have an account?{" "}
            <Link 
              to="/register" 
              style={{ 
                color: '#667eea', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Sign up here
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
