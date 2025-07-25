import React, { useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Header: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: <Link to={"/"}>Home page</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: <Link to={"/user"}>User</Link>,
      key: "user",
      icon: <MailOutlined />,
    },
    {
      label: "Welcome Khoa",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        { label: <Link to={"/login"}>Login</Link>, key: "login" },
        {
          label: (
            <span
              onClick={() => {
                localStorage.removeItem("access_token");
                navigate("/");
                //chua hoạt động 
                setCurrent("home"); //lay theo bien key
              }}
            >
              Logout
            </span>
          ),
          key: "logout",
        },
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
