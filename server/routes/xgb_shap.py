from app import app
from flask import jsonify, request
from flask_cors import cross_origin
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
from time import time
from datetime import date, timedelta
import pickle
import xgboost
from xgboost import plot_importance, XGBClassifier
import matplotlib.pyplot as plt
import shap
import time

transaction_data = pd.read_csv('../datasets/transaction_data.tsv', sep='\t')

stocks = {}

for ticker in transaction_data['TICKER'].unique():
    stock = transaction_data[transaction_data['TICKER'] == ticker]
    stocks[ticker] = stock
    

@app.route('/stock-predictions', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_stock_predictions():
    start = time.time()
    ticker = request.args.get('ticker')
    date = -1

    try:
        df = stocks[ticker].copy()
        df['return'] = df['PRC'].pct_change()
        df.drop( columns = ['COMNAM'], inplace = True)
        df.set_index('date', inplace=True, drop=True)
        df['1_day_return'] = df['return'].shift(-1)
        df['1_day_return'] = np.where(df['1_day_return'] > 0, 1, 0)
        df.dropna(inplace = True)
        X = df[df.columns[~df.columns.isin(['1_day_return','TICKER'])]]
        y = df.loc[:, '1_day_return']
    except:
        return jsonify({})

    xgb = XGBClassifier()
    xgb.fit(X, y)

    predict_for = pd.DataFrame(X.iloc[date]).T


    answer = xgb.predict_proba(predict_for)[0]
    prediction = xgb.predict(predict_for)[0]
    confidence = max(answer) * 100
    
    print('Predicted Label:', prediction)
    print('Confidence:', confidence * 100)

    results = {
        'prediction' : str(prediction),
        'confidence' : str(confidence),
        'feature_importance': xgb._Booster.get_score()
    }
    end = time.time()

    print(end - start)
    
    return jsonify(results)