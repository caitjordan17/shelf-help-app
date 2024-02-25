import React from "react";
import ShelfBar from "./ShelfBar";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function MyShelves(){
    const user = useSelector(state => state.user)
    const reduxBookshelves = useSelector(state => state.bookshelves)

    const userShelves = user && reduxBookshelves ? 
    reduxBookshelves.filter((bshelf) => bshelf.user.username === user.username)
    : []

    return(
        <div id="my-shelves-div">
            { user && user.username ? (
                <div>
                    <h2 className="bk-h2" id="my-shelves-h2"> My Shelves </h2> 
                    <Link className="link-to-btn"to={"/bookshelves/new-shelf"}>Add Shelf</Link>
                    {userShelves.map((bshelf) => (
                        <ShelfBar bshelf={bshelf} key={bshelf.id} />
                    ))}
                </div>
                ) : (
                <h2> Please Login to View MyShelves </h2>
                )
            }
        </div>
    )
}

export default MyShelves;