import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Spin } from "antd";

export const IndustryStockGraph = ({ ticker, color }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/get-stock-data?ticker=${ticker}`)
      .then((response) => response.json())
      .then((data) => {
        const marketData = data["market_data"];
        const dates = marketData.map((day) =>
          day.date.split(String.fromCharCode(47)).join("-")
        );
        const closingPrice = marketData.map((day) => day.close);
        setData({ x: dates, y: closingPrice });
        setLoading(false);
      });
  }, [ticker]);
  return (
    <Plot
      style={{ width: "100%", height:"20em", marginBottom:"2em"}}
      data={[
        {
          x: data.x,
          y: data.y,
          type: "scatter",
          mode: "lines",
          name: ticker,
          marker: { color: color },
        },
      ]}
      layout={{
        title:`${ticker} Stock Prices 2012`,
        autosize: true,
        xaxis: {
          type: "date",
        },
        margin: {
          l: 40,
          r: 40,
          t: 40,
          b: 40,
        },
      }}
      config={{ displayModeBar: false }}
    />
  );
};
