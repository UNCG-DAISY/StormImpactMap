from flask import Flask
app = Flask(__name__)

def testFunction():
    return "this is my first flaks application"

@app.route("/")