import React from "react";
import ShelfBar from "./ShelfBar";

function BrowseShelves({bookshelves, handleClick}){
    return(
        <div>
        {bookshelves.map((bshelf) => (
            <ShelfBar bshelf={bshelf} key={bshelf.id} handleClick={handleClick} />
      ))}
        </div>
    )
}

export default BrowseShelves;