from app import app
import pandas as pd
from flask import jsonify

industry_relations = pd.read_csv('../datasets/industry_relations.csv')
industry_relations.dropna(inplace=True)

@app.route('/get-stock-data-by-industry')
def get_stock_data_by_industry():
    industries = industry_relations['Industry'].unique().tolist()
    stock_data = {industry: industry_relations[industry_relations['Industry'] == industry]['TICKER'].unique().tolist() for industry in industries}

    return jsonify(stock_data)
