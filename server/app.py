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
        books_to_add = data.get('booksToAdd')
        print("booksToAdd:", books_to_add)
        b_name = data.get('bookshelfName')
        print('name:', b_name)
        id_of_user = session['user_id']
        b_user = User.query.filter(User.id == id_of_user).first()
        print("user:", b_user)
        new_bookshelf = Bookshelf(
            name=b_name, user=b_user)
        db.session.add(new_bookshelf)
        db.session.commit()
        added_bookshelf = Bookshelf.query.filter(Bookshelf.name==b_name).first()
        print("added_bookshelf",added_bookshelf)
        for item in books_to_add:
            print("item", item)
            print("added_bookshelf", added_bookshelf)
            print("item.title", item.get('title'))
            i_book = Book.query.filter(Book.title == item.get('title')).first()
            print("i_book",i_book)
            db.session.add(Bookshelf_book(book=i_book, bookshelf=added_bookshelf))
            db.session.commit()
        
        response_data = {
            "message": "Bookshelf created successfully",
            "bookshelf": {
                "id": added_bookshelf.id,
                "name": added_bookshelf.name,
                "user_id": added_bookshelf.user_id,
            },
            "books_added": books_to_add, 
        }

        return make_response(response_data, 201)
       

       
       
       
        # except IntegrityError:
        #     return {'error': 'Unprocessable Content'}, 422


        # filled_bookshelf = Bookshelf_book()
        # print("new Bookshelf:", new_bookshelf)
        # bookshelf_book = [Book.query.get(book_id) for book_id in data.get('bookshelf_book')]
        # print("bookshelf_book", bookshelf_book)
        # new_bookshelf = Bookshelf(
        #     name = data.get('name'),
        #     user = User.query.filter(User.id == session['user_id']).first(),
        #     bookshelf_book = bookshelf_book
        # )
        # print("new Bookshelf:", new_bookshelf)
        # try:
        #     db.session.add(new_bookshelf)
        #     db.session.commit()
        #     return make_response(new_bookshelf.to_dict(), 201)
        # except IntegrityError:
        #     return {'error': 'Unprocessable Content'}, 422
    
class BookshelvesByID(Resource):
    def get(self, id):
        print(session)
        return make_response(get_by_id(Bookshelf, id), 200)
    
    def delete(self, id):
        return delete_by_id(Bookshelf, id)
    
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

api.add_resource(CurrentUser, '/current_user', endpoint='current_user')
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
