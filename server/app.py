from flask import Flask
app = Flask(__name__)

@app.route('/')
def entry(debug=True):
    return 'server is running'
