from app import app
import pandas as pd
from flask import request, jsonify

df = pd.read_csv("../database/news_data.csv")

@app.route('/get-news-sentiments')
def get_news_sentiments():
    try:
        ticker = request.args.get('ticker')
    except:
        return jsonify({})

    news_df = df[df['ticker'] == ticker]

    positive, negative, neutral = [], [], []

    for _, row in news_df[::-1].iterrows():
        if(row['sentimentClass'] == 1):
            positive.append({ "headline": row['headline'], "date": row['date'], "score": round(row['sentimentPositive'],3)})
        elif(row['sentimentClass'] == -1):
            negative.append({ "headline": row['headline'], "date": row['date'], "score": round(row['sentimentNegative'],3)})
        else:
            neutral.append({ "headline": row['headline'], "date": row['date'], "score": round(row['sentimentNeutral'],3)})
            
    return jsonify({'positive': positive, 'negative': negative, 'neutral': neutral })
