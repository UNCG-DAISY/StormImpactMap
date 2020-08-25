from flask import Flask, render_template
import fetch_data

app = Flask(__name__)

@app.route("/")
def testFunction():
    return render_template("index.html")

@app.route("/about")
def renderAbout():
    return"<h1>Here's the About Page</h1>"

@app.route("/data")
def renderImgData():
    return fetch_data.get_img_data()


if __name__ == '__main__':
    # will auto restart server upon save
    app.run(debug=True)