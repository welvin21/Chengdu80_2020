import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  InputNumber,
  Tooltip,
  TreeSelect,
  Card,
  Typography,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IndustryGraph } from "../components/IndustryGraph";
import { usePrevious } from "../utility/hooks";
import { IndustryStockGraph } from "../components/IndustryStockGraph";
import { StockNodeAdjacentInfo } from "../components/StockNodeAdjacentsInfo";

const { SHOW_PARENT } = TreeSelect;
const { Title } = Typography;

export const IndustryGraphPage = ({ industry }) => {
  const prevIndustry = usePrevious(industry);
  const [metric, setMetric] = useState("pearson");
  const prevMetric = usePrevious(metric);
  const [data, setData] = useState({ nodes: [], links: [] });
  const [industryData, setIndustryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueThreshold, setValueThreshold] = useState(0.7);
  const [stocksList, setStocksList] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [selectedNode, setSelectedNode] = useState();
  const [selectedLink, setSelectedLink] = useState({
    source: "",
    target: "",
    label: "",
  });
  const metricButtons = [
    {
      title: "Pearson Correlation",
      value: "pearson",
      changeMetric: () => {
        setMetric("pearson");
      },
    },
    {
      title: "Kendall-Tau Correlation",
      value: "kendall-tau",
      changeMetric: () => setMetric("kendall-tau"),
    },
    {
      title: "Spearman Correlation",
      value: "spearman",
      changeMetric: () => setMetric("spearman"),
    },
  ];
  const onChange = value => {
    if (isNaN(value)) {
      return;
    }
    setValueThreshold(value);
  };

  const selectStocks = value => {
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
    if (prevIndustry !== industry) {
      setSelectedStocks([]);
      setValueThreshold(0.7);
    }
    if (
      prevIndustry !== industry ||
      industryData.length === 0 ||
      prevMetric !== metric
    ) {
      fetch(
        `http://localhost:5000/get-industry-graph?industry=${industry}&metric=${metric}`
      )
        .then(response => response.json())
        .then(data => {
          const industryData = data;
          setIndustryData(data);
          const stocks = industryData.nodes.map(({ id }) => ({
            title: id,
            value: id,
            key: id,
          }));
          setStocksList(stocks);
          const filteredLinks = industryData.links.filter(
            item =>
              Math.abs(item.label) > valueThreshold &&
              (selectedStocks.includes(item.source) ||
                selectedStocks.includes(item.target))
          );
          const filteredNodes = new Set();
          filteredLinks.forEach(({ source, target }) => {
            filteredNodes.add(source);
            filteredNodes.add(target);
          });
          const filteredNodesArray = Array.from(filteredNodes).map(node => ({
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
        item =>
          Math.abs(item.label) > valueThreshold &&
          (selectedStocks.includes(item.source) ||
            selectedStocks.includes(item.target))
      );
      const filteredNodes = new Set();
      filteredLinks.forEach(({ source, target }) => {
        filteredNodes.add(source);
        filteredNodes.add(target);
      });
      const filteredNodesArray = Array.from(filteredNodes).map(node => ({
        id: node,
      }));
      setData({
        nodes: filteredNodesArray,
        links: filteredLinks,
      });
      setLoading(false);
    }
  }, [industry, valueThreshold, selectedStocks, metric, selectedNode]);
  return (
    <Row>
      <Col span={12}>
        <Card style={{ minHeight: "85vh", width: "100%" }}>
          <Row>
            <Col span={24}>
              {metricButtons.map(button => (
                <Button
                  style={{ marginRight: "0em" }}
                  onClick={button.changeMetric}
                  type={button.value == metric ? "primary" : ""}
                >
                  {button.title}
                </Button>
              ))}
              <Tooltip
                placement="topLeft"
                title="Different metrics for finding correlations, read more in glossary"
                arrowPointAtCenter
              >
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
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
          <Row>
            <Col span={24}>
              <IndustryGraph
                loading={loading}
                data={data}
                setSelectedNode={setSelectedNode}
                setSelectedLink={setSelectedLink}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Row style={{ marginLeft: "1em" }}>
          <div
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#001628",
            }}
          >
            <Title level={4} style={{ color: "white", margin: 0 }}>
              Correlation Analysis
            </Title>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              paddingTop: "8px",
            }}
          >
            <IndustryStockGraph ticker={selectedLink.source} color="#4E2286" />
            <IndustryStockGraph ticker={selectedLink.target} color="#001628" />
            <Title level={4} style={{ textAlign: "center" }}>
              Top 5 related firms {selectedNode ? ` for ${selectedNode}` : ""}
            </Title>
            <StockNodeAdjacentInfo
              ticker={selectedNode}
              industryData={industryData}
            />
          </div>
        </Row>
      </Col>
    </Row>
  );
};
