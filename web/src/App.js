import React, { useState } from "react";
import "./App.less";
import { Routes } from "./components";
import { PortfolioContext } from "./context";

function App() {
  const localStorage = window.localStorage;
  const localStoragePortfolio =
    JSON.parse(localStorage.getItem("portfolio")) || [];

  const [portfolio, setPortfolio] = useState(localStoragePortfolio);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <div className="App" style={{ height: "100%" }}>
        <Routes />
      </div>
    </PortfolioContext.Provider>
  );
}

export default App;
