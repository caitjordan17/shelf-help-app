from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData

from config import db


# Models go here!

bookshelf_books = db.Table('bookshelf_books',
                            db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True),
                            db.Column('bookshelf_id', db.Integer, db.ForeignKey('bookshelves.id'), primary_key=True)
)

class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    serialize_rules = ('-author.books', '-bookshelves',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    book_cover = db.Column(db.String, nullable=False)
    author = db.relationship('Author', back_populates='books')
    author_id = db.Column(db.String, db.ForeignKey('authors.id'))
    bookshelves = db.relationship('Bookshelf', secondary=bookshelf_books, back_populates='books')

    def __repr__(self):
        return f'<ID: {self.id}, Title: {self.title}>'

class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"

    serialize_rules = ('-books.author',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    books = db.relationship('Book', back_populates='author')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}>'
    
class Bookshelf(db.Model, SerializerMixin):
    __tablename__ = "bookshelves"

    serialize_rules = ('-user.bookshelves',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    books = db.relationship('Book', secondary=bookshelf_books, back_populates='bookshelves')
    user = db.relationship('User', back_populates='bookshelves')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}>'


class User(db.Model, SerializerMixin):
    __tablename__= "users"

    serialize_rules = ('-bookshelves.user','-bookshelves.books',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    bookshelves = db.relationship('Bookshelf', back_populates='user')

    def __repr__(self):
        return f'<ID: {self.id}, Username: {self.username}>'
    
