import React, { useEffect, useState} from "react";
import { Typography, Slider } from "antd";
import { StockPriceGraph } from "./StockPriceGraph";
import { usePrevious } from "../utility/hooks";

const { Title, Text } = Typography;

export const StockPrice = ({ id }) => {
  const prevId = usePrevious(id)
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [predictionDates, setPredictionDates] = useState([]);
  const [predictionPrices, setPredictionPrices] = useState([]);
  const [predictionPeriod, setPredictionPeriod] = useState(0);
  useEffect(() => {
    if(prevId !== id){ 
      setPredictionPeriod(0);
      setPredictionPrices([]);
    }
    setLoading(true);
    setPrices([]);
    setPredictionPrices([]);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", mode: "no-cors" },
      body: JSON.stringify({
        ticker: id.toUpperCase(),
        future_observations_count: predictionPeriod ? parseInt(predictionPeriod) : 0,
      }),
    };
    fetch("http://localhost:5000/arima-forecast", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const history = data["history"];
        const prediction = data["prediction"];
        if (history && prediction) {
          let historyDates = Object.keys(history).map((date) =>
            date.split(String.fromCharCode(47)).join("-")
          );
          setDates(historyDates);
          const predDates = Object.keys(prediction).map((date) =>
            date.split(String.fromCharCode(47)).join("-")
          );
          const getPrices = [];
          Object.keys(history).forEach((date) => getPrices.push(history[date]));
          setPrices(getPrices);
          if (predictionPeriod>0 && prevId === id) {
            const getPredictionPrices = [];
            Object.keys(prediction).forEach((date) =>
            getPredictionPrices.push(prediction[date])
          );
            setPredictionDates([dates[dates.length - 1], ...predDates]);
            setPredictionPrices([
              prices[prices.length - 1],
              ...getPredictionPrices,
            ]);
          }
          setLoading(false);
        }
      });
  }, [id, predictionPeriod, prevId]);

  const onChange = (value) => { 
    setPredictionPeriod(value)
  }
  return (
    <div>
      <div style={{ padding: "12px", backgroundColor: "#001628" }}>
        <Title level={4} style={{ margin: 0, color: "white" }}>ARIMA Forecast</Title>
        <Text style={{ color: "white" }}>
          {`forecasting for 
          ${predictionPeriod || 0} ${ predictionPeriod && predictionPeriod === 1 ? "day" : "days"}`}
          </Text>
        <Slider defaultValue={0} max={50} value={predictionPeriod} onChange={onChange}/>
      </div>
      <StockPriceGraph
        isLoading={loading}
        history={{ x: dates, y: prices }}
        prediction={{ x: predictionDates, y: predictionPrices }}
      />
    </div>
  );
};
