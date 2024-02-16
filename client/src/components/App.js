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
  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
    fetch("/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>setBookshelves(bookshelves));

    }, []);

  function handleAddShelf(newShelf){
    setBookshelves([...bookshelves, newShelf])
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

  console.log("user in app:", user.username)

  if (user) {
    console.log("tis Darcy")
  } else {
    console.log("tis Wickham")
  }

  console.log("bookshelves before usershelves:", bookshelves)
  const userShelves = user && user.username 
    ? bookshelves.filter((bshelf) => bshelf.user.username === user.username) 
    : null

  console.log("userShelves:", userShelves)

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