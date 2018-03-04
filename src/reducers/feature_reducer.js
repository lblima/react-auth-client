import { FETCH_MESSAGE } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MESSAGE:
            return { ...state, message: action.payload };
    }

    return state;
}