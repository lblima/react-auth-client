import axios from 'axios';
import { API } from '../actions/types';

export default ({ getState, dispatch }) => next => action => {

    if (action.type !== API)
        return next(action);

    const { meta: { url, method, data, callback, error }} = action;
    const token = localStorage.getItem('token');

    if (token)
        axios.defaults.headers.common['Authorization'] = token;

    axios({
        method: method,
        url: url,
        data: data
    })
    .then(response => {
        dispatch(callback(response.data));
    })
    .catch(ex => {
        console.log(ex.response.data);
        dispatch(error(ex.response.data));
    });
    
    next(action);
}