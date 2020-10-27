import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockPriceGraph } from "../components/StockPriceGraph"

export const StockPage = () => {
  let { id } = useParams();
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    console.log(id)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticker: id.toUpperCase(),
        future_observations_count: 3,
      }),
    };
    fetch("http://localhost:5000/arima-forecast", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const history = data["history"];
        setDates(Object.keys(history)); 
        const getPrices = [] 
        dates.forEach(date => getPrices.push(history[date]))
        setPrices(getPrices)
      });
  }, [id]);
  return <StockPriceGraph x={dates} y={prices} />
};
