import React, { useState, useEffect } from "react";
import { Card, Row, Col, InputNumber, Tooltip, TreeSelect } from "antd";
import { IndustryGraph } from "../components/IndustryGraph";
import { usePrevious } from "../utility/hooks";

const { SHOW_PARENT } = TreeSelect;

export const IndustryGraphPage = ({ industry, metric }) => {
  const prevIndustry = usePrevious(industry);
  const prevMetric = usePrevious(metric);
  const [data, setData] = useState({ nodes: [], links: [] });
  const [industryData, setIndustryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueThreshold, setValueThreshold] = useState(0.8);
  const [stocksList, setStocksList] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [selectedNode, setSelectedNode] = useState();
  const [selectedLink, setSelectedLink] = useState({
    source: "",
    target: "",
    label: "",
  });
  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setValueThreshold(value);
  };

  const selectStocks = (value) => {
    setSelectedStocks(value);
  };

  const tProps = {
    treeData: stocksList,
    value: selectedStocks,
    onChange: selectStocks,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Select Stocks",
    style: {
      width: "100%",
    },
  };
  useEffect(() => {
    setLoading(true);
    // setData({ nodes: [], links: [] });
    if (prevIndustry !== industry) {
      setSelectedStocks([]);
      setValueThreshold(0.8);
    }
    if (
      prevIndustry !== industry ||
      industryData.length === 0 ||
      prevMetric !== metric
    ) {
      fetch(
        `http://localhost:5000/get-industry-graph?industry=${industry}&metric=${metric}`
      )
        .then((response) => response.json())
        .then((data) => {
          const industryData = data;
          setIndustryData(data);
          const stocks = industryData.nodes.map(({ id }) => ({
            title: id,
            value: id,
            key: id,
          }));
          setStocksList(stocks);
          const filteredLinks = industryData.links.filter(
            (item) =>
              Math.abs(item.label) > valueThreshold &&
              (selectedStocks.includes(item.source) ||
                selectedStocks.includes(item.target))
          );
          const filteredNodes = new Set();
          filteredLinks.forEach(({ source, target }) => {
            filteredNodes.add(source);
            filteredNodes.add(target);
          });
          const filteredNodesArray = Array.from(filteredNodes).map((node) => ({
            id: node,
          }));
          setData({
            nodes: filteredNodesArray,
            links: filteredLinks,
          });
          setLoading(false);
        });
    } else if (industryData.length !== 0) {
      const stocks = industryData.nodes.map(({ id }) => ({
        title: id,
        value: id,
        key: id,
      }));
      setStocksList(stocks);
      const filteredLinks = industryData.links.filter(
        (item) =>
          Math.abs(item.label) > valueThreshold &&
          (selectedStocks.includes(item.source) ||
            selectedStocks.includes(item.target))
      );
      const filteredNodes = new Set();
      filteredLinks.forEach(({ source, target }) => {
        filteredNodes.add(source);
        filteredNodes.add(target);
      });
      const filteredNodesArray = Array.from(filteredNodes).map((node) => ({
        id: node,
      }));
      setData({
        nodes: filteredNodesArray,
        links: filteredLinks,
      });
      setLoading(false);
    }
  }, [industry, valueThreshold, selectedStocks, metric]);
  return (
    <Card style={{ minHeight: "85vh" }}>
      <Row>
        <Col span={14}>
            <TreeSelect {...tProps} />
        </Col>
        <Col span={4}>
          <Tooltip
            trigger={["focus"]}
            title="Input minimum threshold correlation value"
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              min={0}
              max={1}
              style={{ margin: "0 16px" }}
              step={0.01}
              value={valueThreshold}
              onChange={onChange}
            />
          </Tooltip>
        </Col>
      </Row>
      <Row >
        <IndustryGraph loading={loading} data={data} />
      </Row>
    </Card>
  );
};
