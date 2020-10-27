import React, { useEffect, useState, useRef } from "react";
import { Spin, Card, Input, Row, Col } from "antd";
import { StockPriceGraph } from "./StockPriceGraph";

const { Search } = Input;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const StockPrice = ({ id }) => {
  const prevId = usePrevious(id);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [predictionDates, setPredictionDates] = useState([]);
  const [predictionPrices, setPredictionPrices] = useState([]);
  const [predictionPeriod, setPredictionPeriod] = useState();
  useEffect(() => {
    if(prevId !== id){ 
      setPredictionPeriod()
    }
    console.log(id);
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
          const getPredictionPrices = [];
          Object.keys(history).forEach((date) => getPrices.push(history[date]));
          Object.keys(prediction).forEach((date) =>
            getPredictionPrices.push(prediction[date])
          );
          setPrices(getPrices);
          if (predictionPeriod) {
            setPredictionDates([dates[dates.length - 1], ...predDates]);
            setPredictionPrices([
              prices[prices.length - 1],
              ...getPredictionPrices,
            ]);
          }
          setLoading(false);
        }
      });
  }, [id, predictionPeriod]);
  const makePrediction = (value) => {
    setPredictionPeriod(parseInt(value));
  };
  const onChange = (e) => { 
    setPredictionPeriod(e.target.value)
  }
  return (
    <Card style={{ width: "800px" }}>
      <Row> 
        <Col offset={14}>
        <Search
          placeholder="Enter number of days for prediction"
          allowClear
          enterButton="Predict"
          size="large"
          onSearch={makePrediction}
          style={{ width: "300px" }}
          value={predictionPeriod}
          onChange={onChange}
        />
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Spin size="large" style={{marginTop:"auto", marginBottom:"auto"}} />
        ) : (
          <StockPriceGraph
            history={{ x: dates, y: prices }}
            prediction={{ x: predictionDates, y: predictionPrices }}
          />
        )}
      </Row>
    </Card>
  );
};
