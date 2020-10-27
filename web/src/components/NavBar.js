import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const menuItems = [
  {
    name: "Dashboard",
    route: "/",
    icon: "",
  },
  {
    name: "Stocks",
    route: "/stocks",
    icon: "",
  },
];

export const NavBar = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentSelection = `/${pathname.split("/")[1]}`;
  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[currentSelection]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.route}>
              <Link to={item.route}>{item.name} </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  );
}
