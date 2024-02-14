import React, {useState} from "react";


function AddBook({onAddBook}){
    const [title, setTitle] = useState("");
    const [bookCover, setBookCover] = useState("");
    const [author, setAuthor] = useState("");
    const [isLoading, setIsLoading] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // console.log({ title, book_cover, author });
        setIsLoading(true);
        let newBook = { title, bookCover, author };
    
        fetch("/books", {
          method: "POST",
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(newBook),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((book) => onAddBook(book))
            } else {

            }
        })
    };


    return(
        <div className="new-book-form">
            <h2> New Book </h2>
            <form onSubmit={handleSubmit}>
                <input 
                    id="title-input"
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Book title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                    id="cover-input"
                    type="text"
                    name="bookCover"
                    value={bookCover}
                    placeholder="Book cover"
                    onChange={(e) => setBookCover(e.target.value)}
                />
                <input 
                    id="author-input"
                    type="text"
                    name="author"
                    value={author}
                    placeholder="Book author"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button type="submit">Add Book</button>
            </form>

        </div>
    )
}

export default AddBook;