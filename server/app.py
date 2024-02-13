#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import db, Book, Author, Bookshelf, User

app.secret_key = b'YgffzgsFFXz*x00#xad|FDSS234kkl((jG8**^x1DDDSFAbd5x10K'


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


# @app.before_request
# def check_if_logged_in():
#     open_access_list = [
#         'signup',
#         'login',
#         'bookshelves',
#         'bookshelvesbyid'
#     ]
#     if (request.endpoint) not in open_access_list and (not session.get('user_id')):
#         return {'error': '401 Unauthorized'}, 401


@app.route('/')
def index():
    return '<h1>BookShelf BackEnd</h1>'

class Books(Resource):
    def get(self):
        return make_response(get_all(Book), 200)
    
class Authors(Resource):
    def get(self):
        return make_response(get_all(Author), 200)
    
class Bookshelves(Resource):
    def get(self):
        return make_response(get_all(Bookshelf), 200)
    
class BookshelvesByID(Resource):
    def get(self, id):
        return make_response(get_by_id(Bookshelf, id), 200)
    
    def delete(self, id):
        return delete_by_id(Bookshelf, id)
    
class Users(Resource):
    def get(self):
        return make_response(get_all(User), 200)

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            print(user)
            session['user_id'] = user.id
            print(session)
            return make_response(user.to_dict(), 200)
        return {'message': 'Invalid username or password'}, 401
    
class CheckSession(Resource):
    def get(self):
        print("in checksession", session)
        if session.get('user_id'):
            return make_response("session has user", 200)
        #     user = User.query.filter(User.id == session['user_id']).first()
        #     return make_response(user.to_dict(), 200)
        
        else:
            return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

    
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Bookshelves, '/bookshelves', endpoint='bookshelves')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(BookshelvesByID, '/bookshelves/<int:id>', endpoint='bookshelvesbyid')
api.add_resource(Authors, '/authors', endpoint='authors')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)