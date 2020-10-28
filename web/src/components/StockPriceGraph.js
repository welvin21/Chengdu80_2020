import React from "react";
import Plot from "react-plotly.js";
import { Spin } from "antd";

export const StockPriceGraph = ({ isLoading, history, prediction }) => {
  if(isLoading) {
    return <Spin style={{ marginTop: "8px" }} />
  }

  return (
    <Plot
      style={{ width: "100%" }}
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
        height: 300,
        xaxis: {
          type: "date",
        },
        margin: {
          l: 40,
          r: 40,
          t: 40,
          b: 40
        }
      }}
      config={{ displayModeBar: false }}
    />
  );
};
