import React, { useContext, useState, useEffect } from "react";
import { Typography, Button, Affix, Cascader, message, Empty } from "antd";
import { PortfolioStockCard } from "./PortfolioStockCard";
import { PortfolioContext } from "../context";

const { Title } = Typography;

export const Portfolio = ({ container }) => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const [allStockOptions, setAllStockOptions] = useState([]);
  const [wantsToAdd, setWantsToAdd] = useState(false);

  useEffect(() => {
    const fetchStocksByIndustry = async () => {
      const response = await fetch(
        "http://18.162.36.52:5000/get-stock-data-by-industry"
      );
      const stocksByIndustryData = await response.json();

      const processedOptions = Object.keys(stocksByIndustryData).map(
        industry => {
          const stocksForIndustry = stocksByIndustryData[industry];
          return {
            value: industry,
            label: industry,
            children: stocksForIndustry.map(stock => ({
              value: stock,
              label: stock,
            })),
          };
        }
      );

      setAllStockOptions(processedOptions);
    };

    fetchStocksByIndustry();
  }, []);

  const filter = (inputValue, path) => {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  return (
    <div style={{ height: "100%", boxSizing: "border-box" }}>
      <Affix target={() => container}>
        <div
          style={{
            padding: "12px",
            backgroundColor: "#001628",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            level={4}
            style={{ margin: 0, color: "white", textAlign: "left" }}
          >
            My Portfolio
          </Title>
          <Button type="primary" onClick={() => setWantsToAdd(true)}>
            Add
          </Button>
        </div>
        {wantsToAdd && (
          <div style={{ width: "100%" }}>
            <Cascader
              style={{ width: "100%" }}
              options={allStockOptions}
              placeholder="search for stocks to add"
              showSearch={{ filter }}
              size="large"
              onChange={value => {
                const stockToAdd = value[1];
                if (!portfolio.some(stock => stock.ticker === stockToAdd)) {
                  localStorage.setItem(
                    "portfolio",
                    JSON.stringify([{ ticker: stockToAdd }, ...portfolio])
                  );
                  setPortfolio([{ ticker: stockToAdd }, ...portfolio]);
                } else {
                  message.error("This stock already exists in your portfolio.");
                }
                setWantsToAdd(false);
              }}
            />
          </div>
        )}
      </Affix>
      <div
        style={{
          padding: "12px 0px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {portfolio && portfolio.length > 0 ? (
          portfolio.map(stock => <PortfolioStockCard ticker={stock.ticker} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
