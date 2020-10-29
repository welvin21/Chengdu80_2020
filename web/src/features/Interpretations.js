import React from "react";
import { Tabs, Typography, Image, List } from "antd";

import { FeatureImportanceChart } from "../components";
import { useRouteMatch, useLocation } from "react-router-dom";
import { NewsList } from "../components/NewsList";

const { Title } = Typography;

const { TabPane } = Tabs;

export const Interpretations = ({ featureImportances, descriptions }) => {
  const location = useLocation();
  console.log(descriptions);
  let data = [];
  if (descriptions) {
    data = descriptions.map(desc => ({
      href: desc[4],
      title: desc[0].toUpperCase().replace("_", " "),
      description: `${desc[0]} has ${desc[2]} importance with weight ${desc[1]} in predicting stock trend movement.`,
      content: desc[3],
    }));
  }

  return (
    <>
      <div style={{ padding: "12px", backgroundColor: "#001628" }}>
        <Title level={4} style={{ margin: 0, color: "white" }}>
          Interpretations
        </Title>
      </div>
      <Tabs defaultActiveKey="1" size="large" style={{ paddingLeft: "4px" }}>
        <TabPane tab="XGBoost" key="1">
          <Title level={4} style={{ marginLeft: "8px" }}>
            Feature Importance
          </Title>
          <FeatureImportanceChart featureImportances={featureImportances} />
          <List
            size="large"
            header={<h2>What do these means?</h2>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </TabPane>
        <TabPane tab="News" key="3">
          <NewsList ticker="AAPL" />
        </TabPane>
      </Tabs>
    </>
  );
};
