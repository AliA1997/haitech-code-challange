import React from 'react';
///import material-ui components
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.css';

const Loader = (props) => {
    window.scrollTo(0, 0);
    return (
        <div className='loader-div'>
            <CircularProgress />
        </div>
    );
};

export default Loader;