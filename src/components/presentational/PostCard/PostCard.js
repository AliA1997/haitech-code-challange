import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './PostCard.css';

export default (props) => {
    //Destruct the id and title from props.
    const { id, title, body } = props;
        return (
            <Card className='post-card'>
                <Link to={`/post/${id}`} style={{textDecoration: 'none'}} className='link-div'>
                    <Typography>Title: </Typography>
                    <Typography>{title}</Typography>
                    <Typography>Body: </Typography>
                    <Typography>{body}</Typography>
                </Link>
            </Card>
        );
}