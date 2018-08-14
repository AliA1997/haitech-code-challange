import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
//import material-ui components.
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//import your components.
import PostCard from '../../presentational/PostCard/PostCard';
//import axios 
import axios from 'axios';

export default class PostsPage extends Component {
    constructor() {
        super();
        this.state = {
            searchString: '', 
            posts: [],
            loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/posts').then(res => {
            this.setState({posts: res.data.posts, loading: false});
        }).catch(err => console.log("Get Posts Error---------", err));
    }
    handleSearch(val, type) {
        console.log('val', val);
        const copyOfArr = this.state.posts.slice();
        console.log('copyOfArr--------', copyOfArr);
        const filteredPosts = copyOfArr.filter(post => post[type].includes(val));
        console.log('filteredPosts', filteredPosts);
        this.setState({posts: filteredPosts.length ? filteredPosts : this.state.posts, searchString: val});
    }
    render() {
        const { posts, loading, searchString } = this.state;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='posts-page container'>
                    <TextField
                    id="search-posts"
                    label="Search Posts"
                    value={searchString}
                    onChange={e => this.handleSearch(e.target.value, 'title')}
                    margin="normal"
                    />
                    <Typography>Search Posts</Typography>
                    {posts.length ? posts.map(post => <PostCard key={post.id} {...post} />) : null}
                </div>
            ); 
        } else {
            return <Loader />
        } 
    }
}