import React, {Component} from "react";
import { BoxContainer, FormContainer } from "./common";
import { Marginer } from "./marginer";

class AddAccountForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: "",
            password: ""
        };
    }

    backToProfile = () => {
        this.props.history.push('/profile');
    }

    render(){
        return (
            <div style={{marginTop:"20px"}}>
                <h2>Add a new account</h2>
                <ul>
                <input type="text"
                    name="account"
                    id="account"
                    placeholder="Account"
                />
                </ul>

                <ul>
                <input type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
                </ul>
                <button>ADD</button>
                <button onClick={this.backToProfile}>Back to profile</button>
            </div>
        );
        
    }
        
}

export default AddAccountForm;