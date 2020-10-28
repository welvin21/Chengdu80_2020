import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { IndustryGraphPage } from "./IndustryGraphPage";

const { TabPane } = Tabs;

const metricTabs = [
  {
    title: "Pearson Correlation Coefficient",
    metric: "pearson",
  },
  {
    title: "Kendall-Tau Correlation Coefficient",
    metric: "kendall-tau",
  },
  {
    title: "Spearman Rank Corelation",
    metric: "sperman",
  },
];

export const IndustryTabs = () => {
  let { industry } = useParams();
  return (
    <Tabs defaultActiveKey="pearson" type="card">
      {metricTabs.map((metric) => (
        <TabPane tab={metric.title} key={metric.metric}>
          <IndustryGraphPage industry={industry} metric={metric.metric} />
        </TabPane>
      ))}
    </Tabs>
  );
};
