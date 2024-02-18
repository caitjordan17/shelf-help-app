import React, {useState} from "react";
import ShelfBar from "./ShelfBar";
import { Link } from "react-router-dom";

function MyShelves({userShelves, user}){
    console.log("userShelves in myshelves:", userShelves)
    console.log("user in myshelves:", user)

    return(
        <div id="my-shelves-div">
            { userShelves ? (
                <div>
                    <h2 className="bk-h2" id="my-shelves-h2"> My Shelves </h2> 
                    <Link className="link-to-btn"to={"/bookshelves/new-shelf"}>Add Shelf</Link>
                    {userShelves.map((bshelf) => (
                        <ShelfBar user={user} bshelf={bshelf} key={bshelf.id} />
                    ))}
                </div>
                ) : (<h2> Please Login to View MyShelves </h2>)
            }
        </div>
    )
}

export default MyShelves;