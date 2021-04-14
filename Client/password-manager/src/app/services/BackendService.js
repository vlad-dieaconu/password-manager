import axios from 'axios';

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));
///
  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class BackendService {

  addAccount = async (platforma, password) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return axios.post("/users/accounts/" + user.id + "/addAccount", {

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

