from app import app
import pandas as pd
from flask import jsonify

df = pd.read_csv('..//database/last_date_price.csv')

@app.route('/get-stock-list')
def get_stock_list():
    stock_list = []
    for index, row in df.iterrows():
        current = {'ticker': row['TICKER'], 'price': row['PRC'], 'company_name': row['COMNAM']}
        stock_list.append(current)

    return jsonify(stock_list)
