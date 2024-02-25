import React from "react";
import ShelfBar from "./ShelfBar";
import { useSelector } from 'react-redux';


function BrowseShelves(){
    const reduxBookshelves = useSelector(state => state.bookshelves)

    return(
        <div>
            {reduxBookshelves.map((bshelf) => (
                <ShelfBar 
                    bshelf={bshelf} 
                    key={bshelf.id} 
                />
            ))}

        </div>
    )
}

export default BrowseShelves;