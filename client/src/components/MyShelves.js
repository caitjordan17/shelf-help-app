import React, {useState} from "react";
import ShelfBar from "./ShelfBar";
import AddShelf from "./AddShelf";

function MyShelves({userShelves, handleAddShelf, user}){
    return(
        <div>
            { userShelves ? (
                <div>
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