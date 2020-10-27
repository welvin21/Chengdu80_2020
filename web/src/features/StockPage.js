import React, { useEffect, useState } from "react";
import { StockPrice } from "../components/StockPrice";
import { useParams } from "react-router-dom"
import { Typography, Spin, Row, Col } from "antd";

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
        <div style={{ marginBottom: "18px" }}>
          <Title style={{ fontSize: "48px", fontWeight: 600, marginBottom: "0px" }}>{stockData.ticker}</Title>
          <Text style={{ color: "grey" }}>{stockData.company_name}</Text>
        </div>
        <Row>
          <Col span={14}>
            <StockPrice id={id}/>
          </Col>
        </Row>
    </div>
  )
};
