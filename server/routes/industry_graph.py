from app import app
import pandas as pd
from flask import request,jsonify
import csv 
import math 


@app.route('/get-industry-graph')
def get_industry_graph():
    industry = request.args.get('industry')
    industry = industry.replace(' ', '_').lower()
    metric = request.args.get('metric', 'pearson')
    metric = metric.lower()

    try:
        industry_links = pd.read_csv(f"../database/graphs/{metric}/{industry}.csv", sep=',')
    except:
        industry_links = pd.read_csv(f"../database/graphs/pearson/{industry}.csv", sep=',') 

    tickers = industry_links['tickers']
    links = [] 
    for i in range(len(tickers)): 
        for j in range(i+1,len(tickers)): 
            links.append({
                    "source": tickers[i],
                    "target": tickers[j], 
                    "label": round(industry_links[tickers[i]][j],3) 
                }) 
    nodes = [] 
    for ticker in tickers: 
        nodes.append({ "id": ticker})
    return jsonify({"links": links, "nodes": nodes})




