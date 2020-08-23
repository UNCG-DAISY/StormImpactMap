from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def testFunction():
    return render_template("index.html")

@app.route("/about")
def renderAbout():
    return"<h1>Here's the About Page</h1>"


if __name__ == '__main__':
    # will auto restart server upon save
    app.run(debug=True)