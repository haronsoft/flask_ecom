from flask_wtf import Form
from wtforms import TextField, TextAreaField, SubmitField, PasswordField, BooleanField
from flask_wtf import FlaskForm
from wtforms import  StringField, SubmitField, validators
class SearchForm(FlaskForm):
    searchField =  StringField('Search')
    submitBtn = SubmitField("Search")

class User(FlaskForm):
    full_names =  StringField('Full names')
    email_address =  StringField('Email Address')
    delivery_address = StringField('Delivery Address')
    submit = SubmitField("Complete")