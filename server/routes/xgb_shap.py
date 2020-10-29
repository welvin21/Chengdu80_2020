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
import ta
from ta.volatility import BollingerBands
from ta.trend import ADXIndicator
from ta.momentum import UltimateOscillator, RSIIndicator, StochasticOscillator

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

    np.random.seed(312)

    try:
        # industry_df = pd.read_csv(f'/content/industry_info/{industry}_returns.csv')
        # industry_df.set_index('date', inplace=True, drop=True)

        df = stocks[ticker].copy()
        df['return'] = df['PRC'].pct_change()
        df.drop( columns = ['COMNAM'], inplace = True)
        df.set_index('date', inplace=True, drop=True)
        df['1_day_return'] = df['return'].shift(-1)
        df['1_day_return'] = np.where(df['1_day_return'] > 0, 1, 0)

        ewma = pd.Series.ewm

        df['Fast_Exp_Moving_Avg'] = df['PRC'].transform(lambda x: ewma(x, span = 12).mean())
        df['Slow_Exp_Moving_Avg'] = df['PRC'].transform(lambda x: ewma(x, span = 26).mean())
        df['Momentum_Factor'] = df['Fast_Exp_Moving_Avg']/df['Slow_Exp_Moving_Avg']

        df['Moving_Avg'] = df['PRC'].transform(lambda x: x.rolling(window=20).mean())
        df['Moving_Std_Deviation'] = df['PRC'].transform(lambda x: x.rolling(window=20).std())  
        
        df['Ultimate_Oscillator'] = UltimateOscillator(df['ASKHI'], df['BIDLO'], df['PRC'], fillna = True).uo()
        df['RSI_Indicator'] = RSIIndicator(df['PRC'], 14, False).rsi()
        df['Stochastic_Oscillator'] = StochasticOscillator(df['ASKHI'], df['BIDLO'], df['PRC'], 14, 3, True).stoch()

        # print("3")
        n_fast = 12
        n_slow = 26
        df['MACD'] = df['Slow_Exp_Moving_Avg'] - df['Fast_Exp_Moving_Avg']

        # Bollinger Bands
        df['BollingerB_UP'] =  df['Moving_Avg'] + df['Moving_Std_Deviation']*2
        df['BollingerB_DOWN'] = df['Moving_Avg'] - df['Moving_Std_Deviation']*2

        df.dropna(inplace = True)
        X = df[df.columns[~df.columns.isin(['1_day_return','TICKER'])]]
        y = df.loc[:, '1_day_return']

    except:
        return jsonify({})

    xgb = XGBClassifier(random_state=0, seed = 312)

    xgb.fit(X.iloc[:-1], y.iloc[:-1])

    predict_for = pd.DataFrame(X.iloc[date]).T

    answer = xgb.predict_proba(predict_for)[0]
    prediction = xgb.predict(predict_for)[0]
    confidence = max(answer) * 100
    
    print('Predicted Label:', prediction)
    print('Confidence:', confidence)

    results = {
        'prediction' : str(prediction),
        'confidence' : str(confidence),
        'feature_importance': xgb._Booster.get_score()
    }
    end = time.time()

    print(end - start)
    
    return jsonify(results)