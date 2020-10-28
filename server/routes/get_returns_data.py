from app import app
import pandas as pd
from flask import request, jsonify


@app.route('/get-returns-data')
def get_returns_data():
    ticker = request.args.get('ticker')
    industry = request.args.get('industry')
    industry = industry.replace(" ", "_").lower()

    try:
        returns_data = pd.read_csv(f'../database/industry_info/{industry}_returns.csv')
    except Exception as e:
        print(e) 
        return jsonify({})

    dates = returns_data['date'].values.tolist()
    average_returns = returns_data['avg_return'].fillna('ffill').values.tolist()
    
    try:
        stock_returns = returns_data[f"{ticker.upper()}_return"].fillna('ffill').tolist()
    except Exception as e:
        print(e) 
        return jsonify({})

    
    return jsonify({ "dates": dates, "stock_returns": stock_returns, "average_returns": average_returns})

