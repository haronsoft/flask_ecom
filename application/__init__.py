from flask import Flask
from flask_session import Session
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.secret_key= "hdkdkdsj"
SESSION_TYPE ="filesystem"
app.config.from_object(__name__)
sess = Session()
sess.init_app(app)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

from application import models
from application import views

