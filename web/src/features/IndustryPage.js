import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd"; 
import { IndustryGraph } from "../components/IndustryGraph";

export const IndustryPage = () => {
  let { industry } = useParams();
  return (
    <Card>
      <IndustryGraph industry={industry} />
    </Card>
  );
};
