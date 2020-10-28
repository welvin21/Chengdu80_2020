import React from "react";
import { Tabs, Typography } from "antd";

import { FeatureImportanceChart } from "../components";

const { Title } = Typography;

const { TabPane } = Tabs;

export const Interpretations = ({ featureImportances }) => {
  return (
    <>
    <div style={{ padding: "12px", backgroundColor: "#001628" }}>
      <Title level={4} style={{ margin: 0, color: "white" }}>Interpretations</Title>
    </div>
    <Tabs defaultActiveKey="1" size="large" style={{ paddingLeft: "4px" }}>
      <TabPane tab="XGBoost" key="1"> 
        <Title level={4}>Feature Importance</Title>
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