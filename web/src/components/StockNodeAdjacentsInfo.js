import React from 'react';
import { Typography, Card } from 'antd';

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
		<div style={{ marginTop: 10, marginBottom: 10, padding: 10 }}>
			{
				ticker ? 
					<div>test</div> : 
					<Text>Select a node</Text> 
			}	
		</div>
	);
}