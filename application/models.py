from flask_sqlalchemy import SQLAlchemy
import datetime
from application import app

db = SQLAlchemy(app)


class Products(db.Model):
    def __init__(self, product_name, product_description, quantity, price, image_url):
        self.product_name = product_name
        self.product_description = product_description
        self.quantity = quantity
        self.price = price
        self.image_url = image_url
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), index=False, unique=False)
    product_description = db.Column(db.String(300), index=False, unique=False)
    quantity = db.Column(db.Integer, index=False, unique=False)
    price = db.Column(db.Integer, index=False, unique=False)
    image_url =  db.Column(db.Integer, index=False, unique=False)

class Orders(db.Model):
    def __init__(self,product_id, quantity):
        self.product_id = product_id
        self.quantity = quantity
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.String(100), index=False, unique=False)
    quantity = db.Column(db.Integer, index=False, unique=False)

class OrderDetails(db.Model):
    def __init__(self,order_id, full_names, email_address, address):
        self.order_id = order_id
        self.full_names = full_names
        self.email_address = email_address
        self.address = address
    __tablename__= 'orderdetails'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, index=False, unique=False)
    full_names = db.Column(db.String(200), index=False, unique=False)
    email_address = db.Column(db.String(200), index=False, unique=False)
    address = db.Column(db.String(200), index=False, unique=False)
db.create_all()
