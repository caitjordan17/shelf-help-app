import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import BrowseShelves from "./BrowseShelves";
import MyShelves from "./MyShelves";
import BookPage from "./BookPage";
import ShelfPage from "./ShelfPage";
import AddBook from "./AddBook";

function App() {
  const [bookshelves, setBookshelves] = useState([])
  const [user, setUser] = useState(null);
  const [booksForAdding, setBooksForAdding] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
    fetch("/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>setBookshelves(bookshelves));
  }, []);

  function handleAddShelf(){

  }

  function handleDeleteShelf(id){
    fetch(`/bookshelves/${id}`, {method: "DELETE"})
    const filteredBookshelves = bookshelves.filter((bookshelf) => {
      return bookshelf.id != id;
    })
    setBookshelves(filteredBookshelves)
  }

  function handleLogout(){
    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          setLoggedIn(false)
        }
      });
    }



  const userShelves = user ? bookshelves.filter((bshelf) => bshelf.user.username === user.username) : null

  return(
     <Router>
        <div className="nav-bar">
          <NavBar user={user} handleLogout={handleLogout} />
        </div>
        <div className="body-content">
          <Switch>

            <Route path="/my-shelves">
              <MyShelves 
                userShelves={userShelves} 
                user={user} 
                handleAddShelf={handleAddShelf} 
                handleDeleteShelf={handleDeleteShelf}/>
            </Route>

            <Route exact path="/browse-shelves">
              <BrowseShelves bookshelves={bookshelves} />
            </Route>

            <Route path="/browse-shelves/:id">
              <ShelfPage handleDeleteShelf={handleDeleteShelf}/>
            </Route>

            <Route path="/login">
              <Login setAppUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </Route>

            <Route path="/browse-books/add">
              <AddBook />
            </Route>

            <Route exact path="/browse-books">
              <BookPage user={user}/>
            </Route>

          </Switch>
        </div>
    </Router> 
  );
}

export default App;


// NavBar, Login, BrowseShelves, MyShelves