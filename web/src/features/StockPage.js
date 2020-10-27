import React from "react";
import { StockPrice } from "../components/StockPrice";
import { useParams } from "react-router-dom"

export const StockPage = () => {
  let { id } = useParams();
  return( 
    <StockPrice id={id}/>
  )
};
