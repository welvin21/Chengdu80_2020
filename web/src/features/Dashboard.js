import React, { useContext } from "react";
import { Row, Col, Card } from "antd";
import { Portfolio } from "../components/Portfolio";
import { RecommendationsDiversify } from "../components/RecommendationsDiversify";
import { RecommendationsLongShort } from "../components/RecommendationsLongShort";
import { PortfolioContext } from "../context";

export const Dashboard = () => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);

  return (
    <Card
      style={{
        height: "100vh",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Row style={{ justifyContent: "center" }}>
        <Col span={24}>
          <RecommendationsDiversify />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={24}>
          <RecommendationsLongShort />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={24}>
          <Portfolio />
        </Col>
      </Row>
    </Card>
  );
};
