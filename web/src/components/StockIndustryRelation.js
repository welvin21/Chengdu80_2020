import React, { useEffect, useState } from 'react'
import { Typography } from "antd";
import { StockIndustryRelationGraph } from './StockIndustryRelationGraph';


const { Title } = Typography;

export const StockIndustryRelation = ({id, industry}) => { 
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({dates:[], stock_returns:[], average_returns:[]})
    useEffect(() => { 
        fetch(`http://localhost:5000/get-returns-data?ticker=${id}&industry=${industry}`)
        .then(response => response.json())
        .then(data => {
            const dates = data.dates ? data.dates.map(date => date.split(String.fromCharCode(47)).join("-")) : []
            setData({dates, stock_returns:data.stock_returns, average_returns:data.average_returns})
            setLoading(false)
        })
    }, [id, industry])
    return( 
        <div>
        <div style={{ padding: "12px", backgroundColor: "#001628" }}>
          <Title level={4} style={{ margin: 0, color: "white" }}>{id} Correlation with {industry} Average Return</Title>
        </div>
        <StockIndustryRelationGraph data={data} loading={loading}/>
      </div>
    )
}