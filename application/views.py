from flask import Flask, request, session, redirect, url_for,make_response, render_template, flash, jsonify

from . forms import SearchForm , User
from . models import Products, OrderDetails, Orders, db
from application import app
from flask_session import Session
from flask_cors import CORS, cross_origin

class CartItem():
    def __init__(self, quantity, product):
        self.quantity = quantity
        self.product = product
    product = None
    quantity = 0

@app.route('/',  methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def index():
    if 'cart' not in session:
        session['cart'] = []
    form = SearchForm()
    if request.method == 'POST':
        # ignore
        search = "%{}%".format(form.searchField.data)
        products = Products.query.filter(Products.product_name.like(search)).all()
        return render_template("index.html",form = form, products = products)
    
    products = Products.query.all()
    print(products)
    return render_template("index.html",form = form, products = products)



@app.route("/view/<productId>")
@cross_origin(supports_credentials=True)
def view_more(productId):
    search = SearchForm()
    if 'cart' not in session:
        session['cart'] = []
    details  = Products.query.get(productId)
    available = "In Stock"
    print(details)
    if details.quantity ==0:
        available = "Out of Stock"
    return render_template("iphoneX.html", form=search, details= details, available = available)


@app.route('/accessories')
@cross_origin(supports_credentials=True)
def accessories():
   return render_template("index.html",form=SearchForm())



@app.route('/phones')
@cross_origin(supports_credentials=True)
def phones():
    return render_template("index.html",form=SearchForm())


@app.route('/checkout', methods=['POST',"GET"])
@cross_origin(supports_credentials=True)
def checkout():
    form = User()
    if request.method == "POST":
        if request.cookies.get("cart") != None:
            num = request.cookies.get("cart").split("-")[1]
            pid = request.cookies.get("cart").split("-")[1]
            order = Orders(int(pid),int(num))
            order_details = OrderDetails(int(pid),form.full_names.data,form.email_address.data, form.delivery_address.data)
            db.session.add(order)
            db.session.add(order_details)
            db.session.commit()
            resp = make_response("<h1>Successful</h1>")
            resp.set_cookie("cart",'0-0')
            return resp
    return render_template("checkout.html", form=form)



@app.route('/tablets')
@cross_origin(supports_credentials=True)
def tablets():
    return render_template("index.html",form=SearchForm())



@app.route('/delete/<productId>')
@cross_origin(supports_credentials=True)
def delete(productId):
    search = SearchForm()
    print(session['cart'])
    render_template("cart.html",search=search,products=session["cart"])


@app.route("/add_to_cart?item=<productId>&quantity=<quantity>", methods=["GET"])
@cross_origin(supports_credentials=True)
def add_to_cart(productId,quantity):
    if 'cart' not in session:
        session['cart'] = []
    
    search = SearchForm()
    print(productId)
    product  = Products.query.get(productId)
    cart_item = CartItem(quantity, product)
    session['cart'].append(cart_item)
    resp = make_response(render_template("cart.html",form=search, products=session['cart']))
    resp.set_cookie("cart",f'{productId}-{quantity}')
    return resp

@app.route("/cart")
@cross_origin(supports_credentials=True)
def cart():
    if 'cart' not in session:
        if request.cookies.get("cart") != None:
            num = request.cookies.get("cart").split("-")[1]
            pid = request.cookies.get("cart").split("-")[1]
            product = Products.query.get(int(pid))
            session['cart'] = CartItem(num, product)
    return render_template("cart.html",form=SearchForm(), products=session['cart'])


@app.route("/create")
@cross_origin(supports_credentials=True)
def create():
    db.session.add( Products("Oppo Reno","Tripple Camera, SuperAmoled Display",20,12000,"oppo.jpg"))
    db.session.add( Products("Iphone x","IOs , Olufsen Sound, wireless charge",203,39000,"infinix.jpg"))
    db.session.add( Products("Infinix note 9","2gb ram 32gb Internal Storage",203,40000,"infinix.jpg"))
    db.session.add( Products("Google pixel","2gb ram 32gb Internal Storage",203,44000,"infinix.jpg"))
    db.session.commit()
    return "Sucessful , dont come back here again"
if __name__ == '__main__':
    app.run()
