import React from 'react';
///import material-ui components 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const Comment = (props) => {
    const { doEdit,  editBody, body, username, email, name } = props;
    return (
        <Card>
            <CardContent>
                <Typography>{username}</Typography>
                <Typography>{email}</Typography>
                <Typography>{name}</Typography>
            </CardContent>
            <Typography>{body}</Typography>
            <TextField
            multiline
            rows="5"
            id="edit-body"
            label="Edit Comment"
            value={editBody} 
            onChange={(e) => props.handleChange(e.target.value)}
            style={{display: doEdit ? 'inline-block' : 'none'}}
            margin="normal"
            />
            <Button variant='outlined' onClick={() => props.editComment()}>Edit</Button>
            <Button variant='outlined' onClick={() => props.deleteComment()}>Delete</Button>
        </Card>
    );
};

export default Comment;