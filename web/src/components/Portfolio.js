import React from "react";
import { Typography } from "antd"; 
import { PortfolioStockCard } from "./PortfolioStockCard";

const {Title} = Typography;

export const Portfolio = ({portfolio}) => {
  return (
    <div>
      <div style={{ padding: "12px", backgroundColor: "#001628" }}>
        <Title level={4} style={{ margin: 0, color: "white",textAlign:"left"  }}>
          Your Portfolio
        </Title>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          display: "flex",
          alignItems: "baseline",
        }}
      >
          <PortfolioStockCard ticker="AAPL" />
      </div>
    </div>
  );
};
