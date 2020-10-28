import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Row } from "antd";
import { IndustryGraphPage } from "./IndustryGraphPage";

export const IndustryTabs = () => {
  let { industry } = useParams();
  const [metric, setMetric] = useState("pearson");
  const metricButtons = [
    {
      title: "Pearson Correlation",
      value: "pearson",
      changeMetric: () => {
        setMetric("pearson");
      },
    },
    {
      title: "Kendall-Tau Correlation",
      value: "kendall-tau",
      changeMetric: () => setMetric("kendall-tau"),
    },
    {
      title: "Spearman Correlation",
      value: "spearman",
      changeMetric: () => setMetric("spearman"),
    },
  ];
  console.log(metric);
  const pearsonButton = (e) => {
    setMetric("pearson");
  };
  return (
    <Card style={{ width: 700}}>
      <Row>
        {metricButtons.map((button) => (
          <Button
            style={{ marginRight: "0em" }}
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
