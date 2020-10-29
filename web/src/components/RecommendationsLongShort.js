import React, { useContext } from "react";
import { Typography, Affix, Tabs, Card, Button, message } from "antd"; 

import { longStocks } from "../constants/longStocks";
import { shortStocks } from "../constants/shortStocks";
import { PortfolioContext } from "../context";

import { Link } from "react-router-dom";

const { Title } = Typography;
const { TabPane } = Tabs;

export const RecommendationsLongShort = ({ container }) => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);

  return (
    <div style={{ height: "100%" }}>
      <Affix target={() => container}>
        <div style={{ padding: "12px", backgroundColor: "#001628" }}>
          <Title level={4} style={{ margin: 0, color: "white",textAlign:"left"  }}>
            Long/Short Recommendations
          </Title>
        </div>
      </Affix>
      <div
        style={{
          padding: "12px 0px",
          height: "100%"
        }}
      >
        <div>
          <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: "12px" }}>
            <TabPane tab="Long" key="1">
              {
                longStocks.slice(0, 8).map(stock => {
                  const ticker = stock[0];
                  return (
                    <Card style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Link to={`/stocks/${ticker}`}>
                          {ticker}
                        </Link>
                        <Button type="primary"
                          onClick={() => {
                            if (!portfolio.some(stock => stock.ticker === ticker)) {
                              localStorage.setItem("portfolio", JSON.stringify([{ "ticker": ticker }, ...portfolio]));
                              setPortfolio([{ "ticker": ticker }, ...portfolio]);
                            } else {
                              message.error("This stock already exists in your portfolio.");
                            }
                          }}
                        >
                        Add to portfolio
                      </Button>
                      </div>
                    </Card>
                  )
                })
              }
            </TabPane>
            <TabPane tab="Short" key="2">
            {
              shortStocks.slice(0, 8).map(stock => {
                const ticker = stock[0];
                return (
                  <Card style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Link to={`/stocks/${ticker}`}>
                        {ticker}
                      </Link>
                      <Button type="primary"
                        onClick={() => {
                          if (!portfolio.some(stock => stock.ticker === ticker)) {
                            localStorage.setItem("portfolio", JSON.stringify([{ "ticker": ticker }, ...portfolio]));
                            setPortfolio([{ "ticker": ticker }, ...portfolio]);
                          } else {
                            message.error("This stock already exists in your portfolio.");
                          }
                        }}
                      >
                      Add to portfolio
                    </Button>
                    </div>
                  </Card>
                )
              })
            }
            </TabPane>
          </Tabs> 
        </div>
      </div>
    </div>
  );
};
