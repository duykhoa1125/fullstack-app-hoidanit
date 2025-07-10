
import '@ant-design/v5-patch-for-react-19';//tương thích react 19
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { createUserApi } from "../util/api";
import { useNavigate } from 'react-router-dom';

// Đổi tên component sang PascalCase đúng chuẩn React
const RegisterPage = () => {
  const navigate = useNavigate()
  

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { name, email, password } = values;
    try {
      const res = await createUserApi(name!, email!, password!);
      if (res) {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered.",
        });
        navigate('/login')
      }
      console.log("Success:", res);
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description:
          "There was an error during registration. Please try again.",
      });
      console.error("Registration error:", error);
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

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;

type FieldType = {
  email?: string;
  password?: string;
  name?: string;
};
