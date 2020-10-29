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
    setStockData(null);
    setPredictionData(null);
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

  if (!stockData || !predictionData) {
    return <Spin />;
  }

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title
            style={{ fontSize: "48px", fontWeight: 600, marginBottom: "0px" }}
          >
            {stockData.ticker}
          </Title>
          <div style={{ marginLeft: "8px" }}>
            <Text
              style={{ color: "#737373", marginRight: "8px", display: "block" }}
            >
              {stockData.company_name}
            </Text>
            {stockData.industry ? (
              <Link
                to={{
                  pathname: `/industry/${stockData.industry}`,
                  state: { ticker: id },
                }}
              >
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
        </div>
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
            descriptions={predictionData.descriptions}
          />
        </Col>
      </Row>
    </div>
  );
};
