from app import app
import pandas as pd
from flask import jsonify

industry_relations = pd.read_csv('../datasets/industry_relations.csv')

@app.route('/get-industry-list')
def get_industry_list():
    industry_list = industry_relations['Industry'].dropna().unique().tolist()

    return jsonify({ 'industry_list': industry_list })
