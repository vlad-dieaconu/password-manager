import React, { Component } from "react";
import { BoldLink } from "./common";
import AuthenticationService from '../services/AuthenticationService';
import Logo from '../res/security.png';
import { Alert } from "reactstrap";


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    doLogin = async (event) => {
        event.preventDefault();
        
        AuthenticationService
            .signin(this.state.email,
                this.state.password)
            .then(
                () => {
                    
                    this.props.history.push('/profile');
                },
                error => {
                    console.log("Login fail: error = { " + error.toString() + " }");
                    this.setState({ error: "Can not signin successfully ! Please check username/password again" });
                }
            );
    }

    render() {
        return <body>
            <div class="container">
                <div class="forms-container">
                    <div class="signin-signup">
                        <form onSubmit={this.doLogin} class="sign-in-form">
                            <h2 class="title">Sign in</h2>

                            <div class="input-field">
                                <i class="user-icon"></i>
                                <input type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.changeHandler}
                                />
                            </div>

                            <div class="input-field">
                                <i class="password-icon"></i>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.changeHandler}
                                />
                            </div>


                            <button type="submit" class="btn-solid">Login</button>

                            {
                                this.state.error && (
                                    <Alert color="danger">
                                        {this.state.error}
                                    </Alert>
                                )
                            }
                            <p class="text">Don't have an account?
                                <BoldLink href="/signup" >Register</BoldLink>
                            </p>

                        </form>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content" type="text">
                            <h1>About 1Password</h1>
                            <p>The ultimate Password Manager, 1Password remembers them all for you.
                                Use strong, unique passwords and a password manager to keep track of them.</p>
                            
                            <h3>Store all your passwords in one secure place</h3>
                            <h3>Zero-knowledge encryption so only you can access your passwords</h3>
                            <h3>Go ahead! Forget your password!</h3>
                        </div>

                        {<img src={Logo} class="image"/>}
                    </div>
                </div>

            </div>
        </body>
    }
}
export default LoginForm;