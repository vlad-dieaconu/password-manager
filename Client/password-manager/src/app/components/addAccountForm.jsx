import React, { Component } from "react";
import axios from "axios";
import BackendService from "../services/BackendService";
import { Form } from "reactstrap";

class AddAccountForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            platforma: "",
            password: "",
            successful: false,
        };
    }
    changeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            
        })
    }

    addNewAccount = (e) => {
        e.preventDefault();
        BackendService.addAccount(
            this.state.platforma,
            this.state.password
        ).then(

            response => {
                this.setState({
                    successful: true,
                });

            },
            error => {
                console.log("Fail !");
                this.setState({
                    successful: false,
                });
            }
        );
    }





backToProfile = () => {
    this.props.history.push('/profile');
}

render() {
    return (
        <Form onSubmit={this.addNewAccount}>
        <div style={{ marginTop: "20px" }}>
            <h2>Add a new platform</h2>
            <ul>
                <input type="text"
                    name="platforma"
                    id="platforma"
                    placeholder="Platforma"
                    value={this.state.platforma}
                    onChange={this.changeHandler}

                />
            </ul>

            <ul>
                <input type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                />
            </ul>
             
            <button onSubmit={this.addNewAccount}>ADD</button>
            <button onClick={this.backToProfile}>Back to profile</button>
        </div></Form>
    );

}

}

export default AddAccountForm;