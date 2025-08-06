import React, { useContext, useState } from "react";
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Avatar, Dropdown } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

type MenuItem = Required<MenuProps>["items"][number];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const [current, setCurrent] = useState(() => {
    // Set current menu item based on current path
    if (location.pathname === "/") return "home";
    if (location.pathname === "/user") return "user";
    return "home";
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
      },
    });
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontWeight: 600 }}>{auth.user.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{auth.user.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout} style={{ color: '#ff4d4f' }}>
          <LogoutOutlined style={{ marginRight: 8 }} />
          Logout
        </span>
      ),
    },
  ];

  const items: MenuItem[] = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to={"/user"}>Users</Link>,
            key: "user",
            icon: <UserOutlined />,
          },
        ]
      : []),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <header className="main-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginRight: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            FullStack App
          </div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ border: 'none', flex: 1 }}
          />
        </div>
        
        <div>
          {auth.isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px' }}>
                <Avatar 
                  style={{ 
                    backgroundColor: '#667eea',
                    marginRight: 8
                  }} 
                  icon={<UserOutlined />} 
                />
                <span style={{ fontWeight: 500 }}>
                  {auth.user.name || 'User'}
                </span>
              </div>
            </Dropdown>
          ) : (
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link 
                to="/login" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f2ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <LoginOutlined style={{ marginRight: 4 }} />
                Sign In
              </Link>
              <Link 
                to="/register" 
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <UserOutlined style={{ marginRight: 4 }} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
