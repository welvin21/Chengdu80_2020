from app import app
from flask import jsonify, request
from flask_cors import cross_origin
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
from time import time
from statsmodels.tsa.arima_model import ARIMA, ARIMAResults
from datetime import date, timedelta

transaction_data = pd.read_csv('../datasets/transaction_data.tsv', sep='\t')

stocks = {}
for ticker in transaction_data['TICKER'].unique():
    stocks[ticker] = transaction_data[transaction_data['TICKER'] == ticker]

@app.route('/arima-forecast', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_arima_prediction():
    request_data = request.get_json()

    ticker = request_data['ticker']
    future_observations_count = request_data.get('future_observations_count', 10)

    try:
        df = pd.read_csv(f"../database/arima/{ticker.upper()}.csv")
    except:
        return jsonify({})
    
    history = df[df['is_prediction'] == True]
    prediction = df[df['is_prediction'] == False]

    history_data = { data['date']: data['PRC'] for _, data in history.iterrows()}

    prediction_data = { data['date']: data['PRC'] for _, data in prediction.head(future_observations_count).iterrows() }

    return jsonify({ 'history': history_data, 'prediction': prediction_data } )
    