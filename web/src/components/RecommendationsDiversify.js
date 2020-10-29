import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Card,
  Affix,
  Button,
  message,
  Empty,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import { PortfolioContext } from "../context/PortfolioContext";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const RecommendationsDiversify = ({ container }) => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const [diversifyRecs, setDiversifyRecs] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchDiversifyRecs = async () => {
      const processedPortfolio = portfolio.map(
        stock => `${stock.ticker}_return`
      );
      console.log(processedPortfolio);
      const response = await fetch(
        "http://18.162.36.52:5000/get-diversify-recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", mode: "no-cors" },
          body: JSON.stringify({ portfolio: processedPortfolio || [] }),
        }
      );

      const recData = await response.json();
      setDiversifyRecs(recData.recommendations);
      setIsFetching(false);
    };

    setIsFetching(true);
    fetchDiversifyRecs();
  }, [portfolio]);

  return (
    <div style={{ height: "100%" }}>
      <Affix target={() => container}>
        <div style={{ padding: "12px", backgroundColor: "#001628" }}>
          <Title
            level={4}
            style={{ margin: 0, color: "white", textAlign: "left" }}
          >
            Recommendations to diversify your portfolio
          </Title>
        </div>
      </Affix>
      <div
        style={{
          padding: "12px",
          height: "100%",
        }}
      >
        {isFetching && <Spin />}

        {diversifyRecs && diversifyRecs.length > 0 ? (
          diversifyRecs.map(stock => {
            const ticker = stock[0];
            const score = stock[1];
            return (
              <Card style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <Link to={`/stocks/${ticker}`}>{ticker}</Link>
                    <Tooltip title="correlation between your portfolio's average returns and this stock's return">
                      <Tag
                        style={{
                          backgroundColor: "#001628",
                          marginLeft: "8px",
                          color: "white",
                        }}
                      >
                        {score.toFixed(3)}
                      </Tag>
                    </Tooltip>
                  </span>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (!portfolio.some(stock => stock.ticker === ticker)) {
                        localStorage.setItem(
                          "portfolio",
                          JSON.stringify([{ ticker: ticker }, ...portfolio])
                        );
                        setPortfolio([{ ticker: ticker }, ...portfolio]);
                      } else {
                        message.error(
                          "This stock already exists in your portfolio."
                        );
                      }
                    }}
                  >
                    Add to portfolio
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
