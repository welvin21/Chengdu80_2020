import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export const IndustryStockGraph = ({ ticker }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/get-stock-data?ticker=${ticker}`)
      .then((response) => response.json())
      .then((data) => {
        const marketData = data["market_data"];
        console.log(marketData);
        const dates = marketData.map((day) =>
          day.date.split(String.fromCharCode(47)).join("-")
        );
        const closingPrice = marketData.map((day) => day.close);
        setData({ x: dates, y: closingPrice });
      });
  }, []);
  return (
    <Plot
      style={{ width: "100%" }}
      data={[
        {
          x: data.x,
          y: data.y,
          type: "scatter",
          mode: "lines",
          name: target,
          marker: { color: "red" },
        },
      ]}
      layout={{
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
