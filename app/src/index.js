import React from 'react';
import './Reset.css'
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'core-js/fn/string/includes';

import {HashRouter} from 'react-router-dom';

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));
registerServiceWorker();
