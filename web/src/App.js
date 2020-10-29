import React, { useState } from "react";
import "./App.less";
import { Routes } from "./components";
import { PortfolioContext } from "./context";

function App() {
  const [portfolio, setPortfolio] = useState([{ ticker: "AAPL" }]);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <div className="App" style={{ height: "100%" }}>
        <Routes />
      </div>
    </PortfolioContext.Provider>
  );
}

export default App;
