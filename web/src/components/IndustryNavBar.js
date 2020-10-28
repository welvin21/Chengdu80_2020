import React, { useEffect, useState } from "react";
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
    ticker: "AAPL",
    name: "Apples",
    route: "aap",
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

const options = [];
stockItems.map((item) => options.push({ value: item.name }));

export const IndustryNavBar = ({ children }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const pathname = location.pathname;
  const currentSelection = pathname.split("/")[2];

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const [industries, setIndustries] = useState([])

  useEffect(() => { 
    fetch("http://localhost:5000/get-industry-list")
    .then(response => response.json())
    .then(data => setIndustries(data.industry_list))
  }, [])

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={300}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelection]}
          mode="inline"
        >
          {industries.map((item) => (
            <Menu.Item key={item}>
              <Link to={`${match.url}/${item}`}>{item}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content
        style={{ margin: "0 16px", marginTop: "auto", marginBottom: "auto" }}
      >
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};
