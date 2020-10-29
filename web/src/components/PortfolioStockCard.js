import React, { useEffect, useState } from "react";
import { IndustryStockGraph } from "./IndustryStockGraph";
import { Card, Typography } from "antd";

const { Text } = Typography

export const PortfolioStockCard = ({ ticker }) => {
  const [predictionData, setPredictionData] = useState({});
  const [isUpside, setIsUpside] = useState();

  useEffect(() => {
    const getPredictionData = async () => {
      const response = await fetch(
        `http://localhost:5000/stock-predictions?ticker=${ticker}`
      );
      const responseData = await response.json();
      setPredictionData(responseData);
      setIsUpside(parseInt(responseData.prediction) > 0 ? true : false);
    };
  }, [ticker]);
  return (
    <Card bordered={true} style={{ width: "25%" }}>
      <IndustryStockGraph ticker={ticker} color="#4E2286" />
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Text style={{ fontSize: "14px", marginRight: "6px" }}>Potential</Text>
        <Text
          style={{
            fontSize: "16px",
            color: isUpside ? "green" : "red",
            marginRight: "6px",
          }}
        >
          {isUpside ? "upside" : "downside"}
        </Text>
        <Text style={{ fontSize: "14px", marginRight: "6px" }}>with</Text>
        <Text style={{ fontSize: "16px", marginRight: "6px" }}>
          {parseFloat(predictionData.confidence).toFixed(2)}%
        </Text>
        <Text style={{ fontSize: "16px" }}>confidence</Text>
      </div>
    </Card>
  );
};
