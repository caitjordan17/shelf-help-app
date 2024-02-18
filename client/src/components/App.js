import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import BrowseShelves from "./BrowseShelves";
import MyShelves from "./MyShelves";
import BookPage from "./BookPage";
import ShelfPage from "./ShelfPage";
import AddBook from "./AddBook";
import AddShelf from "./AddShelf";

function App() {
  const [bookshelves, setBookshelves] = useState([])
  const [user, setUser] = useState({username: ""});
  const [loggedIn, setLoggedIn] = useState(false)

  console.log("USER:",user)
  useEffect(() => {
    fetch("/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>setBookshelves(bookshelves));
    }, []);

    useEffect(() => {
      fetch("/check_session")
        .then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setUser(user);
            })}
        })
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

  console.log("BOOKSHELVES:", bookshelves)

  function handleNameUpdate(updatedName, id){
    console.log("updatedName", updatedName.name)
    let updatedBookshelf = bookshelves.filter((bookshelf) => bookshelf.id == id)
    updatedBookshelf[0].name = updatedName.name
    console.log("updatedBookshelf", updatedBookshelf)
    const updatedBookshelvesArray = bookshelves.map((bookshelf) => {
      if(bookshelf.id == id) return updatedBookshelf[0];
      return bookshelf;
    })
    setBookshelves(updatedBookshelvesArray)
  }


  const userShelves = user && bookshelves ? 
    bookshelves.filter((bshelf) => bshelf.user.username === user.username)
    : []

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
                user={user} />
            </Route>

            <Route exact path="/browse-shelves">
              <BrowseShelves user={user} bookshelves={bookshelves} />
            </Route>

            <Route exact path="/browse-shelves/:id">
              <ShelfPage 
                user={user} 
                handleDeleteShelf={handleDeleteShelf}
                handleNameUpdate={handleNameUpdate}/>
            </Route>

            <Route path="/login">
              <Login user={user} setAppUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </Route>

            <Route path="/browse-books/add">
              <AddBook />
            </Route>

            <Route exact path="/browse-books">
              <BookPage user={user}/>
            </Route>

            <Route path = "/bookshelves/new-shelf">
              <AddShelf handleAddShelf={handleAddShelf}/>
            </Route>

          </Switch>
        </div>
    </Router> 
  );
}

export default App;


// NavBar, Login, BrowseShelves, MyShelves