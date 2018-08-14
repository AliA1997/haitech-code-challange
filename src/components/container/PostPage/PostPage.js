import React, { Component } from 'react';
//import your components
import CommentContainer from '../CommentContainer/CommentContainer';
import Loader from '../../presentational/Loader/Loader';
//import material-ui components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import axios to communicate with backend. 
import axios from 'axios';
///import css file for styling
import './PostPage.css';

export default class PostPage extends Component {
    constructor() {
        super();
        this.state = {
            currentPost: '',
            body: '',
            comments: [],
            loading: true
        }
    }
    //get the post data.
    componentDidMount() {
        console.log('this.props--------', this.props.match.params.post_id);
        const getPostDataPromise = axios.get(`/api/posts/${this.props.match.params.post_id}`);
        const getCommentsPromise = axios.get(`/api/posts/${this.props.match.params.post_id}/comments`);
        Promise.all([getPostDataPromise, getCommentsPromise])
        .then(res => {
            // res.data.post.name = res.data.name;
            //Set the state of current post
            this.setState({currentPost: res[0].data.post, comments: res[1].data.comments, loading: false});
        }).catch(err => console.log("Get Post Error----------", err));
    }
    reRenderComments = () => {
        console.log("reRender Comments Hit----------");
        this.setState({loading: true});
        axios.get(`/api/posts/${this.props.match.params.post_id}/comments`).then(res => {
            this.setState({comments: res.data.comments, loading: false});
        }).catch(err => console.log('Get Comments Error-------', err));
    }
    handleBodyChange(val) {
        this.setState({body: val});
    }
    createComment() {
        const { body } = this.state;
        if(body) {
            axios.post(`/api/posts/${this.props.match.params.post_id}/comments`, {body}).then(res => {
                this.setState({body: '', comments: res.data.comments});
            }).catch(err => console.log('Create COmment Error------', err));
        } else {
            alert('Must type into text field to create comment!');
        }
    }
    render() {
        //Destruct the currentPost from state.
        const { loading, currentPost, comments, body } = this.state;
        const { post_id } = this.props.match.params;
        console.log('currentPost-----------', currentPost);
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='post-page container'>
                    <Typography className='post-page-header'>Title: {currentPost && currentPost.title}</Typography>
                    <Typography className='post-page-body'>Body: {currentPost && currentPost.body}</Typography>
                    <Typography className='post-page-user'>Name of Creator: {currentPost && currentPost.name}</Typography>
                    <div className='post-page-comments'>
                        <Typography>Comments</Typography>
                        <TextField
                            id='body-value'
                            label="Comment"
                            value={body} 
                            onChange={e => this.handleBodyChange(e.target.value)}
                            margin="normal"
                        />
                        <Button variant="outlined" onClick={() => this.createComment()}>Create Commment</Button>
                        {comments.length ? 
                        comments.map(comment => <CommentContainer key={comment.id} {...comment}  reRender={this.reRenderComments} postId={post_id} />) : null }
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}