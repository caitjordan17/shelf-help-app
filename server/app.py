#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Book, Author

# Views go here!

def get_all(cls):
    items = [item.to_dict() for item in cls.query.all()]
    return items

def get_by_id(cls, id):
    item = cls.query.filter(cls.id == id).first().to_dict()
    return item

def delete_by_id(cls, id):
    item = cls.query.filter(cls.id == id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return make_response({}, 204)
    return make_response({"error": "item not found"}, 404)


@app.route('/')
def index():
    return '<h1>BookShelf BackEnd</h1>'

class Books(Resource):
    def get(self):
        return make_response(get_all(Book), 200)

api.add_resource(Books, '/books', endpoint='books')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

