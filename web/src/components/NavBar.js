import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

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

export default function NavBar({ children }) {
  const location = useLocation();
  const baseLength = process.env.PUBLIC_URL.length;
  const currentRoute = location.pathname.slice(baseLength);
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[currentRoute]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.route}>
              <Link to={item.route}>{item.name} </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SixthSense ©2020 Created by HKU
      </Footer>
    </Layout>
  );
}
