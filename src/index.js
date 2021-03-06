import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_USER } from './actions/types';
import logMiddleware from './middleware/log';
import apiMiddleware from './middleware/api';
import throttledMiddleware from './middleware/throttled';

const createStoreWithMiddleware = applyMiddleware(logMiddleware, throttledMiddleware, 
                                                        apiMiddleware, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

// If we have a token, consider the user to be signed in
if (token) {
    // We need update the application state
    store.dispatch({ type: AUTH_USER });
}

const Root = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();