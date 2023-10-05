import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import './firebase.js'

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>)