import React from 'react';
///import material ui-components.
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
//import link from react-router-dom'
import { Link } from 'react-router-dom';
//import csss file for styling 
import './UserCard.css';

const UserCard = (props) => {
    const { id, username, name, email } = props;
    return (
        <Card className='user-card'>
            <Link to={`/users/${id}`} className='user-link-div'>
                <Typography>
                    Name: {name}      
                </Typography>
                <Typography>
                    Username; {username}      
                </Typography>
                <Typography>
                    Email: {email}      
                </Typography>
            </Link>
        </Card>
    );
};

export default UserCard;