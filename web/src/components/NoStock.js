import React from "react";
import { Empty } from 'antd';

export default function NoStock() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 200,
      }}
      description={
        <span>
            Select a stock to view its trend
        </span>
      }
    ></Empty>
  );
}
