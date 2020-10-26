from flask import Flask
app = Flask(__name__)

import routes.arima

@app.route('/')
def entry(debug=True):
    return 'server is running'
