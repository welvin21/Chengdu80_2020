import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Row } from "antd";
import { IndustryGraphPage } from "./IndustryGraphPage";

export const IndustryTabs = () => {
  let { industry } = useParams();
  const [metric, setMetric] = useState("pearson");
  const metricButtons = [
    {
      title: "Pearson Correlation Coefficient",
      value: "pearson",
      changeMetric: () => {
        setMetric("pearson");
      },
    },
    {
      title: "Kendall-Tau Correlation Coefficient",
      value: "kendall-tau",
      changeMetric: () => setMetric("kendall-tau"),
    },
    {
      title: "Spearman Rank Corelation",
      value: "spearman",
      changeMetric: () => setMetric("spearman"),
    },
  ];
  console.log(metric);
  const pearsonButton = (e) => {
    setMetric("pearson");
  };
  return (
    <Card>
      <Row>
        {metricButtons.map((button) => (
          <Button
            style={{ marginRight: "2em" }}
            onClick={button.changeMetric}
            type={button.value == metric ? "primary" : ""}
          >
            {button.title}
          </Button>
        ))}
      </Row>
      <IndustryGraphPage industry={industry} metric={metric} />
    </Card>
  );
};
