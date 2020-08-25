from flask import Flask, render_template
import fetch_data
import json

app = Flask(__name__)

images = fetch_data.get_img_data()

test_dict = {
    'key':'value'
}

@app.route("/")
def testFunction():
    return render_template("index.html", test=test_dict)

@app.route("/about")
def renderAbout():
    return"<h1>Here's the About Page</h1>"

@app.route("/data")
def renderImgData():
    return images


if __name__ == '__main__':
    # will auto restart server upon save
    app.run(debug=True)