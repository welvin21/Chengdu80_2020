import React, { useState } from "react";
import { Layout, Menu, Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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

  const [filteredStocks, setFilteredStocks] = useState(stockItems);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = stockItems;
    } else {
      res = stockItems.filter(
        (item) => item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
    }
    setFilteredStocks(res);
  };

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
          <AutoComplete
            style={{ width: 300, padding: "5px", margin: "auto" }}
            options={options}
            onSearch={handleSearch}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            open={false}
          >
            <Input
              placeholder="Search Stock"
              bordered={false}
              suffix={<SearchOutlined />}
            />
          </AutoComplete>
          {filteredStocks.map((item) => (
            <Menu.Item key={item.route}>
              <Link to={`${match.url}/${item.route}`}>{item.name}</Link>
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
