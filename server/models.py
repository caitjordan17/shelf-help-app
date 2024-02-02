from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Book(db.Model, SerializerMixin):
    __tablename__ = "books"
    
    serialize_rules = ('-author',)
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    book_cover = db.Column(db.String, nullable=False)
    author = db.relationship('Author', back_populates='books')
    author_id = db.Column(db.String, db.ForeignKey('authors.id'))

    def __repr__(self):
        return f'<ID: {self.id}, Title: {self.title}>'

class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"

    serialize_rules = ('-book.author',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    books = db.relationship('Book', back_populates='author')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}>'
    
class Bookshelf(db.Model, SerializerMixin):
    __tablename__ = "bookshelves"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    books = db.relationship('Book', back_populates='bookshelves')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}>'