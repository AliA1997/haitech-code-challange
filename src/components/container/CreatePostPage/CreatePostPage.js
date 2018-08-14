import React, { Component } from 'react';
import PostForm from '../../presentational/PostForm/PostForm';
//Want to have access to the props.history.
import { withRouter } from 'react-router-dom';
import { postCreated } from '../../../redux/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateProductPage extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            image: ''
        }
    }
    handleTitle = val => {
        this.setState({title: val});
    }

    handleDescription = val => {
        this.setState({description: val});
    }

    handleUpload = (files) => {
        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
            console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()) {
            console.log(pair); 
         }

        //axios call to cloudinary using the URL set at top 
            axios.post('https://api.cloudinary.com/v1_1/aa1997/image/upload', formData).then(response => {
                console.log(response.data);

                // Setting state with the secure_url
                this.setState({
                    image: response.data.secure_url
                })
            }).catch( err => {
                console.log(err);
            }) 
        }).catch(err => console.log('Get Credentials Error--------', err));
    }
    createPost = (e) => {
        e.preventDefault();
        //Destruct the values needed form state 
        const { title, description } = this.state;
        //Destruct the dispatchet that will dispatch a action towards redux. 
        const { dispatch } = this.props;
        axios.post('/api/posts', {title, description}).then(res => {
            dispatch(postCreated(res.data.post));
            this.setState({title: '', description: ''});
            this.props.history.push('/');
        }).catch(err => console.log('Create Product Error----------', err));
    }
    render() {
        return (
            <div className='container'>
                {/*Pass all of state to productForm and methods to it.  */}
                <PostForm handleTitle={this.handleTitle} handleDescription={this.handleDescription} 
                handleUpload={this.handleUpload} createPost={this.createPost} {...this.state} />
            </div>
        );
    }
}

export default connect()(CreateProductPage);