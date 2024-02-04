import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import BrowseShelves from "./BrowseShelves";
import MyShelves from "./MyShelves"

function App() {
  const [bookshelves, setBookshelves] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>setBookshelves(bookshelves));
  }, []);

  console.log("bookshelves_in_App:", bookshelves)

  function handleClick(){
    // take bshelf.id & nav to ShelfPage /bookshelf/<int:id>
  }

  return(
     <Router>
        <div className="nav-bar">
          <NavBar />
        </div>
        <div className="body-content">
          <Switch>
            {/* <Route path="/">

            </Route>
            <Route path="/">

            </Route> */}
            <Route exact path="/">
              <BrowseShelves bookshelves={bookshelves} handleClick={handleClick}/>
            </Route>
          </Switch>
        </div>
    </Router> 
  );
}

export default App;


// NavBar, Login, BrowseShelves, MyShelves