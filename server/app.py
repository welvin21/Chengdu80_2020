from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../web/build", template_folder="../web/build")
CORS(app, support_credentials=True)

import routes.arima
import routes.get_stock_list
import routes.get_stock_data
import routes.industry_graph
import routes.get_industry_list
import routes.xgb_shap
import routes.get_returns_data
import routes.get_diversify_recommendations
import routes.get_news_sentiments
import routes.get_stock_data_by_industry
import routes.get_news_headline_link

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin(supports_credentials=True)
def entry(path):
    return app.send_static_file('index.html')
    # return 'server is running'
