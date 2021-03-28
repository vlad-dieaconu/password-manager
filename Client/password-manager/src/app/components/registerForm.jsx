import React, { useContext, Component } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";
import AuthenticationService from '../services/AuthenticationService';
import { Alert } from "reactstrap";

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
                        successful: true
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

    //const {switchToLogin} = useContext(AccountContext);

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
        return <BoxContainer>
            <FormContainer onSubmit={this.signUp}>
                <FormContainer>
                    <Marginer direction="vertical" margin={10} />
                    <Input type="text"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                    />
                    {
                        errors.email && (
                            <Alert variant="danger">
                                {errors.email}
                            </Alert>
                        )
                    }

                    <Input type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                    />
                    {
                        errors.password && (
                            <Alert key="errorspassword" variant="danger">
                                {errors.password}
                            </Alert>
                        )
                    }
                </FormContainer>
                <Marginer direction="vertical" margin={15} />
                <SubmitButton type="submit">Signup</SubmitButton>
                {
                    !this.state.validForm && (
                        <Alert key="validForm" variant="danger">
                            Please check the inputs again!
                        </Alert>
                    )
                }
                {alert}
                <Marginer direction="vertical" margin="2em" />
                <MutedLink href="#">Already have an account? <BoldLink href="/signin">Login</BoldLink></MutedLink>
            </FormContainer>
        </BoxContainer>
    }
}
export default RegisterForm;