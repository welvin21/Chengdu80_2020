import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

export const IndustryNavBar = ({ children }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const pathname = location.pathname;
  const currentSelection = pathname.split("/")[2];

  const [industries, setIndustries] = useState([])

  useEffect(() => { 
    fetch("http://localhost:5000/get-industry-list")
    .then(response => response.json())
    .then(data => setIndustries(data.industry_list))
  }, [])

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        width={200}
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
        style={{ padding: "1%", height: "100%", textAlign: "left" }}
      >
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};
