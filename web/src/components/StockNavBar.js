import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, AutoComplete } from "antd";
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
      const response = await fetch("http://18.162.36.52:5000/get-stock-list");
      const stockListData = await response.json();
      setStockList(stockListData);
      setFilteredStocks(stockListData);
    };

    fetchStockList();
  }, []);

  const handleSearch = value => {
    let res = [];
    if (!value || value.indexOf("@") >= 0) {
      res = stockList;
    } else {
      res = stockList.filter(
        stock => stock.ticker.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
    }
    setFilteredStocks(res);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider width={300}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelection]}
          mode="inline"
          style={{ height: "100%", overflow: "auto" }}
        >
          <AutoComplete
            style={{
              width: 300,
              padding: "5px",
              margin: "auto",
              position: "absolute",
              backgroundColor: "#001628",
            }}
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
          <div style={{ height: 40 }}></div>
          {filteredStocks.map(stock => (
            <Link
              key={stock.ticker}
              to={`${match.url}/${stock.ticker}`}
              style={{ color: "white" }}
            >
              <StockCard
                stockInfo={stock}
                selected={currentSelection === stock.ticker}
              />
            </Link>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "1%", height: "100%", textAlign: "left" }}>
        <div className="site-layout-content" style={{ height: "100%" }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};
