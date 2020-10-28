import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { useRouteMatch } from "react-router-dom";

const { Title, Text } = Typography;

export const XGBoostPrediction = () => {
  const match = useRouteMatch();
  const { id } = match.params;
  const [predictionData, setPredictionData] = useState({});
  const [isUpside, setIsUpside] = useState(false);
  
  useEffect(() => {
    const getPredictionData = async () => {
      const response = await fetch(`http://localhost:5000/stock-predictions?ticker=${id}`)
      const responseData = await response.json();
      setPredictionData(responseData);
      setIsUpside(parseInt(responseData.prediction) > 0 ? true : false);
    }

    getPredictionData();
  }, [id]);

  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ backgroundColor: "#001628", padding: "12px" }}>
        <Title level={4} style={{ color: "white", marginBottom: 0 }}>XGBoost Trend Prediction</Title>
      </div>
      <div style={{ backgroundColor: "white", padding: "12px", display: "flex", alignItems: "baseline" }}>
        <Text style={{ fontSize: "18px", marginRight: "6px" }}>Potential</Text>
        <Text style={{ fontSize: "24px", color: isUpside ? "green" : "red", marginRight: "6px" }}>
          {isUpside ? "upside" : "downside"}
        </Text>
        <Text style={{ fontSize: "18px", marginRight: "6px" }}>with</Text>
        <Text style={{ fontSize: "24px", marginRight: "6px" }}>{parseFloat(predictionData.confidence).toFixed(2)}%</Text>
        <Text style={{ fontSize: "18px" }}>confidence</Text>
      </div>
    </div>
  )
}