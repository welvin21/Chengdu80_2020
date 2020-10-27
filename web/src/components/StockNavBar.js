import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, AutoComplete, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { StockCard } from "./StockCard";

const { Content, Sider } = Layout;

export const StockNavBar = ({ children }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const pathname = location.pathname;
  const currentSelection = pathname.split("/")[2];

  const [stockList, setStockList] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    const fetchStockList = async () => {
      const response = await fetch("http://localhost:5000/get-stock-list");
      const stockListData = await response.json();
      setStockList(stockListData);
      setFilteredStocks(stockListData);
    }

    fetchStockList();
  }, [])

  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = stockList;
    } else {
      res = stockList.filter(
        (stock) => stock.ticker.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
    }
    setFilteredStocks(res);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        width={300}
      >
        <div className="logo" />
        <AutoComplete
          style={{ width: 300, padding: "5px", margin: "auto" }}
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelection]}
          mode="inline"
          style={{ height: "100%", overflow: "auto" }}
        >
          {filteredStocks.map((stock) => (
            <Link key={stock.ticker} to={`${match.url}/${stock.ticker}`} style={{ color: "white" }}>
              <StockCard stockInfo={stock} selected={currentSelection === stock.ticker} />
            </Link>
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
