import { createStore } from 'redux';
import reducer from './reducer';

//Export the reducer and the redux devtools.
export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());