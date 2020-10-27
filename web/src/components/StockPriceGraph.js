import React from "react";
import Plot from "react-plotly.js";

export const StockPriceGraph = ({ x,y }) => {
  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: "scatter",
          mode: "lines",
          marker: { color: "blue" },
        },
      ]}
      layout={{ width: 420, height: 500 }}
    />
  );
}
