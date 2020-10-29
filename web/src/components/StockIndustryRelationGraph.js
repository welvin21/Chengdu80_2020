import React from "react";
import Plot from "react-plotly.js";

export const StockIndustryRelationGraph = ({ loading, data }) => {
  return (
    <Plot
      style={{ width: "100%" }}
      data={[
        {
          x: data["dates"],
          y: data["stock_returns"],
          type: "scatter",
          line: {
            color: '#3dd440',
            width: 2,
            dash: 'dot',
          },
          mode: "lines",
          name: "Stock Return",
        },
        {
          x: data["dates"],
          y: data["average_returns"],
          type: "scatter",
          mode: "lines",
          line: {
            color: '#4E2286',
            width: 1,
            type: "dotted",
          },
          name: "Industry Average Return",
        },
      ]}
      layout={{
        height: 300,
        xaxis: {
          type: "date",
          autorange: true,
        },
        yaxis: { 
            autorange: true,
        },
        margin: {
          l: 40,
          r: 40,
          t: 40,
          b: 40,
        },
        rangeselector: {buttons: [
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 6,
              label: '6m',
              step: 'month',
              stepmode: 'backward'
            },
            {step: 'all'}
          ]},
        rangeslider: {range: ['2012-01-01', '2012-12-31']},
      }}
      config={{ displayModeBar: false }}
    />
  );
};
