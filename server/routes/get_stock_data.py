from app import app
import pandas as pd
from flask import request, jsonify

@app.route('/get-stock-data')
def get_stock_data():
    requested_ticker = request.args.get('ticker')
    print(requested_ticker)
    transaction_data = pd.read_csv('../datasets/transaction_data_cleaned.csv')

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

    return jsonify(stock_data)

