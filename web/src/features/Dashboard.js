import React, { useState } from "react";
import { Row, Col } from "antd";
import { Portfolio } from "../components/Portfolio";
import { RecommendationsDiversify } from "../components/RecommendationsDiversify";
import { RecommendationsLongShort } from "../components/RecommendationsLongShort";

export const Dashboard = () => {
  const [portfolioContainer, setPortfolioContainer] = useState(null);
  const [longShortContainer, setLongShortContainer] = useState(null);
  const [diversifyContainer, setDiversifyContainer] = useState(null);
 
  return (
    <Row gutter={18} justify="space-between" style={{ padding: "12px 12px", height: "100%", margin: "0px !important" }}>
      <Col span={8} style={{ 
        height: "100%", 
        boxSizing: "border-box", 
        overflow: "auto", 
        }} ref={setPortfolioContainer}>
        <Portfolio container={portfolioContainer} />
      </Col>
      <Col span={8} style={{ 
        height: "100%", 
        boxSizing: "border-box", 
        overflow: "auto", 
        }} ref={setLongShortContainer}>
        <RecommendationsLongShort container={longShortContainer} />
      </Col>
      <Col span={8} style={{ height: "100%", 
        boxSizing: "border-box", 
        overflow: "auto", 
        padding: "8px" }} ref={setDiversifyContainer}>
        <RecommendationsDiversify container={diversifyContainer} />
      </Col>
    </Row>
  );
};
