from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    serialize_rules = ('-author.books', '-author.id', '-bookshelf_book',) #done

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    book_cover = db.Column(db.String, nullable=False)
   
#   relationships
    author = db.relationship('Author', back_populates='books')
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))
    bookshelf_book = db.relationship('Bookshelf_book', 
                                     back_populates='book', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<ID: {self.id}, Title: {self.title}>'


class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"

    serialize_rules = ('-books.bookshelf_book','-books.author',
                       '-books.author_id','-books.book_cover',) #done


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
#   relationships
    books = db.relationship('Book', back_populates='author', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}>'
    

class Bookshelf(db.Model, SerializerMixin):
    __tablename__ = "bookshelves"

    serialize_rules = ('-user_id', '-user._password_hash', '-user.bookshelves', '-bookshelf_book.bookshelf', '-bookshelf_book.id', 
                       '-bookshelf_book.bookshelf_id', '-bookshelf_book.book.author.books',
                       '-bookshelf_book.book.author_id','-bookshelf_book.book.bookshelf_book', 
                       '-bookshelf_book.book_id',) #done

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
#   relationships
    user = db.relationship('User', back_populates='bookshelves')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bookshelf_book = db.relationship('Bookshelf_book', back_populates='bookshelf', 
                                     cascade='all, delete-orphan')

    def __repr__(self):
        return f'<ID: {self.id}, Name: {self.name}> '

# make name editable

class Bookshelf_book(db.Model, SerializerMixin):
    __tablename__ = "bookshelf_books"
    id = db.Column(db.Integer, primary_key=True)

#   relationships
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    book = db.relationship('Book', back_populates='bookshelf_book')
    bookshelf_id = db.Column(db.Integer, db.ForeignKey('bookshelves.id'))
    bookshelf = db.relationship('Bookshelf', back_populates='bookshelf_book')

    def __repr__(self):
        return f'<ID: {self.id}, {self.book_id}, {self.bookshelf_id}> '

class User(db.Model, SerializerMixin):
    __tablename__= "users"

    serialize_rules = ('-bookshelves.user', '-bookshelves.bookshelf_book', 
                       '-bookshelves.user_id', '-_password_hash',) #done #remove '-_password_hash', if need to see them
    # serialize_rules = ('-bookshelves',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    
#   relationships
    bookshelves = db.relationship('Bookshelf', back_populates='user', cascade='all, delete-orphan')

    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes cannot be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
    # @validates('username')
    # def validate_username(self, key, entry):
    #     if User.query.filter(User.username == entry).first() != None:
    #             raise ValueError("Username Taken!")
    #     return entry

    def __repr__(self):
        return f'<ID: {self.id}, Username: {self.username}>'
    
