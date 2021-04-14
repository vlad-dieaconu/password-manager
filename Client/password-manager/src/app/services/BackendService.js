import axios from 'axios';

// Add a request interceptors
const userID = JSON.parse(localStorage.getItem('user'));
const accessToken = userID.accessToken

const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

class BackendService {

  addAccount = async (platforma, password) => {
    
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
}

export default new BackendService();