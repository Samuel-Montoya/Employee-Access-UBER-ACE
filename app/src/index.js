import React from 'react';
import './Reset.css'
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'core-js/fn/string/includes';

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
