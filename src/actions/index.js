import { AUTH_USER, UNAUTH_USER, 
            AUTH_ERROR, FETCH_MESSAGE, API } from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3030';

// I am going to use Redux-Thunk insted Redux-Promise
export function signInUser(history, { email, password }) {
    return (dispatch) => {
        // Submit user and password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good ...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - Save Jwt token 
                localStorage.setItem('token', response.data.token);

                // - Redirect to the route '/feature'
                history.push('/feature');
            })
            .catch((err) => {
                // If request is bad ...
                // - Show an error message
                dispatch(authError('Bad login info'));
            });        
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signOutUser() {

    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    }
}

export function signUpUser(history, { email, password}) {
    return (dispatch) => {
          // Submit user and password to the server
          axios.post(`${ROOT_URL}/signup`, { email, password })
          .then(response => {
              // If request is good ...
              // - Update state to indicate user is authenticated
              dispatch({ type: AUTH_USER });

              // - Save Jwt token 
              localStorage.setItem('token', response.data.token);

              // - Redirect to the route '/feature'
              history.push('/feature');
          })
          .catch(err => {
              // If request is bad ...
              // - Show an error message
              const errorMessage = err.response.data.error;
              dispatch(authError(errorMessage));
          });        
    }
}

//Another better aproach is delegate the async api call to middleware, making my action more easy to test
export function fetchMessage() {
    return {
        type: API,
        meta: {
            url: ROOT_URL,
            method: 'GET',
            throttle: 2000,
            callback: (data) => ({ type: FETCH_MESSAGE, payload: data.message })
        }
    }
}