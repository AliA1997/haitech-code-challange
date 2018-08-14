import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Popup.css';

const PostPopup = (props) => {
    return (
        <div className='popup-div'>
            <Typography>Post Created!!</Typography>
            <Typography>{props.title}</Typography>
            <Typography>{props.body}</Typography>
            <Typography>Created By UserId: {props.userId}</Typography>
        </div>
    );
};

export default PostPopup;