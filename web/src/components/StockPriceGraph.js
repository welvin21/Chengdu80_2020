import React from "react";
import Plot from "react-plotly.js";

export const StockPriceGraph = ({ history, prediction }) => {
  return (
    <Plot
      data={[
        {
          x: history.x,
          y: history.y,
          type: "scatter",
          mode: "lines",
          name: "Historial Value", 
          marker: { color: "blue" },
        },
        {
          x: prediction.x,
          y: prediction.y,
          type: "scatter",
          mode: "lines",
          name: "Predicted Value",
          marker: { color: "red" },
        },
      ]}
      layout={{
        width: 700,
        height: 500,
        xaxis: {
          type: "date",
        },
      }}
    />
  );
};
