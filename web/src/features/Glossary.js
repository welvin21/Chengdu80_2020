import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MDXProvider } from "@mdx-js/react";
import sample from "../glossary/sample.md";
import { Typography, Card } from "antd";

const { Title, Text } = Typography;

const renderers = {
  paragraph: props => (
    <Card style={{ margin: "1em", textAlign: "left" }}>
      <Text {...props} />
    </Card>
  ),
  anchor: props => <a {...props} target="_blank" />,
};

export const Glossary = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(sample)
      .then(response => response.text())
      .then(text => {
        setText(text);
      });
  }, []);

  return (
    <div
      style={{
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <ReactMarkdown source={text} renderers={renderers} />
    </div>
  );
};
