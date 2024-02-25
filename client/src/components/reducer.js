import { ADD_BOOKSHELF, DELETE_BOOKSHELF, RENAME_BOOKSHELF, SET_BOOKSHELVES, SET_USER } from "./actionTypes";


const initialState = {
    user: null,
    bookshelves: [],
}



export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:{
            return{
                ...state,
                user: action.payload.user
            }
        }
        case SET_BOOKSHELVES:{
            return{
                ...state,
                bookshelves: action.payload.bookshelves
            }
        }
        case ADD_BOOKSHELF:{
            return{
                ...state,
                bookshelves: [...state.bookshelves, action.payload]
            }
        }
        case DELETE_BOOKSHELF:{
            return{
                ...state,
                bookshelves: state.bookshelves.filter(bookshelf => bookshelf.id !== action.payload.id)
            }
        }
        case RENAME_BOOKSHELF:{
            return{
                ...state,
                bookshelves: state.bookshelves.map(bookshelf => bookshelf.id === action.payload.id ? action.payload : bookshelf)
            }
        }
        default:
            return state
    }
}

// state.bookshelves.map((bookshelf) => 
//                     bookshelf.id === action.payload.id