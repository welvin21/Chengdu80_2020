import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

const stockItems = [
  {
    ticker: "AAPL",
    name: "Apple",
    route: "aapl",
  },
  {
    ticker: "GOOG",
    name: "Google",
    route: "goog",
  },
  {
    ticker: "NIKE",
    name: "Nike",
    route: "nike",
  },
];

export const StockNavBar = ({ children }) => {
  const match = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const currentSelection = pathname.split("/")[2];
  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={300}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[currentSelection]} mode="inline">
          {stockItems.map((item) => (
            <Menu.Item key={item.route}>
              <Link to={`${match.url}/${item.route}`}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ margin: "0 16px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};