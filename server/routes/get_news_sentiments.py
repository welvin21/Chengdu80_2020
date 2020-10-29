from app import app
import pandas as pd
from flask import request, jsonify

@app.route('/get-news-sentiments')
def get_news_sentiments():
    try:
        ticker = request.args.get('ticker')
    except:
        return jsonify({})

    news_df = pd.read_csv("../database/news_data.csv")
    news_df = news_df[news_df['ticker'] == ticker]

    positive, negative, neutral = [], [], []

    for _, row in news_df[::-1].iterrows():
        if(row['sentimentClass'] == 1):
            positive.append({ "headline": row['headline'], "date": row['date'], "score": row['sentimentPositive']})
        elif(row['sentimentClass'] == -1):
            negative.append({ "headline": row['headline'], "date": row['date'], "score": row['sentimentNegative']})
        else:
            neutral.append({ "headline": row['headline'], "date": row['date'], "score": row['sentimentNeutral']})
            
    return jsonify({'positive': positive, 'negative': negative, 'neutral': neutral })
