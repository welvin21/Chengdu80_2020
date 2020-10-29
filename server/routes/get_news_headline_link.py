from app import app
import pandas as pd
from flask import request, jsonify
from googlesearch import search

@app.route('/get-news-headline-link')
def get_news_headline_link():
    try:
        headline = request.args.get('headline')
    except:
        return jsonify({})

    link = ""
    for result in search(headline, tld="co.in", num=1, stop=1, pause=2): 
        link = result 

    return jsonify({ 'link': link })
