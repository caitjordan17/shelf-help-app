import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import BrowseShelves from "./BrowseShelves";
import MyShelves from "./MyShelves"
import ShelfPage from "./ShelfPage";

function App() {
  const [bookshelves, setBookshelves] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/bookshelves")
      .then((r) => r.json())
      .then((bookshelves) =>setBookshelves(bookshelves));
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  // const myShelves = bookshelves.filter((bookshelf.user_id == ))
  function handleLogout(){
    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
        }
      });
    }


  return(
     <Router>
        <div className="nav-bar">
          <NavBar user={user} handleLogout={handleLogout}/>
        </div>
        <div className="body-content">
          <Switch>

            <Route path="/my-shelves">
              <MyShelves bookshelves={bookshelves} user={user}/>
            </Route>

            <Route exact path="/browse">
              <BrowseShelves bookshelves={bookshelves} />
            </Route>

            <Route path="/browse/:id">
              <ShelfPage />
            </Route>

            <Route path="/login">
              <Login setAppUser={setUser}/>
            </Route>

          </Switch>
        </div>
    </Router> 
  );
}

export default App;


// NavBar, Login, BrowseShelves, MyShelves