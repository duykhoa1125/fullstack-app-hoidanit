import "@ant-design/v5-patch-for-react-19"; //tương thích react 19
import type { FormProps } from "antd";
import { Button, Form, Input, notification, Card, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { createUserApi } from "../util/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  name?: string;
};

// Đổi tên component sang PascalCase đúng chuẩn React
const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { name, email, password } = values;
    setLoading(true);
    
    try {
      const res = await createUserApi(name!, email!, password!);
      console.log("Register API response:", res);
      
      if (res) {
        notification.success({
          message: "Registration Successful",
          description: "Your account has been created successfully. Please sign in.",
          placement: "topRight",
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      let errorMessage = "There was an error during registration. Please try again.";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { EM?: string } } };
        errorMessage = axiosError.response?.data?.EM || errorMessage;
      }
      
      notification.error({
        message: "Registration Failed",
        description: errorMessage,
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
            <UserAddOutlined />
          </div>
          <Title level={2} style={{ margin: 0, color: '#333' }}>
            Create Account
          </Title>
          <Text type="secondary">
            Join us today and get started
          </Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item<FieldType>
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 2, message: "Name must be at least 2 characters!" }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#999' }} />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#999' }} />}
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
              placeholder="Create a strong password"
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '24px 0' }}>
          <Text type="secondary">Already have an account?</Text>
        </Divider>

        <div style={{ textAlign: 'center' }}>
          <Text>
            Already registered?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: '#667eea', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Sign in here
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
