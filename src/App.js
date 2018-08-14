import React, { Component } from 'react';
import Navbar from './components/presentational/Navbar/Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
//Import the login function from the reducer. 
import { login } from './redux/reducer';
//Import withRouter to access this.props.history when dealign with redux.
import { withRouter } from 'react-router-dom';
//Connect the app to redux using connect method. 
import { connect } from 'react-redux';
// import amber from '@material-ui/core/colors/amber';
import routes from './routes';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import './App.css';

const theme = createMuiTheme({
  primary: indigo,
  secondary: green,
  // the text.
  contrastThreshold: 3,
  // Used to shift a color's luminance by approximately
  // two indexes within its tonal palette.
  // E.g., shift from Red 500 to Red 300 or Red 700.
  tonalOffset: 0.2,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      doLogin: false
    }
  }
  handleEmail = (val) => {
    this.setState({email: val});
  }
  login = () => {
    //Destruct doLogin and email from state.
    const { doLogin, email } = this.state;
    //Destruct the dispatch that will dispatch action from the reducers.
    const { dispatch } = this.props;
    if(doLogin && email) {
      axios.post('/api/login', {email}).then(res => {
        alert(res.data.message);
        dispatch(login(res.data.user));
        this.props.history.push('/dashboard');
        this.setState({doLogin: false, email: ''})
      }).catch(err => console.log("Login Error---------", err));
    } else {
      this.setState({doLogin: !this.state.doLogin});
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar handleEmail={this.handleEmail} login={this.login} {...this.state}/>
            {routes}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect()(App));
