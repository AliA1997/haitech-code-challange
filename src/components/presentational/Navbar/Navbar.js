import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import the connect method to use redux
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    //Destruct the user from props.
    const { user } = props;
    return (
        <div className="navbar">
            <AppBar position='fixed'>
                <Toolbar variant='dense' color="primary" className='navbar-div'>
                    <Typography style={{color: '#fff'}}>HaiTech Sample App</Typography>
                    <Typography className='link'><Link to='/'>Home</Link></Typography>
                    <Typography className='link'><Link to='/dashboard'>Dashboard</Link></Typography>
                    <Typography className='link'><Link to='/posts'>Posts</Link></Typography>
                    <Typography className='link'><Link to='/users'>Users</Link></Typography>
                    <Typography className='link'><Link to='/create_post'>Create Post</Link></Typography>
                    <Typography className='link'><Link to='/gallery'>Gallery</Link></Typography>

                   { !user ? <div className='login-div'>
                   <Button variant="dense" color="primary" onClick={() => props.login()}>Login</Button>
                    <TextField
                        id="email-login"
                        label="Email"
                        value={props.email}
                        onChange={e => props.handleEmail(e.target.value)}
                        margin="normal"
                        style={{display: props.doLogin ? 'flex' : 'none'}}
                    /> 
                    </div>:
                     <Typography>Welcome {user.name}!!</Typography>}
                </Toolbar>
            </AppBar>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar);