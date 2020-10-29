import React from "react";
import { Typography, Card, Avatar } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Meta } = Card;

export const RecommendationsDiversify = () => {
  return (
    <div>
      <div style={{ padding: "12px", backgroundColor: "#001628" }}>
        <Title
          level={4}
          style={{ margin: 0, color: "white", textAlign: "left" }}
        >
          Recommendations to diversify your portfolio
        </Title>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          display: "flex",
          alignItems: "baseline",
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
