from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Book(db.Model, SerializerMixin):
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    cover_image = db.Column(db.String, nullable=False)

    author_id = db.Column(db.String, db.ForeignKey('authors.id'))

    def __repr__(self):
        return f'<ID: {self.id}, Title: {self.title}>'

class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)

    books = db.relationship('Book', backref='author')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.title}>'