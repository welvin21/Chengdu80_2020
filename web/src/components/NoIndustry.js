import React from "react";
import { Empty } from "antd";

export const NoIndustry = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 200,
      }}
      description={
        <span>
          Select an industry to view correaltion between stocks in that industry
        </span>
      }
    ></Empty>
  );
};
