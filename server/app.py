from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

import routes.arima

@app.route('/')
@cross_origin(supports_credentials=True)
def entry(debug=True):
    return 'server is running'
