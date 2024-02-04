import React, {useState} from "react";
import ShelfBar from "./ShelfBar";
import ShelfPage from "./ShelfPage";

function BrowseShelves({bookshelves}){
    const [browseShelves, setBrowseShelves] = useState(true)
    const [bshelfID, setBshelfID] = useState(1)

    const allShelves = bookshelves.map((bshelf) => (
        <ShelfBar 
            bshelf={bshelf} 
            key={bshelf.id} 
            handleClick={handleClick}
            isActive={bshelf.id === bshelfID} 
        />
    ))

    function handleBackClick(){
        setBrowseShelves(true)
    }
    
    const clickedShelf = bookshelves.find((bshelf) => bshelf.id == bshelfID)

    function handleClick(event){
        console.log("clicked!:", event.target.id)
        console.log("setting bshelfID...")
        setBshelfID(event.target.id)
        console.log("set bshelfID as:", bshelfID)
        console.log("clickedShelf value:", clickedShelf )
        console.log("setting browseShelves...")
        setBrowseShelves(false)
        console.log("set browseShelves...")
    }
    
    return(
        <div>
            {browseShelves ? (allShelves) : 
            (<ShelfPage 
                bookshelf={clickedShelf}
                key={clickedShelf.id}
                handleBackClick={handleBackClick}
                isActive={true}
            />)}
        </div>
    )
}

export default BrowseShelves;