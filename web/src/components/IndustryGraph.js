import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Graph } from "react-d3-graph";

export const IndustryGraph = ({
  data,
  loading,
  setSelectedNode,
  setSelectedLink,
}) => {
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.5,
    focusZoom: 5,
    highlightDegree : 1,
    highlightOpacity: 1,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: true,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    linkHighlightBehavior: true,
    d3: {
      alphaTarget: 0.05,
      gravity: -400,
      linkLength: 400,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "#4E2286",
      highlightStrokeColor: "blue",
      labelProperty: "name",
      size: 500,
      fontSize: 18,
      fontWeight: "bold",
      highlightFontSize: 20,
      heightFontWeight: "bolder",
    },
    link: {
      highlightColor: "#4E2286",
      renderLabel: true,
      highlightFontSize: 14,
      fontSize: 12,
      strokeWidth: 3,
    },
    height: 700,
    width: 600,
  };
  // graph event callbacks
  const onClickNode = function (nodeId) {
    setSelectedNode(nodeId);
  };

  const onClickLink = function (source, target, label) {
    setSelectedLink({ source, target, label });
  };
  return !loading && data.nodes.length > 0 ? (
    <Graph
      id="graph-id"
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
    />
  ) : (
    <h1>Select Stock to view coorelation</h1>
  );
};
