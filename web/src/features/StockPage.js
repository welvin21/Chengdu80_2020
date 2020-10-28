import React, { useEffect, useState } from "react";
import { StockPrice } from "../components/StockPrice";
import { useParams, Link } from "react-router-dom"
import { Typography, Spin, Row, Col, Tag } from "antd";

const { Text, Title } = Typography;

export const StockPage = () => {
  let { id } = useParams();
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await fetch(`http://localhost:5000/get-stock-data?ticker=${id.toUpperCase()}`);
      const fetchedData = await response.json()
      setStockData(fetchedData);
    }

    fetchStockData();

  }, [id]);

  if (!stockData) {
    return <Spin />
  }

  return ( 
    <div style={{ maxHeight: '100%', overflowY: 'scroll'}}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Title style={{ fontSize: "48px", fontWeight: 600, marginBottom: "0px" }}>{stockData.ticker}</Title>
            <Text style={{ color: "#737373", marginLeft: "8px" }}>{stockData.company_name}</Text>
          </div>
          {
            stockData.industry ? 
              <Link to={`/industry/${stockData.industry}`}>
                <Tag color="#001628" style={{ cursor: "pointer", marginTop: "4px" }}>
                  {stockData.industry}
                </Tag> 
              </Link> :
              <></>
          }
        </div>
        <Row>
          <Col span={14}>
            <StockPrice id={id}/>
          </Col>
        </Row>
    </div>
  )
};
