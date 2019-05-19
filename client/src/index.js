import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {loadState, saveState} from "./localStorage";

// Using Redux Devtools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const presistedState = loadState();

// Create Store with redux middleware
const store = createStore(reducers, presistedState, composeEnhancers(applyMiddleware(thunk)));


store.subscribe(() => {
    saveState(
        store.getState().auth.token,
        store.getState().location.lat,
        store.getState().location.long
    );
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
