from app import app
import pandas as pd
from flask import jsonify

@app.route('/get-stock-list')
def get_stock_list():
    df = pd.read_csv('..//database/last_date_price.csv')
    stock_list = []
    for index, row in df.iterrows():
        current = {'ticker': row['TICKER'], 'price': row['PRC'], 'company_name': row['COMNAM']}
        stock_list.append(current)

    print(stock_list)
    return jsonify(stock_list)
