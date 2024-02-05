import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <header className="header">
            <h1>ShelfHelp</h1>
            <nav className="navigation">
                <NavLink className="navButton" exact to="/browse">Browse Shelves</NavLink>
                <NavLink className="navButton" exact to="/my_shelves">My Shelves</NavLink>
                <NavLink className="navButton" exact to="/login">Login</NavLink>
            </nav>
        </header>
    );
}

export default NavBar;