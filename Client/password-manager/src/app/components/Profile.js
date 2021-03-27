import React, { Component } from 'react';

import { Link } from 'react-router-dom';



import AuthenticationService from '../services/AuthenticationService';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    

    
    this.setState({user: user});
    console.log(user);
  }

  signOut = () =>{
  AuthenticationService.signOut();
  this.props.history.push('/home');
}


  render() {
    let userInfo = "";
    const user = this.state.user;

  

    // login
    if (user && user.accessToken) {

    

      userInfo = (
                <div style={{marginTop:"20px"}}>
                  
                    <h2>User Info</h2>
                    <ul>
                      <li>Access Token: {user.accessToken}</li>
                      <li>user email: {user.email}</li>
                      <li>user accounts:</li>
                    </ul>
                  <button onClick={this.signOut}>Sign out</button>
                </div>
              );
    } else {
      userInfo = <div style={{marginTop:"20px"}}>
                    
                      <h2>Profile Component</h2>
                      <button color="success"><Link to="/signin"><span style={{color:"white"}}>Login</span></Link></button>
                    
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