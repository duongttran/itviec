import React from 'react';
import { createStore } from "redux";

const initialstate = {
    user: { email: '', password: '', isAuthenticated: false }
}

function reducer(state = initialstate, action) {
    if (action.type === 'LOGIN') {
        console.log("login ne")
        state.user = action.payload
        state.user.isAuthenticated = true;
    } 
    return state
}

const store = createStore(reducer);

export default store;



