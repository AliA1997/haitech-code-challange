import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
///import all the components
import PostCard from '../../presentational/PostCard/PostCard';
//import typography from material-ui
import Typography from '@material-ui/core/Typography';
//import withRouter to have access this.props.history 
import { withRouter } from 'react-router-dom';
//import the connect method to connect your component to redux.
import { connect } from 'react-redux';
//impotr axios to communicate with the backend. 
import axios from 'axios';
//import the css file for styling
import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: [], 
            loading: true
        }
    }
    componentDidMount() {
        //Destruct the user from props.
        const { user } = this.props;
        if(!user) {
            alert('Must be logged in to have access to Dashbaord');
            this.props.history.push('/');
        } else {
            axios.get('/api/user_posts').then(res => {
                this.setState({posts: res.data.posts, loading: false});
            }).catch(err => console.log('Get User Posts Error------------', err));
        }
    }
    render() {
        //Destruct the posts from state.
        const { posts, loading } = this.state;
        const { user } = this.props;
        if(!loading) {
            return (
                <div className="dasboard container">
                    <Typography>{user && user.name}</Typography>
                    <Typography>{user && user.username}</Typography>
                    <Typography>{user && user.email}</Typography>
                    <div className='dashboard-posts-div'>
                        <Typography className='dashboard-posts-header'>Your Posts</Typography>
                        {posts.length ? posts.map(post => <PostCard key={post.id} {...post} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard));