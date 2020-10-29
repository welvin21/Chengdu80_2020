from app import app
import pandas as pd
from flask import request,jsonify
import numpy as np
import csv 
import math

def spearman_corr(first, second):
    return first.corr(second, method='spearman')

@app.route('/get-diversify-recommendations', methods=['POST'])
def get_diversify_recommendations():
    req_data = request.get_json() 
    portfolio = req_data['portfolio']

    allreturns = pd.read_csv(f"../database/industry_info/all_stocks_returns.csv", sep=',')
    dates = allreturns['date']
    df = allreturns[portfolio]

    output = {}
    avg = df.mean(axis=1)
    for ticker in allreturns.columns:
        if('return' in ticker):
            output[ticker.replace('_return', '')] = spearman_corr(avg, allreturns[ticker])
    sortedOutput = sorted(output.items(), key=lambda x: x[1])
    result = sortedOutput[:10]
    return jsonify({'recommendations': result})
