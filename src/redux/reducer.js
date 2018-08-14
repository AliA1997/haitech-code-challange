const initialState = {
    user: null,
    createdPost: null
}

//Action Types 
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const OPEN_PRODUCT_POPUP = 'OPEN_PRODUCT_POPUP';
const CLOSE_PRODUCT_POPUP = 'CLOSE_PRODUCT_POPUP';

export default (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
        return {...state, user: action.payload}
        case LOGOUT:
        return {...state, user: null}
        case OPEN_PRODUCT_POPUP:
        return {...state, createdPost: action.payload}
        case CLOSE_PRODUCT_POPUP:
        return {...state, createdPost: null}     
        default: 
        return state;   
    }
}

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
export const postCreated = (newPost) => {
    return {
        type: OPEN_PRODUCT_POPUP,
        payload: newPost
    }
}
export const donePostCreated = () => {
    return {
        type: CLOSE_PRODUCT_POPUP,
    }
}