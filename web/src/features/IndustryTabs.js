import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Row } from "antd";
import { IndustryGraphPage } from "./IndustryGraphPage";

export const IndustryTabs = () => {
  let { industry } = useParams();
  return (
    <div>
      <IndustryGraphPage industry={industry}  />
    </div>
  );
};
