import React from "react";

export const StockCard = ({ stockInfo, selected }) => {
  const { company_name: companyName, ticker, open, close } = stockInfo;

  return (
    <div style={{ 
      padding: 12,
      paddingTop: 20,
      paddingBottom: 20, 
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "space-between",
      backgroundColor: selected ? "#4E2286" : "#001628",  
      alignItems: "center"    
    }}>
      <div>
        <p style={{ fontWeight: "bold", fontSize: 18 }}>{ticker}</p>
        <p style={{ fontSize: 12, marginBottom: 0 }}>{companyName}</p>
      </div>
      <div>
        <p style={{ paddingBottom: 4, fontWeight: "bold", textAlign: "right" }}>{close}</p>
        <p style={{ marginBottom: 0, textAlign: 'right', color: close >= open ? "#4db85b" : "red" }}>{`${open > close ? "-" : "+"}${(close-open).toFixed(2)}`}</p>
      </div>
    </div>
  )
}