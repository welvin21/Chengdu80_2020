from app import app
import pandas as pd
from flask import request, jsonify

@app.route('/get-stock-data')
def get_stock_data():
    transaction_data = pd.read_csv('../datasets/transaction_data_cleaned.csv')
    industry_data = pd.read_csv('../datasets/industry_relations.csv')
    industry_data = industry_data.fillna("")
    
    requested_ticker = request.args.get('ticker')

    ticker_rows = transaction_data.loc[transaction_data['TICKER'] == requested_ticker]
    stock_data = {'ticker': requested_ticker, 'company_name': ticker_rows['COMNAM'].iloc[0], 'market_data': []}
    for index, row in ticker_rows.iterrows():
        current_date_data = {'date': row['date']}
        current_date_data['low'] = row['BIDLO']
        current_date_data['open'] = row['OPENPRC']
        current_date_data['high'] = row['ASKHI']
        current_date_data['close'] = row['PRC']
        current_date_data['volume'] = row['VOL']
        current_date_data['outstanding'] = row['SHROUT']
        stock_data['market_data'].append(current_date_data)

    tickers_industry = industry_data[industry_data['TICKER'] == requested_ticker]['Industry'].values[0]
    stock_data['industry'] = tickers_industry

    return jsonify(stock_data)

