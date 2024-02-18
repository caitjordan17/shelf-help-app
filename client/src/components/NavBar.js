import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({user, handleLogout}){

    return(
        <header className="header">
            {user ? <h3 id="welcome-user"> Welcome {user.username}! </h3>: null}
            <h1>ShelfHelp</h1>
            <nav className="navigation">
                <NavLink className="navButton" exact to="/browse-shelves">Browse Shelves</NavLink>
                <NavLink className="navButton" exact to="/my-shelves">My Shelves</NavLink>
                <NavLink className="navButton" exact to="/browse-books">Browse Books</NavLink>
                {user ? <button className="navButton" id="logout-btn" onClick={handleLogout} >Logout</button> : 
                <NavLink className="navButton" exact to="/login">Login</NavLink>}
            </nav>
        </header>
    );
}

export default NavBar;
