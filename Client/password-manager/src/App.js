import React, { Component } from "react";
import './App.css';
import AccountContext from './app/components/accountContext'
import styled from "styled-components";
import LoginForm from './app/components/loginForm';
import Profile from './app/components/Profile';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterForm from "./app/components/registerForm";
import axios from "axios";
import AddAccountForm from "./app/components/addAccountForm";


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends Component {


  render() {
    return (
      //<AppContainer>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={LoginForm} />
            <Route path="/home" exact={true} component={LoginForm} />
            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/signin" exact={true} component={LoginForm} />
            <Route path="/signup" exact={true} component={RegisterForm} />
            <Route path="/addAccount" exact={true} component={AddAccountForm} />
          </Switch>
        </Router>
      //</AppContainer>
    );
  }
}

export default App;

