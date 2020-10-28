import React from "react";
import { Tabs, Typography, Image } from "antd";

import { FeatureImportanceChart } from "../components";
import { useRouteMatch, useLocation } from "react-router-dom";

const { Title } = Typography;

const { TabPane } = Tabs;

export const Interpretations = ({ featureImportances }) => {
  const location = useLocation();

  return (
    <>
    <div style={{ padding: "12px", backgroundColor: "#001628" }}>
      <Title level={4} style={{ margin: 0, color: "white" }}>Interpretations</Title>
    </div>
    <Tabs defaultActiveKey="1" size="large" style={{ paddingLeft: "4px" }}>
      <TabPane tab="XGBoost" key="1"> 
        <Title level={4} style={{ marginLeft: "8px" }}>Feature Importance</Title>
        <FeatureImportanceChart featureImportances={featureImportances} />
      </TabPane>
      <TabPane tab="ARIMA" key="2"> 
        
      </TabPane>
      <TabPane tab="News" key="3"> 
        
      </TabPane>
    </Tabs>
  </>
  )
}