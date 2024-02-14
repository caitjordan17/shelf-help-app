import React, {useState} from "react";
import ShelfBar from "./ShelfBar";
import ShelfPage from "./ShelfPage";

function BrowseShelves({bookshelves}){
    return(
        <div>
            {bookshelves.map((bshelf) => (
                <ShelfBar 
                    bshelf={bshelf} 
                    key={bshelf.id} 
                />
            ))}
            
        </div>
    )
}

export default BrowseShelves;