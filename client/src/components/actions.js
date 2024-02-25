import { ADD_BOOKSHELF, DELETE_BOOKSHELF, RENAME_BOOKSHELF, SET_BOOKSHELVES, SET_USER } from "./actionTypes";

export const setUser = user => ({
    type: SET_USER, payload: {user}
})

export const setBookshelves = bookshelves => ({
    type: SET_BOOKSHELVES, 
    payload:{bookshelves}
})

export const addBookshelf = bookshelf => ({
    type: ADD_BOOKSHELF,
    payload: bookshelf
})

export const deleteBookshelf = id => ({
    type: DELETE_BOOKSHELF,
    payload: id
})

export const renameBookshelf = bookshelf => ({
    type: RENAME_BOOKSHELF,
    payload: bookshelf
})