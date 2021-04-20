import React, { Component } from "react";
import { BoldLink } from "./common";
import AuthenticationService from '../services/AuthenticationService';
import { Alert } from "reactstrap";
import Safe from '../res/safe.svg';


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            successful: false,
            validForm: true,
            errors: {
                email: '',
                password: ''
            }
        };
    }

    changeHandler = (event) => {
        const { name, value } = event.target;

        let errors = this.state.errors;

        switch (name) {

            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    signUp = (e) => {
        e.preventDefault();
        const valid = validateForm(this.state.errors);
        this.setState({ validForm: valid });
        if (valid) {
            AuthenticationService.register(
                this.state.email,
                this.state.password

            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                    });
                },

                error => {
                    console.log("Fail! Error = " + error.toString());

                    this.setState({
                        successful: false,
                        message: error.toString()
                    });
                }
            );
        }
    }


    render() {

        const errors = this.state.errors;

        let alert = "";

        if (this.state.message) {
            if (this.state.successful) {
                alert = (
                    <Alert variant="success">
                        {this.state.message}
                    </Alert>
                );


            } else {
                alert = (
                    <Alert variant="danger">
                        {this.state.message}
                    </Alert>
                );
            }
        }
        return <body>
            <div class="container">
                <div class="forms-container">
                    <div class="signin-signup">
                        <form onSubmit={this.signUp} class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text"
                                    placeholder="Email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.changeHandler}
                                />
                            </div>

                            {
                                errors.email && (
                                    <Alert variant="danger">
                                        {errors.email}
                                    </Alert>
                                )
                            }
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.changeHandler}
                                />
                            </div>
                            {
                                errors.password && (
                                    <Alert key="errorspassword" variant="danger">
                                        {errors.password}
                                    </Alert>
                                )

                            }


                            <button type="submit" class="btn-solid">Signup</button>
                            {
                                !this.state.validForm && (
                                    <Alert key="validForm" variant="danger">
                                        Please check the inputs again!
                                    </Alert>
                                )
                            }


                            {
                                this.state.successful && (
                                    <Alert variant="success">
                                        Account created successfully!
                                    </Alert>
                                )
                            }
                            {alert}

                            <p href="#">Already have an account?
                                <BoldLink href="/signin">Login</BoldLink>
                            </p>
                        </form>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content" type="text">
                            <h1>Let's get you set up</h1>
                            <p>It should only take a couple of minutes to create your account</p>
                            <br></br>
                            <h4>We lock passwords</h4>
                            <h4>You hold the key</h4>
                            <h4>It has never been easier</h4>
                        </div>

                        {<img src={Safe} class="image-register"/>}
                    </div>
                </div>

            </div>
        </body>
    }
}
export default RegisterForm;