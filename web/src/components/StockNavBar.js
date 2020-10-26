import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const stockItems = [
  {
    ticker: "AAPL",
    name: "Apple",
    route: "/stock/aapl",
  },
];

const StockNavBar = ({ children }) => {
    console.log(children)
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={300}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {stockItems.map((item) => (
            <Menu.Item key={item.route}>
              <Link to={item.route}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StockNavBar;
