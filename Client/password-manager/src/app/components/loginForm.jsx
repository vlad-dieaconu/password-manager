import React, { useContext, Component } from "react";
import { AccountContext } from "./accountContext";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "./marginer";
import AuthenticationService from '../services/AuthenticationService';

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

    //  toRegister() {
    //      console.log("it worked");
    //  }  

    render() {
        return <BoxContainer>
            <FormContainer onSubmit={this.doLogin}>
                
                <FormContainer>
                    <Marginer direction="vertical" margin={10} />
                    <Input type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                    />
                    <Input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                    />
                </FormContainer>
                
                <Marginer direction="vertical" margin={15} />
                <MutedLink href="#">Forgot password?</MutedLink>
                <Marginer direction="vertical" margin="2em" />
                <SubmitButton type="submit">Login</SubmitButton>
                <Marginer direction="vertical" margin="2em" />
                <MutedLink href="#">Don't have an account?
                    <BoldLink href="/signup" >Register</BoldLink>
                </MutedLink>
            </FormContainer>
        </BoxContainer>
    }
}
export default LoginForm;