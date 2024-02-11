#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Book, Author, Bookshelf, User, Bookshelf_book

fake = Faker()

with app.app_context():
    print("deleting rows in db...")
    Author.query.delete()
    Book.query.delete()
    Bookshelf.query.delete()
    User.query.delete()
    Bookshelf_book.query.delete()
    print("deleted...")

    print("adding authors to db...")
    crockett = Author(name="Crockett Johnson")
    margaret = Author(name="Margaret Wise Brown")
    philip = Author(name="Philip Stead")
    maurice = Author(name="Maurice Sendak")
    david = Author(name="David Wiesner")
    munro = Author(name="Munro Leaf")
    pd = Author(name="P.D. Eastman")
    
    db.session.add_all([crockett,margaret,philip,maurice,david,munro,pd])
    db.session.commit()
    print("added...")

    print("adding books to db...")
    goodnight_moon = Book(title="Goodnight Moon", book_cover="https://m.media-amazon.com/images/I/81t-IstQ+ZL._AC_UF1000,1000_QL80_.jpg", author=margaret )
    purple_crayon = Book(title="Harold and the Purple Crayon", book_cover="https://m.media-amazon.com/images/I/81Wlh5OnMQL._AC_UF1000,1000_QL80_.jpg", author=crockett )
    sick_day = Book(title="Sick Day for Amos McGee", book_cover="https://m.media-amazon.com/images/I/71RqI2WUAzL._AC_UF1000,1000_QL80_.jpg", author=philip )
    go_dogs = Book(title="Go, Dog, Go!", book_cover="https://m.media-amazon.com/images/I/61VBt3-KcQL._AC_UF1000,1000_QL80_.jpg", author=pd )
    little_island = Book(title="The Little Island", book_cover="https://m.media-amazon.com/images/W/MEDIAX_849526-T1/images/I/717XwBcECBL._SY342_.jpg", author=margaret )
    tuesday = Book(title="Tuesday", book_cover="https://m.media-amazon.com/images/I/91d82tV+ENL._AC_UF1000,1000_QL80_.jpg", author=david )
    night_kitchen = Book(title="In the Night Kitchen", book_cover="https://m.media-amazon.com/images/W/MEDIAX_849526-T1/images/I/51a7LqQGJwL._SY445_SX342_.jpg", author=maurice )
    ferdinand = Book(title="The Story of Ferdinand", book_cover="https://images.penguinrandomhouse.com/cover/9780140502343", author=munro )
    mister_moon = Book(title="Music for Mister Moon", book_cover="https://m.media-amazon.com/images/I/91gx1219ZoL._AC_UF1000,1000_QL80_.jpg", author=philip )
    alligators_all_around = Book(title="Alligators All Around", book_cover="https://m.media-amazon.com/images/I/91sKeHP2IZL._AC_UF1000,1000_QL80_.jpg", author=maurice )
    flotsam = Book(title="Flotsam", book_cover="https://m.media-amazon.com/images/I/8155DOL0ulL._AC_UF1000,1000_QL80_.jpg", author=david )
    
    db.session.add_all([goodnight_moon, purple_crayon, sick_day, go_dogs, little_island, tuesday, 
                        night_kitchen, ferdinand, mister_moon, alligators_all_around, flotsam])
    db.session.commit()
    print("added...")

    print("adding users to db...")
    u1 = User(username=f'{fake.first_name()}{fake.random_int(min=11, max=999)}')
    u1.password_hash="pickles123"
    u2 = User(username=f'{fake.first_name()}{fake.random_int(min=11, max=999)}')
    u2.password_hash="yellowbirds123"
    db.session.add_all([u1, u2])
    db.session.commit()
    print("added...")

    print("adding bookshelves to db...")
    b1 = Bookshelf(name="Davey's Favorites", user=u1)
    b2 = Bookshelf(name="Classic Picture Books", user=u2)
    b3 = Bookshelf(name="Loaned to Davey", user=u1)
    db.session.add_all([b1, b2, b3])
    db.session.commit()
    print("added...")

    print("adding bookshelf_books to db...")
    bb1 = Bookshelf_book(book=goodnight_moon, bookshelf=b1)
    bb2 = Bookshelf_book(book=go_dogs, bookshelf=b1 )
    bb3 = Bookshelf_book(book=ferdinand, bookshelf=b1 )
    bb4 = Bookshelf_book(book=flotsam, bookshelf=b1 )
    bb5 = Bookshelf_book(book=little_island, bookshelf=b1 )
    bb6 = Bookshelf_book(book=night_kitchen, bookshelf=b1 )
    bb7 = Bookshelf_book(book=alligators_all_around, bookshelf=b1 )
    bb8 = Bookshelf_book(book=sick_day, bookshelf=b2 )
    bb0 = Bookshelf_book(book=goodnight_moon, bookshelf=b2 )
    bb33 = Bookshelf_book(book=purple_crayon, bookshelf=b2 )
    bb44 = Bookshelf_book(book=little_island, bookshelf=b2 )
    bb66 = Bookshelf_book(book=mister_moon, bookshelf=b2 )
    bb88 = Bookshelf_book(book=goodnight_moon, bookshelf=b3 )
    bb31 = Bookshelf_book(book=ferdinand, bookshelf=b3 )
    bb35 = Bookshelf_book(book=go_dogs, bookshelf=b3 )
    bb36 = Bookshelf_book(book=purple_crayon, bookshelf=b3 )
    db.session.add_all([bb1,bb2,bb3,bb4,bb5,bb6,bb7,bb8,bb0,bb33,bb44,bb66,bb88,bb31,bb35,bb36])
    db.session.commit()
    print("added...")

    print("complete!")





    # __________________________________
    # TEMPLATES

    #  = Author(name="")
    #  = Book(title="", book_cover="", author= )
    #  = User(username=f'{fake.first_name()}{fake.random_int(min=11, max=999)}')
    #  = Bookshelf(name="", user=)
    #  = Bookshelf_book(book=, bookshelf= )