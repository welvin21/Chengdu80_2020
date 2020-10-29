import React, { useEffect, useState } from "react";

import { Table, Typography } from "antd";

const { Text } = Typography;
const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Headline",
    dataIndex: "headline",
  },
  {
    title: "Sentiment",
    dataIndex: "sentiment",
    render: sentiment => (
      <Text style={{ color: sentiment === "positive" ? "green" : "red" }}>
        {sentiment}
      </Text>
    ),
    filters: [
      { text: "Positive", value: "positive" },
      { text: "Negative", value: "negative" },
    ],
    onFilter: (value, record) => record.sentiment.indexOf(value) === 0,
  },
  {
    title: "Score",
    dataIndex: "score",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.score - b.score,
  },
];

export const NewsList = ({ ticker }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/get-news-sentiments?ticker=${ticker}`)
      .then(response => response.json())
      .then(data => {
        const negative = data["negative"];
        const positive = data["positive"];
        negative.forEach(e => (e.sentiment = "negative"));
        positive.forEach(e => (e.sentiment = "positive"));
        setData(negative.concat(positive));
      });
  }, [ticker]);
  return <Table columns={columns} dataSource={data} />;
};
