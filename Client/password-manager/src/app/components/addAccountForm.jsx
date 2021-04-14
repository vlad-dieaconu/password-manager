import React, { Component } from "react";
import axios from "axios";

class AddAccountForm extends Component {

    



    addAccount = async (platforma, password) => {
        const userID = JSON.parse(localStorage.getItem('user'));
        const accessToken = userID.accessToken

        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });


        return authAxios.post("/users/accounts/" + userID.id + "/addAccount", {

            platforma,
            password
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    backToProfile = () => {
        this.props.history.push('/profile');
    }

    render() {
        return (
            <div style={{ marginTop: "20px" }}>
                <h2>Add a new platform</h2>
                <ul>
                    <input type="text"
                        name="platforma"
                        id="platforma"
                        placeholder="Platform"
                    />
                </ul>

                <ul>
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </ul>
                <button onClick={this.addAccount}>ADD</button>
                <button onClick={this.backToProfile}>Back to profile</button>
            </div>
        );

    }

}

export default AddAccountForm;