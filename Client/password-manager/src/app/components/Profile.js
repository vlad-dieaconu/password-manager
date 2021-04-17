import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';
import { Navbar, Nav, Form } from 'react-bootstrap';


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
      accounts: [],
    };

    this.handleEdit = this.handleEdit.bind(this);
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


  handleEdit = (e,index) => {
    e.preventDefault();
    const user = AuthenticationService.getCurrentUser();
    return axios.get("/users/accounts/" + user.id + "/decrypt").
      then(
        res => {
          const accountsBefore = this.state.accounts;
          accountsBefore[index] = res.data[index];
       
          this.setState({
            accountsBefore,
          });

        }
      )


  };

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
    const { showButtonIndex, showbutton } = this.state;


    if (user && user.accessToken) {

      userInfo = (

        <div>

          <Navbar bg="dark" variant="dark" sticky="top">
            <Form inline>
              <button onClick={this.signOut}>Sign Out</button>
              <Navbar.Text>Signed in as:{user.email}</Navbar.Text>
            </Form>
          </Navbar>

          <div style={{ marginTop: "60px", marginLeft: "450px" }}>
            <h2>My accounts</h2>
            <ul>

              {this.state.accounts && this.state.accounts.map((user =>
                <li key={user.id}>Platorma:{user.platforma}  Password:{user.password}
                  <button onClick={(e) => this.handleEdit(e, this.state.accounts.indexOf(user))}>Show password</button>
                  
                </li>))
   
              }
            </ul>
            <button onClick={this.addAccount}> Add account</button>
          </div>

        </div>

      );
    }
    else {
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