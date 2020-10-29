import React from "react";
import { Typography, Card, Avatar, Affix } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Meta } = Card;

export const RecommendationsDiversify = ({ container }) => {
  return (
    <div style={{ height: "100%" }}>
      <Affix target={container}>
        <div style={{ padding: "12px", backgroundColor: "#001628" }}>
          <Title
            level={4}
            style={{ margin: 0, color: "white", textAlign: "left" }}
          >
            Recommendations to diversify your portfolio
          </Title>
        </div>
      </Affix>
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          display: "flex",
          alignItems: "baseline",
          height: "100%"
        }}
      >
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    </div>
  );
};
