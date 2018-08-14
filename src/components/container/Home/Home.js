import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
///import the needed components
import PostCard from '../../presentational/PostCard/PostCard';
import Popup from '../../presentational/Popup/Popup';
//import withRouter so it has accesss to this.props.history
import { withRouter } from 'react-router-dom';
//import actiosn from reducer
import { donePostCreated } from '../../../redux/reducer';
//Need to connect it to redux
import { connect } from 'react-redux';
import axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [], 
            loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/posts').then(res => {
            this.setState({posts: res.data.posts, loading: false});
        }).catch(err => console.log("Axios Get Posts Error-----", err));
    }
    render() {
        //Destruct the posts from state.
        const { posts, loading } = this.state;
        //destruct your props from redux, and the dispatcher 
        const { postCreated, user, dispatch } = this.props;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='home container'>
                    { setTimeout(() => dispatch(donePostCreated()), 5000)}
                    {postCreated ? <Popup {...postCreated} /> : null}
                    <div className='posts-div'>
                        {posts.length ? posts.map((post, i) => i < 10 && <PostCard key={post.id} {...post} />) : null}
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
        user: state.user,
        postCreated: state.createdPost
    }
}

//export the default the hoc
export default withRouter(connect(mapStateToProps)(Home));