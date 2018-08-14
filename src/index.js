import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//Alias BrowserROuter as R
import { BrowserRouter as R } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(<Provider store={store}><R><App /></R></Provider>, document.getElementById('root'));
registerServiceWorker();
