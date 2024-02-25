## Phase 4 Full-Stack Application Project

# Shelfhelp - a book list app

ShelfHelp is an app designed to be able to store book lists for users and allow you to 
view other users' book lists. In ShelfHelp, these book lists are called bookshelves.

Anyone can view the books in the database by clicking on "Browse Books" and all of the
bookshelves by clicking on "Browse Shelves". To be able to contribute to ShelfHelp first 
login.

## What you can do!
With ShelfHelp you can:
 - sign up
 - log in
 - log out
 - add a bookshelf
 - view all bookshelves
 - view your bookshelves
 - add books
 - edit your bookshelf name
 - delete a bookshelf

## How to get started!
 - First you'll want to fork & clone this repository.
 - You'll want to check out the requirements file & make sure you have everything you need there.
 - Next you'll want to run these commands for the backend:
   - pipenv install && pipenv shell
   - cd server
   - export FLASK_APP=app.py
   - export FLASK_RUN_PORT=5555
   - flask db init
   - flask db migrate -m "initial migration"
   - flask db upgrade head
   - python seed.py
   - python app.py
 - In another terminal you'll want to run these commands for the front end:
   - cd client
   - npm install
   - npm start
  
 Enjoy!


 ## Stay tuned for more updates!
