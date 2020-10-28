import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Graph } from "react-d3-graph";

export const IndustryGraph = ({ data, loading }) => {
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
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
    height: 800,
    width: 900,
  };
  // graph event callbacks
  const onClickGraph = function () {
    window.alert(`Clicked the graph background`);
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onDoubleClickNode = function (nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
  };

  const onRightClickNode = function (event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
  };

  const onMouseOverNode = function (nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
  };

  const onMouseOutNode = function (nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickLink = function (event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
  };

  const onMouseOverLink = function (source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
  };

  const onMouseOutLink = function (source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
  };

  const onNodePositionChange = function (nodeId, x, y) {
    window.alert(
      `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
    );
  };

  console.log("Graph page here");
  return (!loading && data.nodes.length > 0) ? (
    <Graph
      id="graph-id"
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onDoubleClickNode={onDoubleClickNode}
      onRightClickNode={onRightClickNode}
      //   onClickGraph={onClickGraph}
      onClickLink={onClickLink}
      onRightClickLink={onRightClickLink}
      //   onMouseOverNode={onMouseOverNode}
      //   onMouseOutNode={onMouseOutNode}
      //   onMouseOverLink={onMouseOverLink}
      //   onMouseOutLink={onMouseOutLink}
      //   onNodePositionChange={onNodePositionChange}
    />
  ) : (
    <h1>Select Stock to view coorelation</h1>
  );
};
