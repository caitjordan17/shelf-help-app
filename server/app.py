#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# Local imports
from config import app, db, api
# Add your model imports
from models import db, Book, Author, Bookshelf, User, Bookshelf_book
import os

app.config['SECRET_KEY'] = b'YgffzgsFFXz*x00#xad|FDSS234kkl((jG8**^x1DDDSFAbd5x10K'

 
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

def get_by_user(cls, uid):
    items = cls.query.filter(cls.user.id == id).all()
    return items

@app.route('/')
def index():
    return '<h1>BookShelf BackEnd</h1>'

# 24 pages or more


class BigBook (Resource):
    def get(self, page_number):
        books = [book.to_dict() for book in Book.query.filter(Book.page_count >= page_number).all()]
        return books

class CheckReadStatus (Resource):
    def patch(self, bk_id, bkslf_id):
        line = Bookshelf_book.query.filter_by(book_id=bk_id, bookshelf_id=bkslf_id).first()
        if line:
            line.read_status = not line.read_status
            db.session.commit()
            print(line.read_status)
        return (line.read_status, 200)

    
    # query bookshelf_book for match to both ids
    # check user = matching session to bookshelf.user
    # if both correct, accept post to update read status
    # in front end add button or emoji that user can click & it changes to !=

class Books(Resource):
    def get(self):
        print(session)

        return make_response(get_all(Book), 200)
    
    def post(self):
        data = request.get_json()
        author_added = data.get('author')
        author_check = Author.query.filter(Author.name == author_added).first()
        print(session)

        if author_check:
            author = author_check
        else:
            author = Author(name=author_added)
            db.session.add(author)
            db.session.commit()
        
        new_book = Book(
            title=data.get('title'),
            book_cover=data.get('bookCover'),
            author=author
        )
        try:
            db.session.add(new_book)
            db.session.commit()
            return make_response(new_book.to_dict(), 201)
        except IntegrityError:
            return {'error': 'Unprocessable Content'}, 422

class Authors(Resource):
    def get(self):
        print(session)
        return make_response(get_all(Author), 200)
    
class Bookshelves(Resource):
    def get(self):
        print(session)        
        return make_response(get_all(Bookshelf), 200)
    
    def post(self):
        data = request.get_json()
        bookshelf_book = data.get('booksToAdd')
        b_name = data.get('bookshelfName')
        id_of_user = session['user_id']
        b_user = User.query.filter(User.id == id_of_user).first()
        new_bookshelf = Bookshelf(
            name=b_name, user=b_user)
        db.session.add(new_bookshelf)
        db.session.commit()
        added_bookshelf = Bookshelf.query.filter(Bookshelf.name==b_name).first()
        print("added_bookshelf", added_bookshelf)
        for item in bookshelf_book:
            i_book = Book.query.filter(Book.title == item.get('title')).first()
            db.session.add(Bookshelf_book(book=i_book, bookshelf=added_bookshelf))
            db.session.commit()
        filled_bookshelf= Bookshelf.query.filter(Bookshelf.name==b_name).first()
        print("filled_bookshelf after commit:", filled_bookshelf)

        return make_response(filled_bookshelf.to_dict(), 201)
    
class BookshelvesByID(Resource):
    def get(self, id):
        print(session)
        return make_response(get_by_id(Bookshelf, id), 200)
    
    def delete(self, id):
        return delete_by_id(Bookshelf, id)
    
    def patch(self, id):
        data = request.get_json()
        bookshelf = Bookshelf.query.filter_by(id=id).first()
        for attr in data:
            setattr(bookshelf, attr, data[attr])
        db.session.add(bookshelf)
        db.session.commit()
        return make_response(bookshelf.to_dict(), 200)
    
class Users(Resource):
    def get(self):
        return make_response(get_all(User), 200)
     
class CurrentUser(Resource):
    def get(self):
        current_session = [session]
        print(current_session)
        current_user = User.query.filter(User.id == current_session.user_id).first()
        return make_response(current_session, 200)
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            print(user)
            session['user_id'] = user.id
            session.permanent = True
            print(session)
            response = make_response(user.to_dict(), 200)
            return response
        return {'message': 'Invalid username or password'}, 401
    
class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        print("data:",data)
        print("username",username)
        print("user?", user)
        if not user:
            print("passed user")
            new_user=User(username=username,)
            print("passed User(username,)")
            new_user.password_hash = password
            print("passed password hash")
            print("new_user:", new_user)
            db.session.add(new_user)
            db.session.commit()
            posted_user = User.query.filter(username==User.username).first()
            print("posted_user", posted_user)
            session['user_id'] = posted_user.id
            return make_response(posted_user.to_dict(), 201)
        return {'message': 'Username already taken'}, 401

    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401


class Logout(Resource):
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(CheckReadStatus, '/check_read_status/<int:bk_id>/<int:bkslf_id>', endpoint='check_read_status')
api.add_resource(BigBook, '/big_book/<int:page_number>')
api.add_resource(CurrentUser, '/current_user', endpoint='current_user')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Bookshelves, '/bookshelves', endpoint='bookshelves')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(BookshelvesByID, '/bookshelves/<int:id>', endpoint='bookshelvesbyid')
api.add_resource(Authors, '/authors', endpoint='authors')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
