import React from 'react';
import { Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export const StockNodeAdjacentInfo = ({ ticker, industryData }) => {
	const nodesList = 
		ticker ? 
		industryData.links
		.filter(
			(link) => link.source === ticker || link.target === ticker
		)
		.map((link) => {
			if (link.source === ticker)
				return { ticker: link.target, value: link.label };
			else if (link.target === ticker)
				return { ticker: link.source, value: link.label };
		}).sort((a,b) => b.value - a.value)
	: {};
	
	console.log(nodesList);
	return (
		<div style={{ padding: "4px 24px 24px 24px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
			  <Text strong style={{ fontSize: "20px", marginRight: "8px" }}>Positive:</Text>
        {
          nodesList && nodesList.length > 0 && nodesList.slice(0, 5).map(stock => 
            <Link to={`/stocks/${stock.ticker}`}>
              <Tag style={{ marginRight: "8px", backgroundColor: "#001628", color: "white", cursor: "pointer" }}>
                {`${stock.ticker} ${stock.value}`}
              </Tag>
            </Link>
          )
        }
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Text strong style={{ fontSize: "20px", marginRight: "8px" }}>Negative:</Text>
        {
          nodesList && nodesList.length > 0 && nodesList.slice(-5).reverse().map(stock => 
            <Link to={`/stocks/${stock.ticker}`}>
              <Tag style={{ marginRight: "8px", backgroundColor: "#001628", color: "white", cursor: "pointer" }}>
                {`${stock.ticker} ${stock.value}`}
              </Tag>
            </Link>
          )
        }
      </div>
		</div>
	);
}