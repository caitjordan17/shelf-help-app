import React, {useState} from "react";
import ShelfBar from "./ShelfBar";
import AddShelf from "./AddShelf";

function MyShelves({userShelves, handleAddShelf, user}){
    console.log("userShelves in myshelves:", userShelves)
    console.log("user in myshelves:", user)
    return(
        <div id="my-shelves-div">
            { userShelves ? (
                <div>
                    <h2 className="bk-h2"> My Shelves </h2>
                    <AddShelf user={user.username} handleAddShelf={handleAddShelf}/>
                    {userShelves.map((bshelf) => (
                        <ShelfBar bshelf={bshelf} key={bshelf.id} />
                    ))}
                </div>
                ) : (<h2> Please Login to View MyShelves </h2>)
            }
        </div>
    )
}

export default MyShelves;