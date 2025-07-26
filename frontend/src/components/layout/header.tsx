import React, { useContext, useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

type MenuItem = Required<MenuProps>["items"][number];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  console.log("check auth context", auth);

  const items: MenuItem[] = [
    {
      label: <Link to={"/"}>Home page</Link>,
      key: "home",
      icon: <MailOutlined />,
    },

    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to={"/user"}>User</Link>,
            key: "user",
            icon: <MailOutlined />,
          },
        ]
      : []),

    {
      label: `Welcome ${auth?.user?.email ?? "Guest"}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      navigate("/");

                      setAuth({
                        isAuthenticated: false,
                        user: {
                          email: "",
                          name: "",
                        },
                      })
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
              },
            ]
          : [{ label: <Link to={"/login"}>Login</Link>, key: "login" }]),
      ],
    },
  ];
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
