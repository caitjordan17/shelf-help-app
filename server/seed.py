#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Book, Author

fake = Faker()

with app.app_context():
    print("deleting rows in db...")
    Author.query.delete()
    Book.query.delete()
    print("deleted...")
    print("adding authors in db...")
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

    print("adding books in db...")
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

    print("complete!")