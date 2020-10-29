import React from "react";
import { Typography } from "antd"; 

const {Title} = Typography;

export const RecommendationsLongShort = () => {
  return (
    <div>
      <div style={{ padding: "12px", backgroundColor: "#001628" }}>
        <Title level={4} style={{ margin: 0, color: "white",textAlign:"left"  }}>
          Recommendations to Long/Short Based on Today's market
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
        Recommendations list
      </div>
    </div>
  );
};
