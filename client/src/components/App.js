import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import BrowseShelves from "./BrowseShelves";
import MyShelves from "./MyShelves";
import BookPage from "./BookPage";
import ShelfPage from "./ShelfPage";
import AddBook from "./AddBook";
import AddShelf from "./AddShelf";
import { useDispatch, useSelector } from 'react-redux';
import { 
  setUser as setReduxUser, 
  setBookshelves as setReduxBookshelves,
} from "./actions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const dispatch = useDispatch();
  const reduxBookshelves = useSelector(state => state.bookshelves)

  useEffect(() => {
    fetch("/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>{
        dispatch(setReduxBookshelves(bookshelves))
      });
    }, []);

    useEffect(() => {
      fetch("/check_session")
        .then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              dispatch(setReduxUser(user))
            })}
        })
    }, []);

  function handleLogout(){
    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          dispatch(setReduxUser(null))
          setLoggedIn(false)
        }
      });
    }

  return(
     <Router>
        <div className="nav-bar">
          <NavBar handleLogout={handleLogout} />
        </div>
        <div className="body-content">
          <Switch>

            <Route path="/my-shelves">
              <MyShelves />
            </Route>

            <Route exact path="/browse-shelves">
              <BrowseShelves />
            </Route>

            <Route exact path="/browse-shelves/:id">
              <ShelfPage />
            </Route>

            <Route path="/login">
              <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </Route>

            <Route path="/browse-books/add">
              <AddBook />
            </Route>

            <Route exact path="/browse-books">
              <BookPage />
            </Route>

            <Route path = "/bookshelves/new-shelf">
              <AddShelf />
            </Route>

            <Route exact path="/">
              <Redirect to="/browse-shelves"/>
            </Route>

          </Switch>
        </div>
    </Router> 
  );
}

export default App;
