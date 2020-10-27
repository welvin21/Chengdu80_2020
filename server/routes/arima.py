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
        df = stocks[ticker]
    except:
        return jsonify({})
    
    history = [x for x in df['PRC'].values]
    model_predictions = []
    
    for time_point in range(future_observations_count):
        model = ARIMA(history, order=(7,1,0))
        model_fit = model.fit(disp=0)
        output = model_fit.forecast()
        y_hat = output[0]
        model_predictions.append(y_hat.tolist()[0])
        history.append(y_hat.tolist()[0])

    date_data = df['date'].values.tolist()
    history_data = {date_data[i]: history[i] for i in range(len(date_data))}

    date_split = [int(i) for i in date_data[-1].split("/")]
    start_date = date(*date_split)

    prediction_data = {}
    
    curr_date = start_date
    for model_prediction in model_predictions:
        if(curr_date.weekday() == 4):
            curr_date = curr_date + timedelta(days=3)
        else:
            curr_date = curr_date + timedelta(days=1)

        prediction_data[curr_date.strftime("%Y/%m/%d")] = model_prediction

    return jsonify({'history': history_data, 'prediction': prediction_data})
    
    
