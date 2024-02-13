import React, {useState} from "react";
import ShelfBar from "./ShelfBar";

function MyShelves({userShelves, handleAddShelf}){

    console.log("usershelves in myshelves:", userShelves)
    return(
        <div>
            {userShelves 
                ? <button onClick={handleAddShelf}>Add Shelf</button> 
                : <h2> Please Login to View MyShelves </h2>}
            {userShelves ? userShelves.map((bshelf) => (
                <ShelfBar bshelf={bshelf} key={bshelf.id}/>
            )) : null}
        </div>
    )
}

export default MyShelves;