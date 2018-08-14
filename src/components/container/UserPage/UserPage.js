import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//improt axios to communicate with backend.
import axios from 'axios';
import PostCard from '../../presentational/PostCard/PostCard';
//import css file for styling 
import './UserPage.css';

export default class UserPage extends Component {
    constructor() {
        //Initializes the Parent Classs
        super();
        this.state = {
            currentUser: '',
            showCompanyInfo: false,
            loading: true
        }
    }
    componentDidMount() {
        axios.get(`/api/users/${this.props.match.params.user_id}`).then(res => {
            this.setState({currentUser: res.data.user, loading: false});
        }).catch(err => console.log('Get Users Error-----------', err));
    }
    render() {
        ///Destruct currentUser from state. 
        const { currentUser, loading, showCompanyInfo } = this.state;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='user-page container'>  
                    <Typography><b>Name: </b>{currentUser && currentUser.name}</Typography>
                    <Typography><b>Username: </b>{currentUser && currentUser.username}</Typography>
                    <Typography><b>Email: </b>{currentUser && currentUser.email}</Typography>
                    <Typography><b>Phone: </b>{currentUser && currentUser.phone}</Typography>
                    <Typography><b>Website: </b>{currentUser && currentUser.website}</Typography>
                    <Button varient="outlined" onClick={() => this.setState({showCompanyInfo: !this.state.showCompanyInfo})}>
                        Show Company Info
                    </Button>
                    <div className='user-page-company-info' 
                    style={{ visibility: showCompanyInfo ? 'initial' : 'hidden'}}>
                        <Typography><b>Company Name: </b>{currentUser && currentUser.company.name}</Typography>
                        <Typography><b>CatchPhrase: </b>{currentUser && currentUser.company.catchPhrase}</Typography>
                        <Typography><b>Be: </b>{currentUser && currentUser.company.be}</Typography>
                    </div>
                    <div className='users-page posts-div'>
                        <Typography><b>User's Posts</b></Typography>
                        {currentUser && currentUser.posts.length 
                            ? currentUser.posts.map(post => <PostCard key={post.id} {...post} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        } 
    }
}