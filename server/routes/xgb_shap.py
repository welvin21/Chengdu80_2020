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
import json

transaction_data = pd.read_csv('../datasets/transaction_data.tsv', sep='\t')

stocks = {}

for ticker in transaction_data['TICKER'].unique():
    stock = transaction_data[transaction_data['TICKER'] == ticker]
    stocks[ticker] = stock

stocks_industry = {}

with open('../database/industry_info/stock_industry.json', 'r') as fp:
    stocks_industry = json.load(fp)

@app.route('/stock-predictions', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_stock_predictions():
    start = time.time()
    ticker = request.args.get('ticker')
    date = -1

    np.random.seed(312)

    try:
        

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

        if stocks_industry.get(ticker) != None:
            industry = stocks_industry.get(ticker)

            industry_df = pd.read_csv(f'../database/industry_info/{industry}_returns.csv')
            industry_df.set_index('date', inplace=True, drop=True)
            df['avg_industry_return'] = industry_df['avg_return']

        df.dropna(inplace = True)
        X = df[df.columns[~df.columns.isin(['1_day_return','TICKER'])]]
        y = df.loc[:, '1_day_return']

    except:
        return jsonify({})


    
    xgb = XGBClassifier()
    xgb.fit(X.iloc[:-1], y.iloc[:-1])

    predict_for = pd.DataFrame(X.iloc[date]).T
    print(predict_for)

    # print(xgb.predict(X))
    answer = xgb.predict_proba(predict_for)[0]
    prediction = xgb.predict(predict_for)[0]
    confidence = max(answer) * 100

    feature_scores = xgb._Booster.get_score()
    
    descriptors = {'OPENPRC': 'The open price', 
               'SHROUT': 'The number of shares outstanding', 
               'Moving_Avg': 'The average price of the stock over a rolling window of 20 days', 
               'Ultimate_Oscillator': 'Larry Williams’ (1976) signal, a momentum oscillator designed to capture momentum across three different timeframes.',
               'VOL': 'The volume traded today',
               'Stochastic_Oscillator': 'Developed in the late 1950s by George Lane. The stochastic oscillator presents the location of the closing price of a stock in relation to the high and low range of the price of a stock over a period of time, typically a 14-day period.',
               'BIDLO': 'The lowest bid price today',
               'ASKHI': 'The highest asking price today',
               'Slow_Exp_Moving_Avg': 'This is a first-order infinite impulse response filter that applies weighting factors which decrease exponentially. Basically, a fancy moving average.',
               'return': 'The return of the stock today, i.e. perentage change from the price yesterday to the price today',
               'RSI_Indicator': 'Compares the magnitude of recent gains and losses over a specified time period to measure speed and change of price movements of a security. It is primarily used to attempt to identify overbought or oversold conditions in the trading of an asset.',
               'BollingerB_DOWN': 'Developed by John Bollinger, Bollinger Bands® are volatility bands placed above and below a moving average. Volatility is based on the standard deviation, which changes as volatility increases and decreases',
               'BollingerB_UP': 'Developed by John Bollinger, Bollinger Bands® are volatility bands placed above and below a moving average. Volatility is based on the standard deviation, which changes as volatility increases and decreases',
               'Momentum_Factor': 'Simple Momentum of the stock',
               'PRC': 'The closing price of the stock',
               'MACD': 'A trend-following momentum indicator that shows the relationship between two moving averages of prices. The MACD is calculated by subtracting the 26-day exponential moving average (EMA) from the 12-day EMA',
               'Fast_Exp_Moving_Avg': 'This is a first-order infinite impulse response filter that applies weighting factors which decrease exponentially. Basically, a fancy moving average.',
               'avg_industry_return': 'The Average returns of the industry the stock is a part of.',
               'Moving_Std_Deviation': 'The standard deviation over a period of 20-days'
               }

    links = {'OPENPRC': '', 
            'SHROUT': '', 
            'Moving_Avg': 'https://en.wikipedia.org/wiki/Moving_average', 
            'Ultimate_Oscillator': 'http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:ultimate_oscillator',
            'VOL': '',
            'Stochastic_Oscillator': 'https://school.stockcharts.com/doku.php?id=technical_indicators:stochastic_oscillator_fast_slow_and_full',
            'BIDLO': '',
            'ASKHI': '',
            'Slow_Exp_Moving_Avg': 'https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average',
            'return': '',
            'RSI_Indicator': 'https://www.investopedia.com/terms/r/rsi.asp',
            'BollingerB_DOWN': 'https://school.stockcharts.com/doku.php?id=technical_indicators:bollinger_bands',
            'BollingerB_UP': 'https://school.stockcharts.com/doku.php?id=technical_indicators:bollinger_bands',
            'Momentum_Factor': 'https://school.stockcharts.com/doku.php?id=technical_indicators:rate_of_change_roc_and_momentum',
            'PRC': '',
            'MACD': 'https://www.investopedia.com/terms/m/macd.asp',
            'Fast_Exp_Moving_Avg': 'https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average',
            'avg_industry_return': '',
            'Moving_Std_Deviation': 'https://en.wikipedia.org/wiki/Moving_average'
            }

    classes = ['High', 'High', 'High', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low',  'Almost None', 'Almost None', 'Almost None', 'Almost None', 'Almost None', 'Almost None']

    scores = [[feature, weight]for feature, weight in feature_scores.items()]

    scores.sort(key = lambda x: x[1], reverse = True)

    for i, score in enumerate(scores):
        feature = score[0]
        score[1] = str(score[1])
        score.append(classes[i])
        score.append(descriptors[feature])
        score.append(links[feature])

    results = {
        'prediction' : str(prediction),
        'confidence' : str(confidence),
        'feature_importance': feature_scores,
        'descriptions' : scores 
    }
    end = time.time()

    print(end - start)
    
    return jsonify(results)