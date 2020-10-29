import React, { useEffect, useState } from "react";
import { StockPrice } from "../components/StockPrice";
import { useParams, Link } from "react-router-dom";
import { Typography, Spin, Row, Col, Tag } from "antd";
import { XGBoostPrediction } from "../components";
import { Interpretations } from "./Interpretations";
import { StockIndustryRelation } from "../components/StockIndustryRelation";

const { Text, Title } = Typography;

export const StockPage = () => {
  let { id } = useParams();

  const [stockData, setStockData] = useState({});
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await fetch(
        `http://localhost:5000/get-stock-data?ticker=${id.toUpperCase()}`
      );
      const fetchedData = await response.json();
      setStockData(fetchedData);
    };

    const getPredictionData = async () => {
      const response = await fetch(
        `http://localhost:5000/stock-predictions?ticker=${id}`
      );
      const responseData = await response.json();
      setPredictionData(responseData);
    };

    fetchStockData();
    getPredictionData();
  }, [id]);

  if (!stockData) {
    return <Spin />;
  }

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Title
            style={{ fontSize: "48px", fontWeight: 600, marginBottom: "0px" }}
          >
            {stockData.ticker}
          </Title>
          <Text style={{ color: "#737373", marginLeft: "8px" }}>
            {stockData.company_name}
          </Text>
        </div>
        {stockData.industry ? (
          <Link to={`/industry/${stockData.industry}`}>
            <Tag
              color="#001628"
              style={{ cursor: "pointer", marginTop: "4px" }}
            >
              {stockData.industry}
            </Tag>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Row gutter={12} style={{ height: "100%" }}>
        <Col span={12}>
          <XGBoostPrediction predictionData={predictionData} />
          <StockPrice id={id} />
          {stockData.industry ? (
            <StockIndustryRelation id={id} industry={stockData.industry} />
          ) : (
            <></>
          )}
        </Col>
        <Col span={12} style={{ backgroundColor: "white" }}>
          <Interpretations
            featureImportances={predictionData.feature_importance}
          />
        </Col>
      </Row>
    </div>
  );
};
