import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './PostForm.css';

const ProductForm = (props) => {
    return (
        <div className='product-form'>
            <img src={props.image} alt={props.name} />
            <input type="file" onChange={e => props.handleUpload(e.target.files)} />
            <TextField
            id="title"
            label="Title"
            value={props.title}
            onChange={e => props.handleTitle(e.target.value)}
            margin="normal"
            />
            <TextField
            id="description"
            label="Description"
            value={props.description}
            onChange={e => props.handleDescription(e.target.value)}
            margin="normal"
            />
        <Button variant="outlined" onClick={(e) => props.createPost(e)}>Create Product</Button>
        </div>
    );
};

export default ProductForm;