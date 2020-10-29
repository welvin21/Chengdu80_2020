import React from "react";
import Plot from "react-plotly.js";

export const FeatureImportanceChart = ({ featureImportances }) => {
  const featuresSorted =
    featureImportances &&
    Object.keys(featureImportances).sort(function (a, b) {
      return featureImportances[a] - featureImportances[b];
    });
  const importanceValues =
    featuresSorted &&
    featuresSorted.map(feature => featureImportances[feature]);

  return (
    <div style={{ width: "100%" }}>
      <Plot
        style={{ width: "100%" }}
        data={[
          {
            type: "bar",
            x: importanceValues,
            y: featuresSorted,
            orientation: "h",
            marker: {
              color: "#4E2286",
            },
          },
        ]}
        layout={{
          autosize: true,
          margin: {
            l: 160,
            r: 40,
            t: 20,
            b: 40,
          },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};
