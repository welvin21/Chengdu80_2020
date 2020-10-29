import { createContext } from "react";

export const PortfolioContext = createContext({
  portfolio: [],
  setPortfolio: () => {},
});
