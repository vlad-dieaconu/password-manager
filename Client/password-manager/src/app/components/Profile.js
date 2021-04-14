import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import AuthenticationService from '../services/AuthenticationService';

axios.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization = token;
  }

  return config;
});

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      accounts: []
    };
  }


  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    this.setState({ user: user });
    console.log(user);
    const userID = JSON.parse(localStorage.getItem('user'));


    return axios.get("/users/accounts/" + userID.id)
      .then(res => {
        const accounts = res.data;
        this.setState({ accounts });
      })

  }

  signOut = () => {
    AuthenticationService.signOut();
    this.props.history.push('/home');
  }

  addAccount = () => {
    this.props.history.push('/addAccount');
  }

  render() {
    let userInfo = "";
    const user = this.state.user;

    // login
    if (user && user.accessToken) {

      userInfo = (
        <div style={{ marginTop: "20px" }}>

          <h2>User Info</h2>
          <ul>
            <li>Access Token: {user.accessToken}</li>
            {this.state.accounts && this.state.accounts.map(user => <li key={user.id}>{user.platforma}</li>)}
            <li>user accounts: </li>
          </ul>
          <button onClick={this.signOut}>Sign out</button>
          <button onClick={this.addAccount}> Add account</button>
        </div>
      );
    } else {
      userInfo = <div style={{ marginTop: "20px" }}>

        <h2>Profile Component</h2>
        <button color="success"><Link to="/signin"><span style={{ color: "white" }}>Login</span></Link></button>

      </div>
    }

    return (
      <div>
        
        {userInfo}
      </div>

    );
  }
}

export default Profile;