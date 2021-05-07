import React, { Component } from "react";
import BackendService from "../services/BackendService";
import { Alert } from "reactstrap";

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
                    <form onSubmit={this.addNewAccount}>
                        <div style={{ marginTop: "100px", marginLeft: "50px" }}>
                            <h2 class="title">Add a new platform</h2>
                            <br></br>
                            <div class="input-field">
                                <i class="email-icon"></i>
                                <input type="text"
                                    name="platforma"
                                    id="platforma"
                                    placeholder="Platform"
                                    value={this.state.platforma}
                                    onChange={this.changeHandler}
                                />
                            </div>
                            <br></br>
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

                            <button style={{ marginRight: "50px" }} type="submit" class="btn-solid" onSubmit={this.addNewAccount}>ADD</button>

                            <button type="submit" class="btn-solid" onClick={this.backToProfile}>Back to profile</button>
                            {
                                this.state.successful && (
                                    <Alert variant="success">
                                        Account added successfully!
                                    </Alert>
                                )
                            }
                            {alert}
                        </div>
                    </form>

                </div>
            </div>
        </body>

    }

}

export default AddAccountForm;