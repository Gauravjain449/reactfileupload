import flask
from flask import request
from flask_cors import CORS
import pdb

app = flask.Flask(__name__)

app.config["DEBUG"] = True

CORS(app)



@app.route('/', methods=['POST'])
def home():
    if request.method == 'POST':
        print(request.files)
        #pdb.set_trace()
        return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

app.run()
