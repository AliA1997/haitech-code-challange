import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
//import your components
import UserCard from '../../presentational/UserCard/UserCard';
//import material-ui components
import TextField from '@material-ui/core/TextField';
//import axios to communicate with backend.
import axios from 'axios';
//import css file for styling
import './UsersPage.css';

export default class UsersPage extends Component {
    constructor() {
        super();
        this.state = {
            searchString: '',
            users: [],
            loading: true 
        }
    }
    componentDidMount() {
        axios.get('/api/users').then(res => {
            this.setState({users: res.data.users, loading: false});
        }).catch(err => console.log('Get Users Error-----------', err));
    }
    handleSearch(val, type) {
        //COpy of the array. 
        const copyOfArr = this.state.users.slice();
        let filteredArr = copyOfArr.filter(user => user[type].includes( val));
        this.setState({users: filteredArr.length ? filteredArr : this.state.users, searchString: val});
    }
    render() {
        ///Destruct the users from the state.
        const { users, searchString, loading } = this.state;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='users-div'>
                    <TextField
                    id="search-users"
                    label="Search Users"
                    value={searchString}
                    onChange={e => this.handleSearch(e.target.value, 'name')}
                    margin="normal"
                    />
                    {users.length ? users.map(user => <UserCard key={user.id} {...user} />) : null}
                </div>
            );
        } else {
            return <Loader />
        }
    }
}